$('.submit').click(function (e) {
    e.preventDefault();
    $.post('/login', {
        username: 'foo',
        password: 'bar'
    }, function (data) {
        console.log(data);
    });
});