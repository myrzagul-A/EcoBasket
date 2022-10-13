function handleCartSubmit(event) {
    // event.preventDefault();

    const cartItems = document.querySelectorAll ('.cart-item');
    const totalPriceEL = document.querySelector('.total-price').innerHTML;

    let cart = '{"totalPrice":null, "items":{"itemName":[], "price":[]}}';
    let cartObj = JSON.parse(cart);
    let count = 0;
    cartObj.totalPrice = document.querySelector('.total-price').innerHTML;
    cartItems.forEach(function(item) {
        cartObj.items.itemName[count] = item.querySelector('.cart-item__title').innerHTML;
        cartObj.items.price [count] = item.querySelector('.price__currency').innerHTML;
        count++;
    })
    
    console.log(JSON.stringify(cartObj));
    localStorage.setItem('cart',JSON.stringify(cartObj));
}

var productsContainer = document.querySelector ('#products-container');

function renderProducts (itemsArray) {
    itemsArray.forEach(function(item) {
        const productHTML = `<div class="col-md-6 col-lg-4">
        <div class="card mb-4" data-id="${item.id}">
            <img class="product-img" src="../images/${item.imgSrc}" alt="${item.title}">
            <div class="card-body text-center">
                <h3 class="item-title">${item.title}</h3>
                <p><small items-discrp class="text-muted">${item.discrp}</small></p>

                <div class="details-wrapper">
                    <div class="items counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter>1</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>

                    <div class="price">
                        <div class="price__currency">${item.price}</div>
                    </div>
                </div>

                <button data-cart type="button" class="btn btn-block btn-outline-warning">+ add</button>

            </div>
        </div>
    </div>`;
    productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}    
// end renderProduct

// CalsCartPrice
function calcCartPrice () {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartItems = document.querySelectorAll ('.cart-item');
    const totalPriceEL = document.querySelector('.total-price');
    // var currentPrice = 0;
    // const subtotalPrice = document.querySelector('.price__currency');
    var totalPrice = 0;
    
    cartItems.forEach(function(item) {
       const amountEl = item.querySelector('[data-counter]');
       const priceEl = item.querySelector('.cart-item__weight');
        const currentPrice = parseInt(amountEl.innerText) * parseFloat(priceEl.innerText);
    //    item.querySelector('.price__currency').innerHTML = currentPrice;
        // console.log(currentPrice);
       totalPrice += currentPrice;
       item.querySelector('.price__currency').innerHTML = currentPrice.toFixed(2);
    //    
    
    })

    // console.log(currentPrice);
    totalPriceEL.innerText = Math.floor(totalPrice* 100) / 100;
    // export let Subtotal = totalPriceEL;
    
}
// end calcCartPrice

// toggleCartStatus
function toggleCartStatus() {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmptyBadge = document.querySelector ('[data-cart-empty]');
    const orderForm = document.querySelector('#order-form')
    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none');
        orderForm.classList.remove('none');
    } else {
        cartEmptyBadge.classList.remove('none');
        orderForm.classList.add('none');
    }
}

//  end toggleCartStatus


// counter
window.addEventListener ('click', function(event){
    let counter;
    if (event.target.dataset.action === 'plus' ||event.target.dataset.action === 'minus' ) {
        const counterWrapper = event.target.closest('.counter-wrapper');
        counter = counterWrapper.querySelector('[data-counter]');
    }
    
    if (event.target.dataset.action === 'plus') {   
        counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === 'minus') {
       
        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) == 1) {
            event.target.closest('.cart-item').remove();
            toggleCartStatus();
            calcCartPrice ();
        }
        
        
    }

    if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')){
        calcCartPrice ();

    }
})

//  end counter

//  cart

const cartWrapper = document.querySelector('.cart-wrapper');
const inputCard = document.querySelector('.inputCardList');
// console.log(cartWrapper);
// console.log(inputCard);
window.addEventListener ('click', function(event){
    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.card');
        var productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            discrp: card.querySelector('[items-discrp]').innerText,
            price: card.querySelector ('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };
       const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
       if (itemInCart) {
           const counterElement = itemInCart.querySelector('[data-counter]');
           counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
       } else {
        const cartItemHtml = `<div class="cart-item" data-id="${productInfo.id}">
        <div class="cart-item__top">
            <div class="cart-item__img">
                <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
            </div>
            <div class="cart-item__desc">
                <div class="cart-item__title">${productInfo.title}</div>
                <div class="cart-item__weight">${productInfo.price}</div>

                <!-- cart-item__details -->
                <div class="cart-item__details">

                    <div class="items items--small counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter="">${productInfo.counter}</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>

                    <div class="price">
                        <div class="price__currency">${productInfo.price}</div>
                    </div>

                </div>
                <!-- // cart-item__details -->

            </div>
        </div>
        </div>`;
        const inputCardHtml = `<li> ${productInfo.title}</li>`

        cartWrapper.insertAdjacentHTML ('beforeend',cartItemHtml);
        console.log(inputCardHtml);
        // inputCard.insertAdjacentHTML ('beforeend',inputCardHtml);
        

        
       }
       card.querySelector('[data-counter]').innerText = '1';

       toggleCartStatus();
       calcCartPrice();
       
       
    }
});

// end cart

