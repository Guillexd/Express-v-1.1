import express from 'express';
import  { ProductManager } from '../Class/ProductManager.js';

const app = express();
const productManager = new ProductManager('../DataBase/db.json');

//default settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routers
const RouterProducts = express.Router();
app.use('/products', RouterProducts);

//routing
app.get('/', async(req, res)=>{
    res.send(`<h1 style='color: salmon; display: grid; place-content: center'>Listening through PORT: ${PORT}</h1>`);
})

RouterProducts.get('/', async(req, res)=>{
    const { limit } = req.query;
    const evento = await productManager.getProducts(limit || 'max');
    if(evento){
        res.status(200).json(evento);
    } else {
        res.status(404).json({message: "No Products"});
    }
})

RouterProducts.get('/:pId', async(req, res)=>{
    const { pId } = req.params;
    const evento = await productManager.getProductById(pId);
    if(evento){
        res.status(200).json(evento);
    } else {
        res.status(404).json({message: "Not found"});
    }
})

RouterProducts.post('/', async(req, res)=>{
    const obj = req.body;
    const user = await productManager.addProduct(obj);
    if(user){
        res.status(200).json({message: 'Product was added successfully', user});
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

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Listening through PORT: ${PORT}`);
})