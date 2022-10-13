function calcCartPrice () {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartItems = document.querySelectorAll ('.cart-item');
    const totalPriceEL = document.querySelector('.total-price');
    var totalPrice = 0;
    
    cartItems.forEach(function(item) {
       const amountEl = item.querySelector('[data-counter]');
       const priceEl = item.querySelector('.price__currency');
       const currentPrice = parseInt(amountEl.innerText) * parseFloat(priceEl.innerText);
       totalPrice += currentPrice;
    //    console.log(totalPrice)
    })


    totalPriceEL.innerText = Math.floor(totalPrice* 100) / 100;
    // export let Subtotal = totalPriceEL;
    
}

// export{totalPrice};