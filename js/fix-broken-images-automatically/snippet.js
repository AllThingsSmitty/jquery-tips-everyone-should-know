$('img').on('error', function () {
  $(this).prop('src', 'img/broken.png');
});