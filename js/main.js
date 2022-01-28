
const body = document.querySelector('body'),
  html = document.querySelector('html'),
  menu = document.querySelectorAll('._burger, .header__nav, body'),
  burger = document.querySelector('._burger'),
  wrapper = document.querySelector('.wrapper'),
  header = document.querySelector('.header');



let thisTarget;
body.addEventListener('click', function (event) {

  thisTarget = event.target;

  // Меню в шапке
  if (thisTarget.closest('._burger')) {
    menu.forEach(elem => {
      elem.classList.toggle('_active')
    })
  }


})


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let weldingCategorySlider, aboutUsCertigicatesSlider;

let weldingCategorySliderCheck = document.querySelector('.welding-category__slider'),
  aboutUsCertigicatesSliderCheck = document.querySelector('.about-us__certificates');

  new Swiper('.welding-type-page__slider--container', {

    spaceBetween: 10,
    slidesPerView: 2,
    centeredSlides: false,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }

  });

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}



function scrollPage() {

  const offsetCheckJs = document.querySelector('.offset-check-js');
  let top = [getCoords(offsetCheckJs).top, false];

  header.classList.add('_loaded');

  function scrollPageFunc() {
    top[0] = getCoords(offsetCheckJs).top;

    if (top[0] >= 300 && top[1] == false) {

      top[1] = true;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function () {
        header.classList.add('_active');
        header.style.setProperty('--pos', '0%');
        header.style.setProperty('--header-height', header.offsetHeight + 'px');
      }, 200);

    } else if (top[0] <= 300 && top[1] == true) {

      top[1] = false;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function () {
        header.style.setProperty('--pos', '0%');
        header.classList.remove('_active');
        header.style.setProperty('--header-height', header.offsetHeight + 'px');

      }, 200);

    }
  }

  scrollPageFunc();

  window.onscroll = scrollPageFunc;

}

scrollPage();





// =-=-=-=-=-=-=-=-=-=-=-=- <window.resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {},
  windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {

  if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
    resizeCheck[String(size)] = false;
    maxWidth(); // < size

  }
  if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
    resizeCheck[String(size)] = true;
    minWidth(); // > size

  }

}

function resize() {

  windowSize = window.innerWidth;

  html.style.setProperty('--header-height', header.offsetHeight + 'px');
  resizeCheckFunc(768,
    function () {  // screen > 768px

      if (weldingCategorySlider) weldingCategorySlider.destroy(true, true);
      if (aboutUsCertigicatesSlider) aboutUsCertigicatesSlider.destroy(true, true);

    },
    function () {  // screen < 768px

      if (weldingCategorySliderCheck) {
        weldingCategorySlider = new Swiper('.welding-category__slider', {

          spaceBetween: 30,
          slidesPerView: 1,
          centeredSlides: false,

          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },

        });
      }


      if (aboutUsCertigicatesSliderCheck) {
        aboutUsCertigicatesSlider = new Swiper('.about-us__certificates', {

          spaceBetween: 10,
          slidesPerView: 3,
          centeredSlides: false,

          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },

        });
      }

    });
  resizeCheckFunc(992,
    function () {  // screen > 992px

      menu.forEach(elem => {
        elem.classList.remove('_active')
      })

    },
    function () {  // screen < 992px

      header.style.setProperty('--header-height', header.offsetHeight + 'px');
      
    });

}

resize();

window.onresize = resize;


// =-=-=-=-=-=-=-=-=-=-=-=- <window.resize> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
