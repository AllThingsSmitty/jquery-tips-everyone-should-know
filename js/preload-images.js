// Preload images
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('img').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');