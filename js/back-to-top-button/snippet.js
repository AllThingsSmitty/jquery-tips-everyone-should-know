// Back to top button
$('a.top').click(function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});