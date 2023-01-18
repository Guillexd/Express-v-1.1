import fs from 'fs';

export class CartManager {
  constructor(path){
    this.path = path;  
  }

  async createCart(){
    const cart = {
      id: await this.#idGenerator(),
      products: []
    }
    try {
      const db = await this.#searchDB();
      db.push(cart);
      await this.#add(db);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartByID(id){
    try {
      const db = await this.#searchDB();
      const cart = db.find(el => el.id === parseInt(id));
      if(!cart) return false;
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(cId, pId, quant){
    const db = await this.#searchDB();
    const cart = db.find(el => el.id === parseInt(cId));

    if(!cart) return false;

    const product = cart.products.find(el => el.id === parseInt(pId));

    if (product){

      product.quantity += quant;
      await this.#add(db);

      return product;

    } else {

      const newProduct = {
        id: parseInt(pId),
        quantity: quant
      }

      cart.products.push(newProduct)

      await this.#add(db);
      return newProduct;
    }
  }

  async #searchDB(){
    if(!fs.existsSync(this.path)){
      return [];
    } else {
      let db = await fs.promises.readFile(this.path, 'utf-8');
      db = JSON.parse(db);
      return db;
    }
  }

  async #add(data){
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }

  async #idGenerator(){
    const db = await this.#searchDB();
    const id = db.length===0 ? 1 : db.at(-1).id + 1;
    return id;
  }

  async #findSameId(id){
    const carts = await this.#searchDB();
    for (let i in carts){
     if (carts[i].products==id){
        return true;
      }
    }
  }
}