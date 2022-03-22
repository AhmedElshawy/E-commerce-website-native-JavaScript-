let registeredUsers = JSON.parse(localStorage.getItem("websiteUsers"));
console.log(registeredUsers);

//intializing user cart when he logs in
let yourCart = []
localStorage.setItem("addedToCartProducts", JSON.stringify(yourCart));


const logedInUser = [];
let userName = document.querySelectorAll('input')[0];
let password = document.querySelectorAll('input')[1];
let loginBtn = document.getElementById('loginBtn');
let logMessage = document.querySelector('.logMessage');

loginBtn.addEventListener('click',(ev)=>{
    for (let i = 0; i < registeredUsers.length; i++) {
        if(registeredUsers[i].name == userName.value && registeredUsers[i].password == password.value){
            logMessage.innerHTML = '';
            registeredUsers[i].isLogedIn = true;
            logedInUser.push(registeredUsers[i]);
            localStorage.setItem("logedInUser", JSON.stringify(logedInUser));
            window.location.assign('/public/home.html');
            break;
        }
        else{
            logMessage.innerHTML = 'Enter the correct data';
        }
    }
});

