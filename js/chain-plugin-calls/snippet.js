// Chain plugin calls
$('#elem')
  .show()
  .html('bla')
  .otherStuff();

// Cache element in a variable
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();