//DEPENDENCIES
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import moment from 'moment';
import handlebars from 'express-handlebars';
import { Server as Socket } from 'socket.io'
//----------------------------------------//

//CLASSES AND DB
import Products from './api/products.js';
import Messages from './api/messages.js';
import { MongoDB} from './DB/db.js';
//import {getProdRandom} from './random/products.js';
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
  console.log(`Sever listen port number ${srv.address().PORT}`)
  try{
    const mongo = new MongoDB('mongodb://localhost/27017/ecommerce')
    await mongo.connect();
    console.log('Mongo DB connected');
  }catch(err){
    console.log(`Mongo DB Error connection : ${err}`)

  }
});
srv.on('error', err => console.log(`Server error ${err}`))
//------------------------------------//

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
  secret:'123',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000
  }
}));
const getSessionName = req => req.session.name? req.session.name: '';
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
  if(req.session.name){
    res.render('home', {
      name: req.session.name
    });
  }else{
    res.sendFile(process.cwd() + '/public/login.html')
  }
})

app.post('/login', (req, res) =>{
  let {name} = req.body
  req.session.name = name
  res.redirect('/')
})

app.get('/logout', (req,res) =>{
  let name = getSessionName(req)
  if(name){
    req.session.destroy(err => {
      if(!err) res.render('logout', {name})
      else res.redirect('/')
    })
  }
})
//-------------------------------------------//

//ROUTES
router.get('products/list', async (req, res) =>{
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
io.on("connection", async (socket) => {
  console.log("Somebody connected");
    //send messages to the new client
  socket.emit("products", await products.get());
  });

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
});
