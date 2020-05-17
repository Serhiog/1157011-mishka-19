
var popup = document.querySelector(".catalog-popup__background");
var close = document.querySelector(".catalog-pop-up__add");
var btn = document.querySelector(".page-header__button");
var menu = document.querySelector(".page-header__menu");
var nojs = document.querySelector(".catalog-popup__nojs");

if (nojs) {
  nojs.classList.remove("catalog-popup__nojs");
}

var buttonItems = document.querySelectorAll('.catalog__add-cart, .week-item-button'),
  index, button;

for (index = 0; index < buttonItems.length; index++) {
  button = buttonItems[index];
  button.addEventListener('click', function (event) {
    console.log('click');
    event.preventDefault();
    popup.classList.add("catalog-popup__background--show");
  });
}


if (close){
  close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("catalog-popup__background--show");
  });
}

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("catalog-popup__background--show")) {
      popup.classList.remove("catalog-popup__background--show");
    }
  }
});

btn.addEventListener("click", function (evt) {
  evt.preventDefault();
  menu.classList.toggle("page-header__menu--open");
  btn.classList.toggle("page-header__button--close");
});


var tel = document.getElementById("tel");
var mail = document.getElementById("email");
var formBtn = document.querySelector(".form__button");

formBtn.addEventListener("click", function (evt) {

  if (!tel.value) {
    alert("Укажите номер телефона");
    return false;
  }

  if (!mail.value) {
    alert("Укажите почту");
    return false;
  }
  return true;
});