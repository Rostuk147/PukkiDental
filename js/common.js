var _functions = {};
$(function () {

    "use strict";

    /*================*/
    /* 01 - VARIABLES */
    /*================*/
    var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

    /*========================*/
    /* 02 - page calculations */
    /*========================*/
    _functions.pageCalculations = function () {
        winW = $(window).width();
        winH = $(window).height();
    };

    /*=================================*/
    /* 03 - function on document ready */
    /*=================================*/
    if (_ismobile) $('body').addClass('mobile');
    _functions.pageCalculations();

    /*============================*/
    /* 04 - function on page load */
    /*============================*/
    $(window).load(function () {
        initSwiper();
        $('body').addClass('loaded');
        $("body").niceScroll({
            cursorcolor: "#131719",
            cursorwidth: "10px",
            zindex: 1000,
            scrollspeed: 100
        });
        window.setTimeout(() => {
            $('#loader-wrapper').fadeOut();
        }, 400);
    });

    /*==============================*/
    /* 05 - function on page resize */
    /*==============================*/
    _functions.resizeCall = function () {
        _functions.pageCalculations();
    };
    if (!_ismobile) {
        $(window).resize(function () {
            _functions.resizeCall();
        });
    } else {
        window.addEventListener("orientationchange", function () {
            _functions.resizeCall();
        }, false);
    }

    /*==============================*/
    /* 06 - function on page scroll */
    /*==============================*/
    $(window).scroll(function () {
        _functions.scrollCall();
    });
    var isStartCount = true;
    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();
        if (winScr > 0) {
            $('body').addClass('fixed');
        } else {
            $('body').removeClass('fixed');
        }
        var aboutSection = $("#about").offset().top - 300;
        winScr - 300;
        if (winScr >= aboutSection) {
            if (isStartCount) {
                CountFunc();
                isStartCount = false;
            }
        }
    };

    /*=====================*/
    /*  - swiper sliders */

    /*=====================*/

    function initSwiper() {
        var homeSwiper = new Swiper('.swiper-container', {
            speed: 700,
            loop: true,
            autoplay: {
                delay: 4000
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets',
            },
        });

        var ourTeamSwiper = new Swiper('.swiper-ourTeam-container', {
            slidesPerView: 4,
            spaceBetween: 5,
            breakpoints: {
                767: {
                    slidesPerView: 1
                },
                991: {
                    slidesPerView: 2
                }
            },
            speed: 700,
            loop: true,
            autoplay: {
                delay: 4000
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets',
            },
        });
    }

    var wow = new WOW(
        {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            scrollContainer: null,
            resetAnimation: true
        }
    );
    wow.init();


    //tabs
    var tabsFinish = 0;
    $('.tab-menu').on('click', function () {
        if ($(this).hasClass('active') || tabsFinish) return false;
        tabsFinish = 1;
        var tabsWrapper = $(this).closest('.tabs-block'),
            tabsMenu = tabsWrapper.find('.tab-menu'),
            tabsItem = tabsWrapper.find('.tab-entry'),
            index = tabsMenu.index(this);

        tabsItem.filter(':visible').fadeOut(function () {
            tabsItem.eq(index).fadeIn(function () {
                tabsFinish = 0;
            });
        });
        tabsMenu.removeClass('active');
        $(this).addClass('active');
    });

    //accordeon
    $('.accordeon-title').on('click', function () {
        $(this).closest('.accordeon').find('.accordeon-title').not(this).removeClass('active').next().slideUp();
        $(this).addClass('active').next().slideDown();
    });

    //Toggle Burger Menu
    $('.burger').on('click', function () {
        $(this).toggleClass('burger2-open');
        $(this).closest('header').find('.navigation-wrapp').toggleClass('active');
    });


    //Counter
    function CountFunc() {
        $('.count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 6000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

    var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1600);
        e.preventDefault();
    });


    $(window).scroll(function () {
        var fromTop = $(this).scrollTop() + topMenuHeight;
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });

        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    $('.navigation ul li a').on('click', function () {
        $(this).closest('.navigation-wrapp').removeClass('active');
        $(this).closest('header').find('.burger2').removeClass('burger2-open');
    });

    $("#datepicker").datepicker();

});

