//SOCKET CONEXION
var socket = io.connect();
//----------------------//

//SOCKET RECIEVE PRODUCTS DATA
socket.on('products', function(products){
  document.getElementById('data').innerHTML = data2TableJS(products)
});
//----------------------------------------------------------------//

//FORM SETTING
//take data from form
const form = document.querySelector('form')
form.addEventListener('submit', e =>{
  e.preventDefault()
//segment form data
  const data = {title: form[0].value, price: from[1].value, thumbnail: form[2].vale}

//request data from url
  fetch('/api/products/create', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
    //then parse data to json, reset from and emit update data
  }).then(awnser => awnser.json()).then( products => {
    form.reset()
    socket.emit('update','ok');
  }).catch(err => console.error(err))
})
//---------------------------------------------------------------------------------------//

//PRODUCTS TABLE 
//create table with data
function data2TableJS(products){
  let res =''
  if(products.length){
    res += `
    <style>
          .table td, .table th{
            vertical-align: middle;
          }
    </style>
    <h2>Products List</h2>
    <div class="table-responsive">
      <table class= "table table-dark">
        <tr> <th>Title</th> <th>Pice</th> <th>Thumbnail</th> </tr>
        `
    res += products.map(product => `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><img width='50' src="${product.price}" alt="not found"></td>
      </tr>
        `).join(' ')
        res += `
        </table>
        </div>`
  }
  // return table created
  return res
}
//-------------------------------------------------------------------------//

//HBS TABLE
function data2TableHBS(products, cb){
  //request data from url
  fetch('templates/table.hbs')
  //parse data to text
  .then(awnser => awnser.text())
  //create hbs template
  .then(template => {
    console.log('---template---')
    console.log(template)
    console.log('---HTML---')
    let template = Handlebars.compile(template);
    let html = template({products})
    console.log(html)
    cb(html)
  })
}