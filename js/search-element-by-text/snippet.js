// Search element by text
// get search text
var search = $('#search').val();
// hide all div's that they don't have "abcd" in their content
$("div:not(:contains('"+search+"'))").hide();
