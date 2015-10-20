# jQuery Tips Everyone Should Know

A collection of simple tips to help up your jQuery game.

1. [Back to Top Button](#back-to-top-button)
1. [Preload Images](#preload-images)
1. [Checking If Images Are Loaded](#checking-if-images-are-loaded)
1. [Fix Broken Images Automatically](#fix-broken-images-automatically)
1. [Toggle Classes on Hover](#toggle-classes-on-hover)
1. [Disabling Input Fields](#disabling-input-fields)
1. [Stop the Loading of Links](#stop-the-loading-of-links)
1. [Toggle Fade/Slide](#toggle-fadeslide)
1. [Simple Accordion](#simple-accordion)
1. [Make Two Divs the Same Height](#make-two-divs-the-same-height)
1. [Open External Links in New Tab/Window](#open-external-links-in-new-tabwindow)


### Back to Top Button

If you're using the `animate` and `scrollTop` methods in jQuery you don't need a plugin to create a simple scroll-to-top animation:

```javascript
// Back to top
$('a.top').click(function () {
  $(document.body).animate({scrollTop: 0}, 800);
  return false;
});
```

```html
<!-- Create an anchor tag -->
<a class="top" href="#">Back to top</a>
```

Changing the `scrollTop` value changes where you wants the scrollbar to land. All you're really doing is animating the body of the document throughout the course of 800 miliseconds until it scrolls all the way to the top of the document.


### Preload Images

If your web page uses a lot of images that aren't visible initially (e.g., on hover) it's worth your while to preload them:

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover1.png', 'img/hover2.png');
```


### Checking If Images Are Loaded

Sometimes you might need to check if your images are fully loaded in order to continue on with your scripts:

```javascript
$('img').load(function () {
  console.log('image load successful');
});
```

You can also check if one particular image has loaded by replacing the `<img>` tag with an ID or class.


### Fix Broken Images Automatically

If you happen to find broken image links on your site, replacing them one by one isn't always easy. Adding this simple piece of code can save a lot of headaches:

```javascript
$('img').on('error', function () {
  $(this).prop('src', 'img/broken.png');
});
```

Even if you don't have any broken links, adding this doesn't do any harm.


### Toggle Classes on Hover

Let's say you want to change the visual of a clickable element on your page when a user hovers over it. This snippet adds a class to your element when the user is hovering; when the user stops it removes the class:

```javascript
$('.btn').hover(function () {
  $(this).addClass('hover');
  }, function () {
    $(this).removeClass('hover');
  });
```

You just need to add the necessary CSS. If you want an even _simpler_ way use the `toggleClass` method:

```javascript
$('.btn').hover(function () { 
  $(this).toggleClass('hover'); 
});
```

**Note**: CSS may be a faster solution in this case but it's still worth your while to know this.


### Disabling Input Fields

Occassionally you may want the submit button of a form or one of its text inputs to be disabled until the user has performed a certain action (e.g., checking the "I've read the terms" checkbox). Add the `disabled` attribute to your input so you can enable it when you want:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

All you need to do is run the `removeAttr` method on the input with disabled as the parameter:

```javascript
$('input[type="submit"]').removeAttr('disabled');
```


### Stop the Loading of Links

Sometimes you don't want links to go to a certain page or even reload it; you might want them to do something else like trigger some other script. This will do the trick of preventing the default action:

```javascript
$('a.no-link').click(function (e) {
  e.preventDefault();
});
```


### Toggle Fade/Slide

Slides and Fades are something we use plenty in our animations using jQuery. You might just want to show an element when we click something which makes the `fadeIn` and `slideDown` methods perfect. But if you want that element to appear on the first click and then disappear on the second this will work just fine:

```javascript
// Fade
$('.btn').click(function () {
  $('.element').fadeToggle('slow');
});
// Toggle
$('.btn').click(function () {
  $('.element').slideToggle('slow');
});
```


### Simple Accordion

This is a simple method for a quick accordion:

```javascript
// Close all panels
$('#accordion').find('.content').hide();
// Accordion
$('#accordion').find('.accordion-header').click(function () {
  var next = $(this).next();
  next.slideToggle('fast');
  $('.content').not(next).slideUp('fast');
  return false;
});
```

By adding this script all you really needs to do on your web page is the necessary HTML go get this working.


### Make Two Divs the Same Height

Sometimes you'll wants two divs to have the same height no matter what content they have in them. This snippet enables just that:

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

In this case the code loops over a set of elements and sets the height for them to the height of the tallest element.

### Open External Links in New Tab/Window

Open external links in a new tab or window and ensure links on the same origin open in the same tab or window

```javascript
$('a[href^="http"]').attr('target','_blank');
$('a[href^="//"]').attr('target','_blank');
$('a[href^="'+window.location.origin+'"]').attr('target','_self');
```
