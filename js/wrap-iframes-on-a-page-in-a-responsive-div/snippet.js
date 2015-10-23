var sources = '[src*="youtube.com"],[src*="vimeo.com"],[src*="google.com/maps/embed?"]';

$('iframe').filter(sources).wrap('<div class="iframe-container" />');