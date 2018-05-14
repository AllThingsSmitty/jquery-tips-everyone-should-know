# Советы по jQuery, которые должен знать каждый [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Коллекция простых советов, чтобы помочь вашей работе с jQuery.

> Другие прекрасные списки, за которыми следит [@sindresorhus](https://github.com/sindresorhus/~~HEAD=dobj), можно увидеть [здесь](https://github.com/sindresorhus/awesome/).


<div id="table-of-contents"></div>

## Содержание

* [Советы](#Советы)
* [Поддержка](#Поддержка)
* [Как сделать вклад](../../CONTRIBUTING.md)


## Советы

1. [Используйте `noConflict()`](#use-noconflict)
1. [Проверка готовности jQuery](#checking-if-jquery-loaded)
1. [Используйте `.on()` вместо `.click()`](#use-on-binding-instead-of-click)
1. [Кнопка "вернуться к началу"](#back-to-top-button)
1. [Предварительная загрузка изображений](#preload-images)
1. [Проверка, загружаются ли изображения](#checking-if-images-are-loaded)
1. [Автоматическое исправление сломанных изображений](#fix-broken-images-automatically)
1. [Дать форму с помощью AJAX](#post-a-form-with-ajax)
1. [Переключение классов по наведению](#toggle-classes-on-hover)
1. [Отключение поля ввода](#disabling-input-fields)
1. [Прерывание загрузки ссылки](#stop-the-loading-of-links)
1. [Кэширование селекторов jQuery](#cache-jquery-selectors)
1. [Переключение fade/slide](#toggle-fadeslide)
1. [Простой аккордеон](#simple-accordion)
1. [Сделать два элемента div одинаковой высотой](#make-two-divs-the-same-height)
1. [Открывать внешние ссылки в новой вкладке или новом окне](#open-external-links-in-new-tabwindow)
1. [Найти элемент по тексту](#find-element-by-text)
1. [Запуск по изменению видимости](#trigger-on-visibility-change)
1. [Обработка ошибок в AJAX-запросах](#ajax-call-error-handling)
1. [Цепочка вызовов плагинов](#chain-plugin-calls)
1. [Сортировка элементов списка по алфавиту](#sort-list-items-alphabetically)
1. [Отключить правую кнопку мыши](#disable-right-click)


<div id="use-noconflict"></div>

### Используйте `noConflict()`

Асимвол `$`, используемый jQuery, также используется другими библиотеками JavaScript. Чтобы гарантировать, что jQuery не конфликтует с объектом `$` из разных библиотек, используйте метод `noConflict()` в начале документа:

```javascript
jQuery.noConflict();
```

Теперь вы ссылаетесь на объект jQuery, используя имя переменной `jQuery` вместо `$` (например, `jQuery('div p').hide()`). Если у вас несколько версий jQuery на одной странице, вы можете использовать `noConflict ()` для установки псевдонима для определенной версии:

```javascript
let $x = jQuery.noConflict();
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="checking-if-jquery-loaded"></div>

### Проверка готовности jQuery

Перед тем, как сделать что-нибудь с помощью jQuery, необходимо убедиться в том, что он загружен:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

Теперь вы можете продолжать ...

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="use-on-binding-instead-of-click"></div>

### Используйте `.on()` вместо `.click()`

Использование `.on()` дает ряд преимуществ по сравнению с использованием `.click()`, например, возможность добавлять несколько событий...

```javascript
.on('click tap hover')
```

...привязка применяется к динамически создаваемым элементам (нет необходимости вручную связывать каждый отдельный элемент, динамически добавленный к DOM)...

...и возможность установить пространство имен:

```javascript
.on('click.menuOpening')
```

Пространства имен дают вам возможность отключать привязку к конкретному событию (например, `.off('click.menuOpening')`).

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="back-to-top-button"></div>

### Кнопка "вернуться к началу"

С помощью методов `animate` и `scrollTop` в jQuery вам не нужен плагин, чтобы создать простую анимацию прокрутки вверх:

```javascript
// Вернуться к началу
$('.container').on('click', '.back-to-top', function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});
```

```html
<!-- Создаем элемент anchor -->
<a class="top" href="#">Back to top</a>
```

Изменение значения `scrollTop` изменяет место, на котором прокрутка остановится. Все, что вы действительно делаете, это прокрутка документа на протяжении 800 миллисекунд, пока мы не окажемся в верхней части документа.

**Примечание:** Обратите внимание на некоторое [неправильное поведение](https://github.com/jquery/api.jquery.com/issues/417) `scrollTop`.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="preload-images"></div>

### Предварительная загрузка изображений

Если ваш веб-страница использует много изображений, которые не видны изначально (например, появлюятся при наведении курсора мыши), имеет смысл предварительно загрузить их:

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

### Проверка, загружаются ли изображения

Иногда вам может понадобиться проверка того, что ваши изображения полностью загружены, перед тем как вы продолжите работу своего скрипта:

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

Вы также можете проверить, если одно конкретное изображение загружено, заменив тег `<img>` на идентификатор или класс.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="fix-broken-images-automatically"></div>

### Автоматическое исправление сломанных изображений

Если вам посчастливилось найти неработающие ссылки на изображения на вашем сайте, замена их по одной может утомить. Этот простой фрагмент кода поможет избежать этой головной боли:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

В качестве альтернативы, если вы хотите просто скрыть сломанные изображения этот фрагмент будет заботиться о том, что для:

```javascript
$('img').on('error', function () {
  $(this).hide();
});
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="post-a-form-with-ajax"></div>

### Дать форму с помощью AJAX

методы JQuery AJAX являются распространенным способом запросить текст, HTML, XML или JSON. Если вы хотите отправить форму через AJAX можно собирать пользовательские входные данные через `val()` метода:

```javascript
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});
```

Тем не менее, все эти `val()` звонки стоят дорого. Лучший способ сбора данных, вводимых пользователем использует `serialize()` функцию, которая собирает пользовательские входные данные в виде строки:

```javascript
$.post('sign_up', $('#sign-up-form').serialize());
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="toggle-classes-on-hover"></div>

### Переключение классов по наведению

Допустим, вы хотите изменить визуальный интерактивный элемент на странице, когда пользователь наводит курсор над ним. Вы можете добавить класс к вашему элементу, когда пользователь навел курсор; когда пользователь уводит курсор, класс удаляется:

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

Вам просто нужно добавить необходимые стили CSS. Если вы хотите _упростить_ логику, используйте метод `toggleClass`:

```javascript
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```

**Примечание:** CSS может быть более быстрым решением в этом случае, но вам по-прежнему стоит знать об этом.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="disabling-input-fields"></div>

### Отключение поля ввода

Иногда вы можете захотеть отключить кнопку отправки формы или одно из его текстовых полей, до тех пор, пока пользователь не выполнил определенное действие (например, не отметил флаг "я прочитал условия"). Добавьте атрибут `disabled` на ваше поле ввода, отключив его, когда вы хотите:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

Все, что вам нужно сделать, чтобы включить поле обратно, это запустить метод `prop` на том же поле ввода, но установить значение `disabled` к `false`:

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="stop-the-loading-of-links"></div>

### Прерывание загрузки ссылки

Иногда вы не хотите, чтобы ссылки переводили пользователя на определенную веб-страницу или перезагружали страницу; Вы можете хотеть, чтобы они делали что-то еще, как спусковой крючок для какой-либо другого сценария. Этот скрипт предотвратит действие по умолчанию:

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="cache-jquery-selectors"></div>

### Кэширование селекторов jQuery

Подумайте, сколько раз вы пишете один и тот же селектор снова и снова в любом проекте. Каждый `$('.element')` селектор ищет по всему DOM каждый раз, независимо от того, был ли он использован раньше. Вместо этого запустите селектор один раз и сохраните его результаты в переменной:

```javascript
var blocks = $('#blocks').find('li');
```

Теперь вы можете использовать `blocks` переменную там, где вы хотите, без необходимости выполнять поиск по DOM каждый раз:

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```

Кэширование jQuery селекторов позволяет получить выигрыш в производительности.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="toggle-fadeslide"></div>

### Переключение fade/slide

Slide и fade являются часто используемыми действиями в анимации с jQuery. Вы можете захотить, показать элемент, когда пользователь нажимает что-то, что делает методы `fadeIn` и `slideDown` хорошо подходящими. Но если вы хотите, чтобы этот элемент, появился на первый щелчок, а затем исчез на второй, то этот скрипт будет работать просто отлично:

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

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="simple-accordion"></div>

### Простой аккордеон

Метод для создания простого аккордеона:

```javascript
// Закрываем все панели
$('#accordion').find('.content').hide();

// Аккордеон
$('#accordion').find('.accordion-header').on('click', function () {
  var next = $(this).next();
  next.slideToggle('fast');
  $('.content').not(next).slideUp('fast');
  return false;
});
```

Добавив этот скрипт все, что вам нужно сделать на вашей веб-странице, это найти необходимый HTML и поручить ему эту работу.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="make-two-divs-the-same-height"></div>

### Сделать два элемента div одинаковой высотой

Иногда вы будете хотеть две элемента div, которые имеют одинаковую высоту, независимо от содержания:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

В этом примере задается `min-height`, что означает, что она может быть больше, чем основной DIV, но никогда меньше. Тем не менее, более гибкий метод должен был бы пройтись циклом по множеству элементов и установить высоту самого высокого элемента:

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

Если вы хотите, чтобы _все_ столбцы имели одинаковую высоту:

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

**Примечание:** Это можно сделать несколькими способами [в CSS](http://codepen.io/AllThingsSmitty/pen/KMPqoO), но в зависимости от ваших потребностей, стоит знать, как это сделать с помощью jQuery.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="open-external-links-in-new-tabwindow"></div>

### Открывать внешние ссылки в новой вкладке или новом окне

Открыть внешние ссылки в новой вкладке браузера или новом окне, и открывать внутренние ссылки в той же вкладке или окне:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Примечание:** `window.location.origin` не работает в IE10. [Это исправление](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) решает проблему.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="find-element-by-text"></div>

### Найти элемент по тексту

При использовании `contains()` селектора в jQuery вы можете найти текст в содержимом элемента. Если текст не существует, то этот элемент будет скрыт:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="trigger-on-visibility-change"></div>

### Запуск по изменению видимости

Запуск скрипта, когда пользователь больше не фокусируется на вкладке или перефокусируется на вкладке:

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

### Обработка ошибок в AJAX-запросах

Когда AJAX-запрос возвращает ошибку 404 или 500, будет выполняться обработчик ошибок. Если обработчик не определен, другой код jQuery может не работать после этого. Определить глобальный обработчик ошибок AJAX-запросов можно следующим образом:

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="chain-plugin-calls"></div>

### Цепочка вызовов плагинов

jQuery позволяет выполнять "цепочки" методов, что упрощает процесс, однократно запрашивая DOM и не создавая несколько объектов jQuery. Скажем, следующий фрагмент кода представляет ваш метод:

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

Он может быть значительно улучшен с помощью цепочки:

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

Альтернативой является кэширование элемента в переменной (с приставкой `$`):

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

И цепочки и [кэширование](#cache-jquery-selectors) в jQuery являются лучшими практиками, которые приводят к более короткому и быстрому код.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="sort-list-items-alphabetically"></div>

### Сортировка элементов списка по алфавиту

Допустим, в списке слишком много элементов. Возможно, содержание производится с помощью CMS, а вы хотите показать их в алфавитном порядке:

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

Такие дела!

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


<div id="disable-right-click"></div>

### Отключить правую кнопку мыши

Если вы хотите отключить контекстное меню, вы можете сделать это для всей страницы...

```javascript
$(document).ready(function () {
  $(document).bind('contextmenu', function (e) {
    return false;
  })
})
```

...но вы также можете сделать то же самое для конкретного элемента:

```javascript
$(document).ready(function () {
  $('#submit').bind('contextmenu', function (e) {
    return false;
  })
})
```

<sup>[вернуться к оглавлению](#table-of-contents)</sup>


## Поддержка

Текущие версии Chrome, Firefox, Safari, Opera, Edge, и IE11.

<sup>[вернуться к оглавлению](#table-of-contents)</sup>
