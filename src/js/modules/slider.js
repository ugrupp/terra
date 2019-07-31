import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', (event) => {
  let sliders = [...document.querySelectorAll('[data-slider]')];
  sliders.forEach((slider) => {
    new Swiper(slider, {
      loop: true,
      speed: 1000,
      grabCursor: true,

      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
      },

      navigation: {
        prevEl: '[data-slider-prev]',
        nextEl: '[data-slider-next]',
      },

      pagination: {
        el: '[data-slider-pagination]',
        type: 'fraction',
      },

      on: {
        slideChange() {
          // change title
          let sliderTitleEl = slider.querySelector('[data-slider-title]');
          if (sliderTitleEl) {
            let activeTitle = this.slides[this.activeIndex].dataset.title;
            if (activeTitle) {
              sliderTitleEl.innerHTML = activeTitle;
              sliderTitleEl.style.opacity = 1;
            } else {
              sliderTitleEl.style.opacity = 0;
            }
          }
        }
      }
    });
  });
});
