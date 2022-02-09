import 'cookieconsent';

window.addEventListener('load', () => {
  window.cookieconsent.initialise({
    'palette': {
      'popup': {
        'background':
          '#00a65c',
        'text':
          '#ffffff',
      },
    },
    'elements': {
      'dismiss': '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss"><span class="c-button__text">Verstanden</span></a>',
    },
    'position': 'bottom-right',
    'content': {
      'message': 'Wir verwenden Cookies. Durch die weitere Nutzung unserer Website stimmen Sie der Verwendung dieser Cookies zu.',
      'dismiss': 'Verstanden',
      'link': 'Mehr erfahren?',
      'href': 'https://www.terra-boden.de/datenschutz/',
    },
  });
});
