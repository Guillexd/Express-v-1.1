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
      return prod ? prod : "Not found";
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductById(id){
    const db = await this.getProducts();
    try {
      const newProducts = db.filter(el => el.id !== id);
      console.log(newProducts);
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

const xd = new ProductManager('./db.json');
xd.addProduct("Piña","Piña calidad-precio", 1.1,"https://www.lechepuleva.es/documents/13930/203222/pi%C3%B1a_g.jpg/c585227d-e694-464d-87d7-3f2143dd33d9?t=1423480442000", 2, 100);
// xd.getProducts().then(el=>console.log(el));
// xd.getProductById(1).then(el=>console.log(el));
// xd.deleteProductById(0);
// xd.deleteAllProducts()