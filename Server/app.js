import express from 'express';
import  { ProductManager } from '../Class/ProductManager.js';

const app = express();
const productManager = new ProductManager('../DataBase/db.json');

app.get('/', async(req, res)=>{
    res.send(`<h1 style='color: salmon; display: grid; place-content: center'>Listening through PORT: ${PORT}</h1>`)
})

app.get('/products', async(req, res)=>{
    const { limit } = req.query
    const evento = await productManager.getProducts(limit || 'max');
    if(evento){
        res.json(evento)
    } else {
        res.send('No Products')
    }
})

app.get('/products/:pId', async(req, res)=>{
    const { pId } = req.params;
    const evento = await productManager.getProductById(pId);
    if(evento){
        res.json(evento)
    } else {
        res.send("Not found")
    }
})

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Listening through PORT: ${PORT}`);
})