import { Router } from "express";
import { CartManager } from "../../Class/CartManager.js";

const cartManager = new CartManager('../Database/cart.json');
const RouterCarts = Router();

RouterCarts.get('/:cId', async(req, res)=>{
  const { cId } = req.params;
  const cart = await cartManager.getCartByID(cId);
  if(cart){
    res.status(200).render('index', {cart});
  } else {
    res.status(404).json({message: "No Carts"});
  }
})

RouterCarts.post('/', async(req, res)=>{
  const cart = await cartManager.createCart();
  if(cart){
    res.status(200).json({message: 'Cart was created successfully', cart});
  } else {
    res.status(400).json({message: "There is an error in cart"});
  }
})

RouterCarts.post('/:cId/product/:pId', async(req, res)=>{
  const { cId, pId } = req.params;
  const { quantity } = req.body;
  const product = await cartManager.addToCart(cId, pId, quantity);

  if(product){
    res.status(200).json({message: 'Purchase was added successfully', product: product});
  } else {
    res.status(400).json({message: "There is an error in cart"});
  }
})

export default RouterCarts;