


const body = document.querySelector('body'),
  html = document.querySelector('html'),
  menu = document.querySelectorAll('._burger, .header__nav, body'),
  burger = document.querySelector('._burger'),
  wrapper = document.querySelector('.wrapper'),
  header = document.querySelector('.header');


  (function () {
    var FX = {
        easing: {
            linear: function (progress) {
                return progress;
            },
            quadratic: function (progress) {
                return Math.pow(progress, 2);
            },
            swing: function (progress) {
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            },
            circ: function (progress) {
                return 1 - Math.sin(Math.acos(progress));
            },
            back: function (progress, x) {
                return Math.pow(progress, 2) * ((x + 1) * progress - x);
            },
            bounce: function (progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            },
            elastic: function (progress, x) {
                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
            }
        },
        animate: function (options) {
            var start = new Date;
            var id = setInterval(function () {
                var timePassed = new Date - start;
                var progress = timePassed / options.duration;
                if (progress > 1) {
                    progress = 1;
                }
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (progress == 1) {
                    clearInterval(id);
    
                    options.complete();
                }
            }, options.delay || 10);
        },
        fadeOut: function (element, options) {
            var to = 1;
            this.animate({
                duration: options.duration,
                delta: function (progress) {
                    progress = this.progress;
                    return FX.easing.swing(progress);
                },
                complete: options.complete,
                step: function (delta) {
                    element.style.opacity = to - delta;
                }
            });
        },
        fadeIn: function (element, options) {
            var to = 0;
            element.style.display = 'block';
            this.animate({
                duration: options.duration,
                delta: function (progress) {
                    progress = this.progress;
                    return FX.easing.swing(progress);
                },
                complete: options.complete,
                step: function (delta) {
                    element.style.opacity = to + delta;
                }
            });
        }
    };
    window.FX = FX;
  })()
    
    
    
    // =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=
    
    let popupCheck = true, popupCheckClose = true;
    function popup(arg) {
    
      if (popupCheck) {
          popupCheck = false;
      
          let popup, popupClose,
      
              body = arg.body,
              html = arg.html,
              header = arg.header,
              duration = (arg.duration) ? arg.duration : 200,
              id = arg.id;
      
          try {
      
              popup = document.querySelector(id);
              popupClose = popup.querySelectorAll('._popup-close');
      
          } catch {
              return false;
          }
      
          function removeFunc(popup, removeClass) {
      
              if (popupCheckClose) {
                  popupCheckClose = false;
      
                  FX.fadeOut(popup, {
                      duration: duration,
                      complete: function () {
                          popup.style.display = 'none';
                      }
                  });
                  popup.classList.remove('_active');
      
                  setTimeout(() => {
                      popupCheckClose = true;
                  }, duration)
      
                  if (removeClass) {
                      if (header) header.classList.remove('_popup-active');
      
                      setTimeout(function () {
      
                          body.classList.remove('_popup-active');
                          html.style.setProperty('--popup-padding', '0px');
      
                      }, duration)
                  }
              }
          }
      
          body.classList.remove('_popup-active');
          html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
          body.classList.add('_popup-active');
      
          popup.classList.add('_active');
          if (header) header.classList.add('_popup-active');
      
      
          setTimeout(function () {
              FX.fadeIn(popup, {
                  duration: duration,
                  complete: function () {
                  }
              });
          }, duration);
      
      
      
          popupClose.forEach(element => {
              element.addEventListener('click', function () {
                  if (document.querySelectorAll('._popup._active').length <= 1) {
                      removeFunc(popup, true);
                  } else {
                      removeFunc(popup, false);
                  }
                  setTimeout(function () {
                      return false;
                  }, duration)
              });
          })
      
      
          setTimeout(() => {
              popupCheck = true;
          }, duration);
      
      }
    
    }
    
    // =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=



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

      menu.forEach(elem => {
        elem.classList.remove('_active')
      })

    } else if(headerPopupOpen.classList.contains('_active') && headerPopup) {

      headerPopupOpen.classList.remove('_active');
      headerPopup.classList.remove('_active');
      body.classList.remove('_active');
      header.classList.remove('_header-popup-active');

    }
    
  }



  let btnToScroll = thisTarget.closest('._btn-to-scroll');
  if(btnToScroll) {
    event.preventDefault();
    let section;
  
    try {section = document.querySelector(btnToScroll.getAttribute('href'));}catch {section = 0;}
  
    menu.forEach(elem => {
      elem.classList.remove('_active')
    })
  
    window.scroll({
      left: 0,
      top: (section) ? section.offsetTop : 0,
      behavior: 'smooth'
    })
  
  }



  let btnPopup = thisTarget.closest('._open-popup');
  if(btnPopup) {
    event.preventDefault();
  
    popup({
      id: btnPopup.getAttribute('href'),
      html: html,
      body: body,
    });
  
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


// =-=-=-=-=-=-=-=-=-=-=-=- <onscroll> -=-=-=-=-=-=-=-=-=-=-=-=

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

// =-=-=-=-=-=-=-=-=-=-=-=- </onscroll> -=-=-=-=-=-=-=-=-=-=-=-=



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




