# 모두가 알아야 할 jQuery 팁들 [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

당신의 jQuery 사용에 도움이 되는 간단한 팁들의 모음입니다.
 
> [@sindresorhus](https://github.com/sindresorhus/)이 엄선한 [awesome lists](https://github.com/sindresorhus/awesome/)의 다른 훌륭한 리스트들 확인해보세요.

## 목차

* [팁](#팁)
* [지원](#지원)
* [컨트리뷰션시 지켜야 할 사항](../../CONTRIBUTING.md)


## 팁

1. [`noConflict()` 사용하기](#use-noconflict)
1. [jQuery가 로드되었는지 확인하기](#checking-if-jquery-loaded)
1. [엘리먼트가 존재하는지 확인하기](#check-whether-an-element-exists)
1. [`.click()` 대신에 `.on()` 으로 바인딩 하기](#use-on-binding-instead-of-click)
1. [처음으로 돌아가기 버튼](#back-to-top-button)
1. [이미지 사전로드 시키기](#preload-images)
1. [이미지들이 로드되었는지 확인하기](#checking-if-images-are-loaded)
1. [손상된 이미지 자동으로 수정](#fix-broken-images-automatically)
1. [AJAX 형식으로 게시하기](#post-a-form-with-ajax)
1. [마우스를 올렸을 때 클래스 토글하기](#toggle-classes-on-hover)
1. [입력 필드 비활성 하기](#disabling-input-fields)
1. [링크의 로딩을 중지하기](#stop-the-loading-of-links)
1. [jQuery 셀렉터를 캐시에 저장하기](#cache-jquery-selectors)
1. [Fade/Slide 토글](#toggle-fadeslide)
1. [아코디언 간단히 작성하기](#simple-accordion)
1. [두 개의 Div를 같은 높이로 만들기](#make-two-divs-the-same-height)
1. [새 탭/새 창에서 외부 링크 열기](#open-external-links-in-new-tabwindow)
1. [텍스트로 엘리먼트 찾기](#find-element-by-text)
1. [가시성 변화에 따른 작동](#trigger-on-visibility-change)
1. [AJAX의 에러반환에 대한 핸들링](#ajax-call-error-handling)
1. [체인 플러그인 호출](#chain-plugin-calls)
1. [알파벳 순서로 아이템 목록 정렬하기](#sort-list-items-alphabetically)
1. [우클릭 비활성화](#disable-right-click)


<div id="use-noconflict"></div>

### `noConflict()`사용하기

jQuery에서 사용되는 `$` 와 같은 별명은 JavaScript의 다른 라이브러리에서도 사용됩니다. jQuery의 `$` 객체가 다른 라이브러리와 충돌하지 않게 하려면, 문서의 시작에 `coConflict()` 메소드를 사용하세요:

```javascript
jQuery.noConflict();
```

이제 `$` 대신에 `jQuery` 변수 이름을 사용하여 jQuery 객체를 참조할 것입니다 (예를들어, `jQuery('div p').hide()`). 만일 같은 페이지에서 여러 버전의 jQuery를 사용한다면 (추천하지는 않습니다), `noConflict()` 를 사용하여 특정 버전에 별명을 설정할 수 있습니다:

```javascript
let $x = jQuery.noConflict();
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="checking-if-jquery-loaded"></div>

### jQuery가 로드되었는지 확인하기

jQuery로 무엇이든 하기전에 jQuery가 확실히 로드되었는지 확인할 필요가 있습니다:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

이제 시작해 봅시다...

<sup>[목차로 돌아가기](#목차)</sup>

<div id="check-whether-an-element-exists"></div>

### 엘리먼트가 존재하는지 확인하기

HTML 엘리먼트를 사용하기 전에 그 엘리먼트가 DOM의 일부인지 확인해야 합니다.

```javascript
if ($("#selector").length) {
  //엘리먼트로 무언가를 해볼 것
}
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="use-on-binding-instead-of-click"></div>

### `.click()` 대신에 `.on()` 으로 바인딩 하기

`.on()` 을 사용하는 것은 `.click()` 에 비해 몇 가지 더 장점이 있습니다, 예를들면 여러 이벤트를 추가할 수 있는 점...

```javascript
.on('click tap hover')
```

...동적으로 생성된 엘리먼트에 바인딩이 적용된다는 점, 뿐만 아니라 (동적으로 추가된 모든 DOM 요소에 각각 직접 바인딩할 필요가 없다는 점)...

...그리고 네임스페이스 설정이 가능하다는 점:

```javascript
.on('click.menuOpening')
```

네임스페이스는 특정 이벤트의 바인딩을 해제할 수도 있게 해줍니다 (예를들면, `.off('click.menuOpening')`).

<sup>[목차로 돌아가기](#목차)</sup>

<div id="back-to-top-button"></div>

### 처음으로 돌아가기 버튼

jQuery에서 `animate` 와 `scrollTop` 메소드를 이용하면 처음으로 돌아가기 애니메이션을 만들기 위해 플러그인을 이용할 필요가 없습니다:

```javascript
// 처음으로 돌아가기
$('.container').on('click', '.back-to-top', function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});
```

```html
<!-- a 태그 만들기 -->
<div class="container">
  <a href="#" class="back-to-top">Back to top</a>
</div>
```

`scrollTop`의 값을 원하는 곳으로 변경함으로서 스크롤바가 멈출 곳을 정할 수 있습니다. 그저 800밀리초 동안 문서의 처음으로 올라갈때까지 본문을 애니메이션으로 만드는 것만 하면 됩니다.

**메모:** `scrollTop` 의 몇 가지 [버그동작](https://github.com/jquery/api.jquery.com/issues/417) 을 보세요.

<sup>[목차로 돌아가기](#목차)</sup>

<div id="preload-images"></div>

### 이미지 사전로드 시키기

만일 웹페이지가 초기에 볼 수 없는 많은 이미지를 이용할 경우 (예를들어, 마우스를 올렸을 때) 이미지들을 사전로드 시키는 것이 옳은 방법입니다:

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="checking-if-images-are-loaded"></div>

### 이미지들이 로드되었는지 확인하기

때로는 스크립트를 계속 진행하기 위해 이미지가 완전히 로드되었는지 확인해야 할 때도 있습니다:

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

필요에따라 `<img>` 태그를 ID나 class로 변경하여 특정 이미지가 로드되었는지 체크할 수도 있습니다.

<sup>[목차로 돌아가기](#목차)</sup>

<div id="fix-broken-images-automatically"></div>

### 손상된 이미지 자동으로 수정

사이트에서 손상된 이미지들을 발견했을 때 그 이미지들을 하나하나 수정하는 것은 고통을 가져옵니다. 이 간단한 코드는 그러한 많은 두통을 겪지않게 할 수 있습니다:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

대체로, 손상된 이미지들을 숨기려할 때 이 스니펫이 그 부분을 도와줄 것입니다:

```javascript
$('img').on('error', function () {
  $(this).hide();
});
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="post-a-form-with-ajax"></div>

AJAX 형식으로 게시하기
### Post a Form with AJAX

jQuery의 AJAX 메소드는 text, HTML, XML 또는 JSON을 요청하는 일반적인 방법과 같습니다. 만일 AJAX 형식으로 보내기를 원한다면 사용자의 입력을 `val()` 메소드로 받을 수 있습니다:

```javascript
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});
```

그러나 모든 `val()` 부름은 값을 많이 치뤄야 하고 `<textarea>` 에 `.val()` 을 사용하면 브라우저의 반환 값에서 줄바꿈 되는 문자가 제거됩니다. 따라서 사용자의 입력을 받는 더 좋은 방법은 `serialize()` 함수를 이용하여 문자열로 받는 것입니다:

```javascript
$.post('sign_up', $('#sign-up-form').serialize());
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="toggle-classes-on-hover"></div>


### 마우스를 올렸을 때 클래스 토글하기

사용자가 페이지 중 클릭가능한 엘리먼트에 마우스를 올렸을 때 페이지가 시각적으로 바뀌는 것을 얘기해봅시다. 당신은 사용자가 엘리먼트에 마우스를 올렸을 때 그 엘리먼트에 클래스가 추가되도록 할 수 있습니다; 그리고 사용자가 엘리먼트에서 마우스를 내리면 클래스가 제거되도록 할 수 있습니다:

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

`toggleClass` 메소드를 사용하기 위해 더 _간단한_ 방법을 원한다면. 당신은 필수적으로 CSS를 추가할 필요가 있습니다:

```javascript
$('.btn').on('hover', function () {
  $(this).toggleClass('hover');
});
```

**메모:** 이 예시에서는 CSS가 더 빠른 해결방법이 될 수 있지만 이 방법을 아는 것도 여전히 가치가 있습니다.

<sup>[목차로 돌아가기](#목차)</sup>

<div id="disabling-input-fields"></div>

### 입력 필드 비활성 하기

때때로 사용자가 특정 액션을 행할때까지 양식의 제출 버튼 또는 글 입력 필드가 비활성 되어있기를 바랄 수 있습니다 (예를들면, "조항을 읽었습니다" 의 체크박스를 체크할 때). 이런때에는 input에 `disabled` 속성을 추가함으로서 당신이 원할때 입력필드를 활성화시킬 수 있습니다:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

당신이 할 일은 input의 `prop` 메소드를 다시 실행시키되, `disabled` 의 값을 `false` 로 설정하는 것 뿐입니다:

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="stop-the-loading-of-links"></div>


### 링크의 로딩을 중지하기

때때로 링크를 어떤 웹 페이지로 보내거나 페이지를 리로드하는 것을 원치 않을 때가 있습니다; 다른 스크립트를 띄우는 것과 같은 다른 것을 하기를 원할 때가 있습니다. 이 것은 기본적인 액션을 방지하는 트릭입니다:

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="cache-jquery-selectors"></div>

### jQuery 셀렉터를 캐시에 저장하기

프로젝트에서 같은 셀렉터를 얼마나 많이 적어보게 되는지 생각해보세요. 모든 `$('.element')` 셀렉터는 이전에 실행되었는지에 상관없이 매번 모든 DOM을 검색해야 합니다. 이에대한 대안으로 셀렉터를 한번만 실행하고 그 결과를 변수에 저장할 수 있습니다:

```javascript
var blocks = $('#blocks').find('li');
```

이제 매번 DOM을 검색하지 않아도 `blocks` 변수를 원하는 곳에서 사용할 수 있습니다:

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```

jQuery 셀렉터를 캐시에 저장하는 것은 성능의 향상에 도움이 됩니다.

<sup>[목차로 돌아가기](#목차)</sup>

<div id="toggle-fadeslide"></div>


### Fade/Slide 토글

jQuery에서 sliding과 fading은 일반적인 애니메이션입니다. 당신은 사용자가 무언가를 클릭할 때, `fadeIn` 과 `slideDown` 메소드를 완벽하게 만들 수도 있지만, 첫번째 클릭에 엘리먼트가 나타나고 두번째 클릭에 사라지게 하는 것도, 제대로 작동하게 만들 수 있습니다:

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

<sup>[목차로 돌아가기](#목차)</sup>

<div id="simple-accordion"></div>

### 아코디언 간단히 작성하기

이것은 빠르게 아코디언을 작성하기 위한 간단한 메소드입니다:

```javascript
// 모든 패널 닫기
$('#accordion').find('.content').hide();

// 아코디언
$('#accordion').find('.accordion-header').on('click', function () {
  var next = $(this).next();
  next.slideToggle('fast');
  $('.content').not(next).slideUp('fast');
  return false;
});
```

이 스크립트를 추가함으로서 당신이 할 일은 이 웹페이지가 작동하기위해 필수적인 HTML을 작성하는 것 뿐입니다.

<sup>[목차로 돌아가기](#목차)</sup>

<div id="make-two-divs-the-same-height"></div>

### 두 개의 Div를 같은 높이로 만들기

때때로 각 div의 내용에 상관없이 두 개의 div가 같은 높이이기를 원할때가 있을 것입니다:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

이 예시는 `min-height` 을 설정함으로서 main div보다 클 수는 있지만 결코 작아질 수 없도록 했습니다. 그러나, 더 유연한 메소드는 엘리먼트의 높이확인을 반복하여 가장 큰 엘리먼트의 높이로 `height` 을 설정하는 것입니다:

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

만일 _모든_ 열의 높이를 같게 하고 싶다면:

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

**메모:** 이것은 [CSS를 이용해](http://codepen.io/AllThingsSmitty/pen/KMPqoO) 여러가지 방법으로 할 수 있습니다. 그러나 필요에 따라, jQuery로 이것을 핸들링하는 방법을 알아야 편리할 때도 있습니다.

<sup>[목차로 돌아가기](#목차)</sup>

<div id="open-external-links-in-new-tabwindow"></div>

### 새 탭/새 창에서 외부 링크 열기

브라우저의 새로운 탭 또는 새로운 창에서 외부 링크를 열고 같은 원본의 링크가 같은 탭 또는 창에서 열리는것을 보장함:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**메모:** `window.location.origin` 은 IE10에서 작동하지 않습니다. [이 수정](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) 으로 문제가 해결되었습니다. 

<sup>[목차로 돌아가기](#목차)</sup>

<div id="find-element-by-text"></div>

### 텍스트로 엘리먼트 찾기

jQuery에서 `contains()` 셀렉터를 사용하여 엘리먼트의 내용에서 텍스트를 찾을 수 있습니다. 만일 텍스트가 존재하지 않으면, 해당 엘리먼트는 숨겨질 것입니다:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="trigger-on-visibility-change"></div>

### 가시성 변화에 따른 작동

사용자가 더이상 탭에 초점을 맞추지 않거나 탭에 다시 포커스를 맞출 때 자바스크립트가 작동합니다:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="ajax-call-error-handling"></div>

### AJAX의 에러반환에 대한 핸들링

AJAX의 반환값이 404 또는 500 에러일 때, 에러 핸들러가 실행될 것입니다. 만일 핸들러가 정의되지 않았다면, 다른 jQuery 코드가 계획대로 작동하지 않을 수 있습니다. 따라서 전역에 AJAX 오류 핸들러를 정의하려면:

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[목차로 돌아가기](#목차)</sup>

<div id="chain-plugin-calls"></div>

### 체인 플러그인 호출

jQuery는 여러 개체를 생성하고 반복적으로 DOM을 처리하는 과정을 완화하기 위해 플러그인 메소드의 호출을 "체이닝" 하는 것을 허용합니다. 다음 스니펫이 당신의 플러그인 메소드 호출을 나타낸다고 가정해봅시다:

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

이 스니펫은 체이닝을 통해 크게 개선될 수 있습니다:

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

대안 중 하나는 엘리먼트를 변수 안에 캐시하는 것입니다 (`$`를 앞에 붙인):

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

jQuery에서 체이닝과 [캐싱](#cache-jquery-selectors) 메소드는 길이가 더 짧고 더 빠른 코드에 대한 최고의 예제입니다.

<sup>[목차로 돌아가기](#목차)</sup>

<div id="sort-list-items-alphabetically"></div>

### 알파벳 순서로 아이템 목록 정렬하기

하나의 목록에 아이템이 너무 많다고 가정해봅시다. 아마 컨텐츠는 CMS에 의해 생성되었을 것이고 당신은 알파벳순서로 정돈하기를 원할 것입니다:

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

여기 있습니다!

<sup>[목차로 돌아가기](#목차)</sup>

<div id="disable-right-click"></div>

### 우클릭 비활성화

만일 우클릭을 비활성화 시키고 싶다면, 전체 페이지에 그것을 적용할 수 있습니다...

```javascript
$(document).ready(function () {
  $(document).bind('contextmenu', function (e) {
    return false;
  })
})
```

...그리고 특정 엘리먼트에만 적용할 수도 있습니다:

```javascript
$(document).ready(function () {
  $('#submit').bind('contextmenu', function (e) {
    return false;
  })
})
```

<sup>[목차로 돌아가기](#목차)</sup>


## 지원

Chrome, Firefox, Safari, Opera, edge, and IE11의 최신버전.

<sup>[목차로 돌아가기](#목차)</sup>
