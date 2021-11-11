//DEPENDENCIES
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import moment from 'moment';
import handlebars from 'express-handlebars';
import { Server as Socket } from 'socket.io';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import cluster from 'cluster';
import compression from 'compression';
import  Log4js  from 'log4js';
import  fork  from 'child_process';
import * as os from 'os';

//----------------------------------------//
const CON_CHILD_PROCESS_FORK = false;
//CLASSES AND DB
import Products from './api/products.js';
import Messages from './api/messages.js';
import { MongoDB} from './DB/db.js';
//----------------------------------------------//

//SERVER SETTINGS
const app = express()
const server = http.Server(app);
const io = new Socket(server)
const router = express.Router();
app.use('/api', router);
app.use(express.static('public'));
router.use(express.json());
router.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 8080;
const srv = server.listen(PORT, async () =>{
  console.log(`Sever listen port number ${srv.address().PORT}`);
  try{
    const mongo = new MongoDB('mongodb://localhost/ecommerce');
    await mongo.connect();
    console.log('Mongo DB connected');
  }catch(err){
    console.log(`Mongo DB Error connection : ${err}`);

  }
});
srv.on('error', err => console.log(`Server error ${err}`));
//------------------------------------//

//COMPRESSION
app.use(compression());
//--------------------//

//LOGGERS
Log4js.configure({
    appenders: {
      miLoggerConsole: { type: "console"},
      miLoggerFileWarn: { type: 'file', filename: 'warn.log'},
      miLoggerFileError: {type: 'file', filename: 'error.log'}
    },
    categories:{
      default: {appenders: ['miLoggerConsole'], level: 'trace'},
      info: {appenders: ["miLoggerConsole"], level: "info"},
      warn: {appenders: ["miLoggerFileWarn"], level: "warn"},
      error: { appenders: ["miLoggerFileError"], level: "error"}
    }
});
const loggerInfo = Log4js.getLogger('info');
const loggerWarn = Log4js.getLogger('warn');
const loggerError = Log4js.getLogger('Error');
//PASSPORT
const numCPUs = os.cpus().length;
const ClusterMode = process.argv[5] == 'CLUSTER';
//MASTER
if(ClusterMode && cluster.isMaster){

  loggerInfo.info(`CPUs Number: ${numCPUs}`);
  loggerInfo.info(`PID MASTER ${process.pid}`);

  for(let i = 0; i<numCPUs; i++){
    cluster.fork();
  }

  cluster.on('exit', worker =>{
    loggerInfo.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.fork()
  })
}else{


const FACEBOOK_CLIENT_ID = '644500950258395';
const FACEBOOK_CLIENT_SECRET = 'dfe2216da6d5e10941619f316d7398fd';
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL:'/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos','emails'],
  scope: ['email']
}, function(accessToken,refreshToken, profile, done){
  let userProfile = profile;
  return done(null, userProfile);
}));

passport.serializeUser(function(user, cb){
  cb(null,user);
})
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//---
//DECLARE NEW CLASS
let products = new Products();
let messages = new Messages();
//--------------------------//

// DATE CONVERTER
var date = new Date();
var dateConverted = moment(date).format('lll');
//------------------------------------------//

//COOKIE PARS, SESSION SETTINGS AND GET REQ
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://mongodbatlasoz:ozmongodbatlas@cluster0.ggzf8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ttl: 600
  }),
  secret:'123',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
//----------------------------------------------------------------//

//HBS CONFIGURATION
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs'
  })
)
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'))
//---------------------------//

//USER LOGIN AND LOGOUT

app.get('/login',(req,res) =>{
  if(req.isAuthenticated()){
    res.render('home', {
      name: req.user.displayName,
      photo: req.user.photos[0].value,
      email: req.user.emails[0].value,
      contador: req.user.contador,
    });
  }else{
    res.sendFile(process.cwd() + '/public/login.html')
  }
})

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
{successRedirect: '/home',
failureRedirect: '/faillogin'
}));

app.get('/home', (req,res)=>{
  res.redirect('/');


});app.get('/chat', (req,res)=>{
  res.redirect('/home');
});

app.get('/faillogin', (req,res)=>{
  res.render('login-error',{});
});

app.get('/logout', (req,res) =>{
  let name = req.user.displayName
  req.logOut();
  res.render('logout',{name});
});
//-------------------------------------------//

//ROUTES
router.get('/products/list', async (req, res) =>{
  res.json(await products.listAll())
});

router.get('/products/list/:id', async(req,res) =>{
  let {id} = req.params
  res.json(await products.listar(id))
});

router.post('/products/save', async (req,res) =>{
  let product = req.body
  await products.save(product)
  res.json(product)
});

router.put('/products/update/:id', async (req,res) => {
  let {id} = req.params
  let product = req.body
  await products.update(product, id)
  res.json(product)
});

router.delete('/products/delete/:id', async (req,res) => {
  let {id} = req.params
  let product = await products.delete(id)
  res.json(product)
});

router.get('/products/view', async (req,res) =>{
  let prods = await products.listAll()
  res.render('view',{
    products: prods,
    theresProducts: prods.length
  })
});
//--------------------------------------------------------------//
//WEB SOCKET SOCKET.IO
io.on("connection", async socket => {
  console.log("Somebody connected");
    //send messages to the new client
  socket.emit("products", await products.get());

  //listen messages and send to everybody
  socket.on("update", async data => {
     if(data = 'ok'){
       io.sockets.emit("products", await products.get());
       
     }
});
//---------------------------------------------------//

//MESSAGES SETTING SOCKET.IO
socket.emit('messages', await messages.getAll());

socket.on('new-message', async data => {
  await messages.save(data);
  io.socket.emit('messages', await messages.getAll());
})
});
}
