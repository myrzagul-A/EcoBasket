// login.js

/*
   Project for User Interface
   Developed By:   Ling Tao
   Developed Date: May 14 2022 

   Function List:
   1) validateForm()
      Used to validate the email address and password.
   2) addCurrentUsers(i)
      Add current user to localstorage after signing in
 */


const myUserList = localStorage.getItem('MyUserList');
const users = JSON.parse(myUserList);
let currentUser = '';
console.log(users);


// create validateForm function
function validateForm() {

  const selectEmail = document.getElementById('emailAddress');
  const selectPassword = document.getElementById('password');
  const selectRegister = document.getElementById('register');
  if (users == null) {

    window.alert('Please register first ');
    selectRegister.focus();
    return false;
  }

  if (selectEmail.value == '') {

    window.alert('Please enter the correct email ');
    selectEmail.focus();
    return false;
  }

  if (selectPassword.value == '') {

    window.alert('Please enter the correct password');
    selectPassword.focus();
    return false;
  }

  let checkEmail = false;
  let checkPassword = false;
  let i = 0;

  while (i < users.length) {
    if (selectEmail.value === users[i].email) {
      checkEmail = true;
      break;
    }
    i++;
  }
  if (!checkEmail) {

    window.alert('Please enter the correct email ');
    selectEmail.focus();

    return false;
  }

  if (selectPassword.value !== users[i].password) {

    window.alert('Please enter the correct password');
    selectPassword.focus();
    return false;
  }

  else {
    addCurrentUser(i);
    return true;
  }
} // end validateForm function


// create addCurrentUser function
function addCurrentUser(i) {
  currentUser = users[i].firstName;
  localStorage.setItem('CurrentUser', currentUser);
} // end addCurrentUser function

