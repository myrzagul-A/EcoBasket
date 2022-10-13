// finding elements on a page
const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');

//  tracking a click on the btnMinus
btnMinus.addEventListener('click',function() {

    // check if the counter is greater than one
    if (parseInt(counter.innerText) > 1) {
        // chahge the text in the counter by decrementing it by one
        counter.innerText = --counter.innerText;
    }
    
    
});

//  tracking a click on the btnPlus
btnPlus.addEventListener('click',function() {
    // chahge the text in the counter by dincreasing it by one
    counter.innerText = ++counter.innerText;
    
});

