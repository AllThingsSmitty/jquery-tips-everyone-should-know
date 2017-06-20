# jQuery tippek, amiket mindenkinek tudnia kellene [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Egyszerű tippek gyűjteménye, a jQuery-ben való elmélyülésed  segítendő.

> További nagyszerű listákért tekintsd meg [@sindresorhus](https://github.com/sindresorhus/) válogatott [listáját](https://github.com/sindresorhus/awesome/).

## Tartalomjegyzék

* [Tippek](#tips)
* [Támogatás](#support)
* [További fordítások](#translations)
* [Közreműködési útmutató (angolul)](CONTRIBUTING.md)


## Tippek

1. [Betöltött-e a jQuery? - Ellenőrzés](#checking-if-jquery-loaded)
1. [`.on()` binding ("kötés") használata `.click()` helyett](#use-on-binding-instead-of-click)
1. ['Vissza az elejére' gomb](#back-to-top-button)
1. [Képek előbetöltése](#preload-images)
1. [Betöltöttek-e a képek? - Ellenőrzés](#checking-if-images-are-loaded)
1. [Betölt(het)etlen képek automatikus javítása](#fix-broken-images-automatically)
1. [Űrlap elküldése AJAX-al](#post-a-form-with-ajax)
1. [CSS osztály aktiválása a kurzor hatására](#toggle-classes-on-hover)
1. [Beviteli mezők kikapcsolása](#disabling-input-fields)
1. [Linkbetöltés megállítása](#stop-the-loading-of-links)
1. [jQuery kiválasztók eltárolása](#cache-jquery-selectors)
1. [Áttűnés/becsúszás effekt rögzítése](#toggle-fadeslide)
1. [Egyszerű accordion (harmonika-menü)](#simple-accordion)
1. [HTML div elemek egyező magassággal](#make-two-divs-the-same-height)
1. [Külső linkek megnyitása új fülön/ablakban](#open-external-links-in-new-tabwindow)
1. [Elemek keresése szöveg alapján](#find-element-by-text)
1. [Script aktiválás láthatóság változása esetén](#trigger-on-visibility-change)
1. [AJAX hívások hibakezelése](#ajax-call-error-handling)
1. [Plugin hívások láncolása](#chain-plugin-calls)
1. [Listaelemek sorba rendezése ABC szerint](#sort-list-items-alphabetically)
1. [Jobb egérkattintás kikapcsolása](#disable-right-click)


### Betöltött-e a jQuery? - Ellenőrzés

Mielőtt bármihez is kezdhetnél a jQuery-vel, először biztosra kell menned abban, hogy betöltött:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

Most, hogy elstartoltunk...

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### `.on()` binding ("kötés") használata `.click()` helyett

Az `.on()` függvény használata számos előnnyel rendelkezik a `.click()` megoldással szemben, mint például: több esemény egyszeri hozzáadása...

```javascript
.on('click tap hover')
```

...a kötés alkalmazása dinamikusan létrehozott elemekre is (tehát nem kell egyesével végrehajtani a kötést minden dinamikus DOM elemre)...

...és a névterek felállításának lehetősége:

```javascript
.on('click.menuOpening')
```

Névterek segítségével "lecsatolhatsz" egyes konkrét eseményeket (pl. `.off('click.menuOpening')`).

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### 'Vissza az elejére' gomb

Hála a jQuery `animate` és `scrollTop` eljárásainak, nincs szükséged pluginokra ahhoz, hogy létrehozz egy egyszerű 'scroll-to-top' animációt:


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

A `scrollTop` értékének változtatásával beállíthatod, hova szeretnéd, hogy érkezzen a görgetősáv. Igazából amit csinálsz, az annyi, hogy a látható részt animálod egy 800 miliszekundumos időtartamon belül, aminek a végére ez aztán "felgurul" a dokumentum tetejére.

**Megjegyzés:** Figyelj oda a `scrollTop` esetenkénti [bugos viselkedésére](https://github.com/jquery/api.jquery.com/issues/417).

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Képek előbetöltése

If your web page uses a lot of images that aren't visible initially (e.g., on hover) it makes sense to preload them:

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Betöltöttek-e a képek? - Ellenőrzés

Alkalmanként szükséges lehet rá. hogy leellenőrizd, teljesen betöltöttek-e a képeid, annak érdekében, hogy folytatódhasson a scripted lefutása:

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

Ezen felül azt is leellenőrizheted, hogy egy konkrét kép betöltött-e: mindössze cseréld le a fenti kódban az `<img>` címkét egy megfelelő azonosíra (ID) vagy osztályra.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Betölt(het)etlen képek automatikus javítása

Ha úgy alakul, hogy 'törött képlinkeket' találsz az oldaladon, egyenként mindet lecserélni fájdalmasan hosszú és kimerítő folyamat lenne. Ez az egyszerű kódrészlet sok fejfájástól megkímélhet:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

Alternatívaként, ha egyszerűen csak el kívánod rejteni ezeket a betölt(het)etlen képeket, ez a kódrészlet gondoskodik róla:

```javascript
$('img').on('error', function () {
  $(this).hide();
});
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Űrlap elküldése AJAX-al

A jQuery AJAX eljárások elterjedt módjai szöveges, HTML, XML vagy JSON állományok lekérésének. Ha egy egyszerű űrlapot kívánsz AJAX-on keresztül elküldeni, a felhasználói bemenetet össze tudod gyűjteni a `val()` eljárás segítségével:

```javascript
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});
```

A `val()` hívások ugyanakkor számításigényesek. Felhasználói input begyűjtésére kedvezőbb módszer a `serialize()` függvény használata, ami ezeket string-ként gyűjti be:

```javascript
$.post('sign_up', $('#sign-up-form').serialize());
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### CSS osztály aktiválása a kurzor hatására

Tegyük fel, hogy egy kattintható elem megjelenését szeretnéd megváltoztatni, amikor egy felhasználó a kurzorával éppen fölötte áll. (:hover)

Elemedhez hozzáadhatsz egy vagy több CSS osztályt ilyen esetekben; amikor a felhasználó arrébb viszi a kurzort, az osztály automatikusan eltávolításra kerül az elemről:

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

Innentől már csak a szükséges CSS-t kell hozzáadnod. Viszont egy _még egyszerűbb_ módszerért használhatod a `toggleClass` eljárást is:

```javascript
$('.btn').on('hover', function () {
  $(this).toggleClass('hover');
});
```

**Megjegyzés:** a CSS gyorsabb megoldás lehet ebben az esetben, mindazonáltal érdemes tudnod róla, hogy ilyet is lehet.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Beviteli mezők kikapcsolása

Alkalmanként előfordulhat, hogy érdekedben áll kikapcsolni a "küldés" gombot egy űrlapon, vagy letiltani egy vagy több szövegbeviteli mezőt, amíg a felhasználó végre nem hajt egy bizonyos akciót (pl. bepipálja az "elolvastam a felhasználói feltételeket" jelölőnégyzetet). Adj hozzá egy `disabled` tulajdonságot a beviteli mezőidhez, így kedved szerint (de)aktiválhatod őket:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

Nem kell mást tenned, mint újra futtatni a `prop` eljárást az adott beviteli mező(kö)n, ezúttal `false` értékkel:

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Linkbetöltés megállítása

Sometimes you don't want links to go to a certain web page nor reload the page; you might want them to do something else like trigger some other script. This will do the trick of preventing the default action:

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### jQuery kiválasztók eltárolása

Think of how many times you write the same selector over and over again in any project. Every `$('.element')` selector has to search the entire DOM each time, regardless if that selector had previously run. Instead, run the selector once and store the results in a variable:

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

Caching jQuery selectors are an easy performance gain.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Áttűnés/becsúszás effekt rögzítése

Sliding and fading are something we use plenty in our animations with jQuery. You might just want to show an element when a user clicks something, which makes the `fadeIn` and `slideDown` methods perfect. But if you want that element to appear on the first click and then disappear on the second this will work just fine:

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

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Egyszerű accordion (harmonika-menü)

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

By adding this script all you really needs to do on your web page is the necessary HTML go get this working.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### HTML div elemek egyező magassággal

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

**Note:** This can be done several ways [in CSS](http://codepen.io/AllThingsSmitty/pen/KMPqoO) but depending on what your needs are, knowing how to do this in jQuery is still worthwhile.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Külső linkek megnyitása új fülön/ablakban

Open external links in a new browser tab or window and ensure links on the same origin open in the same tab or window:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Note:** `window.location.origin` doesn't work in IE10. [This fix](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) takes care of the issue.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Elemek keresése szöveg alapján

By using the `contains()` selector in jQuery you can find text in content of an element. If text doesn't exists, that element will be hidden:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Script aktiválás láthatóság változása esetén

Trigger JavaScript when the user is no longer focusing on a tab, or refocuses on a tab:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### AJAX hívások hibakezelése

When an Ajax call returns a 404 or 500 error the error handler will be executed. If the handler isn't defined, other jQuery code might not work anymore. Define a global Ajax error handler:

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Plugin hívások láncolása

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

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Listaelemek sorba rendezése ABC szerint

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

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Jobb egérkattintás kikapcsolása

If you want to disable right-click, you can do it for an entire page...

```javascript
$(document).ready(function() {
  $(document).bind('contextmenu', function(e) {
    return false;
  })
})
```

...but you can also do the same for a specific element:

```javascript
$(document).ready(function() {
  $('#submit').bind('contextmenu', function(e) {
    return false;
  })
})
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


## Támogatás



A Chrome, Firefox, Safari, Opera, Edge és IE11 böngészők jelenlegi verziói.


## További fordítások

* [Español](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/es-ES)
* [Français](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/fr-FR)
* [Pусский](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/ru-RU)
* [简体中文](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/zh-CN)
* [繁體中文](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/zh-TW)
