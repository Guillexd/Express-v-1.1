import express from 'express';
import RouterProducts from '../Routes/product.router.js';
import RouterCarts from '../Routes/carts.router.js';
const app = express()

//default settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routing
app.get('/', async(req, res)=>{
  res.send(`<h1 style='color: salmon; display: grid; place-content: center'>Listening through PORT: ${PORT}</h1>`);
})

//Routers
app.use('/api/products', RouterProducts);
app.use('/api/carts', RouterCarts);

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Listening through PORT: ${PORT}`);
})