var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

var modalOverlay = document.querySelector('.modal-overlay');

var orderLink = document.querySelector('.best__order');
var orderPopup = document.querySelector('.modal-cart');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  }
  else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
})

orderLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  orderPopup.classList.add('modal-cart__show');
  modalOverlay.classList.add('modal-overlay__show');
})

modalOverlay.addEventListener('click', function(evt) {
  evt.preventDefault();
  orderPopup.classList.remove('modal-cart__show');
  modalOverlay.classList.remove('modal-overlay__show');
})

var myMap;
var myLatLng;
var myMarker;

function initMap() {
  var element = document.getElementById('map-canvas');
  var image = "../img/icon-map-pin.svg";
  myLatLng = new google.maps.LatLng(59.938795, 30.323084);
  var mapOptions = {
    zoom: 17,
    center: {lat: 59.938795, lng: 30.323084}
  }

  myMap = new google.maps.Map(element, mapOptions);

  myMarker = new google.maps.Marker({
    position: myLatLng,
    map: myMap,
    icon: image
  });
}
