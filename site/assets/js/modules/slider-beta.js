import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', () => {
  let sliders = [...document.querySelectorAll('[data-slider-beta]')];
  sliders.forEach((sliderWrapper) => {
    const slider = sliderWrapper.querySelector(".swiper-container");
    const containerSentinel = sliderWrapper.querySelector(
      "[data-slider-beta-container-sentinel]"
    );

    if (slider) {
      const swiper = new Swiper(slider, {
        loop: true,
        speed: 1000,
        grabCursor: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        breakpointsInverse: true,
        breakpoints: {
          1700: {
            spaceBetween: 80,
            centeredSlides: true,
          },
        },

        autoplay: {
          delay: 4000,
        },

        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazy: {
          loadPrevNext: true,
          loadOnTransitionStart: true,
        },

        navigation: {
          prevEl: "[data-slider-beta-prev]",
          nextEl: "[data-slider-beta-next]",
        },

        on: {
          init: function () {
            slider.classList.add("swiper-initialized");
          },
        },
      });


      const setSlideWidth = () => {
        if (containerSentinel) {
          swiper.slides.css("width", `${containerSentinel.offsetWidth}px`);
          swiper.update();
        }
      };

      setSlideWidth();
      swiper.on("resize", setSlideWidth);

      if (typeof swiper.navigation === "object") {
        [swiper.navigation.prevEl, swiper.navigation.nextEl].forEach((el) => {
          el.addEventListener("click", (e) => {
            e.currentTarget.blur();
          });
        });
      }
    }
  });
});
