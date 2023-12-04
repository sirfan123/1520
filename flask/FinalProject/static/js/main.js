// main.js
document.addEventListener("DOMContentLoaded", initial);

var orderSummary;
var menuItems;
var submenuItems;

const prices = {
    'Big Mac': 5.00,
    'CheeseBurger': 4.00,
    'Quarter Pounder': 4.00,
    'Fries': 2.75,
    'Coca Cola': 1.50,
    'Dr Pepper': 1.75,
    'Fanta': 2.00,
    'Sprite': 2.50,
    'Cappucino': 3.00,
    'Caramel Macchiato': 3.75,
    'Iced mocha': 3.50,
    'Mocha latte': 3.50,
    'Baked Apple': 2.00,
    'Cookies': 1.50,
    'Hot Fudge Sundae': 4.75,
    'McFlurry': 5.00
};

function initial(){
    retrieveDOM();
    addEventListeners();
    updateOrderSummary();
}

function retrieveDOM() {
     orderSummary = document.getElementById('orderSummary');
     menuItems = document.querySelectorAll('.menu li');
     submenuItems = document.querySelectorAll('.submenu li input');
}

function addEventListeners(){

    submenuItems.forEach(submenuItem => {
        submenuItem.addEventListener('input', updateOrderSummary);
    });
}

function updateOrderSummary() {
    // Clear existing content in the textarea
    orderSummary.value = '';

    let totalOrderPrice = 0;

    submenuItems.forEach(submenuItem => {
        const submenuName = submenuItem.previousElementSibling.innerText;
        const submenuQuantity = parseInt(submenuItem.value);

        if (submenuQuantity > 0) {
            const price = prices[submenuName];
            const itemTotal = submenuQuantity * price;

            orderSummary.value += `${submenuQuantity} ${submenuName}(s) $${itemTotal.toFixed(2)}\n`;

            totalOrderPrice += itemTotal;
        }
    });
    orderSummary.value += `\nTotal: $${totalOrderPrice.toFixed(2)}`;
}

