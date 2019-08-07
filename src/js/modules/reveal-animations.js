// Reveal animations
// scrollreaveal should be a window variable, set in the <head> script

if (typeof window.sr !== 'undefined') {
  window.sr.reveal('[data-reveal]', {
    duration: 1250,
    distance: '0px',
    interval: 100,
    viewFactor: 0.1,
  });
}
