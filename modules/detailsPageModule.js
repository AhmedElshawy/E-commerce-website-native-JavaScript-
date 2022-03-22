
window.addEventListener("load", () => {
  let pressedObj = JSON.parse(localStorage.getItem("pressedobj"));
  
  const price = document.getElementById("price");
  const proname = document.getElementById("name");
  const proImg = document.querySelector(".productDetalisImg");

  price.innerHTML = pressedObj.price + "LE";
  proname.innerHTML = pressedObj.productName;
  proImg.src = pressedObj.productImge;

 
  //add to cart func
  const addToCartBtn = document.querySelector(".cart-btn");
  let logedinUser = JSON.parse(localStorage.getItem("logedInUser"));
  addToCartBtn.addEventListener("click", (ev) => {
    if(logedinUser[0].isLogedIn){
      let cartPro = JSON.parse(localStorage.getItem("addedToCartProducts"));
    let index = cartPro.findIndex((ele) => {
      return ele.id == pressedObj.id;
    });
    if (index == -1) {
      cartPro.push(pressedObj);
      localStorage.setItem("addedToCartProducts", JSON.stringify(cartPro));
      ev.target.innerHTML = 'Added';
      setTimeout(()=>{
        ev.target.innerHTML = 'Add to cart';
      },3000)
     window.location.assign('/public/cart.html');
    } else {
      let logMessage = document.querySelector('.logMessage');
      logMessage.innerHTML = 'It is aready added';
      setTimeout(()=>{
        logMessage.innerHTML = '';
      },2500)
    }
  }
  else{
    showToastMessage('You can not use the cart untile you login');
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
});


