import { Router } from "express";
import  { ProductManager } from '../../Class/ProductManager.js';
const productManager = new ProductManager('../DataBase/db.json');
const RouterRealTimeProducts = Router();

RouterRealTimeProducts.get('/', async(req, res)=>{
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
})

export default RouterRealTimeProducts;