var link = document.querySelector(".week-item-button,.catalog__add-cart");
var popup = document.querySelector(".catalog-popup");
var close = document.querySelector(".catalog-pop-up__add");
var btn = document.querySelector(".page-header__button");
var menu = document.querySelector(".page-header__menu");
var btnclose = document.querySelector(".page-header__button--close");


link.addEventListener("click", function (evt) {
  evt.preventDefault();
  variant.focus();
  popup.classList.add("catalog-popup__show");
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("catalog-popup__show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("catalog-popup__show")) {
      popup.classList.remove("catalog-popup__show");
    }
  }
});


btn.addEventListener("click", function (evt) {
  evt.preventDefault();
  menu.classList.add("page-header__menu--open");
  btn.classList.remove("page-header__button");
  btn.classList.add("page-header__button--close");
});


btnclose.addEventListener("click", function (evt) {
  evt.preventDefault();
  btn.classList.remove("page-header__button--close");
  btn.classList.add("page-header__button");
  menu.classList.remove("page-header__menu--open");
});

