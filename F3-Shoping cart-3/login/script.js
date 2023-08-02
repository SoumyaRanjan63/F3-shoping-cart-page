const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('signinBtn');
const navlogin=document.getElementById('login');
const navsignup=document.getElementById('signup');

navlogin.addEventListener('click',()=>{
    window.location.href='/login/index.html';
})
navsignup.addEventListener('click',()=>{
    window.location.href='/signup/index.html';
})


loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (email.value.trim() === '' || password.value.trim() === '') {
        alert('fields are mandatory');
    }
    else {
        let users = JSON.parse(localStorage.getItem('users'));
        if (users) {
            let currentUser = users.find(user => {
                return user.email === email.value.trim();
            });
            if (currentUser) {
                if(password.value.trim()===currentUser.password){
                    sessionStorage.setItem('loggedInUser',JSON.stringify(currentUser));
                    window.location.href='/Shoping page/index.html';
                    alert('logged in');
                }
                else{
                    alert('incorrect password');
                }
            }
            else {
                
                alert('you have not signed up');
                window.location.href='/signup/index.html';
            }
        }
        else {
            alert('you have not signed up');
            window.location.href='/signup/index.html';
        }
    }
})

const Signupbtn = document.getElementById('Signupbtn');
const loginbtn = document.getElementById('loginbtn')
const Mycart = document.getElementById('Mycart')
const Home = document.getElementById('Home')


Signupbtn.addEventListener('click', () => {
    window.location.href = '/signup';
  });
 
loginbtn.addEventListener('click',()=>{
  window.location.href='/login/index.html';
})
Mycart.addEventListener('click',()=>{
  window.location.href='/cart/index.html';
})
Mycart.addEventListener('click',()=>{
  window.location.href='/index.html';
})

