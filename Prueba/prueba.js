// const {ProductManager} = require('./ProductManager.js') 

import { ProductManager } from "../Class/ProductManager.js";

const producto = new ProductManager('../DataBase/db.json');
//esto se ve reflejado en el db.json xd
function ejecutar(){
  setTimeout(() => {
    producto.addProduct("Piña","Piña calidad-precio", 1.1,"https://www.lechepuleva.es/documents/13930/203222/pi%C3%B1a_g.jpg/c585227d-e694-464d-87d7-3f2143dd33d9?t=1423480442000", 2, 100);
  }, 0);
  setTimeout(() => {
    producto.addProduct("Fresa","Fresa calidad-precio", 1.1,"https://www.lechepuleva.es/documents/13930/203222/pi%C3%B1a_g.jpg/c585227d-e694-464d-87d7-3f2143dd33d9?t=1423480442000", 3, 200);
  }, 1000);
  // setTimeout(() => {
  //   producto.deleteProductById(1);
  // }, 2000);
  // setTimeout(() => {
  //   producto.updateProductById(2, {price: 4.5})
  // }, 3000);
  // setTimeout(() => {
  //   producto.deleteAllProducts()
  // }, 4000);
} 

ejecutar(); 