import { Router } from "express";
import  { ProductManager } from '../../Class/ProductManager.js';
import { socketServer } from "../app.js";
const productManager = new ProductManager('../DataBase/db.json');
const RouterRealTimeProducts = Router();

RouterRealTimeProducts .get('/', async(req, res)=>{
  const { limit } = req.query;
  const products = await productManager.getProducts(limit || 'max');
  if(products){
    res.render('realTimeProducts', {
      title: "Products",
      products
    });
  } else {
    res.status(404).json({message: "No Products"});
  }
  socketServer.of("/realtimeproducts").on("connection", (socket) => {
    console.log("conectado al /relatimeproducts");
    socket.on('addProducts', async(obj)=>{
      console.log("REcibi un addProducts");
      const product = await productManager.addProduct(obj);
      socket.emit('show_products', product);
    })
    socket.on('delete__product', (id)=>{
      productManager.deleteProductById(parseInt(id));
      socket.emit('product__deleted', id);
    })
  });
})

export default RouterRealTimeProducts;