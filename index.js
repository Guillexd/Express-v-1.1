const fs = require('fs');

class ProductManager {

  constructor(path){
    this.path=path;
  }

  async addProduct(title, des, price, thumbnail, code, stock){

    const product = {
      id: await this.#idGenerator(),
      title,
      des,
      price,
      thumbnail,
      code,
      stock
    }
    const verFirst = product[Object.keys(product)[Object.keys(product).length - 1]] !== undefined;
    const verSecond = await this.#findCode(product.code) ? false : true;
    try {
      if (verFirst && verSecond){
        let db = await this.#searchDB();
        db.push(product);
        await this.#add(db);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts(){
    const db = await this.#searchDB();
    return db;
  }

  async getProductById(id){
    const db = await this.getProducts();
    try {
      const prod = db.find(el => el.id === id);
      return prod ? prod : null;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(id, prop){
    const db = await this.getProducts();
    try {
      let newProduct = await this.getProductById(id);
      if(newProduct){
        newProduct = {...newProduct, ...prop}
        const newdb = db.map(el=>{
          if(el.id==newProduct.id){
            el=newProduct;
          }
          return el;
        })
        await this.#add(newdb);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(id){
    const db = await this.getProducts();
    try {
      const newProducts = db.filter(el => el.id !== id);
      await this.#add(newProducts);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProducts(){
    await this.#add([])
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

  async #findCode(cod){
    const products = await this.#searchDB();
    for (let i in products){
     if (products[i].code==cod){
        return true;
      }
    }
  }
}

const producto = new ProductManager('./db.json');
//esto se ve reflejado en el db.json xd
function ejecutar(){
  setTimeout(() => {
    producto.addProduct("Piña","Piña calidad-precio", 1.1,"https://www.lechepuleva.es/documents/13930/203222/pi%C3%B1a_g.jpg/c585227d-e694-464d-87d7-3f2143dd33d9?t=1423480442000", 2, 100);
  }, 0000);
  setTimeout(() => {
    producto.addProduct("Fresa","Fresa calidad-precio", 1.1,"https://www.lechepuleva.es/documents/13930/203222/pi%C3%B1a_g.jpg/c585227d-e694-464d-87d7-3f2143dd33d9?t=1423480442000", 3, 200);
  }, 1000);
  setTimeout(() => {
    producto.deleteProductById(1);
  }, 2000);
  setTimeout(() => {
    producto.updateProductById(2, {price: 4.5})
  }, 3000);
  setTimeout(() => {
    producto.deleteAllProducts()
  }, 4000);
}

ejecutar();