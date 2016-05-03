# jQuery Советы должен знать каждый [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Коллекция простых советов, чтобы помочь вашей игре jQuery.

> Для других больших списков проверить [@sindresorhus](https://github.com/sindresorhus/~~HEAD=dobj) в Куратор список [удивительных списков](https://github.com/sindresorhus/awesome/).


<div id="table-of-contents"></div>
## Содержание

* [Советы](#советы)
* [Поддержка](#поддержка)
* [Вклад Руководство](../../CONTRIBUTING.md)


## Советы

1. [Проверка Если jQuery Loaded](#checking-if-jquery-loaded)
1. [Вернуться к началу Button](#back-to-top-button)
1. [Предварительная загрузка изображений](#preload-images)
1. [Проверка Если изображения загружаются](#checking-if-images-are-loaded)
1. [Автоматически исправлять сломанные изображения](#fix-broken-images-automatically)
1. [Переключение Классы по наведению](#toggle-classes-on-hover)
1. [Отключение поля ввода](#disabling-input-fields)
1. [Прервать загрузку Ссылки](#stop-the-loading-of-links)
1. [Кэш jQuery селекторы](#cache-jquery-selectors)
1. [Переключить увядать / Слайд](#toggle-fadeslide)
1. [Простой Аккордеон](#simple-accordion)
1. [Сделайте два Divs той же высоте](#make-two-divs-the-same-height)
1. [Открытые внешние ссылки в новой вкладке / окне](#open-external-links-in-new-tabwindow)
1. [Найти элемент По тексту](#find-element-by-text)
1. [Запуск по изменению видимости](#trigger-on-visibility-change)
1. [Ajax вызовов Обработка ошибок](#ajax-call-error-handling)
1. [Сеть плагин Вызовы](#chain-plugin-calls)
1. [Сортировка элементов списка по алфавиту](#sort-list-items-alphabetically)


<div id="checking-if-jquery-loaded"></div>
### Проверка Если jQuery Loaded

Перед тем, как можно сделать что-нибудь с jQuery в первую очередь необходимо убедиться в том, что загружен:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

Теперь вы с ...

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="back-to-top-button"></div>
### Вернуться к началу Button

С помощью `animate` и методы `scrollTop` в jQuery вам не нужен плагин, чтобы создать простую анимацию прокрутки-вверх:

```javascript
// Back to top
$('.top').click(function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});
```

```html
<!-- Create an anchor tag -->
<a class="top" href="#">Back to top</a>
```

Изменение изменения значений `scrollTop` где хочет полоса прокрутки на землю. Все, что вы действительно делаете, оживляющий тело документа на протяжении 800 миллисекунд, пока не прокручивается в верхней части документа.

**Примечание:** Часы для некоторого [поведение багги](https://github.com/jquery/api.jquery.com/issues/417) с `scrollTop`.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="preload-images"></div>
### Предварительная загрузка изображений

Если ваш веб-страница использует много изображений, которые не видны изначально (например, при наведении курсора мыши), имеет смысл предварительно загрузить их:

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="checking-if-images-are-loaded"></div>
### Проверка Если изображения загружаются

Иногда вам может понадобиться, чтобы проверить, если ваши изображения будут полностью загружены, чтобы продолжить с вашими сценариями:

```javascript
$('img').load(function () {
  console.log('image load successful');
});
```

Вы также можете проверить, если один конкретный образ загружен, заменив `<img>` тег с идентификатором или класса.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="fix-broken-images-automatically"></div>
### Автоматически исправлять сломанные изображения

Если вам посчастливилось найти неработающие ссылки изображение на вашем сайте заменяя их один за другим может быть боль. Этот простой фрагмент кода может сэкономить много головной боли:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

Даже если у вас нет каких-либо неработающие ссылки, добавив, что это не будет никакого вреда.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="toggle-classes-on-hover"></div>
### Переключение Классы по наведению

Допустим, вы хотите изменить визуальный интерактивными элемент на странице, когда пользователь парит над ним. Вы можете добавить класс к вашему элементу, когда пользователь парит; когда пользователь прекращает зависания удаляет класс:

```javascript
$('.btn').hover(function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

Вам просто нужно добавить необходимые CSS. Если вы хотите еще _simpler_ способ использовать метод `toggleClass`:

```javascript
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```

**Примечание:** CSS может быть более быстрым решением в этом случае, но она по-прежнему стоит знать об этом.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="disabling-input-fields"></div>
### Отключение поля ввода

Иногда вы можете захотеть кнопку отправки формы или одного из его текстовых материалов, которые будут отключены до тех пор, пока пользователь не выполнил определенное действие (например, проверка "Я прочитал термины" флажок). Добавьте атрибут `disabled` на ваш вход, так что вы можете включить его, когда вы хотите:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

Все, что вам нужно сделать, это запустить метод `prop` снова на входе, но установите значение `disabled` к `false`:

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="stop-the-loading-of-links"></div>
### Прервать загрузку Ссылки

Иногда вы не хотите, чтобы ссылки перехода на определенную веб-страницу и не перезагрузите страницу; Вы могли бы хотеть, чтобы они делали что-то еще, как спусковой крючок какой-либо другой сценарий. Это будет делать трюк предотвращения действия по умолчанию:

```javascript
$('a.no-link').click(function (e) {
  e.preventDefault();
});
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="cache-jquery-selectors"></div>
### Кэш jQuery селекторы

Подумайте, сколько раз вы пишете один и тот же селектор снова и снова в любом проекте. Каждый `$('.element')` селектор имеет для поиска по всему DOM каждый раз, независимо от того, что селектор ранее бежать. Вместо этого запустите селектор один раз и сохранить результаты в переменной:

```javascript
var blocks = $('#blocks').find('li');
```

Теперь вы можете использовать `blocks` переменную туда, куда вы хотите, без необходимости искать DOM-каждый раз, когда:

```javascript
$('#hideBlocks').click(function () {
  blocks.fadeOut();
});

$('#showBlocks').click(function () {
  blocks.fadeIn();
});
```

Кэширование jQuery селекторы легкий выигрыш в производительности.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="toggle-fadeslide"></div>
### Переключить увядать / Слайд

Раздвижные и замирания являются чем-то мы используем много в нашей анимации с jQuery. Вы можете просто хотите, чтобы показать элемент, когда пользователь нажимает что-то, что делает `fadeIn` и методы `slideDown` совершенным. Но если вы хотите этот элемент, чтобы появиться на первый щелчок, а затем исчезают на второй это будет работать просто отлично:

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

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="simple-accordion"></div>
### Простой Аккордеон

Это простой метод для быстрого аккордеона:

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

Добавив этот сценарий все, что вам действительно нужно сделать на вашей веб-странице необходимый HTML пойти получить эту работу.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="make-two-divs-the-same-height"></div>
### Сделайте два Divs той же высоте

Иногда вы будете хотеть две дивы, чтобы иметь такую же высоту, независимо от того, какое содержание они имеют в них:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

В этом примере задается `min-height`, что означает, что она может быть больше, чем основной DIV, но никогда меньше. Тем не менее, более гибкий метод должен был бы петлю над множеством элементов и установить высоту до высоты самого высокого элемента:

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

Если вы хотите _все_ столбцы имеют одинаковую высоту:

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="open-external-links-in-new-tabwindow"></div>
### Открытые внешние ссылки в новой вкладке / окне

Открыть внешние ссылки в новой вкладке браузера или окна и обеспечить ссылки на того же происхождения, открытой в той же вкладке или окне:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Примечание:** `window.location.origin` не работает в IE10. [Это исправление](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) заботится о выпуске.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="find-element-by-text"></div>
### Найти элемент По тексту

При использовании `contains()` селектор в jQuery вы можете найти текст в содержимом элемента. Если текст не существует, то этот элемент будет скрыт:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="trigger-on-visibility-change"></div>
### Запуск по изменению видимости

Запуск JavaScript, когда пользователь больше не фокусируясь на вкладке или перефокусирует на вкладке:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="ajax-call-error-handling"></div>
### Ajax вызовов Обработка ошибок

Когда вызов Ajax возвращает ошибку 404 или 500 обработчик ошибок будет выполняться. Если обработчик не определен, другой код jQuery может не работать больше. Определить глобальный обработчик ошибок Ajax:

```javascript
$(document).ajaxError(function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="chain-plugin-calls"></div>
### Сеть плагин Вызовы

jQuery позволяет "сцеплению" плагина метод вызывает смягчить процесс неоднократно запрашивая DOM и создания нескольких объектов jQuery. Скажем, следующий фрагмент кода представляет ваш метод плагин вызовов:

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

Это может быть значительно улучшена с помощью цепочки:

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

Альтернативой является кэшировать элемент в переменной (с приставкой `$`):

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

Обе цепочки и [кэширования](#cache-jquery-selectors) методы в jQuery являются лучшие практики, которые приводят к более коротким и более быстрый код.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="sort-list-items-alphabetically"></div>
### Сортировка элементов списка по алфавиту

Допустим, вы в конечном итоге с слишком много элементов в списке. Может быть, содержание производится с помощью CMS и вы хотите заказать их в алфавитном порядке:

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

Там вы идете!

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


## Support

Текущие версии Chrome, Firefox, Safari, Opera, Edge, и IE11.