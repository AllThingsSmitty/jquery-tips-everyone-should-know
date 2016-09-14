# Consejos jQuery cada uno debe saber [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Una colección de consejos simples para ayudar a su juego jQuery.

> Para otros grandes listas echa un vistazo a [@sindresorhus](https://github.com/sindresorhus/)'s lista curada de [listas impresionantes](https://github.com/sindresorhus/awesome/).


<div id="table-of-contents"></div>
## Tabla de contenido

* [Tips](#consejos)
* [Apoyo](#apoyo)
* [Pautas de contribución](../../CONTRIBUTING.md)


## Consejos

1. [Verificando jQuery Cargado](#checking-if-jquery-loaded)
1. [Utilice `.on ()` En lugar de unión `.click ()`](#use-on-binding-instead-of-click)
1. [Volver al botón de inicio](#back-to-top-button)
1. [Carga previa de imágenes](#preload-images)
1. [comprobando si las imágenes se cargan](#checking-if-images-are-loaded)
1. [corregir imágenes automáticamente rotas](#fix-broken-images-automatically)
1. [Publicar un formulario con AJAX](#post-a-form-with-ajax)
1. [Las clases de palanca en la libración](#toggle-classes-on-hover)
1. [Desactivar la acción de campos](#disabling-input-fields)
1. [Detener la carga de Enlaces](#stop-the-loading-of-links)
1. [de caché de jQuery selectores](#cache-jquery-selectors)
1. [De palanca de fundido / Slide](#toggle-fadeslide)
1. [Acordeón simple](#simple-accordion)
1. [Haga dos Divs la misma altura](#make-two-divs-the-same-height)
1. [Abrir enlaces externos en una nueva pestaña / ventana](#open-external-links-in-new-tabwindow)
1. [Buscar elemento Por Texto](#find-element-by-text)
1. [Visibilidad gatillo de Cambio](#trigger-on-visibility-change)
1. [Control de errores de llamada Ajax](#ajax-call-error-handling)
1. [Llamadas Plugin Cadena](#chain-plugin-calls)
1. [Ordenar la lista de elementos alfabéticamente](#sort-list-items-alphabetically)


<div id="checking-if-jquery-loaded"></div>
### Verificando jQuery Cargado

Antes de que pueda hacer cualquier cosa con jQuery primero tiene que asegurarse de que se ha cargado:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

Ahora que estás fuera...

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="use-on-binding-instead-of-click"></div>
### Utilice `.on ()` En lugar de unión `.click ()`

.en El uso de `()` le da varias ventajas sobre el uso de `.click ()`, tales como la capacidad de agregar varios eventos...

```javascript
.on ('click tap hover')
```

...Una unión se aplica a los elementos creados de forma dinámica, así (no hay necesidad de obligar manualmente cada elemento añadido dinámicamente a un elemento DOM) ...

...Y la posibilidad de configurar un espacio de nombres:

```javascript
.on('click.menuOpening')
```

Los espacios de nombres te dan el poder para desenlazar un evento específico (por ejemplo,`.off('click.menuOpening')`).

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="back-to-top-button"></div>
### Volver al botón de inicio

Mediante el uso de la `animate` y métodos `scrollTop` en jQuery que no es necesario un plugin para crear una animación simple-scroll-a arriba:

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

El cambio de los cambios de valor `scrollTop` donde se quiere que la barra de desplazamiento a la tierra. Todo lo que realmente está haciendo es animar el cuerpo del documento a lo largo de 800 milisegundos hasta que se desplaza a la parte superior del documento.

**Nota:** ve por alguna [comportamiento incorrecto](https://github.com/jquery/api.jquery.com/issues/417) con `scrollTop`.

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="preload-images"></div>
### Carga previa de imágenes

Si su página web utiliza una gran cantidad de imágenes que no son visibles inicialmente (por ejemplo, en vuelo estacionario) que tiene sentido para precargar ellos:

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="checking-if-images-are-loaded"></div>
### Comprobación Si las imágenes se cargan

A veces puede que tenga que comprobar si las imágenes han cargado completamente con el fin de continuar con las secuencias de comandos:

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

También puede comprobar si una imagen en particular se ha cargado mediante la sustitución de la etiqueta `<img>` con un ID o clase.

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="fix-broken-images-automatically"></div>
### Corregir imágenes automáticamente rotas

Si por casualidad usted encuentra enlaces de imagen rotos en su sitio de la sustitución de uno por uno puede ser un dolor. Esta sencilla pieza de código puede ahorrar muchos dolores de cabeza:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

Alternativamente, si desea ocultar simplemente imágenes rotas este fragmento se encargará de que para:

```javascript
$('img').on('error', function () {
  $(this).hide();
});
```

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="post-a-form-with-ajax"></div>
### Publicar un formulario con AJAX

Métodos jQuery AJAX son una forma común para solicitar texto, HTML, XML, JSON o. Si desea enviar un formulario a través de AJAX se podía recoger las entradas del usuario a través del método `val()`:

```javascript
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});
```

Sin embargo, todos esos `val()` llamadas es caro. Una mejor manera de recoger las entradas del usuario está utilizando el `serialize()` función que recoge las entradas del usuario como una cadena:

```javascript
$.post('sign_up', $('#sign-up-form').serialize());
```

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="toggle-classes-on-hover"></div>
### Alternar clases en la libración

Digamos que usted quiere cambiar la visual de un elemento se puede hacer clic en la página cuando un usuario se desplaza sobre él. Usted puede agregar una clase a su elemento cuando el usuario está flotando; cuando el usuario deja flotando elimina la clase:

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

Sólo tiene que añadir el CSS necesario. Si desea una manera aún _simpler_ utilizar el método `toggleClass`:

```javascript
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```

**Nota:** CSS puede ser una solución más rápida en este caso, pero es todavía vale la pena saber esto.

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="disabling-input-fields"></div>
### Desactivación de campos de entrada

A veces es posible que desee el botón de envío de un formulario o una de sus entradas de texto debe ser inhabilitado hasta que el usuario ha realizado una acción determinada (por ejemplo, control de la "He leído los términos" casilla de verificación). Añadir el atributo `disabled` a la entrada para que pueda activarlo cuando se quiere:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

Todo lo que necesita hacer es ejecutar el método `prop` otra vez en la entrada, pero establecer el valor de `disabled` a `false`:

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id ="stop-the-loading-of-links"></div>div>
### Detener la carga de Enlaces

A veces no desea vínculos para ir a una determinada página web, ni volver a cargar la página; es posible que desee que hagan otra cosa, como disparador de otro guión. Esto va a hacer el truco de la prevención de la acción por defecto:

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="cache-jquery-selectors"></div>
### de caché de jQuery selectores

Piense en cuántas veces se escribe el mismo selector una y otra vez en cualquier proyecto. Cada `$('.element')` selector tiene que buscar en todo el DOM cada vez, independientemente de si dicho selector había ejecutado anteriormente. En lugar de ello, ejecute el selector de una vez y almacenar los resultados en una variable:

```javascript
var blocks = $('#blocks').find('li');
```

Ahora se puede utilizar la variable `blocks` donde quieras sin tener que buscar el DOM en cada ocasión:

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```

El almacenamiento en caché selectores de jQuery son una ganancia de rendimiento fácil.

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="toggle-fadeslide"></div>
### De palanca de fundido / Slide

Deslizante y la decoloración son algo que usamos un montón en nuestras animaciones con jQuery. Es posible que sólo quieren mostrar un elemento cuando un usuario hace clic en algo, lo que hace que los `fadeIn` y métodos de `slideDown` perfecta. Pero si desea que el elemento que aparezca en la primera posición y luego desaparecen en el segundo esto va a funcionar muy bien:

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

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="simple-accordion"></div>
### Acordeón simple

Este es un método simple para un acordeón rápida:

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

Mediante la adición de este script lo único que tiene que hacer en su página web es el HTML necesario ir a buscar este trabajo.

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="make-two-divs-the-same-height"></div>
### Haga dos Divs la misma altura

A veces, usted querrá dos divs tener la misma altura no importa qué contenido tienen en ellos:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

Este ejemplo establece el `min-height` característica que significa que puede ser más grande que el div principal pero nunca más pequeña. Sin embargo, un método más flexible sería la de bucle sobre un conjunto de elementos y ajustar la altura a la altura del elemento más alto:

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

Si desea _todas_ columnas tengan la misma altura:

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

**Nota:** Esto se puede hacer de varias maneras [en CSS](http://codepen.io/AllThingsSmitty/pen/KMPqoO) pero dependiendo de cuáles son sus necesidades, saber cómo hacer esto en jQuery es todavía vale la pena.

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="open-external-links-in-new-tabwindow"></div>
### Abrir enlaces externos en una nueva pestaña / ventana

Abrir enlaces externos en una nueva pestaña o ventana del navegador y garantizar enlaces en el mismo origen abierta en la misma pestaña o ventana:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Nota:** `window.location.origin` no funciona en IE10. [Esta corrección](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) se ocupa de la cuestión.

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="find-element-by-text"></div>
### Buscar elemento Por Texto

Mediante el uso de la selector `contains()` en jQuery se puede encontrar texto en el contenido de un elemento. Si no existe texto, ese elemento se ocultará:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="trigger-on-visibility-change"></div>
### Visibilidad gatillo de Cambio

Gatillo JavaScript cuando el usuario ya no se centra en una pestaña, o vuelve a centrar en una pestaña:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="ajax-call-error-handling"></div>
### Control de errores de llamada Ajax

Cuando una llamada Ajax devuelve un error 404 o 500 se ejecutará el gestor de errores. Si no se define el controlador, otro código jQuery podría no funcionar. Definir un controlador global de error de Ajax:

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="chain-plugin-calls"></div>
### llamadas Plugin Cadena

jQuery permite el "encadenamiento" plug-in de llamadas a métodos para mitigar el proceso de consulta en repetidas ocasiones el DOM y la creación de varios objetos jQuery. Digamos que el siguiente fragmento representa sus llamadas a métodos plugin:

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

Esto podría mejorarse enormemente mediante el uso de encadenamiento:

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

Una alternativa es almacenar en caché el elemento en una variable (con el prefijo `$`):

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

Ambos métodos [almacenamiento en caché](#cache-jquery-selectors) en el encadenamiento y son las mejores prácticas que conducen al código corto y más rápido.

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


<div id="sort-list-items-alphabetically"></div>
### ordenar la lista de elementos alfabéticamente

Digamos que usted termina con demasiados elementos en una lista. Tal vez el contenido es producido por un CMS y desea ordenar por orden alfabético:

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

Hay que ir!

<sup>[volver al índice de contenidos](#table-of-contents)</sup>


## Apoyo

Las versiones actuales de Chrome, Firefox, Safari, Opera, Edge y EI11.