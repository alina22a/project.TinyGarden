let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let icon=document.querySelector('.icon');
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
    openShopping.style.display='none';
    icon.style.position='relative';
})
closeShopping.addEventListener('click', ()=>{
    icon.style.position='fixed';
    body.classList.remove('active');
    openShopping.style.display='block';
})
let products = [
    {
        id: 1,
        name: '"Рожева насолода"',
        image: 'pink.png',
        price: 400
    },
    {
        id: 2,
        name: '"Солоденька"',
        image: 'orange.png',
        price: 300
    },
    {
        id: 3,
        name: '"Сонечко"',
        image: 'yellow.png',
        price: 500
    },
    {
        id: 4,
        name: '"Сяйво"',
        image: 'purple.webp',
        price: 450
    },
    {
        id: 5,
        name: '"Біла ніжність"',
        image: 'white.png',
        price: 670
    },
    
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}грн.</div>
            <button onclick="addToCard(${key})">Замовити</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}