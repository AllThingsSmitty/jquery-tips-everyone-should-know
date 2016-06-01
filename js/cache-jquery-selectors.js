// Cache jQuery selectors
var blocks = $('#blocks').find('li');

$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});