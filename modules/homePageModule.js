import { Products } from "./productsModule.js";

let product1 = new Products(1, "Jacket", "black", 500, "/public/Pics/pro1.jpg");
let product2 = new Products(2, "T-shirt", "Blue", 350, "/public/Pics/pro2.jpg");
let product3 = new Products(
  3,
  "T-shirt",
  "White",
  250,
  "/public/Pics/pro3.jpg"
);
let product4 = new Products(4, "Jacket", "Havan", 800, "/public/Pics/pro4.jpg");
let product5 = new Products(
  5,
  "T-shirt",
  "White",
  250,
  "/public/Pics/pro5.jpg"
);
let product6 = new Products(
  6,
  "T-shirt",
  "black",
  300,
  "/public/Pics/pro6.jpg"
);

const arrayOfProducts = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
];

// creating products ui dynamically
const mainSection = document.querySelector(".main");

for (let i = 0; i < arrayOfProducts.length; i++) {
  const product = document.createElement("div");
  product.className = "product";
  product.id = arrayOfProducts[i].id;

  const productImg = document.createElement("img");
  productImg.className = "product-img";
  productImg.src = arrayOfProducts[i].productImge;

  const productName = document.createElement("h3");
  productName.className = "product-name";
  productName.innerHTML =
    arrayOfProducts[i].color + " " + arrayOfProducts[i].productName;

  const productPrice = document.createElement("h2");
  productPrice.className = "product-price";
  productPrice.innerHTML = arrayOfProducts[i].price + "LE";

  const detailsBtn = document.createElement("button");
  detailsBtn.className = "btn";
  detailsBtn.innerHTML = "Details";

  product.appendChild(productImg);
  product.appendChild(productName);
  product.appendChild(productPrice);
  product.appendChild(detailsBtn);
  mainSection.appendChild(product);
}

// details button
const detailsBtn = document.querySelectorAll(".btn");
for (let i = 0; i < detailsBtn.length; i++) {
  detailsBtn[i].addEventListener("click", (ev) => {
    let pressedobj = arrayOfProducts.find((ele) => {
      return ele.id == ev.target.parentElement.id;
    });
    //console.log(pressedobj);
    window.location.assign("/public/details.html");
    localStorage.setItem("pressedobj", JSON.stringify(pressedobj));
  });
}

// login/logout functionality
let logedinUser = JSON.parse(localStorage.getItem("logedInUser"));
let cartPro = JSON.parse(localStorage.getItem("addedToCartProducts"));

let loginOutBtn = document.querySelector(".login_logout");

loginOutBtn.addEventListener("click", (ev) => {
  if (logedinUser[0].isLogedIn) {
    let x = window.confirm("Are you sure you want to logout?");
    if (x) {
      logedinUser[0].isLogedIn = false;
      cartPro = [];
      localStorage.setItem("addedToCartProducts", JSON.stringify(cartPro));
      localStorage.setItem("logedInUser", JSON.stringify(logedinUser));
      window.location.reload();
    } else {
    }
  } else {
    window.location.assign("/public/loginPage.html");
  }
});

console.log(JSON.parse(localStorage.getItem("logedInUser")));
