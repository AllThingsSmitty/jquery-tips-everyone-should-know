# jQuery的提示大家应该知道 [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

简单的窍门的集合，以帮助您的jQuery的游戏。

> 对于其他大名单退房 [@sindresorhus](https://github.com/sindresorhus/)的策展的名单 [真棒名单](https://github.com/sindresorhus/awesome/).


<div id="table-of-contents"></div>

## 目录

* [温馨提示](#提示)
* [支持](#support)
* [贡献指引](../../CONTRIBUTING.md)


<div id="tips"></div>

## 提示

1. [使用 `noConflict()`](#use-noconflict)
1. [检查是否加载的jQuery](#checking-if-jquery-loaded)
1. [检查元素是否存在](#check-whether-an-element-exists)
1. [使用`.on()`绑定`.click()`代替](#use-on-binding-instead-of-click)
1. [返回顶部按钮](#back-to-top-button)
1. [预先载入图像](#preload-images)
1. [检查，如果图像加载](#checking-if-images-are-loaded)
1. [自动修复破碎的形象](#fix-broken-images-automatically)
1. [发布的AJAX表单](#post-a-form-with-ajax)
1. [悬停切换类](#toggle-classes-on-hover)
1. [禁用输入字段](#disabling-input-fields)
1. [停止路径的负载](#stop-the-loading-of-links)
1. [缓存jquery选择](#cache-jquery-selectors)
1. [淡入淡出切换/幻灯片](#toggle-fadeslide)
1. [简单手风琴](#simple-accordion)
1. [让两个div相同的高度](#make-two-divs-the-same-height)
1. [打开外部链接在新标签/窗口](#open-external-links-in-new-tabwindow)
1. [查找元素通过短信](#find-element-by-text)
1. [可见性改变触发器](#trigger-on-visibility-change)
1. [Ajax调用错误处理](#ajax-call-error-handling)
1. [连锁插件调用](#chain-plugin-calls)
1. [排序列表项按字母顺序](#sort-list-items-alphabetically)
1. [禁用右键单击](#禁用右键单击)


<div id="use-noconflict"></div>

### 使用 `noConflict()`

其他JavaScript庫也使用jQuery使用的`$`別名。 為了確保jQuery不會與不同庫的`$`對象發生衝突，請在文檔的開頭使用`noConflict()`方法：

```javascript
jQuery.noConflict();
```

現在，您將使用`jQuery`變量名稱而不是`$`來引用jQuery對象（例如，`jQuery('div p').hide()`）。如果你在同一頁面上有多個jQuery版本，你可以使用`noConflict（）`來設置一個特定版本的別名：

```javascript
let $x = jQuery.noConflict();
```

<sup>[回目录](#table-of-contents)</sup>


<div id="checking-if-jquery-loaded"></div>

### 检查如果加载的jQuery

之前，你可以使用jQuery做任何事情，你首先需要确保它加载：

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

现在你是关闭...

<sup>[回目录](#table-of-contents)</sup>


<div id="check-whether-an-element-exists"></div>

### 检查元素是否存在

在使用HTML元素之前，您需要确保它是DOM的一部分。

```javascript
if ($("#selector").length) {
  //do something with element
}
```

<sup>[回目录](#table-of-contents)</sup>


<div id="use-on-binding-instead-of-click"></div>

### 使用`.on()`绑定`.click()`代替

使用`.on()`给你几个优点比使用`.click()`，如添加多个事件的能力...

```javascript
.on('click tap hover')
```

...绑定适用于动态创建的元素，以及（有没有必要动态添加到DOM元素每一个元素手动绑定）...

...和可能性来设置一个命名空间:

```javascript
.on('click.menuOpening')
```

命名空间给你解除对特定事件（例如，`.off（'click.menuOpening'）`）的权力。

<sup>[回目录](#table-of-contents)</sup>


<div id="back-to-top-button"></div>

### 返回顶部按钮

通过使用jQuery中的`animate`和`scrollTop`方法，你并不需要一个插件来创建一个简单的滚动到顶部动画：

```javascript
// Back to top
$('.container').on('click', '.back-to-top', function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});
```

```html
<!-- Create an anchor tag -->
<a class="top" href="#">Back to top</a>
```

改变，你想要滚动降落`scrollTop`价值的变化。所有你真的做的是动画文件的全身各处的800毫秒的过程中，直到它滚动到文档的顶部。

**注：** 观看一些 [错误行为](https://github.com/jquery/api.jquery.com/issues/417) 用 `scrollTop`。

<sup>[回目录](#table-of-contents)</sup>


<div id="preload-images"></div>

### 预先载入图像

如果你的网页使用了大量不可见的开始（例如，悬停）图像是有意义的预加载它们：

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[回目录](#table-of-contents)</sup>


<div id="checking-if-images-are-loaded"></div>

### 检查如果图像加载

有时你可能需要检查，如果您的影像出现，以便继续与脚本满载：

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

您也可以检查，如果一个特定的形象已被用一个ID或类替换`<img>`标签加载。

<sup>[回目录](#table-of-contents)</sup>


<div id="fix-broken-images-automatically"></div>

### 自动修复破碎的形象

如果你碰巧发现网站上的残缺的图像链接一个取代他们可以是一个痛苦。这一段简单的代码可以节省很多麻烦：

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

<sup>[回目录](#table-of-contents)</sup>


<div id="post-a-form-with-ajax"></div>

### 发布的AJAX表单

jQuery的AJAX方法来请求文本，HTML，XML或JSON的常用方法。如果你想通过AJAX发送的形式，你可以通过`val()`方法收集用户输入：

```javascript
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});
```

然而，所有这些`val()`调用的是昂贵的。收集用户输入的一个更好的办法是使用'的`serialize()`函数，它收集用户输入一个字符串：

```javascript
$.post('sign_up', $('#sign-up-form').serialize());
```

<sup>[回目录](#table-of-contents)</sup>


<div id="toggle-classes-on-hover"></div>

### 切换悬停类

比方说，你想改变视觉可点击元素的页面上，当用户将鼠标悬停在它。您可以将类添加到你的元素，当用户徘徊;用户停止徘徊时删除类：

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

你只需要添加必要的CSS。如果你想要一个更_simpler_方式使用`toggleClass`方法：

```javascript
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```

**注：** CSS可能在这种情况下，更快的解决方案，但它仍然是值得的知道这一点。

<sup>[回目录](#table-of-contents)</sup>


<div id="disabling-input-fields"></div>

### 禁用输入字段

有时你可能要直到用户执行特定操作（例如，勾选“我已阅读条款”复选框）提交被禁用的形式或它的文本输入中的一个按钮。在`disabled`属性添加到您的输入，所以你可以在需要时启用它：

```javascript
$('input[type="submit"]').prop('disabled', true);
```

所有你需要做的是在输入再次运行`prop`方法，但`disabled`的值设置为`false`：

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[回目录](#table-of-contents)</sup>


<div id="stop-the-loading-of-links"></div>

### 停止路径的负载

有时候，你不想链接到特定网页，也没有重新加载页面;你可能希望他们做别的事情一样触发一些其他的脚本。这将做防止默认操作的技巧：

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[回目录](#table-of-contents)</sup>


<div id="cache-jquery-selectors"></div>

### 高速缓存jquery选择

想想有多少次你一遍又一遍地在任何项目中再次写入相同的选择。每个`$('.element')`选择有每次搜索整个DOM，如果不管选择以前有运行。相反，运行一次选择器和存储在变量的结果：

```javascript
var blocks = $('#blocks').find('li');
```

现在你可以使用任何你想要的`blocks`变量，而不必每次搜索DOM：

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```

缓存jQuery选择器是一种简单的性能增益。

<sup>[回目录](#table-of-contents)</sup>


<div id="toggle-fadeslide"></div>

### 切换淡入/幻灯片

滑动和衰落都是我们用很多东西在我们使用jQuery的动画。你可能只是想表明一个元素，当用户点击的东西，这使得`fadeIn`和`slideDown`方法完善。但是，如果你想要的元素出现在第一次点击，然后消失在第二本会工作得很好：

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

<sup>[回目录](#table-of-contents)</sup>


<div id="simple-accordion"></div>

### 简单手风琴

这是一个快速手风琴一个简单的方法：

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

通过添加这个脚本你真正需要在网页上做的是必要的HTML去得到这个工作。

<sup>[回目录](#table-of-contents)</sup>


<div id="make-two-divs-the-same-height"></div>

### 让两个div相同的高度

有时候，你会想两个div具有相同的高度，无论他们有他们什么内容：

```javascript
$('.div').css('min-height', $('.main-div').height());
```

本示例设置了`min-height`这意味着它可以比主分区越大，但从来没有变小。然而，更灵活的方法是循环在一组的元素，并设置高度最高的元件的高度：

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

如果希望_all_列具有相同的高度：

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

**注：**这是可以做到几个方面[在CSS](http://codepen.io/AllThingsSmitty/pen/KMPqoO)，但根据您的需要是什么，知道如何在jQuery中做到这一点还是值得的。

<sup>[回目录](#table-of-contents)</sup>


<div id="open-external-links-in-new-tabwindow"></div>

### 在新标签中打开外部链接/窗

打开外部链接在新的浏览器标签或窗口，并确保在同一起源于同一个标签或窗口打开链接：

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**注：** `window.location.origin`不IE10工作。 [此修复程序](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) 主罚问题的照顾。

<sup>[回目录](#table-of-contents)</sup>


<div id="find-element-by-text"></div>

### 查找元素通过短信

通过jQuery中使用`contains()`选择，你可以找到在元素内容的文字。如果文本不存在，该元素将被隐藏：

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[回目录](#table-of-contents)</sup>


<div id="trigger-on-visibility-change"></div>

### 上触发能见度变化

触发JavaScript的用户不再集中在选项卡上，或重新调整选项卡上：

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```

<sup>[回目录](#table-of-contents)</sup>


<div id="ajax-call-error-handling"></div>

### AJAX调用错误处理

当Ajax调用返回404或500错误的错误处理程序将被执行。如果没有定义的处理程序，其他的jQuery代码可能就失效了。定义一个全局的Ajax错误处理程序：

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[回目录](#table-of-contents)</sup>


<div id="chain-plugin-calls"></div>

### 连锁插件调用

jQuery的允许“链接”插件的方法调用，以减轻反复查询DOM并创建多个jQuery的对象的过程。比方说，下面的代码片段代表了你的插件方法调用：

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

这可以通过链接可以大大提高：

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

另一种方法是缓存元素的变量（用 `$` 前缀）：


```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

无论链接和jQuery的[缓存](#缓存的jQuery选择器)方法是导致更短，更快的代码的最佳实践。

<sup>[回目录](#table-of-contents)</sup>


<div id="sort-list-items-alphabetically"></div>

### 排序列表项按字母顺序

比方说，你结束了在列表中的项目太多。也许内容是由CMS生成并希望他们字母顺序：

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

你去那里！

<sup>[回目录](#table-of-contents)</sup>


<div id="disable-right-click"></div>

### 禁用右键单击


如果要禁用右键单击，您可以对整个页面进行操作...

```javascript
$(document).ready(function () {
  $(document).bind('contextmenu', function (e) {
    return false;
  })
})
```

...但是您也可以为特定元素做同样的事情：

```javascript
$(document).ready(function () {
  $('#submit').bind('contextmenu', function (e) {
    return false;
  })
})
```

<sup>[回目录](#table-of-contents)</sup>


## 支持

当前版本的Chrome，火狐，Safari，歌剧，EDGE和IE11的。

<sup>[回目录](#table-of-contents)</sup>
