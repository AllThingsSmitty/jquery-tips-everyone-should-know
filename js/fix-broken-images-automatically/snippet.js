$('img').on('error', function () {
  $(this).attr('src', 'img/broken.png');
});