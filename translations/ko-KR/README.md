# jQuery Tips Everyone Should Know [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

A collection of simple tips to help up your jQuery game.

> For other great lists check out [@sindresorhus](https://github.com/sindresorhus/)'s curated list of [awesome lists](https://github.com/sindresorhus/awesome/).


## Table of Contents

* [Tips](#tips)
* [Support](#support)
* [Translations](#translations)
* [Contribution Guidelines](CONTRIBUTING.md)


## Tips

1. [Use `noConflict()`](#use-noconflict)
1. [Checking If jQuery Loaded](#checking-if-jquery-loaded)
1. [Check Whether an Element Exists](#check-whether-an-element-exists)
1. [Use `.on()` Binding Instead of `.click()`](#use-on-binding-instead-of-click)
1. [Back to Top Button](#back-to-top-button)
1. [Preload Images](#preload-images)
1. [Checking If Images Are Loaded](#checking-if-images-are-loaded)
1. [Fix Broken Images Automatically](#fix-broken-images-automatically)
1. [Post a Form with AJAX](#post-a-form-with-ajax)
1. [Toggle Classes on Hover](#toggle-classes-on-hover)
1. [Disabling Input Fields](#disabling-input-fields)
1. [Stop the Loading of Links](#stop-the-loading-of-links)
1. [Cache jQuery Selectors](#cache-jquery-selectors)
1. [Toggle Fade/Slide](#toggle-fadeslide)
1. [Simple Accordion](#simple-accordion)
1. [Make Two Divs the Same Height](#make-two-divs-the-same-height)
1. [Open External Links in New Tab/Window](#open-external-links-in-new-tabwindow)
1. [Find Element By Text](#find-element-by-text)
1. [Trigger on Visibility Change](#trigger-on-visibility-change)
1. [AJAX Call Error Handling](#ajax-call-error-handling)
1. [Chain Plugin Calls](#chain-plugin-calls)
1. [Sort List Items Alphabetically](#sort-list-items-alphabetically)
1. [Disable Right-Click](#disable-right-click)


### Use `noConflict()`

The `$` alias used by jQuery is also used by other JavaScript libraries. To ensure that jQuery doesn't conflict with the `$` object of different libraries, use the `noConflict()` method at the start of the document:

```javascript
jQuery.noConflict();
```

Now you'll reference the jQuery object using the `jQuery` variable name instead of `$` (e.g., `jQuery('div p').hide()`). If you have multiple versions of jQuery on the same page (not recommended), you can use `noConflict()` to set an alias to a specific version:

```javascript
let $x = jQuery.noConflict();
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Checking If jQuery Loaded

Before you can do anything with jQuery you first need to make certain it has loaded:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

Now you're off...

<sup>[back to table of contents](#table-of-contents)</sup>


### Check Whether an Element Exists

Prior using a HTML element you need to ensure it's part of DOM.

```javascript
if ($("#selector").length) {
  //do something with element
}
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Use `.on()` Binding Instead of `.click()`

Using `.on()` gives you several advantages over using `.click()`, such as the ability to add multiple events...

```javascript
.on('click tap hover')
```

...a binding applies to dynamically created elements, as well (there's no need to manually bind every single element dynamically added to a DOM element)...

...and the possibility to set a namespace:

```javascript
.on('click.menuOpening')
```

Namespaces give you the power to unbind a specific event (e.g., `.off('click.menuOpening')`).

<sup>[back to table of contents](#table-of-contents)</sup>


### Back to Top Button

By using the `animate` and `scrollTop` methods in jQuery you don't need a plugin to create a simple scroll-to-top animation:

```javascript
// Back to top
$('.container').on('click', '.back-to-top', function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});
```

```html
<!-- Create an anchor tag -->
<div class="container">
  <a href="#" class="back-to-top">Back to top</a>
</div>
```

Changing the `scrollTop` value changes where you wants the scrollbar to land. All you're really doing is animating the body of the document throughout the course of 800 milliseconds until it scrolls to the top of the document.

**Note:** Watch for some [buggy behavior](https://github.com/jquery/api.jquery.com/issues/417) with `scrollTop`.

<sup>[back to table of contents](#table-of-contents)</sup>


### Preload Images

If your web page uses a lot of images that aren't visible initially (e.g., on hover) it makes sense to preload them:

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Checking If Images Are Loaded

Sometimes you might need to check if your images have fully loaded in order to continue on with your scripts:

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

You can also check if one particular image has loaded by replacing the `<img>` tag with an ID or class.

<sup>[back to table of contents](#table-of-contents)</sup>


### Fix Broken Images Automatically

If you happen to find broken image links on your site replacing them one by one can be a pain. This simple piece of code can save a lot of headaches:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

Alternatively, if you wish to hide broken images this snippet will take care of that for:

```javascript
$('img').on('error', function () {
  $(this).hide();
});
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Post a Form with AJAX

jQuery AJAX methods are a common way to request text, HTML, XML, or JSON. If you wanted to send a form via AJAX you could collect the user inputs via the `val()` method:

```javascript
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});
```

But all of those `val()` calls are expensive and using `.val()` on `<textarea>` elements will strip carriage return characters from the browser-reported value. A better way of collecting user inputs is using the `serialize()` function which collects them as a string:

```javascript
$.post('sign_up', $('#sign-up-form').serialize());
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Toggle Classes on Hover

Let's say you want to change the visual of a clickable element on your page when a user hovers over it. You can add a class to your element when the user is hovering; when the user stops hovering removes the class:

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

You need to add the necessary CSS. If you want an even _simpler_ way use the `toggleClass` method:

```javascript
$('.btn').on('hover', function () {
  $(this).toggleClass('hover');
});
```

**Note:** CSS may be a faster solution in this case but it's still worthwhile to know this.

<sup>[back to table of contents](#table-of-contents)</sup>


### Disabling Input Fields

At times you may want the submit button of a form or one of its text inputs to be disabled until the user has performed a certain action (e.g., checking the "I've read the terms" checkbox). Add the `disabled` attribute to your input so you can enable it when you want:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

All you need to do is run the `prop` method again on the input, but set the value of `disabled` to `false`:

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Stop the Loading of Links

Sometimes you don't want links to go to a certain web page nor reload the page; you might want them to do something else like trigger another script. This will do the trick of preventing the default action:

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Cache jQuery Selectors

Think of how many times you write the same selector over and over again in any project. Every `$('.element')` selector has to search the entire DOM each time, regardless if that selector had previously run. Instead you can run the selector once and store the results in a variable:

```javascript
var blocks = $('#blocks').find('li');
```

Now you can use the `blocks` variable wherever you want without having to search the DOM every time:

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```

Caching jQuery selectors is a good performance gain.

<sup>[back to table of contents](#table-of-contents)</sup>


### Toggle Fade/Slide

Sliding and fading are common in animations with jQuery. You might want to show an element when a user clicks something, which makes the `fadeIn` and `slideDown` methods perfect, but if you want that element to appear on the first click and then disappear on the second, this will work fine:

```javascript
// Fade
$('.btn').on('click', function () {
  $('.element').fadeToggle('slow');
});

// Toggle
$('.btn').on('click', function () {
  $('.element').slideToggle('slow');
});
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Simple Accordion

This is a simple method for a quick accordion:

```javascript
// Close all panels
$('#accordion').find('.content').hide();

// Accordion
$('#accordion').find('.accordion-header').on('click', function () {
  var next = $(this).next();
  next.slideToggle('fast');
  $('.content').not(next).slideUp('fast');
  return false;
});
```

By adding this script all you really need to do on your web page is the necessary HTML to get this working.

<sup>[back to table of contents](#table-of-contents)</sup>


### Make Two Divs the Same Height

Sometimes you'll want two divs to have the same height no matter what content they have in them:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

This example sets the `min-height` which means that it can be bigger than the main div but never smaller. However, a more flexible method would be to loop over a set of elements and set `height` to the height of the tallest element:

```javascript
var $columns = $('.column');
var height = 0;
$columns.each(function () {
  if ($(this).height() > height) {
    height = $(this).height();
  }
});
$columns.height(height);
```

If you want _all_ columns to have the same height:

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

**Note:** This can be done several ways [in CSS](http://codepen.io/AllThingsSmitty/pen/KMPqoO) but depending on what your needs are, knowing how to do this in jQuery is handy.

<sup>[back to table of contents](#table-of-contents)</sup>


### Open External Links in New Tab/Window

Open external links in a new browser tab or window and ensure links on the same origin open in the same tab or window:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Note:** `window.location.origin` doesn't work in IE10. [This fix](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) takes care of the issue.

<sup>[back to table of contents](#table-of-contents)</sup>


### Find Element By Text

By using the `contains()` selector in jQuery you can find text in content of an element. If text doesn't exists, that element will be hidden:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Trigger on Visibility Change

Trigger JavaScript when the user is no longer focusing on a tab or refocuses on a tab:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```

<sup>[back to table of contents](#table-of-contents)</sup>


### AJAX Call Error Handling

When an AJAX call returns a 404 or 500 error, the error handler will be executed. If the handler isn't defined, other jQuery code might not work as intended. To define a global AJAX error handler:

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[back to table of contents](#table-of-contents)</sup>


### Chain Plugin Calls

jQuery allows for the "chaining" of plugin method calls to mitigate the process of repeatedly querying the DOM and creating multiple jQuery objects. Let's say the following snippet represents your plugin method calls:

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

This could be vastly improved by using chaining:

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

An alternative is to cache the element in a variable (prefixed with `$`):

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

Both chaining and [caching](#cache-jquery-selectors) methods in jQuery are best practices that lead to shorter and faster code.

<sup>[back to table of contents](#table-of-contents)</sup>


### Sort List Items Alphabetically

Let's say you end up with too many items in a list. Maybe the content is produced by a CMS and you want to order them alphabetically:

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

There you go!

<sup>[back to table of contents](#table-of-contents)</sup>


### Disable Right-Click

If you want to disable right-click, you can do it for an entire page...

```javascript
$(document).ready(function () {
  $(document).bind('contextmenu', function (e) {
    return false;
  })
})
```

...and you can also do the same for a specific element:

```javascript
$(document).ready(function () {
  $('#submit').bind('contextmenu', function (e) {
    return false;
  })
})
```

<sup>[back to table of contents](#table-of-contents)</sup>






## Support

Current versions of Chrome, Firefox, Safari, Opera, Edge, and IE11.

<sup>[back to table of contents](#table-of-contents)</sup>


## Translations

* [български](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/bg-BG)
* [Español](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/es-ES)
* [Français](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/fr-FR)
* [Magyar](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/hu-HU)
* [Português do Europe](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/pt-PT)
* [Pусский](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/ru-RU)
* [简体中文](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/zh-CN)
* [繁體中文](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/zh-TW)

<sup>[back to table of contents](#table-of-contents)</sup>

