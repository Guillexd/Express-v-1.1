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

socket.on('show_products', (product)=>{
    console.log("REcibi in show_products");
    console.log(product);
    const tr = document.createElement('tr');
    if (product){
        tr.setAttribute("name", product.id);
        tr.innerHTML = 
        `
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.des}</td>
        <td>${product.price}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td>${product.thumbnail}</td>
        <td>${product.status}</td>
        <td><button class="btn btn-secondary btn__delete">Delete</button></td>
        `;

        $container__products.appendChild(tr)
    }
})

socket.on('product__deleted', (id)=>{
    const tr = document.querySelector(`tr[name="${id}"]`);
    $container__products.removeChild(tr);
})

document.addEventListener('click', (e)=>{
    if(e.target.matches('.btn__delete')){
        const id = e.target.closest('tr').firstElementChild.textContent;
        socket.emit('delete__product', id)
    }
})