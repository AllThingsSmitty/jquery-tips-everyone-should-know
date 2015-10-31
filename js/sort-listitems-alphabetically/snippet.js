// sort listitems alphabetically
var ul = $('#list'),
    lis = $('li', ul).get();

lis.sort(function (a, b) {
    return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);