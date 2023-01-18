// const fs = require('fs');
import fs from 'fs';

export class ProductManager {

  constructor(path){
    this.path=path;
  }

  async addProduct(obj){

    const { title, des, price, thumbnail, code, stock, category, status } = obj;

    const product = {
      id: await this.#idGenerator(),
      title,
      des,
      price,
      thumbnail,
      code,
      stock,
      category,
      status: true
    }
    console.log(product);
    let verFirst=true;
    if(title == undefined || des == undefined || price == undefined || code == undefined || category == undefined || stock == undefined){
      verFirst=false;
    }
  
    const verSecond = await this.#findCode(product.code) ? false : true;
    try {
      if (!(verFirst && verSecond)) return false;
      const db = await this.#searchDB();
      db.push(product);
      await this.#add(db);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts(limit){
    try {
      const db = await this.#searchDB();
      if(limit==='max'){
        return db;
      }
      return db.slice(0, limit);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id){
    try {
      const db = await this.#searchDB();
      const prod = db.find(el => el.id === parseInt(id));
      if(!prod) return false;
      return prod ;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById(id, prop){
    const db = await this.#searchDB();
    try {
      let newProduct = await this.getProductById(id);
      if(!newProduct) return false;
      newProduct = {...newProduct, ...prop}
      const newdb = db.map(el=>{
        if(el.id==newProduct.id){
          el=newProduct;
        }
        return el;
      })
      await this.#add(newdb);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(id){
    const db = await this.#searchDB();
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

// module.exports.ProductManager = ProductManager;
