// Cache jQuery selectors
var blocks = $('#blocks').find('li');

$('#hideBlocks').click(function () {
  blocks.fadeOut();
});

$('#showBlocks').click(function () {
  blocks.fadeIn();
});