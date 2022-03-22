let cartPro = JSON.parse(localStorage.getItem("addedToCartProducts"));
let products_container = document.querySelector(".products-container");

for (let i = 0; i < cartPro.length; i++) {
  let cartItem = document.createElement("div");
  cartItem.className = "cart-items";
  cartItem.id = cartPro[i].id;

  let pro_img = document.createElement("img");
  pro_img.className = "cart-img";
  pro_img.src = cartPro[i].productImge;

  let pro_name = document.createElement("p");
  pro_name.className = "pro-name";
  pro_name.innerHTML = cartPro[i].productName;

  let pro_color = document.createElement("p");
  pro_color.className = "color";
  pro_color.innerHTML = cartPro[i].color;

  let pro_counter = document.createElement("p");
  pro_counter.className = "pro-No";
  pro_counter.innerHTML = 1;

  let addSubDiv = document.createElement("div");
  addSubDiv.className = "add-sub-div";
  let add = document.createElement("div");
  add.className = "add";
  add.innerHTML = "+";
  let sub = document.createElement("div");
  sub.className = "sub";
  sub.innerHTML = "--";
  addSubDiv.appendChild(add);
  addSubDiv.appendChild(sub);

  let pro_price = document.createElement("p");
  pro_price.className = "pro-price";
  pro_price.innerHTML = cartPro[i].price + "LE";

  let removeBtn = document.createElement("div");
  removeBtn.className = "remove";
  removeBtn.innerHTML = "X";

  cartItem.appendChild(pro_img);
  cartItem.appendChild(pro_name);
  cartItem.appendChild(pro_color);
  cartItem.appendChild(pro_counter);
  cartItem.appendChild(addSubDiv);
  cartItem.appendChild(pro_price);
  cartItem.appendChild(removeBtn);

  products_container.appendChild(cartItem);
}

// if there is no items in the cart
if (cartPro.length === 0) {
  let noItemsMessage = document.createElement("div");
  noItemsMessage.className = "noItems";
  products_container.appendChild(noItemsMessage);
  noItemsMessage.innerHTML = "No Items yet !!";
}

// remove from cart functionality
let removeBtnCollection = document.querySelectorAll(".remove");
for (let i = 0; i < removeBtnCollection.length; i++) {
  removeBtnCollection[i].addEventListener("click", (ev) => {
    let index = cartPro.findIndex((ele) => {
      return ele.id == ev.target.parentElement.id;
    });
    cartPro.splice(index, 1);
    ev.target.parentElement.remove();
    localStorage.setItem("addedToCartProducts", JSON.stringify(cartPro));
    //window.location.reload();
  });
}

// increasing and decreasing functionality

let addBtn = document.querySelectorAll(".add");
let subBtn = document.querySelectorAll(".sub");
let proCounter = document.querySelectorAll(".pro-No");

let counter = 1;
for (let i = 0; i < addBtn.length; i++) {
  addBtn[i].addEventListener("click", (ev) => {
    counter++;
    proCounter[i].innerHTML = counter;
  });
  subBtn[i].addEventListener("click", (ev) => {
    counter--;
    if (counter <= 0) {
      counter = 1;
    }
    proCounter[i].innerHTML = counter;
  });
}

//checkout functionality
const checkOutBtn = document.querySelector(".check-out");
let logedinUser = JSON.parse(localStorage.getItem("logedInUser"));

checkOutBtn.addEventListener("click", (ev) => {
  if (logedinUser[0].isLogedIn) {
    if (cartPro.length === 0) {
      showToastMessage("Please add any item first");
    } else {
      let confirmation_container = document.querySelector(
        ".register-container"
      );
      confirmation_container.style.display = "flex";
      cart.style.display = "none";
      confirmBtn.addEventListener("click", (ev) => {
        let userNameFlag = checkUserName();
        let emailFlag = checkEmail();
        let contactFlag = checkContact();
        let addressFlag = checkAddress();
        if (userNameFlag && emailFlag && contactFlag && addressFlag) {
          confirmation_container.style.display = "none";
          congrats.style.display = "block";
        } else {
          showToastMessage("Enter the correct data please...");
        }
      });
    }
  } else {
    showToastMessage("You must login to confirm purshase..");
    setTimeout(() => {
      window.location.assign("/public/loginPage.html");
    }, 3000);
  }
});

//confirmation form
let logMessagesSpaces = document.querySelectorAll(".logMessage");
const userInputs = document.querySelectorAll(".userInput");
const confirmBtn = document.getElementById("register");

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
function checkAddress() {
  if (userInputs[1].value !== "") {
    logMessagesSpaces[3].innerHTML = "";
    userInputs[1].classList.remove("alert");
    return true;
  } else {
    logMessagesSpaces[3].innerHTML = "Enter your address";
    userInputs[1].classList = "alert";
    return false;
  }
}

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
//E-mail validation
function checkEmail() {
  if (
    userInputs[2].value != "" &&
    userInputs[2].value.search(/\S+@\S+\.\S+/) != -1
  ) {
    logMessagesSpaces[2].innerHTML = "";
    userInputs[2].classList.remove("alert");
    return true;
  } else {
    logMessagesSpaces[2].innerHTML = "Enter a valid E-mail";
    userInputs[2].classList = "alert";
    return false;
  }
}

//cancel buttton functionality
let cancelBtn = document.getElementById("Cancel");

cancelBtn.addEventListener("click", (ev) => {
  for (let i = 0; i < userInputs.length; i++) {
    userInputs[i].value = "";
    logMessagesSpaces[i].innerHTML = "";
    userInputs[i].classList.remove("alert");
  }
});

// toast message function
  function showToastMessage(message) {
  let x = document.getElementById("snackbar");
  x.innerHTML = message;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

//back button functionality
let backBtn = document.querySelector(".backBtn");
backBtn.addEventListener("click", (ev) => {
  cartPro = [];
  localStorage.setItem("addedToCartProducts", JSON.stringify(cartPro));
  window.location.assign("/public/home.html");
});
