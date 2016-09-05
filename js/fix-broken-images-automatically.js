// Fix broken images automatically
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});

// Hide broken images
$('img').on('error', function () {
  $(this).hide();
});