

//Checkout validation form
const form = document.querySelector('form');
const cardName = document.getElementById('nameOnCard'); 
const cardNum = document.getElementById('cardNumber');
const dateExpire = document.getElementById('expire');
const cvvNum = document.getElementById('cvv');

const fullname1 = document.getElementById('fullName');
const email1 = document.getElementById('email');
const address1 = document.getElementById('address');
const city1 = document.getElementById('city');
const state1 = document.getElementById('states');
const zipCode1 = document.getElementById('zipcode');




form.addEventListener('submit',(e)=>{
     e.preventDefault();

    checkout_Valid();
    checkRadio();
    
});



function checkRadio(){
    const getSelectedValue = document.querySelector( 'input[name="CardType"]:checked');   
    let errorDisplay = document.getElementById('radioMsg');
    
    if(getSelectedValue != null ){
        errorDisplay.innerText = '';
    }else {   
       errorDisplay.innerText = 'Please select the card type';
    }
}


function checkout_Valid(){
    const cardNameValue = cardName.value.trim();
    const cardNumValue = cardNum.value.trim();
    const dateExpireValue = dateExpire.value.trim();
    const cvvNumValue = cvvNum.value.trim();

    const fullname1Value = fullname1.value.trim();
    const email1Value = email1.value.trim();
    const address1Value = address1.value.trim();
    const city1Value = city1.value.trim();
    const state1Value = state1.value.trim();
    const zipCode1Value = zipCode1.value.trim();


    if(cardNameValue ===""){
        setError(cardName, 'Full Name is required');
    } else if(!validName(cardNameValue)){
        setError(cardName, 'Invalid name');
    }else{
        setSuccess(cardName);
    }

    if(cardNumValue ==="" ){
        setError(cardNum, '12 digit with space between every 4 digits credit card number is required');
    }else if(!isNaN(cardNumValue)){
        setError(cardNum, 'Invalid card number');
    }
    else{
        setSuccess(cardNum);
    }

    if(dateExpireValue ===''){
        setError(dateExpire, 'Expiration month and year are required');
    }else{
        setSuccess(dateExpire);
    }

    if(cvvNumValue === ''){
        setError(cvvNum, '3 digit number in the back of the card is required');
    }else if(isNaN(cvvNumValue)){
        setError(cvvNum, 'Invalid number');
    }else{
        setSuccess(cvvNum);
    }

    if(fullname1Value === ''){
        setError(fullname1, 'Full name is required');
    }else if(!validName(fullname1Value)){
        setError(fullname1, 'Invalid name');
    }else{
        setSuccess(fullname1);
    }

    if(email1Value === ''){
        setError(email1, 'Email cannot be blank');
    }else if(!isEmail(email1Value)){
    setError(email1, 'Not a valid email');
    }
    else {
        setSuccess(email1);
    }
    
    if(address1Value === ''){
        setError(address1, 'Address cannot be blank');
    }else{
        setSuccess(address1);
    }

    if(city1Value === ''){
        setError(city1, 'A city name is required');
    }else if(!validName(city1Value)){
        setError(city1, 'Invalid input');
    }else{
        setSuccess(city1);
    }

    if (state1Value === "None"){
        setError(state1, "Please choose a state");
    }else{
        setSuccess(state1);
    }

    if(zipCode1Value === ''){
        setError(zipCode1, 'Zip Code is required');
    }else{
        setSuccess(zipCode1);
    }


}

function setError(input, message){
    let inputCard = input.parentElement;
    let errorDisplay = inputCard.querySelector('small');

    inputCard.classList.add('error');
    errorDisplay.innerText = message;
   inputCard.classList.remove('success');
    
}

function setSuccess(input){
    let inputCard = input.parentElement;
    let errorDisplay = inputCard.querySelector('small');

    errorDisplay.innerText = '';
    inputCard.classList.add('success');
  inputCard.classList.remove('error');
    
}

function validName(name){
return /^[A-Za-z]+$/.test(name);
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


/***FadeIn - FadeOut***/

$(document).ready(function(){
    $('#btn-fadeout').click(function(){
        $('#ship-box').fadeOut();
    });
});

$(document).ready(function(){
$("#btn-fadein").click(function(){
$("#ship-box").fadeIn();
});
});
/********************/


function createList() {
    const containerList = document.getElementById('itemsList');
    let totalPrice = 0.0;
    let itemNames;
    let itemPrices;

    let cart = '';
    cart = JSON.parse(localStorage.getItem('cart'));
    totalPrice = cart.totalPrice;
    let count = 0;
    cart.items.itemName.forEach(function(item) {
        itemNames = cart.items.itemName[count];
        itemPrices = cart.items.price[count];
        count++
        const listHTML = `<li>${itemNames} : ${itemPrices} $</li>`
        containerList.insertAdjacentHTML('beforeend', listHTML);
        document.getElementById('subTotal').value = totalPrice + " $ ";

        calculateTotal(totalPrice);
    })

    function calculateTotal(moneys) {
        let taxes = document.getElementById('taxes');
        taxes.value = (moneys*0.10).toFixed(2) +' $';
        let delivery = parseFloat(document.getElementById('delivery').value);
        let finalTotal = document.getElementById('total');
        finalTotal.value = (parseFloat(moneys) + parseFloat(taxes.value) + delivery).toFixed(2) + ' $';
    }

}



/***how to show in jsonStringify***/
function checkoutSubmit(event) {
    event.preventDefault();

    const checkout_data = new FormData(event.target);
   
    const value = Object.fromEntries(checkout_data.entries());

    console.log({value });
    console.log(JSON.stringify(value));
  }

//   const form = document.querySelector("form");
  form.addEventListener("submit", checkoutSubmit);