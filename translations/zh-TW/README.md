# 大家都應該知道的 jQuery 小技巧 [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

一些簡單的小技巧讓您對 jQuery 更得心應手。

> 也可以看看由 [@sindresorhus](https://github.com/sindresorhus/) 整理，一些其他很不錯的清單集合： [awesome lists](https://github.com/sindresorhus/awesome/).


## 目錄

* [技巧](#技巧)
* [瀏覽器支援](#瀏覽器支援)
* [貢獻守則](../../CONTRIBUTING.md)


## 技巧

1. [使用 `noConflict()`](#使用-noconflict)
1. [檢查 jQuery 是否成功載入](#檢查-jquery-是否成功載入)
1. [檢查元素是否存在](#檢查元素是否存在)
1. [使用 `.on()` 做 Binding，而不要使用 `.click()`](#使用-on-做-binding而不要使用-click)
1. [返回最頂端的按鈕](#返回最頂端的按鈕)
1. [預先載入圖片](#預先載入圖片)
1. [檢查圖片是否成功載入](#檢查圖片是否成功載入)
1. [自動修復載入失敗的圖片](#自動修復載入失敗的圖片)
1. [發布的AJAX表單](#post-a-form-with-ajax)
1. [透過 Hover 切換 Class](#透過-hover-切換-class)
1. [讓 input field 無法輸入](#讓-input-field-無法輸入)
1. [停止載入連結](#停止載入連結)
1. [快取 jQuery 選擇器](#快取-jquery-選擇器)
1. [切換 Fade/Slide](#切換-fadeslide)
1. [簡單可收放元件(Accordion)](#簡單可收放元件accordion)
1. [使兩個 Div 一樣高](#使兩個-div-一樣高)
1. [在新分頁/視窗開啟外部連結](#在新分頁視窗開啟外部連結)
1. [利用文字找到元素](#利用文字找到元素)
1. [Visibility 改變時觸發事件](#visibility-改變時觸發事件)
1. [Ajax 程序的錯誤處理](#ajax-程序的錯誤處理)
1. [串連 Plugin 的函式呼叫](#串連-plugin-的函式呼叫)
1. [照字母順序排序清單元素（list）](#照字母順序排清單元素list)
1. [禁用右键单击](#禁用右键单击)
1. [停用右鍵](#停用右鍵)


### 使用 `noConflict()`

其他JavaScript库也使用jQuery使用的`$`别名。 为了确保jQuery不会与不同库的`$`对象发生冲突，请在文档的开头使用`noConflict()`方法：

```javascript
jQuery.noConflict();
```

现在，您将使用`jQuery`变量名称而不是`$`来引用jQuery对象（例如`jQuery('div p').hide()`）。如果你在同一页面上有多个jQuery版本，你可以使用`noConflict（）`来设置一个特定版本的别名：

```javascript
let $x = jQuery.noConflict();
```

<sup>[回到目錄](#目錄)</sup>


### 檢查 jQuery 是否成功載入

在你使用 jQuery 做任何事情之前，你應該先確定其是否成功載入：

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

<sup>[回到目錄](#目錄)</sup>


### 檢查元素是否存在

在使用HTML元素之前，您需要確保它是DOM的一部分。

```javascript
if ($("#selector").length) {
  //do something with element
}
```

<sup>[回到目錄](#目錄)</sup>


### 使用 `.on()` 做 Binding，而不要使用 `.click()`

使用 `.on()` 比起使用 `.click()` 多了一些好處，像是可以加上多個事件(events)...

```javascript
.on('click tap hover')
```

...這樣的連結（binding）也會對動態產生的元素產生效用（不需要每產生一個 DOM element 就做一次連結)...

...還能夠使用命名空間（namespace）:

```javascript
.on('click.menuOpening')
```

命名空間讓你能取消對特定事件(event)的連結（例如： `.off('click.menuOpening')`）。

<sup>[回到目錄](#目錄)</sup>


### 返回最頂端的按鈕

利用 jQuery 中 `animate` 以及 `scrollTop` 的函式， 你不需要外加特別的插件來完成「返回最頂端」的功能：

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

改變 `scrollTop` 的數值可以改變你希望捲軸停在哪裡，而你實際上是使用 `animate()` 函式以動畫的方式並花費 800 毫秒的時間滾動到文件的頂端。

**注意:** 看看一些使用 `scrollTop` 而導致的[奇怪行為](https://github.com/jquery/api.jquery.com/issues/417) 。

<sup>[回到目錄](#目錄)</sup>


### 預先載入圖片

如果你的網頁有很多圖片並非一開始就是看得到的（例如：hover 才會看到），讓這些圖片預先載入是很合理的：

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[回到目錄](#目錄)</sup>


### 檢查圖片是否成功載入

有時候你會想要確定圖片是否成功載入後再執行接下來的動作：

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

你也可以透過替換 `<img>` 成其他 ID 或 class 來檢查特定圖片。

<sup>[回到目錄](#目錄)</sup>


### 自動修復載入失敗的圖片

如果你覺得一個一個替換掉載入失敗的圖片連結很痛苦，這段程式碼可以讓你不會這麼頭痛：

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

另外，如果你想简单地隐藏破碎的形象这个片段将利用该护理：

```javascript
$('img').on('error', function () {
  $(this).hide();
});
```

<sup>[回到目錄](#目錄)</sup>


<div id="post-a-form-with-ajax"></div>
### 發布的AJAX表單

jQuery的AJAX方法來請求文本，HTML，XML或JSON的常用方法。如果你想通過AJAX發送的形式，你可以通過`val()`方法收集用戶輸入：

```javascript
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});
```

然而，所有這些`val()`調用的是昂貴的。收集用戶輸入的一個更好的辦法是使用CSS`（）`函數，它收集用戶輸入一個字符串：

```javascript
$.post('sign_up', $('#sign-up-form').serialize());
```

<sup>[回到目錄](#目錄)</sup>


### 透過 Hover 切換 Class

如果說你想要在一個可點擊元件的外貌被 hover 過的時候改變他的外貌，你可以在使用者 hover 時加上一個 class，當使用者停止 hover 時就移除該 class：

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

你只要加上必要的 CSS 即可。如果你想要使用更簡單的方法，可以使用 `toggleClass` 函式：

```javascript
$('.btn').on('hover', function () {
  $(this).toggleClass('hover');
});
```

**注意:** 使用 CSS 可能是更快的解決方法，但是這個方法還是值得我們學習。

<sup>[回到目錄](#目錄)</sup>


### 讓 input field 無法輸入

常常你會希望在使用者進行一些特定動作前， input field 是無法輸入，或是一個 form 的 submit 按鈕是無法點擊的。（例如：點選「我已經閱讀條約。」的checkbox），在 input 加上 `disabled` 的屬性你就能夠在你想要時開啟權限：

```javascript
$('input[type="submit"]').prop('disabled', true);
```

你只需要再執行一次 `prop` 函式，不過是將 `disabled` 的數值設成 `false`：

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[回到目錄](#目錄)</sup>


### 停止載入連結

有時候你不想讓連結連至特定網站或是重新載入頁面，你可能想要讓他們做一些其他行為，例如：觸發其他程式，以下將會避免預設的行為發生：

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[回到目錄](#目錄)</sup>


### 快取 jQuery 選擇器

想想看你在同一個專案中寫了多少次樣的選擇器，每一個 `$('.element')` 選擇器每一次都會搜尋整個 DOM，不管該選擇器是否在之前執行過。因此，執行一次選擇器並且將結果存在變數中：

```javascript
var blocks = $('#blocks').find('li');
```

現在你能夠在任何地方使用 `blocks` 變數而不用每一次都搜尋整個DOM：

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```

快取 jQuery 選擇器是能夠簡單又能增進效能的小技巧。

<sup>[回到目錄](#目錄)</sup>


### 切換 Fade/Slide

Sliding 以及 fading 是我們經常使用 jQuery 來完成的動畫效果。你可能只是想要在使用者點擊某個東西時秀出一個元件，此時 `fadeIn` 以及 `slideDown` 就是你的最佳選擇。如果你想要讓元件在第一次點擊時現身，並且在第二次點擊時消失，以下程式碼也可以很好地實現這個效果：


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

<sup>[回到目錄](#目錄)</sup>


### 簡單可收放元件(Accordion)

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

加上這段程式碼後，你要做的只剩下加上必要的 HTML 即可。

<sup>[回到目錄](#目錄)</sup>


### 使兩個 Div 一樣高

有時候不論兩個 Div 裡面的內容為何，你會希望他們有同樣的高度：

```javascript
$('.div').css('min-height', $('.main-div').height());
```

這個例子設定 `min-height`，表示其只能比 `.main-div` 的 `height` 大，永遠不會比它小。然而，在一組元素中循環並將各元素之 `height` 調整至最高的元素高度為另一種更彈性的方法：

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

如果你希望每一行都有同樣高度：

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

**注意:** 這件事可以使用幾種方法完成，[使用 CSS](http://codepen.io/AllThingsSmitty/pen/KMPqoO) 這跟你的需求有關，但也值得知道如何使用 jQuery完成。

<sup>[回到目錄](#目錄)</sup>


### 在新分頁/視窗開啟外部連結

在瀏覽器新的分頁或視窗中開啟新的外部連結，並且確定同樣 host 的連結會在同樣的分頁或視窗開啟：

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**注意:** `window.location.origin` 在 IE 10 中無效。[這個方法](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) 可以解決這個問題。

<sup>[回到目錄](#目錄)</sup>


### 利用文字找到元素

利用 jQuery 中 `contains()` 選擇器，你可以找到元素內容中的文字。如果沒有文字，該元素會被隱藏：

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[回到目錄](#目錄)</sup>


### Visibility 改變時觸發事件

當使用者不再停留在某分頁，或是重新停留在某分頁，觸發 JavaScript：

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```

<sup>[回到目錄](#目錄)</sup>


### Ajax 程序的錯誤處理

當一個 Ajax 程序呼叫後回傳 404 或是 500 錯誤，錯誤處理程序將會被執行。如果沒有定義錯誤處理程序，其他 jQuery 的程式碼可能不會運作。定義一個全域 Ajax 錯誤處理程序：

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[回到目錄](#目錄)</sup>


### 串連 Plugin 的函式呼叫

jQuery 允許「串連」 plugin 函式的呼叫來減少重複搜尋 DOM 以及產生多個 jQuery 物件。以下的程式碼展示了 plugin 函式的呼叫：

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

可以利用串連來改進：

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

另外一種方法是利用一個變數來快取(cache)一個元素（在變數前面加上 `$`）：

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

jQuery 中串連以及[快取](#cache-jquery-selectors)的方法是最簡潔且最快速的實作方式。

<sup>[回到目錄](#目錄)</sup>


### 照字母順序排清單元素（list）

如果在清單中有太多元素，或許其內容是被ㄧ CMS 所製造的且你希望照字母順序來排序：

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

就是這樣！

<sup>[回到目錄](#目錄)</sup>

### 停用右鍵

如果要停用右鍵，您可以對整個頁面這麼做...

```javascript
$(document).ready(function () {
  $(document).bind('contextmenu', function (e) {
    return false;
  })
})
```

...而您也可以為特定元素做同樣的事情：

```javascript
$(document).ready(function () {
  $('#submit').bind('contextmenu', function (e) {
    return false;
  })
})
```

<sup>[回到目錄](#目錄)</sup>


## 瀏覽器支援

現今版本的 Chrome，Firefox，Safari，Opera，Edge 以及 IE11。

<sup>[回到目錄](#目錄)</sup>
