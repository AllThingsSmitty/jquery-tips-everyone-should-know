# jQuery tippek, amiket mindenkinek tudni érdemes [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Egyszerű tippek gyűjteménye, a jQuery-ben való elmélyülésed  segítendő.

> További nagyszerű listákért tekintsd meg [@sindresorhus](https://github.com/sindresorhus/) válogatott [listáját](https://github.com/sindresorhus/awesome/).

## Tartalomjegyzék

* [Tippek](#tippek)
* [Támogatás](#t%C3%A1mogat%C3%A1s)
* [További fordítások](#tov%C3%A1bbi-ford%C3%ADt%C3%A1sok)
* [Közreműködési útmutató (angolul)](../../CONTRIBUTING.md)


## Tippek

1. [Betöltött-e a jQuery? - Ellenőrzés](#bet%C3%B6lt%C3%B6tt-e-a-jquery---ellen%C5%91rz%C3%A9s)
1. [`.on()` binding ("kötés") használata `.click()` helyett](#on-binding-k%C3%B6t%C3%A9s-haszn%C3%A1lata-click-helyett)
1. ['Vissza az elejére' gomb](#vissza-az-elej%C3%A9re-gomb)
1. [Képek előbetöltése](#k%C3%A9pek-el%C5%91bet%C3%B6lt%C3%A9se)
1. [Betöltöttek-e a képek? - Ellenőrzés](#bet%C3%B6lt%C3%B6ttek-e-a-k%C3%A9pek---ellen%C5%91rz%C3%A9s)
1. [Betölt(het)etlen képek automatikus javítása](#bet%C3%B6lthetetlen-k%C3%A9pek-automatikus-jav%C3%ADt%C3%A1sa)
1. [Űrlap elküldése AJAX-al](#%C5%B1rlap-elk%C3%BCld%C3%A9se-ajax-al)
1. [CSS osztály aktiválása a kurzor hatására](#css-oszt%C3%A1ly-aktiv%C3%A1l%C3%A1sa-a-kurzor-hat%C3%A1s%C3%A1ra)
1. [Beviteli mezők kikapcsolása](#beviteli-mez%C5%91k-kikapcsol%C3%A1sa)
1. [Linkbetöltés megállítása](#linkbet%C3%B6lt%C3%A9s-meg%C3%A1ll%C3%ADt%C3%A1sa)
1. [jQuery kiválasztók eltárolása](#jquery-kiv%C3%A1laszt%C3%B3k-elt%C3%A1rol%C3%A1sa)
1. [Áttűnés/becsúszás effekt rögzítése](#%C3%A1tt%C5%B1n%C3%A9sbecs%C3%BAsz%C3%A1s-effekt-r%C3%B6gz%C3%ADt%C3%A9se)
1. [Egyszerű accordion (harmonika-menü)](#egyszer%C5%B1-accordion-harmonika-men%C3%BC)
1. [HTML div elemek egyező magassággal](#html-div-elemek-egyez%C5%91-magass%C3%A1ggal)
1. [Külső linkek megnyitása új fülön/ablakban](#k%C3%BCls%C5%91-linkek-megnyit%C3%A1sa-%C3%BAj-f%C3%BCl%C3%B6nablakban)
1. [Elemek keresése szöveg alapján](#elemek-keres%C3%A9se-sz%C3%B6veg-alapj%C3%A1n)
1. [Script aktiválás láthatóság változása esetén](#script-aktiv%C3%A1l%C3%A1s-l%C3%A1that%C3%B3s%C3%A1g-v%C3%A1ltoz%C3%A1sa-eset%C3%A9n)
1. [AJAX hívások hibakezelése](#ajax-h%C3%ADv%C3%A1sok-hibakezel%C3%A9se)
1. [Plugin hívások láncolása](#plugin-h%C3%ADv%C3%A1sok-l%C3%A1ncol%C3%A1sa)
1. [Listaelemek sorba rendezése ABC szerint](#listaelemek-sorba-rendez%C3%A9se-abc-szerint)
1. [Jobb egérkattintás kikapcsolása](#jobb-eg%C3%A9rkattint%C3%A1s-kikapcsol%C3%A1sa)

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

Alkalmanként előfordulhat, hogy egy linkre kattintva nem kívánsz se betölteni egy bizonyos weboldalt, se ugyanazt az oldalt újra, hanem valami másra kell, mint például valami más script aktiválása. Ez a kód megelőzi az alapértelmezett akció lefutását:

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### jQuery kiválasztók eltárolása

Gondolj bele, milyen sokszor kellett ugyanazt a kiválasztót (selector) leírnod újra meg újra. Minden `$('.elem')` kiválasztó újra meg újra végig kell böngéssze a teljes DOM-ot akárhányszor meghívod - függetlenül attól, hogy az a kiválasztó egyszer volt-e már futtatva. Szóval helyette futtasd a kiválasztót egyszer, és tárold el az eredményét egy változóban:

```javascript
var blocks = $('#blocks').find('li');
```

Most már használhatod s `blocks` változót akárhányszor csak akarod, anélkül, hogy a DOM-ot át kelljen böngészni érte:

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```
A jQuery kiválasztók eltárolása egy roppant egyszerű teljesítményjavító technika.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Áttűnés/becsúszás effekt rögzítése

A becsúszások és az áttűnések olyan tuajdonságok, amiket előszeretettel használunk animációkhoz a jQuery-ben. Lehet, hogy csak akkor szeretnéd láthatóvá tenni az adott elemet, amikor a felhasználó rákattint valamire, amire a `fadeIn` és `slideDown` eljárások tökéletesek. De ha azt szeretnéd, hogy az adott elem első kattintásra felbukkanjon, majd a másodikre eltűnjön, ez pont megfelel a célra:

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

Íme egy egyszerá eljárás egy egyszerű harmonika-menü elkészítésére:

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

Ezen script hozzáadásával már nincs már feladatot hátra a weboldaladon, mint a szükséges HTML elkészítése ahhoz, hogy ezt működésre bírd.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### HTML div elemek egyező magassággal

Néha szükséged lehet arra, hogy két HTML div elem egyforma magas legyen, függetlenül azok belső tartalmától:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

Ez a példa beállít egy `min-height` értéket, ami azt jelenti, hogy a kiválasztott elemnek megengedjük, hogy a fő div-nél nagyobb legyen, de azt nem, hogy kisebb.

Egy rugalmasabb megoldás ciklusban végigmenni elemek egy adott halmazán, és azok közül a legmagasabbéhoz állítani a kérdéses elem magasságát:

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

Ha _minden_ minden oszop magasságát egyformára akarod:

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

**Megjegyzés:** Erre sok megoldás van [CSS-ben](http://codepen.io/AllThingsSmitty/pen/KMPqoO) de a szükségleteidtől függően, érdemes lehet tudni, hogyan is megy ez jQuery-ben.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Külső linkek megnyitása új fülön/ablakban

Külső linkek új böngészőfülön  vagy -ablakban megnyitása, és annak biztosítása, hogy az azonos forrású linkek ugyanabban a fülben/ablakban nyílnak meg:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Megjegyzés:** `window.location.origin` nem működik IE10-ben. [Ez a javítás](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) gondoskodik erről a problémáról.

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Elemek keresése szöveg alapján

A jQuery `contains()` kiválasztójának használatával megtalálhatsz szöveg(részlet)eket egy elem tartalmában. Ez a kód, ha nem talál szöveget az elemben, elrejti azt:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Script aktiválás láthatóság változása esetén

Javascript aktiválásra amikor a felhasználó ellapoz egy fülről, vagy visszalép oda:

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

Amikor egy AJAX hívás HTTP 404 vagy 500 hibával tér vissza, a hibakezelő végrehajtásra kerül. Ha a hibakezelő nincs definiálva, további jQuery kódok potenciálisan működésképtelenné válnak. Definiálj egy globális AJAX hibakezelőt:

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Plugin hívások láncolása

A jQuery lehetővé teszi plugin eljáráshívások "láncolását" a DOM ismételt lekérése folyamatának enyhítésére, valamint több jQuery objektum létrehozására. Tegyük fel, hogy az alábbi kódtöredék jelképezi a plugin eljáráshívásaid:

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

Ekkor igen komoly teljesítményövekedést érhetsz el láncolás használatával:

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

Alternatívaként eltárolhatod az elemet egy változóban (`$` előtaggal):

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

Mind a láncolás, mint az [eltárolás](#cache-jquery-selectors) eljárásai "legjobb gyakorlatnak" (best practice) tekinthetők jQuery-ben, és rövidebb, gyorsabb kódot eredményeznek. 

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Listaelemek sorba rendezése ABC szerint

Tegyük fel, hogy egy listádban túl sok elem van. Mondjuk a lista tartalma egy CMS által került legenerálásra, és te szeretnéd ezt ABC-sorba rendezni:

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

Meg is volnánk!

<sup>[vissza a tartalomjegyzékhez](#table-of-contents)</sup>


### Jobb egérkattintás kikapcsolása

Ha le szeretnéd tiltani a jobb-klikket, az egész oldalra megteheted...

```javascript
$(document).ready(function() {
  $(document).bind('contextmenu', function(e) {
    return false;
  })
})
```

...de akár egy konkrét elemre is:

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
