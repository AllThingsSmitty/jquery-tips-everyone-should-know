# Herkesin Bilmesi Gereken jQuery İpuçları

JQuery düzeneğinizi geliştirecek basit ipuçlarının bir derlemesi.

1. [Checking If jQuery Loaded](#checking-if-jquery-loaded)
1. [Back to Top Button](#back-to-top-button)
1. [Preload Images](#preload-images)
1. [Checking If Images Are Loaded](#checking-if-images-are-loaded)
1. [Fix Broken Images Automatically](#fix-broken-images-automatically)
1. [Toggle Classes on Hover](#toggle-classes-on-hover)
1. [Disabling Input Fields](#disabling-input-fields)
1. [Stop the Loading of Links](#stop-the-loading-of-links)
1. [Cache jQuery Selectors](#cache-jquery-selectors)
1. [Toggle Fade/Slide](#toggle-fadeslide)
1. [Simple Accordion](#simple-accordion)
1. [Make Two Divs the Same Height](#make-two-divs-the-same-height)
1. [Open External Links in New Tab/Window](#open-external-links-in-new-tabwindow)
1. [Find Element By Text](#find-element-by-text)
1. [Trigger on Visibility Change](#trigger-on-visibility-change)
1. [Ajax Call Error Handling](#ajax-call-error-handling)
1. [Chain Plugin Calls](#chain-plugin-calls)


### Checking If jQuery Loaded

jQuery ile bir şeyler yapmadan önce yüklenmiş olduğundan emin olmalısınız:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery yüklü değil');
} else {
  console.log('jQuery yüklü durumda.');
}
```


### Back to Top Button

jQuery'deki `animate` ve `scrollTop` fonksiyonları ile harici eklentiler kullanmadan "sayfa başına dön" animasyonu gerçekleştirebilirsiniz:

```javascript
// Back to top
$('.top').click(function (e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 800);
});
```

```html
<!-- Bir anchor tag oluşturalım -->
<a class="top" href="#">Sayfa başına dön</a>
```

`scrollTop` değerini değiştirmek kaydırma çubuğunun nerede duracağını belirleyecektir. Aslında burada tam olarak yaptığınız iş dökümanı 800 milisaniye boyunca sayfa başına kadar kaydırmak.

**Not:** `scrollTop` ile ilgili bazı [hatalı davranışlara](https://github.com/jquery/api.jquery.com/issues/417)  göz atabilirsiniz.


### Preload Images

Web sayfanız ilk başta görüntülenmeyen resimler içeriyorsa(örn: hover) bunları önyüklemek daha akıllıca olacaktır.

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```


### Checking If Images Are Loaded


Bazen komutlarınızı devam ettirmek için resimlerin tamemen yüklenip yüklenmediğini kontrol etmeniz gerekebilir:

```javascript
$('img').load(function () {
  console.log('image load successful');
});
```

Ayrıca `<img>` tagi yerine id veya class kullanarak  belirli bir resmin yüklenip yüklenmediğini kontrol edebilirsiniz.


### Fix Broken Images Automatically

Sayfanızdaki kırık linkli resimleri teker teker bulup değiştirmek bir eziyete dönüşebilir. Bu basit kod parçası acılarınızı dindirmeye yardımcı olabilir:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

Üstelik kırık link yoksa bunun hiç bir zararı da dokunmayacaktır.


### Toggle Classes on Hover

Diyelim ki kullanıcı sayfanızdaki tıklanabilir bir öğenin üzerine geldiğinde öğeyi görsel olarak değiştirmek istiyorsunuz. Kullanıcı öğenin üzerine geldiğinde öğeye bir class ekleyebilir, üzerinde durmayı bıraktığında ise bu class'ı silebilirsiniz:

```javascript
$('.btn').hover(function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```
Sadece gerekli olan CSS'i eklemeniz lazım. Eğer daha da _sade_ bir yol isterseniz`toggleClass` fonksiyonunu kullanabilirsiniz:

```javascript
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```

**Not:** CSS bu durumda daha hızlı bir çözüm olabilir ama yine de bu yöntemi bilmekte fayda var.


### Disabling Input Fields

Bazen kullanıcı belirli bir eylemi gerçekleştirmeden önce bir butonu veya yazı kutucuğunu devre dışı hale getirmek isteyebilirsiniz (örneğin kullanım koşullarını kabul etmediğinde). İstediğiniz zaman etkinleştirmek için input öğesine `disabled` özelliğini ekleyebilirsiniz:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

Tek yapmanız gereken input için `prop` fonksiyonunu tekrar çağırmak, ama `disabled` için `false` değerini belirterek:

```javascript
$('input[type="submit"]').prop('disabled', false);
```


### Stop the Loading of Links

Bazen linklerin belirli bir sayfaya gitmesi veya sayfayı yenilemesi yerine bir başka komutu tetiklemesi gibi başka işleri yapmasını isteyebilirsiniz. Bu kod sizin için varsayılan eylemleri önleyecektir:

```javascript
$('a.no-link').click(function (e) {
  e.preventDefault();
});
```


### Cache jQuery Selectors

Bir projede aynı seçiciyi(selector) kaç defa kullandığınızı düşünün. Her `$('.element')`seçici önceden çalıştırıldıysa ne olursa olsun  her defasında tüm DOM'u aramak zorundadır. Bunun yerine seçiciyi bir defa çağırın ve sonucu bir değişkende saklayın:

```javascript
var blocks = $('#blocks').find('li');
```

Bu sayede istediğiniz yerde her defasında tüm DOM'u aramaksızın `blocks` değişkenini kullanabilirsiniz.

```javascript
$('#hideBlocks').click(function () {
  blocks.fadeOut();
});

$('#showBlocks').click(function () {
  blocks.fadeIn();
});
```
jQuery seçicilerini önbelleğe almak basit bir performans artırımıdır.

### Toggle Fade/Slide

Birşeyler üzerinde kaydırma veya solma animasyonlarını jQuery ile bolca kullanırız.  Kullanıcı birşeylere tıklayınca bir öğeyi göstermek isteyebilirsiniz, `fadeIn` ve `slideDown` komutları bunu kusursuz bir şekilde yapar.  Ancak eğer elemanın ilk tıklamada görünmesini ikinci tıklamada kaybolmasınu istiyorsanız bu işinizi görecektir:

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

Kıvrak accordionlar oluşturmak için basit bir yöntem:

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

Bazen içerikleri yazıya bağlı olmaksızın iki _div_in aynı yükseklikte olmasını isteyebilirsiniz:

```javascript
$('.div').css('min-height', $('.main-div').height());
```
Bu örnekteki `min-height` değerinin belirlenmesi; `main-div`den büyük olabileceğini ama asla daha küçük olamayacağını ifade eder. Ancak elemanlar dizisi üzerinde bir döngü kullanarak yükseklikleri, yüksekliği en büyük olanın olanın değerine ayarlamak daha esnek bir yöntem olacaktır:

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
Eğer _tüm_ sütunların aynı yükseklikte olmasını isterseniz:

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```


### Open External Links in New Tab/Window

Dış bağlantıları yeni sekmede veya yeni pencerede açın ancak aynı kaynaktan olan bağlantıları ise aynı sekmede veya pencerede açın:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Not:** `window.location.origin` komutu IE10'da çalışmayacaktır. [Bu](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) sorunu düzeltecektir.


### Find Element By Text

jQuery'nin `contains()` seçicisiyle içerdiği metne göre bir öğeyi(element) bulabilirsiniz. Eğer metin içermiyor ise bu öğe gizli kalacaktır:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

### Trigger on Visibility Change

Kullanıcı bir sekme üzerinde daha fazla durmuyorsa ya da sekme üzerinde tekraradan duruyorsa JavaScript tetikleyin:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```


### Ajax Call Error Handling

Ajax çağrısı 404 veya 500 hatası döndürdüğünde hata yakalayıcı çalışacaktır. Eğer hata yakalayıcı tanımlanmamış ise, diğer jQuery kodları artık çalışmayabilir. Global bir Ajax hata yakalayıcısı tanımlayın:

```javascript
$(document).ajaxError(function (e, xhr, settings, error) {
  console.log(error);
});
```


### Chain Plugin Calls

jQuery, defalarca DOM sorgulamayı azaltmak ve çoklu jQuery nesneleri oluşturmak için plugin komutlarını zincirleme olarak çağırmaya imkân sağlar. Diyelim ki plugin komutlarınız aşağıdaki kod parçasındaki gibi olsun: 

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

Zincirleme yöntemini kullanarak bunu oldukça gelişmiş bir hale getirebilirsiniz:

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

Öğeyi bir değişkende önbelleğe almak da bir alternatiftir(`$` öneki ile):

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

[Önbelleğe alma](#cache-jquery-selectors) ve zincirleme daha hızlı ve daha sade jQuery kodları için en iyi yöntemlerdir.
