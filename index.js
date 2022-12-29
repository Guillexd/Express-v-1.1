const fs = require('fs');

class ProductManager {
  constructor(){
    this.path='./db.json';
  }

  async addProduct(title, description, price, thumbnail, code, stock){

    const product={
      id: this.#idGenerator(),
      title,
      description, 
      price,
      thumbnail,
      code,
      stock
    }

    const verFirst = product[Object.keys(product)[Object.keys(product).length - 1]] !== undefined;
    const verSecond = await this.#findCode(product.code) ? false : true;
    console.log(verFirst);
    console.log(verSecond);
    try {
      if (verFirst && verSecond){
        let db = await fs.promises.readFile(this.path, 'utf-8');
        db = JSON.parse(db);
        db.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(db));
      } else {
        console.log(`Required files in product ${product.title} or invalid code`);
      }
    } catch (error) {
      console.log(error);
    }

  }

  async getProducts(){
    const getStuffs = await fs.promises.readFile(this.path, 'utf-8')
    console.log(getStuffs);
  }

  // getProductsById(id){
  //   const ver=this.products.find(el=>el.id==id);
  //   console.log(ver || "Not found");
  // }

  #idGenerator(){
    // const id = this.products.length===0 ? 1 : this.products[this.products.length - 1].id + 1
    return 1;
  }

  async #findCode(cod){
    let products = await fs.promises.readFile(this.path, 'utf-8');
    console.log(typeof(products));
    products = JSON.parse(products)
    console.log(typeof(products));
    for (let i in products){
     if (products[i].code==cod){
      return true;
     }
    }
  }

}



const newProduct=new ProductManager;
newProduct.addProduct("Piña","Piña calidad-precio", 1.1,"https://www.lechepuleva.es/documents/13930/203222/pi%C3%B1a_g.jpg/c585227d-e694-464d-87d7-3f2143dd33d9?t=1423480442000",2, 100)
// newProduct.addProduct("Fresa","Fresa calidad-precio", 2.4, "https://static.wikia.nocookie.net/esharrypotter/images/7/76/Fresa.jpg/revision/latest?cb=20200713112301", 2, 200)
// newProduct.addProduct("Pan","Pan calidad-precio", 0.5, "https://www.recetasderechupete.com/wp-content/uploads/2018/01/Pan-casero-f%C3%A1cil.jpg", 3, 300)

newProduct.getProducts();
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