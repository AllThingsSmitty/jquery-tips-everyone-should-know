# Conselhos para a jQuery que toda a gente devia saber [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Uma  colecção de dicas simples para ajudar-te com a jQuery.

> Para outras grandes listas aqui visita [@sindresorhus](https://github.com/sindresorhus/)'s lista detalhada de [listas impresionantes](https://github.com/sindresorhus/awesome/).


<div id="table-of-contents"></div>

## Tabela de conteúdo

* [Conselhos](#conselhos)
* [Apoio](#apoio)
* [Tabelas de contribuições](../../CONTRIBUTING.md)


## Conselhos

1. [Utilizar `noConflict()`](#utilizar-noconflict)
1. [Verificando a jQuery Carrgada](#verificando-a-jquery-carrgada)
1. [Verifique se existe um elemento](#verifique-se-existe-um-elemento)
1. [Utiliza `.on()` No lugar de uniao `.click()`](#utiliza-on--no-lugar-de-uniao-click-)
1. [Regressar a botao de inicio](#regressar-a-botao-de-inicio)
1. [Carregar preview de imágens](#carregar-preview-de-imágens)
1. [Comprovar Se as imagens carregaram](#comprovar-se-as-imagens-carregaram)
1. [Corrigir imágens automáticamente crashadas](#corrigir-imágens-automáticamente-crashadas)
1. [Publicar um formulario com AJAX](#publicar-um-formulario-com-ajax)
1. [Alternar classes na libertacao](#alternar-classes-na-libertacao)
1. [Desactivar campos de entrada](#desactivar-campos-de-entrada)
1. [Deter a carga de Enlaces](#deter-a-carga-de-enlaces)
1. [De caché de jQuery selectores](#de-caché-de-jquery-selectores)
1. [Alavanca de fundo / Slide](#alavanca-de-fundo--slide)
1. [Acordeao simples](#acordeao-simples)
1. [Faz dois Divs na mesma altura](#faz-dois-divs-na-mesma-altura)
1. [Abrir enlaces externos numa nova tab / janela](#abrir-enlaces-externos-numa-nova-tab--janela)
1. [Buscar elemento Por Texto](#buscar-elemento-por-texto)
1. [Visibilidade link de Cambio](#visibilidade-link-de-cambio)
1. [Controlo de erros de chamada Ajax](#controlo-de-erros-de-chamada-ajax)
1. [Chamadas Plugin Cadeia](#chamadas-plugin-cadeia)
1. [Ordenar a lista de elementos alfabéticamente](#ordenar-a-lista-de-elementos-alfabéticamente)
1. [Desactivar o click direito](#desactivar-o-click-direito)


### Utilizar `noConflict()`

O símbolo  `$` usado pela jQuery também usa outras bibliotecas de JavaScript. Para garantir que a jQuery não entre em conflito com o objeto `$` de diferentes bibliotecas, utiliza o método `noConflict()` ao iniciar o documento:

```javascript
jQuery.noConflict();
```

Agora haverá referência ao objeto jQuery utilizando o nome da variavel `jQuery` no lugar de `$` (por exemplo, `jQuery('div p').hide()`). Se você tem várias versões do jQuery na mesma página, você pode usar o `noConflict ()` para definir um alias para uma versão específica:

```javascript
let $x = jQuery.noConflict();
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Verificando a jQuery Carrgada

Antes de fazeres alguma coisa com jQuery primeiro tens que asegurar-te de que esta carregado:

```javascript
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

Agora que estás fora...

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Verifique se existe um elemento

Antes de usar um elemento HTML, você precisa garantir que ele faça parte do DOM.

```javascript
if ($("#selector").length) {
  //faça algo com element
}
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Utiliza `.on ()` No lugar de uniao `.click ()`

.en O uso de `()` da-lhe varias vantagens sobre o uso de `.click ()`, tais como a capacidade de agrupar varios eventos...

```javascript
.on ('click tap hover')
```

...A uniao aplica-se aos elementos criados de forma dinámica, assim (nao ha necesidade de obrigar manualmente cada elemento adicionados dinámicamente a um elemento DOM) ...

...E a posibilidade de configurar un espaco de nomes:

```javascript
.on('click.menuOpening')
```

Os espacos de nomes dao te o poder para desenlacar um evento específico (por exemplo,`.off('click.menuOpening')`).

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Regressar a botao de inicio

No que toca ao uso da `animate` e métodos `scrollTop` na jQuery nao ee necesario um plugin para criar uma animaciao simple-scroll-a arriba:

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

A mudancao dos cambios de valor `scrollTop` onde se quer que a barra de deslocamento se aterre. Na realidade, tudo o está a fazer e animar o corpo do documento ao durante 800 milisegundos ate que se desloque a parte superior do documento.

**Nota:** Procura por algum [comportamento incorrecto](https://github.com/jquery/api.jquery.com/issues/417) com `scrollTop`.

<sup>[Regressar ao indice de conteudos](#table-of-contents)</sup>


### Carregar preview de imágens

Se a tua página web utiliza una grande quantidade de imágens que nao sao visiveis inicialmente (por exemplo, em visao helicoptero) faz sentido para prever-las:

```javascript
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Comprovar Se as imagens carregaram

As vezes pode ser preciso comprobar se as imagens carregaram completamente a fim de continuar com as sequencias de comandos:

```javascript
$('img').on('load', function () {
  console.log('image load successful');
});
```

Tambiem podes comprovar se uma imagen em particular carregou-se durante a troca da etiqueta `<img>` por um ID ou classe.

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Corrigir imágens automáticamente crashadas

Se por acaso encontrares casos de imagens crashadas no teu site a troca de uma por outra pode seres uma chatice. Este simples pedaco de código pode poupar muitas dores de cabeca:

```javascript
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

Alternativamente, se desejas ocultar simplemente imagens crashadas, este fragmento encarregará-se disso:

```javascript
$('img').on('error', function () {
  $(this).hide();
});
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Publicar um formulario com AJAX

Métodos jQuery AJAX sao uma forma comum para solicitar texto, HTML, XML, JSON o. Se desejas enviar um formulario através da AJAX pode-se recolher os logins do utilizador através do método `val()`:

```javascript
$.post('sign_up.php', {
  user_name: $('input[name=user_name]').val(),
  email:     $('input[name=email]').val(),
  password:  $('input[name=password]').val(),
});
```

Porem, todas estas chamadas `val()`  costumam ser complicadas. Uma melhor maneira de recolher os logins do utilizador sera ao utilizar a funcao  `serialize()`  que recolhe as entradas do utilizador em cadeia:

```javascript
$.post('sign_up', $('#sign-up-form').serialize());
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Alternar classes na libertacao

Digamos que queres trocar o visual de um elemento assim actualizas a página quando um utilizador se desloca sobre ele. Tu podes juntar uma classe ao seu elemento quando o utilizador está a flutuar; quando o utilizador deixa a flutuar a classe e eliminada:

```javascript
$('.btn').on('hover', function () {
  $(this).addClass('hover');
}, function () {
  $(this).removeClass('hover');
});
```

Só tens que adicionar o CSS necessario. Se desejas uma forma mais simples, utiliza o método `toggleClass`:

```javascript
$('.btn').hover(function () {
  $(this).toggleClass('hover');
});
```

**Nota:** CSS pode ser uma solucao mais rápida neste caso, mas vale a pena saber isto.

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Desactivar campos de entrada

As vezes e possivel pretender que o botao de envio de um formulario ou uma das suas entradas de texto esteja desativados ate que o utilizador realize uma acción determinada (por exemplo, controlo da "Ja leram terminais" janela de verificacao). Adicionar o atributo `disabled` a entrada para que se possa activar quando se quer:

```javascript
$('input[type="submit"]').prop('disabled', true);
```

Tudo o que necessitas fazer e executar o método `prop` outra vez na entrada, e depois establecer o valor de `disabled` para `false`:

```javascript
$('input[type="submit"]').prop('disabled', false);
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Deter a carga de Enlaces

As vezes nao queres vínculos para ir a uma determinada página web, nem voltar a carregar a página; e posivele que queiras que se faca outra coisa, como abrir outro script. Isto vai fazer o truque de prevenir a accao por defeito:

```javascript
$('a.no-link').on('click', function (e) {
  e.preventDefault();
});
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### De caché de jQuery selectores

Pense em quantas vezes se escreve o mesmo selector vezes sem conta em qualquer projecto. Cada selector `$('.element')` tem que buscar em todo DOM cada vez, independentemente do seu dito selector havia executado anteriormente. No lugar deste, execute o selector de uma vez e armazena os resultados em uma so variavel:

```javascript
var blocks = $('#blocks').find('li');
```

Agora pode-se utilizar a variavel `blocks` sempre que quiseres sem precisares de buscar el DOM em cada ocasiao:

```javascript
$('#hideBlocks').on('click', function () {
  blocks.fadeOut();
});

$('#showBlocks').on('click', function () {
  blocks.fadeIn();
});
```

O armaenamento em caché selectores de jQuery sao uma ganancia de rendimiento fácil.

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Alavanca de fundo / Slide

Deslizante e a descoloracao sao algo que usamos um monte de vezes em animacoes com jQuery. E possivel que só queiram mostrar um elemento quando um utilizador  clica  em algo, o que faz com que os `fadeIn` e métodos de `slideDown` aperfeicoem. Mas se deseja que o elemento apareca na primera posiciao e logo desaparecem no segundo este vai a funcionar muito bem:

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

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Acordeao simples

Este e um método simples para um acordeao rápido:

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

Diante a adicao deste script, a única coisa que tens que fazer na tua página web e o HTML necessario para ir buscar este trabalho.

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Faz dois Divs na mesma altura

As vezes, vais precisar de dois divs terem a mesma altura nao importa o conteudo:

```javascript
$('.div').css('min-height', $('.main-div').height());
```

Este exmplo establece a `min-height` característica que significa que pode ser maior que o div principal mas nunca mais pequena. Sem obstaculos, um método mais flexible seria um conjunto de elementos e ajustar a altura com a altura do elemento mais alto:

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

Se deseja _todas_ columnas tenham a mesma altura:

```javascript
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});
```

**Nota:** Isto pode fazer se de varias maneiras [em CSS](http://codepen.io/AllThingsSmitty/pen/KMPqoO) mas dependendo das tuas necessidades, saber como fazer isto em jQuery vale a pena.

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Abrir enlaces externos numa nova tab / janela

Abrir enlaces externos  numa nova tab ou janela do browser e garantir enlaces na mesma origem aberta na mesma tab ou janela:

```javascript
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');
```

**Nota:** `window.location.origin` nao funciona no IE10. [Este fix](http://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/) ocupa-se deste problema.

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Buscar elemento Por Texto 
Tendo em conta o uso do selector `contains()` em jQuery  pode-se encontrar texto  contendo um elemento. Se nao existe texto, esse elemento ocultará-se:

```javascript
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Visibilidade link de Cambio

Gatillo JavaScript quando o utilizador ja nao se concentra numa tab, ou volta a centrar-se numa tab:

```javascript
$(document).on('visibilitychange', function (e) {
  if (e.target.visibilityState === 'visible') {
    console.log('Tab is now in view!');
  } else if (e.target.visibilityState === 'hidden') {
    console.log('Tab is now hidden!');
  }
});
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Controlo de erros de chamada Ajax

Quando uma chamada Ajax devolve um erro 404 ou 500 o gestor de erros ira abrir. Se nao se define o controlador, outro código jQuery podera nao funcionar. Definir um controlador global de erros de Ajax:

```javascript
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Chamadas Plugin Cadeia

jQuery permite el "encadeamento" plug-in de chamadas a métodos para mitigar o processo de consulta em repetidas ocasioes o DOM e a creacao de varios objetos jQuery. Digamos que o seguinte fragmento representa as suas chamadas a métodos plugin:

```javascript
$('#elem').show();
$('#elem').html('bla');
$('#elem').otherStuff();
```

Isto poderia melhorar significativamente o uso de encadeamento:

```javascript
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

Uma alternativa e armazenar em caché o elemento numa variavel (com o prefixo `$`):

```javascript
var $elem = $('#elem');
$elem.hide();
$elem.html('bla');
$elem.otherStuff();
```

Ambos os métodos [armazenamento em caché](#cache-jquery-selectors) e o encadeamento  sao as melhores prácticas que tornal o código curto e mais rápido.

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


### Ordenar a lista de elementos alfabéticamente

Digamos que tu terminas com demasiados elementos numa lista. Talvez o conteudo e produzido por um CMS e desejas ordenar por ordem alfabética:

```javascript
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

Tem que ir!

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


<div id="disable-right-click"></div>


### Desactivar o click direito

Se desejas desactivar o botao direito do rato, podes fazer-lo para uma página inteira...

```javascript
$(document).ready(function () {
  $(document).bind('contextmenu', function (e) {
    return false;
  })
})
```

...mas também podes fazer o mesmo para um elemento específico:

```javascript
$(document).ready(function () {
  $('#submit').bind('contextmenu', function (e) {
    return false;
  })
})
```

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>


## Apoio

As versoes actuais de Chrome, Firefox, Safari, Opera, Edge e EI11.

<sup>[Regressar ao índice de conteudos](#table-of-contents)</sup>
