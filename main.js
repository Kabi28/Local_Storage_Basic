
// to add the product details by the customer.
// to render all the product with their name and price , description. 
// to make add to cart button 
// in cart it shows prodct name,qty,price
// add to cart qty increse or decrease option 
// then print the total amount in bottom or top of the cart
// then add remove from cart 

let productList = JSON.parse(localStorage.getItem('productList')) || []
let cartList = JSON.parse(localStorage.getItem('cartList')) || []
function addProduct(){  
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;

    if (!name || !price || !description){
        alert('Please Fill all The Field!...')
        return;
    }else{
        let product = {name:name,price:price,description:description,qty:0}
        productList.push(product)
        localStorage.setItem('productList',JSON.stringify(productList));
        resetvalue()
        renderItems(productList)
    }
    document.getElementById('newBtn').style.display = "block"
    newProduct()
}

function addToCart(index){
    let dup = cartList.find(item => item.name == productList[index].name);

    if (dup){
        alert("This Item Already Exist in The Cart ...")
    }else{
        productList[index].qty = 1
        cartList.push(productList[index])
        localStorage.setItem('cartList',JSON.stringify(cartList))
        

    }
    renderCart(cartList)

}
function renderItems(array){
    if (array.length === 0){
        let tableData = document.createElement('tr') 
        tableData.innerHTML = `
        <td colspan='4' id="noStock">'No Stock In Our Website,We Will Restock Soon....!'</td>`
        document.getElementById('table').appendChild(tableData);
    }else{
        document.getElementById('table').innerHTML = '';
    array.forEach(function(element,i){
        let tableData = document.createElement('tr') 
        tableData.innerHTML = `
        <td>${i+1}</td>
        <td>${element.name}</td>
        <td>${element.price}</td>
        <td>${element.description}</td>
        <td><button onclick='addToCart(${i})' id='addToCartBtn'>Add To Cart</button></td>`;
        document.getElementById('table').appendChild(tableData);
    })
}
//<button onclick="document.getElementById('product').style.display = 'block' ">Add Product</button>
}
    
function renderCart(array){
    let total = 0;
    if (array.length === 0){
        document.getElementById('cart').innerHTML= '<h1 id="empty">Your Cart is Empty</h1>'
    }else{
        tableElement = document.createElement('table');
        tableElement.id = "cartTable";
        document.getElementById('cart').innerHTML= ''
        tableElement.innerHTML += `<tr><th>Name</th>
            <th>Quantity</th><th>Price</th><th></th></tr>`
        array.forEach(function(element,i){
            qty = parseInt(element.qty);
            price = parseInt(element.price * element.qty);
            total += price;
            tableElement.innerHTML += `<tr><td>${element.name}</td>
            <td><button onclick='decreaseQty(${i})' id='decrease'>-</button>${qty}<button onclick='increaseQty(${i})' id='increase'>+</button></td>
            <td>${price}</td>
            
            <td><button onclick='removeFromCart(${i})' id='removeFromCartBtn'>Remove From Cart</button></td></tr>`

            document.getElementById('cart').appendChild(tableElement)
        })
        tableElement.innerHTML += `<tr><td colspan='2'>Total Amount</td><td colspan='2'>${total}</td></tr>`
    }

}
 

function removeFromCart(index){
    cartList.splice(index,1)
    localStorage.setItem('cartList',JSON.stringify(cartList))
    renderCart(cartList)
}

function resetvalue(){
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('description').value = ''
}

function increaseQty(index){
    cartList[index].qty += 1;
    localStorage.setItem('cartList',JSON.stringify(cartList))
    renderCart(cartList)
}
function decreaseQty(index){
    if (cartList[index].qty >1){
        cartList[index].qty -= 1;
        localStorage.setItem('cartList',JSON.stringify(cartList))
        renderCart(cartList)
    }else{
        alert("There is Only One Product Is Left...")
    }
}

function newProduct(){
    if (document.getElementById('product').style.display == "none"){
        document.getElementById('product').style.display = "block"
        document.getElementById('newBtn').style.display = "none"

    }else{
        document.getElementById('product').style.display = "none"    
    }
}
function cancelProduct(){
    document.getElementById('newBtn').style.display = "block"
    newProduct()
}

document.getElementById('product').style.display = "none"
renderItems(productList)
renderCart(cartList)
