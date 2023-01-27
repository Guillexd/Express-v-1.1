import express from 'express';
import handlebars from 'express-handlebars';
import RouterProducts from './Routes/product.router.js';
import RouterCarts from './Routes/carts.router.js';
import { Server } from 'socket.io';
import __dirname from './utils.js';

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
  // res.send(`<h1 style='color: salmon; display: grid; place-content: center'>Listening through PORT: ${PORT}</h1>`);
})

//Routers
app.use('/api/products', RouterProducts);
app.use('/api/carts', RouterCarts);

const PORT = 8080;
//http
const httpServer = app.listen(PORT, ()=>{
    console.log(`Listening through PORT: ${PORT}`);
})
//socket
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
  console.log(`connected by ${socket.id}`);
})