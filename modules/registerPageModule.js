import { User } from "./userModule.js";

// user name validation
function checkUserName() {
  if (
    userInputs[0].value != "" &&
    userInputs[0].value.length >= 8 &&
    userInputs[0].value.length < 20
  ) {
    logMessagesSpaces[0].innerHTML = "";
    userInputs[0].classList.remove("alert");
    return true;
  } else {
    logMessagesSpaces[0].innerHTML = "Max chars = 20, Min chars = 8";
    userInputs[0].classList = "alert";
    return false;
  }
}
//E-mail validation
function checkEmail() {
  if (
    userInputs[3].value != "" &&
    userInputs[3].value.search(/\S+@\S+\.\S+/) != -1
  ) {
    logMessagesSpaces[3].innerHTML = "";
    userInputs[3].classList.remove("alert");
    return true;
  } else {
    logMessagesSpaces[3].innerHTML = "Enter a valid E-mail";
    userInputs[3].classList = "alert";
    return false;
  }
}
//check password
function checkPassword() {
  if (
    userInputs[2].value != "" &&
    userInputs[2].value.length >= 8 &&
    userInputs[2].value.length < 20
  ) {
    logMessagesSpaces[2].innerHTML = "";
    userInputs[2].classList.remove("alert");
    return true;
  } else {
    logMessagesSpaces[2].innerHTML = "It must contain a least 8 chars";
    userInputs[2].classList = "alert";
    return false;
  }
}
//check contanct number
function checkContact() {
  if (userInputs[1].value != "" && userInputs[1].value.search(/^\d+$/) != -1) {
    logMessagesSpaces[1].innerHTML = "";
    userInputs[1].classList.remove("alert");
    return true;
  } else {
    logMessagesSpaces[1].innerHTML = "Enter numbers only";
    userInputs[1].classList = "alert";
    return false;
  }
}
//check address
function checkAddress() {
  if (userInputs[4].value !== "") {
    logMessagesSpaces[4].innerHTML = "";
    userInputs[4].classList.remove("alert");
    return true;
  } else {
    logMessagesSpaces[4].innerHTML = "Enter your address";
    userInputs[4].classList = "alert";
    return false;
  }
}

//check the equality of password
function checkEquality() {
  const confirmPasswordInput = document.getElementById("confirm");
  const passwordConfirmationlog = document.getElementById(
    "passwordConfirmation"
  );
  if (userInputs[2].value != confirmPasswordInput.value) {
    passwordConfirmationlog.innerHTML = "Passwords are not in eqality";
    return false;
  } else {
    passwordConfirmationlog.innerHTML = "";
    return true;
  }
}

let logMessagesSpaces = document.querySelectorAll(".logMessage");
const userInputs = document.querySelectorAll(".userInput");
const registerBtn = document.getElementById("register");

const websiteUsers = [];
localStorage.setItem("websiteUsers", JSON.stringify(websiteUsers));

// validation on blur event
for (let i = 0; i < userInputs.length; i++) {
  userInputs[i].addEventListener("blur", (ev) => {
    checkUserName();
    checkEmail();
    checkPassword();
    checkContact();
    checkEquality();
    checkAddress();
  });
}
// validation on click over register button
registerBtn.addEventListener("click", (ev) => {
  let userNameFlag = checkUserName();
  let emailFlag = checkEmail();
  let passwordFlag = checkPassword();
  let contactFlag = checkContact();
  let equalityFlag = checkEquality();
  let addressFlag = checkAddress();
  if (
    userNameFlag &&
    emailFlag &&
    passwordFlag &&
    contactFlag &&
    equalityFlag &&
    addressFlag
  ) {
    let newUser = new User(
      userInputs[0].value,
      userInputs[3].value,
      userInputs[1].value,
      userInputs[4].value,
      userInputs[2].value
    );
    
    let registeredUsers = JSON.parse(localStorage.getItem("websiteUsers"));
    if (registeredUsers.length == 0) {
      websiteUsers.push(newUser);
      localStorage.setItem("websiteUsers", JSON.stringify(websiteUsers));
      window.location.assign("/public/loginPage.html");
    } else {
      registeredUsers.push(newUser);
      localStorage.setItem("websiteUsers", JSON.stringify(registeredUsers));
      console.log(registeredUsers);
      window.location.assign("/public/loginPage.html");
    }
  }
});

//cancel buttton functionality
let cancelBtn = document.getElementById("Cancel");

cancelBtn.addEventListener("click", (ev) => {
  for (let i = 0; i < userInputs.length; i++) {
    userInputs[i].value = "";
    logMessagesSpaces[i].innerHTML = "";
  }
});
