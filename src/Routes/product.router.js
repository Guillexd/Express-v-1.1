import { Router } from "express";
import  { ProductManager } from '../../Class/ProductManager.js';

const productManager = new ProductManager('../DataBase/db.json');
const RouterProducts = Router();

RouterProducts.get('/', async(req, res)=>{
  const { limit } = req.query;
  const products = await productManager.getProducts(limit || 'max');
  if(products){
    res.render('home', {
        title: "Hola",
        products
    });
  } else {
    res.status(404).json({message: "No Products"});
  }
})

RouterProducts.get('/:pId', async(req, res)=>{
    const { pId } = req.params;
    const product = await productManager.getProductById(pId);
    if(product){
        res.status(200).json(product);
    } else {
        res.status(404).json({message: "Not found"});
    }
})

RouterProducts.post('/', async(req, res)=>{
    const obj = req.body;
    const product = await productManager.addProduct(obj);

    if(product){
        // res.status(202).json({message: 'Product was added successfully', product});
        res.redirect('/api/products')
    } else {
        res.status(400).json({message: "There is an error in products"});
    }
})

RouterProducts.put('/:idProduct', async(req, res)=>{
    const { idProduct } = req.params;
    const obj = req.body;
    const product = await productManager.updateProductById(parseInt(idProduct), obj);
    if(product){
        res.status(200).json({message: 'product was modified successfully', product});
    } else {
        res.status(400).json({message: "There is an error in product"});
    }
})

RouterProducts.delete('/',async(req,res)=>{
    productManager.deleteAllProducts();
    res.json({message:`Products were deleted succesfully`});
})

RouterProducts.delete('/:idProduct',async(req,res)=>{
    const { idProduct } = req.params;
    productManager.deleteProductById(parseInt(idProduct));
    res.json({message:`Product was deleted succesfully`});
})

export default RouterProducts;