###Back to Top Button

```javascript
// Back To Top
$('a.top').click(function () {
  $(document.body).animate({scrollTop : 0},800);
  return false;
});
//Create an anchor tag
<a class="top" href="#">Back to top</a>
```

As you can see using the animate and scrollTop functions in jQuery we don't need a plugin to create a simple scroll to top animation.

By changing the scrollTop value we can change where we want the scrollbar to land, in my case I used a value of 0 because I want it to go to the very top of our page, but if I wanted an offset of 100px I could just type 100px in the function.

So all we are really doing is animating the body of our document throughout the course of 800ms until it scrolls all the way to the top of the document.
 
 
###Checking If Images Are Loaded

```javascript
$('img').load(function() {
console.log('image load successful');
});
```

Sometimes you need to check if your images are fully loaded in order to continue with your scripts, this three line jQuery snippet can do that for you easily.

You can also check if one particular image has loaded by replacing the img tag with an ID or class.
 
###Fix Broke Images Automatically

```javascript
$('img').error(function(){
$(this).attr('src', 'img/broken.png');
});
```

Occasionally we have times when we have broken image links on our website and replacing them one by one isn't easy, so adding this simple piece of code can save you a lot of headaches.

Even if you don't have any broken links adding this doesn't do any harm.
 
###Toggle Classes on Hover

```javascript
$('.btn').hover(function(){
$(this).addClass('hover');
}, function(){
$(this).removeClass('hover');
}
);
```

We usually want to change the visual of a clickable element on our page when the user hovers over and this jQuery snippet does just that, it adds a class to your element when the user is hovering and when the user stops it removes the class, so all you need to do is add the necessary styles in your CSS file.
 
###Disabling Input Fields

```javascript
$('input[type="submit"]').attr("disabled", true);
```

On occasion you may want the submit button of a form or even one of its text inputs to be disabled until the user has performed a certain action (checking the “I've read the terms” checkbox for example) and this line of code accomplishes that; it adds the disabled attribute to your input so you can enable it when you want to.

To do that all you need to do is run the `removeAttr` function on the input with disabled as the parameter:

```javascript
$('input[type="submit"]').removeAttr("disabled”);
```

###Stop the Loading of Links

```javascript
$('a.no-link').click(function(e){
e.preventDefault();
});
```

Sometimes we don't want links to go to a certain page or even reload it, we want them to do something else like trigger some other script and in that case this piece of code will do the trick of preventing the default action.
 
###Toggle Fade/Slide

```javascript
// Fade
$( '.btn' ).click(function() {
$( '.element' ).fadeToggle("slow");
});
// Toggle
$( '.btn' ).click(function() {
$( '.element' ).slideToggle("slow");
});
```

Slides and Fades are something we use plenty in our animations using jQuery, sometimes we just want to show an element when we click something and for that the fadeIn and slideDown methods are perfect, but if we want that element to appear on the first click and then disappear on the second this piece of code will work just fine.
 
###Simply Accordion

```javascript
// Close all Panels
$('#accordion').find('.content').hide();
// Accordion
$('#accordion').find('.accordion-header').click(function(){
var next = $(this).next();
next.slideToggle('fast');
$('.content').not(next).slideUp('fast');
return false;
});
```

By adding this script all you really need to on your page is the necessary HTML go get this working.

As you can see in this snippet I firstly closed all the panels in our accordion and then on the click event I made the content that is linked to that header slide toggle , and all the other ones slide up. It's a simple method for a quick accordion.
 
9) MAKE TWO DIVS THE SAME HEIGHT
$('.div').css('min-height', $('.main-div').height());
Sometimes you want two divs to have the same height no matter what content they have in them, this little snippet enables just that; in this case it sets the min-height which means that it can be bigger than the main div but never smaller. This is great for masonry like websites.
 
10) ZEBRA STRIPPED UNORDERED LIST
$('li:odd').css('background', '#E8E8E8');
With this little snippet you can easily create zebra striped unordered lists, this places the background you define on every odd list item so that you can place the default one for the even ones in your CSS file. You can add this snippet to any type of markup, from tables to plain divs, anything you want to be zebra stripped.
