//socket front-end
const socket = io('/realtimeproducts');

//values
const $form__products = document.querySelector('#form__products'),
$title = document.querySelector('input[name="title"]'),
$des = document.querySelector('input[name="des"]'),
$price = document.querySelector('input[name="price"]'),
$code = document.querySelector('input[name="code"]'),
$stock = document.querySelector('input[name="stock"]'),
$category = document.querySelector('input[name="category"]'),
$thumbnail = document.querySelector('input[name="thumbnail"]'),
$status = document.querySelector('input[name="status"]'),
$container__products = document.querySelector('#container__products');

$form__products.addEventListener('submit', (e)=>{
    e.preventDefault()
    const title = $title.value,
    des = $des.value,
    price = $price.value,
    code = $code.value,
    stock = $stock.value,
    category = $category.value,
    thumbnail = $thumbnail.value,
    status = $status.value;
    const obj = {title, des, price, code, stock, category, thumbnail, status};
    socket.emit('addProducts', obj)
})

socket.on('show_products', (products)=>{
    products.forEach(element => {
        $container__products.innerHTML += 
        `<tr>
        <th scope="row">xd</th>
        <td>{{title}}</td>
        <td>{{des}}</td>
        <td>{{price}}</td>
        <td>{{code}}</td>
        <td>{{stock}}</td>
        <td>{{category}}</td>
        <td>{{thumbnail}}</td>
        <td>{{status}}</td>
        <td><button></button></td>
        </tr>`
    });
})