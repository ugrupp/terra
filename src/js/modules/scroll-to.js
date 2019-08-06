import SmoothScroll from 'smooth-scroll';

document.addEventListener('DOMContentLoaded', (event) => {
  new SmoothScroll('[data-scroll-top]', {
    speed: 300,
    header: '[data-topbar]',
  });

  new SmoothScroll('[data-scroll-content]', {
    speed: 300,
    header: '[data-topbar]',
  });

  new SmoothScroll('[data-scroll]', {
    speed: 300,
    header: '[data-topbar]',
  });
});
