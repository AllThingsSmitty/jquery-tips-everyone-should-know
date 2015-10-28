// Disabling default events actions

$('.element').click(function(event) {
  event.preventDefault();
  event.stopPropagation();
});

$('.element').click(function() {
  return false;
});

$('.element').click(false);
