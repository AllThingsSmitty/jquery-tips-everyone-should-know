// Make two divs the same height

// Example 1
$('.div').css('min-height', $('.main-div').height());

// Example 2
var $columns = $('.column');
var height = 0;
$columns.each(function () {
  if ($(this).height() > height) {
    height = $(this).height();
  }
});
$columns.height(height);

// Make all child divs the same height
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});