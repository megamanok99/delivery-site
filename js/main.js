const cardButton=document.querySelector('#card-button'),
 modal=document.querySelector('.modal'),
 close=document.querySelector('.close');
 cardButton.addEventListener('click',toggleModal);
 close.addEventListener('click',toggleModal);

 function toggleModal(){
    modal.classList.toggle("is-open");
 }
 new WOW().init();