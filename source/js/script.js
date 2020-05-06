
var link = document.querySelector(".week-item-button");
var popup = document.querySelector(".catalog-popup");
var close = document.querySelector(".catalog-pop-up__add");



link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("catalog-popup__show");
  add.focus();
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
