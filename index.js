const fs = require('fs');

class ProductManager {
  constructor(path){
    this.path=path;
  }

  async addProduct(title, description, price, thumbnail, code, stock){
    
    const product={
      // id: await this.#idGenerator(),
      title,
      description, 
      price,
      thumbnail,
      code,
      stock
    }

    // const verFirst = await product[Object.keys(product)[Object.keys(product).length - 1]] !== undefined;
    // const verSecond = await this.#findCode(product.code) ? false : true;
    let db = await this.#searchDB();
        db.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(db));
    // try {
    //   if (verFirst && verSecond){
    //     let db = await this.#searchDB();
    //     db.push(product);
    //     await fs.promises.writeFile(this.path, JSON.stringify(db));
    //   } else {
    //     console.log(`Required files in product ${product.title} or invalid code`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

  }

  // async getProducts(){
  //   const getStuffs = await fs.promises.readFile(this.path, 'utf-8')
  //   console.log(getStuffs);
  // }

  // getProductsById(id){
  //   const ver=this.products.find(el=>el.id==id);
  //   console.log(ver || "Not found");
  // }

  async #searchDB(){
    if(!fs.existsSync(this.path)){
      return [];
    } else {
      let db = await fs.promises.readFile(this.path, 'utf-8');
      db = JSON.parse(db);
      return db;
    }
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



const newProduct=new ProductManager('./db.json');
newProduct.addProduct("Piña","Piña calidad-precio", 1.1,"que", 2, 100);
newProduct.addProduct("Fresa","Fresa calidad-precio", 2.4, "so", 2, 200);
newProduct.addProduct("Pan","Pan calidad-precio", 0.5, "xd", 3, 300);

// newProduct.getProducts();
// newProduct.getProductsById(0);


// const leer = fs.readFileSync('./db.json', 'utf-8')
// const obj={
// ola: '123xdxdxd'
// }
// fs.writeFileSync('./db.json', JSON.stringify(obj));

// const product=[{
//       title: "title",
//       description: "des", 
//       price: "price",
//       thumbnail: "img",
//       code: "img",
//       stock: "stock"
//     },
//     {
//       title: "title1",
//       description: "des1", 
//       price: "price1",
//       thumbnail: "img1",
//       code: "img1",
//       stock: "stock1"
//     }]
// const product2=[...product, product[1]]
//     console.log(product);
//     console.log(product[Object.keys(product)[Object.keys(product).at(-2)]]);

