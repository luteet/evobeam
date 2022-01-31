


const body = document.querySelector('body'),
  html = document.querySelector('html'),
  menu = document.querySelectorAll('._burger, .header__nav, body'),
  burger = document.querySelector('._burger'),
  wrapper = document.querySelector('.wrapper'),
  header = document.querySelector('.header');



let thisTarget, slideCheck = true;
body.addEventListener('click', function (event) {

  thisTarget = event.target;

  // Меню в шапке
  if (thisTarget.closest('._burger')) {
    menu.forEach(elem => {
      elem.classList.toggle('_active')
    })
  }


  let slideBtn = thisTarget.closest('._slide-btn');
  if(slideBtn) {
    
    let slideElem     = document.querySelector('#' + slideBtn.dataset.slideId),
        slideBtnText  = slideBtn.querySelector('.welding-page__table-info--slide-text');

    
    if(slideElem) {

      if(!slideElem.classList.contains('_active')) {
        slideElem.classList.add('_active');
        slideBtn.classList.add('_active');
        
        if(slideBtn.dataset.active && slideBtn.dataset.default && slideBtnText) slideBtnText.textContent = slideBtn.dataset.active;

      } else {
        slideElem.classList.remove('_active');
        slideBtn.classList.remove('_active');
        
        if(slideBtn.dataset.active && slideBtn.dataset.default && slideBtnText) slideBtnText.textContent = slideBtn.dataset.default;

      }
      
    }


  }



  let headerPopupOpen = thisTarget.closest('._header-popup-open');
  if(headerPopupOpen) {
    event.preventDefault();

    let headerPopup = document.querySelector(headerPopupOpen.getAttribute('href'));

    if(!headerPopupOpen.classList.contains('_active') && headerPopup) {
      
      headerPopupOpen.classList.add('_active');
      headerPopup.classList.add('_active');
      body.classList.add('_active');
      header.classList.add('_header-popup-active');

    } else if(headerPopupOpen.classList.contains('_active') && headerPopup) {

      headerPopupOpen.classList.remove('_active');
      headerPopup.classList.remove('_active');
      body.classList.remove('_active');
      header.classList.remove('_header-popup-active');

    }
    
  }


})


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let weldingCategorySlider, aboutUsCertigicatesSlider;

let weldingCategorySliderCheck = document.querySelector('.welding-category__slider'),
  aboutUsCertigicatesSliderCheck = document.querySelector('.about-us__certificates');

  new Swiper('.welding-type-page__slider--block', {

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
      992: {
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

let sticky;


function scrollPage() {


  const offsetCheckJs = document.querySelector('.offset-check-js');
  let top = [getCoords(offsetCheckJs).top, false];

  let headerPopup = document.querySelectorAll('._header-popup');

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
        if(headerPopup[0]) {
          headerPopup.forEach(element => {
            element.style.setProperty('--header-height', header.offsetHeight + 'px');
          })
        }
      }, 200);

    } else if (top[0] <= 300 && top[1] == true) {

      top[1] = false;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function () {
        header.style.setProperty('--pos', '0%');
        header.classList.remove('_active');
        header.style.setProperty('--header-height', header.offsetHeight + 'px');
        if(headerPopup[0]) {
          headerPopup.forEach(element => {
            element.style.setProperty('--header-height', header.offsetHeight + 'px');
          })
        }
      }, 200);

    }
  }

  scrollPageFunc();

  window.onscroll = scrollPageFunc;

}

scrollPage();





// =-=-=-=-=-=-=-=-=-=-=-=- <window.resize> -=-=-=-=-=-=-=-=-=-=-=-=

let firstStart = true;

let appendElem = document.querySelectorAll('._append-elem'),
    appendElemList = [];

if(appendElem[0]) {
  appendElem.forEach(thisElement => {
    appendElemList.push([thisElement, thisElement.parentNode, document.querySelector(thisElement.dataset.appendTo)]);
  })
}

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

  if(!header.classList.contains('_active')) html.style.setProperty('--header-height', header.offsetHeight + 'px');
  resizeCheckFunc(768,
    function () {  // screen > 768px

      if (weldingCategorySlider) weldingCategorySlider.destroy(true, true);
      if (aboutUsCertigicatesSlider) aboutUsCertigicatesSlider.destroy(true, true);

      if(appendElem[0]) {
        for(let index = 0; index<appendElemList.length; index++) {

          if(appendElemList[index][2]) {
            appendElemList[index][2].append(appendElemList[index][0]);
          }
          
        }
      }

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

      if(appendElem[0] && !firstStart) {
        for(let index = 0; index<appendElemList.length; index++) {

          if(appendElemList[index][1]) {
            appendElemList[index][1].append(appendElemList[index][0]);
          }
          
        }
      }


    });
  resizeCheckFunc(992,
    function () {  // screen > 992px

      /* menu.forEach(elem => {
        elem.classList.remove('_active')
      }) */

      //html.style.setProperty('--header-height', header.offsetHeight + 'px');
      /* if(header.classList.contains('_active')) {
        header.classList.remove('_active');
        html.style.setProperty('--header-height', header.offsetHeight + 'px');
        header.classList.add('_active');
      } else {
        html.style.setProperty('--header-height', header.offsetHeight + 'px');
      } */

    },
    function () {  // screen < 992px

      if(header.classList.contains('_active')) {
        header.classList.remove('_active');
        html.style.setProperty('--header-height', header.offsetHeight + 'px');
        header.classList.add('_active');
      } else {
        html.style.setProperty('--header-height', header.offsetHeight + 'px');
      }
      
      
  });

  firstStart = false;

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
