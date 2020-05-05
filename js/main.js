const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


///day 1
 const btnAuth=document.querySelector('.button-auth'),
   modalAuth=document.querySelector('.modal-auth'),
   closeAuth=document.querySelector('.close-auth'),
   loginInput=document.querySelector('#login'),
   logInForm=document.querySelector('#logInForm'),
   userName=document.querySelector('.user-name'),
   btnOut=document.querySelector('.button-out');

  let login=localStorage.getItem('gloDelivery');

function toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}



function authorized(){

  function logOut(){
      login=null; 
     localStorage.removeItem('gloDelivery');
      btnAuth.style.display="";
      userName.style.display='';
      btnOut.style.display='';
      btnOut.removeEventListener('click',logOut);
      checkAuth(); 
  }

   console.log('авторизован');

   userName.textContent=login;
   
    btnAuth.style.display="none";
    userName.style.display='inline';
    btnOut.style.display='block';
    btnOut.addEventListener('click',logOut);
    
   

  

   
}
function notAuthorized(){
  console.log('не авторизован');

  function logIn(event){
    event.preventDefault();
    if(loginInput.value!=''){
    login=loginInput.value;
    

    localStorage.setItem('gloDelivery',login);

    toggleModalAuth();
    btnAuth.removeEventListener('click',toggleModalAuth);
    closeAuth.removeEventListener('click',toggleModalAuth);
    logInForm.removeEventListener('submit',logIn);
    logInForm.reset();
    checkAuth();
    }else{
      alert('введите логин');
      toggleModalAuth();
      btnAuth.removeEventListener('click',toggleModalAuth);
      closeAuth.removeEventListener('click',toggleModalAuth);
      logInForm.removeEventListener('submit',logIn);
      logInForm.reset();
      checkAuth();
    }
  }

   btnAuth.addEventListener('click',toggleModalAuth);
   closeAuth.addEventListener('click',toggleModalAuth);
   logInForm.addEventListener('submit',logIn);

   

}

function checkAuth(){
  if(login){
    authorized();
  }else{
    notAuthorized();
  }
}
checkAuth();