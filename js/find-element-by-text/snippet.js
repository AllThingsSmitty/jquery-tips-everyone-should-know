// Find element by text
var search = $('#search').val();
$('div:not(:contains("'+search+'"))').hide();