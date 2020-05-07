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
   cardsMenu=document.querySelector('.cards-menu'),
   RestaurantTitle=document.querySelector('.restaurant-title'),
   rating= document.querySelector('.rating'),
   minPrice=document.querySelector('.price'),
   category=document.querySelector('.category');

  let login=localStorage.getItem('gloDelivery');

  const getData= async function(url){
     const response= await fetch(url);
     if(!response.ok){
       throw new Error(`ошибка по адресу ${url},статус ошибка ${response.status}!`);
     }
     return await response.json();
  };



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
// функция проверки авторизации
function checkAuth(){
  if(login){
    authorized();
  }else{
    notAuthorized();
  }
}


//функция создает карточки ресторанов из jsonа
function createRestaurant({ image,kitchen,name,price,stars,products,time_of_delivery:timeOfDelivery }){
  const card=`
  <a class="card card-restaurant" data-products="${products}" data-info="${[name,price,stars,kitchen]}">
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${timeOfDelivery} мин</span>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="rating">
                ${stars}
								</div>
								<div class="price">От ${price} ₽</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
	
					</a>
		
  `;

  cardsRestr.insertAdjacentHTML(`beforeend`,card);

}

//функция создает карточки ресторанов из jsona 
function createCardGood({ description,id,image,name,price }){

  const card=document.createElement('div');
  card.className='card';
  
  card.insertAdjacentHTML(`beforeend`,`
            
						<img src="${image}" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>

							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
						
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
					
					</div>
  `);
  cardsMenu.insertAdjacentElement('beforeend',card);
}

//функция нажатия на карточку ресторана с последующим открытием товаров 
function openGoods(event){
  const target=event.target;
  if(login){

  const restaurant= target.closest('.card-restaurant');
  if(restaurant){


    const info=restaurant.dataset.info.split(',');
    const [name,price,stars,kitchen]= info;


    cardsMenu.textContent="";
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    RestaurantTitle.textContent=name;
    rating.textContent=stars;
    minPrice.textContent=`От ${price} ₽`;
    category.textContent=kitchen;

    getData(`./db/${restaurant.dataset.products}`).then(function(data){
      
      data.forEach(createCardGood);
    });

    

  }
}else{
  toggleModalAuth();
}

}

// функция с обработчиками событий
function init(){
    getData('./db/partners.json').then(function(data){
    data.forEach(createRestaurant)
  });
  cartButton.addEventListener("click", toggleModal);
  close.addEventListener("click", toggleModal);
  
  cardsRestr.addEventListener('click',login?openGoods:toggleModalAuth);
  logo.addEventListener('click',function(){
      containerPromo.classList.remove('hide');
      restaurants.classList.remove('hide');
      menu.classList.add('hide');
  });
  
  checkAuth();
  
}

init();


