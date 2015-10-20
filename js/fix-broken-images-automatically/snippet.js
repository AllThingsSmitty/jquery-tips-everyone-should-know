// Fix broken images automatically
$('img').on('error', function () {
  $(this).prop('src', 'img/broken.png');
});