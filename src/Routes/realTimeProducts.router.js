import { Router } from "express";
import  { ProductManager } from '../../Class/ProductManager.js';
const productManager = new ProductManager('../DataBase/db.json');
const RouterRealTimeProducts = Router();

RouterRealTimeProducts .get('/', async(req, res)=>{
  const { limit } = req.query;
  const products = await productManager.getProducts(limit || 'max');
  if(products){
    res.render('realTimeProducts', {
        title: "Hola",
        products
    });
  } else {
    res.status(404).json({message: "No Products"});
  }
})

RouterRealTimeProducts.post('/', async(req, res)=>{
    const obj = req.body;
    const product = await productManager.addProduct(obj);
    if(product){
        res.redirect('/realtimeproducts')
    } else {
        res.status(400).json({message: "There is an error in products"});
    }
})

RouterRealTimeProducts .delete('/:idProduct',async(req,res)=>{
    const { idProduct } = req.params;
    productManager.deleteProductById(parseInt(idProduct));
    res.json({message:`Product was deleted succesfully`});
})

export default RouterRealTimeProducts;