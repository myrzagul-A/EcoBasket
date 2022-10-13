// signup.js

/*
   Project for User Interface
   Developed By:   Ling Tao
   Developed Date: May 14 2022 

   Function List:
   1) validateForm()
      Used to validate the user information.
   2) addUser()
      Add user to localstorage after submitting the form
 */


// declare users array 
let users = [];
const myUserList = localStorage.getItem('MyUserList');
if (myUserList) {
  users = JSON.parse(myUserList);
  // console.log(users[0].firstName);
}

// create validateForm function
function validateForm() {
  let selectFirstName = document.getElementById('firstName');
  let selectLastName = document.getElementById('lastName');
  let selectEmail = document.getElementById('yourEmail');
  let selectPassword = document.getElementById('password');
  let selectRepeatPassword = document.getElementById('repeatPassword');
  let selectTerms = document.getElementById('terms');

  // validate first name
  if (selectFirstName.value == "") {
    window.alert('First name must be filled out');
    selectFirstName.focus();
    return false;
  }

  // validate last name
  if (selectLastName.value == "") {
    window.alert('Last name must be filled out');
    selectLastName.focus();
    return false;
  }

  // validate email address
  if (selectEmail.value == "") {
    window.alert('Email must be filled out');
    selectEmail.focus();
    return false;
  }

  // check if the email has been registered
  for (let i = 0; i < users.length; i++) {
    if (selectEmail.value == users[i].email) {
      window.alert('The email address has been registered, please use another email address')
      selectEmail.focus();
      return false;
      break;
    }

  }

  // validate password 
  if (selectPassword.value == "") {
    window.alert('Password must be filled out');
    selectPassword.focus();
    return false;
  }

  // validate repeatpassword
  if (selectRepeatPassword.value == "" || selectPassword.value !== selectRepeatPassword.value) {
    window.alert('Repeat password must be filled out and passwords must match');
    selectRepeatPassword.focus();
    return false;
  }

  // validate terms
  if (!selectTerms.checked) {
    window.alert('You must agree all statements');
    selectTerms.focus();
    return false;
  }

  else {
    addUser();
    return true;
  }
} // end validateForm function

// create addUser function
function addUser() {

  let user = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('yourEmail').value,
    password: document.getElementById('password').value
  }

  // add elements to the users array
  users.push(user);
  document.forms[0].reset();
  localStorage.setItem('MyUserList', JSON.stringify(users));
} // end addUser function



function showHide(id) {
  var x = document.getElementById(id);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
