"use strict";

$(function () {
  // $('.js__menu').on('click', function () {
  //     return false;
  // });
  $(window).resize(function () {
    fullPageInit();
    triggerNormalScrolling($('.js__height'));
  }); // destroy fullpage on mobile

  var lengthFullPage = false;
  fullPage($('.js__page-scroll'));
  fullPageInit();

  function fullPage(item) {
    if (lengthFullPage === false) {
      lengthFullPage = true;
      item.fullpage({
        //options here
        autoScrolling: true,
        sectionSelector: '.js__section',
        slideSelector: '.js__slide',
        anchors: ['main', 'about', 'portfolio', 'contacts'],
        // scrollOverflowReset: true,
        // scrollOverflow: true,
        responsiveWidth: false,
        menu: '.menu__list',
        controlArrows: false,
        scrollBar: true,
        normalScrollElements: '.normal-scrolling',
        fitToSection: false,
        onLeave: function onLeave(index, nextIndex) {
          if (nextIndex == 1) {
            $('.header').removeClass('active');
            $('.js__main-link').addClass('disable');
          } else {
            if (nextIndex == 2) {
              counter($('.js__counter'));
            }

            $('.header').addClass('active');
            $('.js__main-link').removeClass('disable');
          }
        }
      });
    }
  } // fullpage.js option (lib for scroll on blocks)


  function fullPageInit() {
    if (window.innerWidth > 1200) {
      fullPage($('.js__page-scroll'));
    } else {
      $.fn.fullpage.destroy('all');
      lengthFullPage = false;
    }
  }

  ;
  $('.js__dropdown').on('click', function () {
    $(this).parent('div').toggleClass('active');
  }); // dropdown for lang block

  $(window).on('load', function () {
    setTimeout(function () {
      height();
    }, 10);
  }); // trigger function height after load page and timeout 10ms

  $(window).resize(height());

  function height() {
    var height = $('.header').outerHeight(true);
    $('.js__background-size').css('background-size', 'auto calc(100% - ' + height + 'px)');
  } // background size for main-page section without header height


  var startCounter = false;

  function counter(item) {
    if (startCounter == false) {
      item.each(function () {
        var currentNumber = $(this).text(),
            $this = $(this);
        startCounter = true;
        $({
          numberValue: 1
        }).animate({
          numberValue: currentNumber
        }, {
          duration: 1000,
          easing: 'linear',
          step: function step() {
            $this.text(Math.ceil(this.numberValue));
          }
        });
      });
    }
  } // animation counter


  $('.js__arrow-next').on('click', function () {
    $.fn.fullpage.moveSlideRight();
  });
  $('.js__arrow-prev').on('click', function () {
    $.fn.fullpage.moveSlideLeft();
  });
  var swiperLenght = '',
      slide = '';

  function sliderLenght(el) {
    swiperLenght = $(el).find('.swiper-wrapper').children('div').length;
    slide = swiperLenght / 2;
  }

  sliderLenght('.js__slider');

  if (swiperLenght > 2) {
    new Swiper(".js__slider", {
      initialSlide: slide.toFixed(),
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true
      }
    });
  } else {
    new Swiper(".js__slider", {});
  } // slider for review


  sliderLenght('.js__carousel');

  if (swiperLenght > 6) {
    var sliderPortfolio = new Swiper('.js__carousel', {
      slidesPerView: 3,
      initialSlide: slide.toFixed() - 1,
      centeredSlides: true,
      roundLengths: true,
      slideToClickedSlide: true,
      // autoplay: {
      //     enabled: true,
      //     delay: 3000
      // },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true
      }
    });
  } else {
    var sliderPortfolio = new Swiper('.js__carousel', {
      slidesPerView: 3,
      centeredSlides: true,
      roundLengths: true,
      navigation: {
        nextEl: '.js__nav-next',
        prevEl: '.js__nav-prev'
      },
      on: {
        init: function init() {
          console.log('init');
          heightForNav();
        }
      }
    });
  } // slider for portfolio


  sliderPortfolio.on("slideChangeTransitionStart", function () {
    // let active = sliderPortfolio.activeIndex;
    $('.js__carousel').find('.swiper-slide-active').addClass('animate');
  });
  sliderPortfolio.on("slideChangeTransitionEnd", function () {
    // let active = sliderPortfolio.activeIndex;
    $('.js__carousel').find('.swiper-slide-active').removeClass('animate');
  }); // new Swiper(".js__scroll-container", {
  //     direction: "vertical",
  //     slidesPerView: "auto",
  //     freeMode: true,
  //     scrollbar: {
  //         el: ".swiper-scrollbar",
  //     },
  // });

  $('[data-fancybox]').fancybox({
    smallBtn: false,
    hideScrollbar: true,
    toolbar: false,
    animationDuration: 300,
    animationEffect: 'slide-in-out'
  }); // fancybox option (modal lib)

  $(".js__textarea textarea").each(function () {
    this.setAttribute("style", "height:" + this.scrollHeight + "px;overflow-y:hidden;");
  }).on("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }); //

  triggerNormalScrolling($('.js__height'));

  function triggerNormalScrolling(item) {
    item.each(function () {
      var $height = $(this).height(),
          triggerHeight = $(this).closest('.js__scroll-container').height();

      if ($height > triggerHeight) {
        $(this).closest('.js__scroll-container').addClass('normal-scrolling');
      } else {
        $(this).closest('.js__scroll-container').removeClass('normal-scrolling');
      }
    });
  } //


  function hideIcon() {
    var contactHeight = $('.js__icon').closest('.js__section').height(),
        contactPosition = $(document).scrollTop(),
        footerPosition = $('footer').position().top; // console.log('number:' + (contactPosition) + ', position: ' + footerPosition + ', height: ' +contactHeight);

    if (contactPosition + contactHeight > footerPosition) {
      $('.js__icon').addClass('hide'); // console.log('true');
    } else {
      // console.log('false');
      $('.js__icon').removeClass('hide');
    }
  }

  ;
  hideIcon();
  $(window).scroll(function () {
    hideIcon();
  });
  cookiesWindow();

  function cookiesWindow() {
    var acceptCookies = false;
    $('.js__btn-cookies').on('click', function () {
      acceptCookies = true;
      localStorage.setItem('accept', acceptCookies);
      $('.js__cookies').addClass('hide');
    });
    var hiddenModal = localStorage.getItem('accept');

    if (hiddenModal != 'true') {
      $('.js__cookies').addClass('open');
    } // localStorage.clear();
    // console.log(localStorage.length);

  }
});