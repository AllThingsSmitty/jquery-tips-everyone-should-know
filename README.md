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
1. [Find Element By Text](#find-element-by-text)
1. [Trigger on Visibility Change](#trigger-on-visibility-change)


### Back to Top Button

By using the `animate` and `scrollTop` methods in jQuery you don't need a plugin to create a simple scroll-to-top animation:

```javascript
// Back to top
$('a.top').click(function (e) {
  e.preventDefault();
  $(document.body).animate({scrollTop: 0}, 800);
});
```

```html
<!-- Create an anchor tag -->
<a class="top" href="#">Back to top</a>
```

Changing the `scrollTop` value changes where you wants the scrollbar to land. All you're really doing is animating the body of the document throughout the course of 800 milliseconds until it scrolls to the top of the document.


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


### Checking If Images Are Loaded

Sometimes you might need to check if your images have fully loaded in order to continue on with your scripts:

```javascript
$('img').load(function () {
  console.log('image load successful');
});
```

You can also check if one particular image has loaded by replacing the `<img>` tag with an ID or class.


### Fix Broken Images Automatically

If you happen to find broken image links on your site replacing them one by one can be a pain. This simple piece of code can save a lot of headaches:

```javascript
$('img').on('error', function () {
  $(this).prop('src', 'img/broken.png');
});
```

Even if you don't have any broken links, adding this won't do any harm.


### Toggle Classes on Hover

Let's say you want to change the visual of a clickable element on your page when a user hovers over it. You can add a class to your element when the user is hovering; when the user stops hovering removes the class:

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

**Note**: CSS may be a faster solution in this case but it's still worthwhile to know this.


### Disabling Input Fields

At times you may want the submit button of a form or one of its text inputs to be disabled until the user has performed a certain action (e.g., checking the "I've read the terms" checkbox). Add the `disabled` attribute to your input so you can enable it when you want:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

All you need to do is run the `prop` method again on the input, but set the value of `disabled` to `false`:

```javascript
$('input[type="submit"]').prop('disabled', false);
```


### Stop the Loading of Links

Sometimes you don't want links to go to a certain web page nor reload the page; you might want them to do something else like trigger some other script. This will do the trick of preventing the default action:

```javascript
$('a.no-link').click(function (e) {
  e.preventDefault();
});
```


### Toggle Fade/Slide

Slideing and fading are something we use plenty in our animations with jQuery. You might just want to show an element when a user clicks something, which makes the `fadeIn` and `slideDown` methods perfect. But if you want that element to appear on the first click and then disappear on the second this will work just fine:

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

Sometimes you'll want two divs to have the same height no matter what content they have in them:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

This example sets the `min-height` which means that it can be bigger than the main div but never smaller. However, a more flexible method would be to loop over a set of elements and set the height to the height of the tallest element:

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


### Open External Links in New Tab/Window

Open external links in a new browser tab or window and ensure links on the same origin open in the same tab or window:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Note:** `window.location.origin` doesn't work in IE10. [This fix](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) takes care of the issue.


### Find Element By Text

By using the `contains()` selector in jQuery you can find text in content of an element. If text doesn't exists, that element will be hidden:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

### Trigger on Visibility Change

Trigger JavaScript when the user is no longer focusing on a tab, or refocuses on a tab:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === "visible") {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === "hidden") {
    console.log('Tab is now hidden!');
  }
});
```

### jQuery Promises with Deferred and CSS Transitions

By returning `deferred.promise()` we can chain the animation every time it's successfully finished:

```javascript
var animate = function($el, cl) {
    var deferred = $.Deferred();
    var transitionEnd = 'transitionend webkitTransitionEnd MSTransitionEnd';

    $el.addClass(cl).on(transitionEnd, function() {
        deferred.resolve($(this));
    });

    return deferred.promise();
};

// Usage
var p = animate($('.element'), 'moveRight').then(function($el) {
    // $el is returned as an argument
    return animate($el, 'moveDown');
}).then(function($el) {
    return animate($el, 'moveLeft');
}).then(function($el) {
    return animate($el, 'moveUp');
});

// p is also a Promise
p.then(function() {
    console.log('Done with all');
});
```

Demo: http://jsbin.com/zovoni/edit?html,css,js,output
