# jQuery Recipes Your Mom Should Know

Get your mom using these simple jQuery tips and she'll be rollin'!

![Mom image 1](img/mom.jpg)

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


### Back to Top Button

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

When mom uses the `animate` and `scrollTop` functions in jQuery she doesn't need a plugin to create a simple scroll-to-top animation.

Changing the `scrollTop` value changes where your mom wants the scrollbar to land. All she's really doing is animating the body of the document throughout the course of 800ms until it scrolls all the way to the top of the document.


### Preload Images

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover1.png', 'img/hover2.png');
```

If your mom's page uses a lot of images that aren't visible initially (e.g., on hover) it's worth her while to preload them. This simple snippet does exactly that.


### Checking If Images Are Loaded

```javascript
$('img').load(function () {
  console.log('image load successful');
});
```

Sometimes mom needs to check if her images are fully loaded in order to continue with her scripts. She can also check if one particular image has loaded by replacing the `<img>` tag with an ID or class.


### Fix Broken Images Automatically

```javascript
$('img').on('error', function () {
  $(this).prop('src', 'img/broken.png');
});
```

Occasionally your mom has times when there are broken image links on her website and replacing them one by one isn't easy. Adding this simple piece of code can save her a lot of headaches.

Even if she doesn't have any broken links adding this doesn't do any harm.


### Toggle Classes on Hover

```javascript
$('.btn').hover(function () {
  $(this).addClass('hover');
  }, function () {
    $(this).removeClass('hover');
  });
```

Mom usually wants to change the visual of a clickable element on her page when the user hovers over it. This snippet adds a class to her element when the user is hovering; when the user stops it removes the class. You mom just needs to add the necessary CSS.

Now let's say mom gets comfortable with the `addClass`/`removeClass` methods and wants an even _simpler_ way of togging classes. Show her the `toggleClass` method and get ready for homemade cookies:

```javascript
$('.btn').hover(function () { 
  $(this).toggleClass('hover'); 
});
```

**Note**: Mom hasn't brushed up on her [CSS chops](https://www.youtube.com/watch?v=dQw4w9WgXcQ) fully just yet. So while CSS may be a faster solution in this case, it's still worth her while to know how to do this.


### Disabling Input Fields

```javascript
$('input[type='submit']').prop('disabled', true);
```

On occasion your mom may want the submit button of a form or one of its text inputs to be disabled until the user has performed a certain action (e.g., checking the "I've read the terms" checkbox). This line of code adds the `disabled` attribute to mom's input so she can enable it when she wants to.

To do that all mom needs to do is run the `removeAttr` function on the input with disabled as the parameter:

```javascript
$('input[type="submit"]').removeAttr('disabled');
```


### Stop the Loading of Links

```javascript
$('a.no-link').click(function (e) {
  e.preventDefault();
});
```

Sometimes your mom doesn't want links to go to a certain page or even reload it; she wants them to do something else like trigger some other script. This piece of code will do the trick of preventing the default action.


### Toggle Fade/Slide

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

Slides and Fades are something we use plenty in our animations using jQuery. Sometimes mom just wants to show an element when we click something and for that the `fadeIn` and `slideDown` methods are perfect, but if she wants that element to appear on the first click and then disappear on the second this piece of code will work just fine.


### Simple Accordion

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

By adding this script all mom really needs to do on her page is the necessary HTML go get this working. It's a simple method for a quick accordion. And simple makes mom happy.


### Make Two Divs the Same Height

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

Sometimes your mom wants two divs to have the same height no matter what content they have in them. This little snippet enables just that; in this case it loops over a set of elements and sets the height for them to the height of the tallest element.
