const Signupbtn = document.getElementById('Signupbtn');
const loginbtn = document.getElementById('loginbtn')
const Mycart = document.getElementById('Mycart')
const Profile = document.getElementById('Profile')

Signupbtn.addEventListener('click', () => {
    window.location.href = '/signup';
  });
 
loginbtn.addEventListener('click',()=>{
  window.location.href='/login/index.html';
})
Mycart.addEventListener('click',()=>{
  window.location.href='/cart/index.html';
})
Profile.addEventListener('click',()=>{
  window.location.href='/profile/index.html';
})