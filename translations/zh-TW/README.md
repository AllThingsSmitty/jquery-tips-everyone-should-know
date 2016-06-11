# 大家都應該知道的jQuery小技巧 [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

一些簡單的小技巧讓您對JQuery更得心應手。

> 也可以看看由 [@sindresorhus](https://github.com/sindresorhus/) 整理，一些其他很不錯的清單集合： [awesome lists](https://github.com/sindresorhus/awesome/).


## 目錄

* [技巧](#tips)
* [瀏覽器支援](#support)
* [翻譯](#translations)
* [貢獻守則](CONTRIBUTING.md)


## 技巧

1. [檢查jQuery是否成功載入](#checking-if-jquery-loaded)
1. [使用 `.on()` 做Binding，而不要使用 `.click()`](#use-on-binding-instead-of-click)
1. [返回最頂端的按鈕](#back-to-top-button)
1. [預先載入圖片](#preload-images)
1. [檢查圖片是否成功載入](#checking-if-images-are-loaded)
1. [自動修復壞掉的圖片](#fix-broken-images-automatically)
1. [透過Hover切換Class](#toggle-classes-on-hover)
1. [讓 inupt field 無法輸入](#disabling-input-fields)
1. [停止載入連結](#stop-the-loading-of-links)
1. [Cache jQuery 選擇器](#cache-jquery-selectors)
1. [切換 Fade/Slide](#toggle-fadeslide)
1. [簡單可收放元件（accordion）](#simple-accordion)
1. [使兩個Div一樣高](#make-two-divs-the-same-height)
1. [在新分頁/視窗開啟外部連結](#open-external-links-in-new-tabwindow)
1. [利用文字找到元素](#find-element-by-text)
1. [觸發 Visibility 改變](#trigger-on-visibility-change)
1. [Ajax 程序的錯誤處理](#ajax-call-error-handling)
1. [串連 Plugin 的呼叫](#chain-plugin-calls)
1. [照字母順序排清單元素（list）](#sort-list-items-alphabetically)


### 檢查jQuery是否成功載入

在你使用JQuery做任何事情之前，你應該先確定其是否成功載入：

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```


<sup>[回到目錄](#table-of-contents)</sup>


### 使用 `.on()` 做Binding，而不要使用 `.click()`

使用 `.on()` 比起使用 `.click()` 多了一些好處，像是可以加上數個 events...

```javascript
.on('click tap hover')
```

...這樣的連結（binding）也會對動態產生的元素產生效用（不需要每產生一個DOM element就做一次連結)...

...還能夠使用命名空間（namespace）:

```javascript
.on('click.menuOpening')
```

命名空間讓你能取消對特定event的連結（例如： `.off('click.menuOpening')`）。

<sup>[回到目錄](#table-of-contents)</sup>


### 返回最頂端的按鈕

利用JQuery中 `animate` 以及 `scrollTop` 的函式， 你不需要外加特別的插件來完成「返回最頂端」的功能：

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

改變 `scrollTop` 的數值可以改變你希望捲軸停在哪裡， 你正在做的事情是將文件捲動到頂端的動作使用`Animate()`變成使用800毫秒完成的過程。

**注意:** 看看一些使用 `scrollTop` 而導致的[奇怪行為](https://github.com/jquery/api.jquery.com/issues/417) 。

<sup>[回到目錄](#table-of-contents)</sup>


### 預先載入圖片

如果你的網頁有很多圖片並非一開始就是看得到的（例如：hover才會看到），讓這些圖片預先載入是很合理的：

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[回到目錄](#table-of-contents)</sup>


### 檢查圖片是否成功載入

有時候你會想要確定圖片是否成功載入後再執行接下來的動作：

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

你也可以透過替換 `<img>` 成其他 ID 或 class 來檢查特定圖片。

<sup>[回到目錄](#table-of-contents)</sup>


### 自動修復壞掉的圖片

如果你覺得一個一個替換掉壞掉的圖片連結很痛苦，這段程式碼可以讓你不會這麼頭痛：

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

甚至你沒有任何壞掉的圖片連結，這段程式碼也不會帶來什麼壞影響。

<sup>[回到目錄](#table-of-contents)</sup>


### 透過Hover切換Class

如果說你想要在一個可點擊元件的外貌被hover過的時候改變他的外貌，你可以在使用者在Hover時加上一個class，當使用者停止Hover時就移除該class：

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

你只要加上必要的CSS即可。如果你想要使用更簡單的方法，使用`toggleClass`函式：

```javascript
$('.btn').on('hover', function () {
  $(this).toggleClass('hover');
});
```

**注意:** 使用CSS可能是更快的解決方法，但是這個方法還是值得我們學習。

<sup>[回到目錄](#table-of-contents)</sup>


### 讓 inupt field 無法輸入

常常你會希望在使用者進行一些特定動作前， input field 是無法輸入，或是一個 form 的 submit 按鈕是無法點擊的。（例如：點選「我已經閱讀條約。」的checkbox），在 input 加上`disabled`的屬性你就能夠在你想要時開啟權限：

```javascript
$('input[type="submit"]').prop('disabled', true);
```

你只需要再執行一次`prop`函式，不過是將`disabled` 的數值設成 `false`：

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[回到目錄](#table-of-contents)</sup>


### 停止載入連結

有時候你不想讓連結連至特定網站或是重新載入頁面，你可能想要讓他們做一些其他行為，例如：觸發其他程序，以下將會避免預設的行為發生：

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[回到目錄](#table-of-contents)</sup>


### Cache jQuery 選擇器

想想看你在同一個專案中寫了多少次樣的選擇器，每一個`$('.element')`選擇器每一次都會搜尋整個DOM，不管該選擇器是否在之前執行過。因此，執行一次選擇器並且將結果存在變數中：

```javascript
var blocks = $('#blocks').find('li');
```

現在你能夠在任何地方使用`blocks`變數而不用每一次都搜尋整個DOM：

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```

Caching jQuery selectors 是能夠簡單增進效能的行為。

<sup>[回到目錄](#table-of-contents)</sup>


### 切換 Fade/Slide

Sliding 以及 fading 是我們經常使用JQuery來完成的動畫效果。你可能只是想要在使用者點擊某個東西時秀出一個元件，此時 `fadeIn` 以及 `slideDown` 就是你的最佳選擇。如果你想要讓元件在第一次點擊時現身，並且在第二次點擊時消失，以下也可以很好地實現：


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

<sup>[回到目錄](#table-of-contents)</sup>


### 簡單可收放元件（accordion）

這是一個簡單實現可收放元件（accordion）的做法：

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

加上這段程式碼後，你要做的只剩下加上必要的HTML即可。

<sup>[回到目錄](#table-of-contents)</sup>


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

**Note:** This can be done several ways [in CSS](http://codepen.io/AllThingsSmitty/pen/KMPqoO) but depending on what your needs are, knowing how to do this in jQuery is still worthwhile.

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

<sup>[back to table of contents](#table-of-contents)</sup>


### Ajax Call Error Handling

When an Ajax call returns a 404 or 500 error the error handler will be executed. If the handler isn't defined, other jQuery code might not work anymore. Define a global Ajax error handler:

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


## 瀏覽器支援

Current versions of Chrome, Firefox, Safari, Opera, Edge, and IE11.


## 翻譯

* [Español](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/es-ES)
* [Français](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/fr-FR)
* [русский](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/ru-RU)
* [简体中文](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/zh-CN)
* [繁體中文](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/tree/master/translations/zh-TW)
