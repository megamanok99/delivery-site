'use strict';
const cartButton = document.querySelector("#cart-button"),
   modal = document.querySelector(".modal"),
   close = document.querySelector(".close"),
   btnAuth=document.querySelector('.button-auth'),
   modalAuth=document.querySelector('.modal-auth'),
   closeAuth=document.querySelector('.close-auth'),
   loginInput=document.querySelector('#login'),
   logInForm=document.querySelector('#logInForm'),
   userName=document.querySelector('.user-name'),
   btnOut=document.querySelector('.button-out'),
   cardsRestr=document.querySelector('.cards-restaurants'),
   containerPromo=document.querySelector('.container-promo'),
   restaurants=document.querySelector('.restaurants'),
   menu=document.querySelector('.menu'),
   logo=document.querySelector('.logo'),
   cardsMenu=document.querySelector('.cards-menu');

  let login=localStorage.getItem('gloDelivery');

  function toggleModal() {
    modal.classList.toggle("is-open");
  }
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



function createRestaurant(){
  const card=`
  <a class="card card-restaurant">
						<img src="img/palki-skalki/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Палки скалки</h3>
								<span class="card-tag tag">55 мин</span>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 500 ₽</div>
								<div class="category">Пицца</div>
							</div>
						</div>
	
					</a>
		
  `;

  cardsRestr.insertAdjacentHTML(`beforeend`,card);

}


function createCardGood(){
  const card=document.createElement('div');
  card.className='card';
  
  card.insertAdjacentHTML(`beforeend`,`
						<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Классика</h3>
							</div>

							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
									грибы.
								</div>
							</div>
						
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">510 ₽</strong>
							</div>
						</div>
					
					</div>
  `);
  cardsMenu.insertAdjacentElement('beforeend',card);
}


function openGoods(event){
  const target=event.target;

  const restaurant= target.closest('.card-restaurant');
  if(restaurant){
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    cardsMenu.textContent="";

    createCardGood();
  createCardGood();
  createCardGood();
  }

}




cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

cardsRestr.addEventListener('click',login?openGoods:toggleModalAuth);
logo.addEventListener('click',function(){
  containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});

checkAuth();

createRestaurant();
createRestaurant();
createRestaurant();

