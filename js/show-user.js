// show-user.js

/*
   Project for User Interface
   Developed By:   Ling Tao
   Developed Date: May 14 2022 

   Function List:
   1) showUser()
      Used to create a dynamic welcome message on the top of home page after signing in.
      Used to create a dynamic sign out button 
   2) weather function
      Used to show weather using API
 */


window.addEventListener('load', showUser)

// get the variable from localstorage
let currentUser = localStorage.getItem('CurrentUser');
// console.log(currentUser);


// create showUser function
function showUser() {

  // check if user signs in
  if (currentUser !== '' && currentUser !== null) {

    // create a p element to show the welcome message 
    let p = document.createElement('p');
    let div = document.getElementById('user-container');


    // add if condition for French page
    let selectCheckLang = document.getElementById('check-lang');

    let welcome = (selectCheckLang.innerText == 'EN') ? 'Bienvenue ' : 'Welcome ';

    p.innerHTML = welcome + currentUser;
    p.id = 'user';
    div.appendChild(p);

    // create a button element for Sign Out
    let button = document.createElement('button');

    let signOut = (selectCheckLang.innerText == 'EN') ? 'Déconnexion' : 'Sign Out';
    button.innerHTML = signOut;
    button.id = 'button';
    button.type = 'button'
    div.appendChild(button);

    // create an weather message
    weather(div);

    // hide the Sign In navigation after signning in
    $('#login').hide();

    // go back to home page after signning out
    document.getElementById('button').addEventListener('click', () => {
      //alert('button');
      localStorage.setItem('CurrentUser', '');
      div.innerHTML = '';
      $('#login').show();

      // window.location.href = (selectCheckLang.innerText == 'ENG') ? '../fr/home_fr.html' : 'home.html';
    })

  } // end if block

} // end showUser function

// create weather function using Ajax
function weather(div) {
  let xhr = new XMLHttpRequest;
  let dataSourse = "https://api.weatherapi.com/v1/current.json?key=414cbadf13c04403848143032221705&q=Brossard";

  xhr.open('GET', dataSourse);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const weatherObj = JSON.parse(xhr.responseText);
      const tempToday = weatherObj.current.temp_c;
      const text = weatherObj.current.condition.text;
      const city = weatherObj.location.name;

      let input = document.createElement('input');
      input.value = tempToday + ' °C ' + text + ' ' + city;
      input.id = 'weather';
      div.appendChild(input);

      // console.log(weatherObj);
      // console.log(tempToday);
      // console.log(city);
      // console.log(text);
    }
  };
  xhr.send();


}





