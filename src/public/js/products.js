//socket front-end
const socket = io();

//values
const $form__products = document.querySelector('#form__products'),
$title = document.querySelector('input[name="title"]').value,
$des = document.querySelector('input[name="des"]').value,
$price = document.querySelector('input[name="price"]').value,
$code = document.querySelector('input[name="code"]').value,
$stock = document.querySelector('input[name="stock"]').value,
$category = document.querySelector('input[name="category"]').value,
$thumbnail = document.querySelector('input[name="thumbnail"]').value,
$status = document.querySelector('input[name="status"]').value;

$form__products.addEventListener('submit', (e)=>{
    e.preventDefault();
    const obj = {$title, $des, $price, $code, $stock, $category, $thumbnail, $status};
    socket.emit('addProducts', {obj})
})
