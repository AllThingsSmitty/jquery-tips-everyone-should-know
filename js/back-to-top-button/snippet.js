// Back to top button
$('.container').on('click', '.top', function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});