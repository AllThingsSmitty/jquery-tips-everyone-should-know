// Post a form with AJAX

// DO THIS
$.post('sign_up', $('#sign-up-form').serialize());

// NOT THIS
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});