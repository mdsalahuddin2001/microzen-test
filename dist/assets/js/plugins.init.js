/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Swiper slider        *

 ================================*/

//=========================================//
/*            02) Swiper slider            */
//=========================================//

const swiper = new Swiper(".feedbackSwiper", {
  speed: 1000,
  spaceBetween: 10,
  slidesPerView: 1,
  autoplay: {
    duration: 3000,
  },
  loop: true,
  breakpoints: {
    800: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1300: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".nextFeedback",
    prevEl: ".prevFeedback",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
