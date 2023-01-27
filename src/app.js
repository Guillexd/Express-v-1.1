import express from 'express';
import handlebars from 'express-handlebars';
import RouterProducts from './Routes/product.router.js';
import RouterCarts from './Routes/carts.router.js';
import RouterRealTimeProducts from './Routes/realTimeProducts.router.js';
import  { ProductManager } from '../Class/ProductManager.js';
import { Server } from 'socket.io';
import __dirname from './utils.js';

const productManager = new ProductManager('../DataBase/db.json');
const app = express();

//default settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//set the public folder static (middleware)
app.use(express.static(__dirname + '/public'));

//handlebars settings 
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


//routing
app.get('/', (req, res)=>{
  res.send(`<h1 style='color: salmon; display: grid; place-content: center'>Listening through PORT: ${PORT}</h1>`);
})

//Routers
app.use('/api/products', RouterProducts);
app.use('/api/carts', RouterCarts); //home.handlebars
app.use('/realtimeproducts', RouterRealTimeProducts) //realTimeProducts.handlebars

const PORT = 8080;
//http
const httpServer = app.listen(PORT, ()=>{
    console.log(`Listening through PORT: ${PORT}`);
})
//socket back-end
const socketServer = new Server(httpServer);

//NO ENTENDÍ ESO DEL EMIT DENTRO DE UN POST, ¿PODRÍA DECIRME DONDE ENCONTRAR INFORMACIÓN LA RESPECTO EN LA RESPUESTA DE E STE PROYECTO?
//GRACIAS DE TODOS MODOS.

socketServer.on("connection", (socket) => {
  console.log(`connected by ${socket.id}`);
  socket.on('addProducts', async(obj)=>{
    const product = await productManager.addProduct(obj);
    socketServer.emit('show_products', product);
  })
  socket.on('delete__product', (id)=>{
    productManager.deleteProductById(parseInt(id));
    socketServer.emit('product__deleted', id);
  })
  socket.on('disconnect', ()=>{
    console.log(`${socket.id} desconnected`);
  })
});
