/*  ---------------------------------------------------
    Theme Name: Staging
    Description: Staging bootstrap tamplate
    Author: Colorib
    Author URI: https://www.colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });


    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*-----------------------
        Hero Slider
    ------------------------*/
    $(".hero__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        nav: true,
        navText: ["<i class='fa fa-angle-left'><i/>", "<i class='fa fa-angle-right'><i/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1500,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false,
        onInitialized: function (e) {
            var a = this.items().length;
            $("#snh-1").html("<span>01</span><span>" + "0" + a + "</span>");
            var presentage = Math.round((100 / a));
            $('.slider__progress span').css("width", presentage + "%");
        }
    }).on("changed.owl.carousel", function (e) {
        var b = --e.item.index,
            a = e.item.count;
        $("#snh-1").html("<span> " + "0" + (1 > b ? b + a : b > a ? b - a : b) + "</span><span>" + "0" + a + "</span>");

        var current = e.page.index + 1;
        var presentage = Math.round((100 / e.page.count) * current);
        $('.slider__progress span').css("width", presentage + "%");
    });

    /*--------------------------
        Project Slider
    ----------------------------*/
    $(".project__slider").owlCarousel({
        loop: true,
        margin: 0,
        dots: false,
        nav: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 2
            }
        }
    });

    $(".achievement__slider").owlCarousel({
        loop: true,
        autoplay: false,
        margin: 30,
        nav: true,
        dots: false,
        smartSpeed: 500,
        autoplayTimeout: 10000,
        navText: ["<span class=\"fa fa-angle-left\"></span>", "<span class=\"fa fa-angle-right\"></span>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 2.25545
            }

        }

    });

    /*-----------------------------
        Testimonial Slider
    -------------------------------*/
    $('.testimonial__carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        // autoplay:true,
        adaptiveHeight: true,
        asNavFor: '.testimonial__client',
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"><i></i></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"><i></i></i></button>',
    });
    $('.testimonial__client').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.testimonial__carousel',
        arrows: false,
        variableWidth: true,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false
                }
            }
        ]

    });

    /*---------------------------------
        Logo Carousel
    ----------------------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 80,
        items: 5,
        dots: false,
        nav: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            320: {
                items: 2
            },
            576: {
                items: 3
            },
            992: {
                items: 5
            },
        }
    });

    /*------------------
        Counter
    --------------------*/
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });


    /*------------------
       Video Pop-up
   --------------------*/

    $(document).ready(function () {
        function openVideoPopup(popupId, videoType, videoElement) {
            $(popupId).fadeIn('slow');
            $('#fullscreenContainer').fadeIn('slow');
            $('body').addClass('no-scroll');
            $('.project__slider').css('z-index', '-1');


            if (videoType === 'local') {
                const video = $(videoElement)[0];
                if (video && video.paused) {
                    video.play();
                }
            } else if (videoType === 'youtube') {
                const iframe = $(videoElement);
                let src = iframe.attr('src');
                if (!src.includes('autoplay=1')) {
                    iframe.attr('src', src + (src.includes('?') ? '&autoplay=1' : '?autoplay=1'));
                }
            }
        }

        function closeVideoPopup() {
            $('.video-popup').fadeOut('slow');
            $('#fullscreenContainer').fadeOut('slow');
            $('body').removeClass('no-scroll');
            $('.project__slider').css('z-index', 'auto');

            $('.video-popup video').each(function () {
                const video = $(this)[0];
                if (video && !video.paused) {
                    video.pause();
                    video.currentTime = 0;
                }
            });


            $('.video-popup iframe').each(function () {
                const iframe = $(this);
                let src = iframe.attr('src');
                iframe.attr('src', '');
                iframe.attr('src', src.replace('&autoplay=1', '').replace('?autoplay=1', ''));
            });
        }


        $(document).on('click', '[data-video]', function (e) {
            e.preventDefault();

            const videoType = $(this).data('video-type');
            const popupId = $(this).data('popup-id');
            const videoElement = $(this).data('video-element');

            openVideoPopup(popupId, videoType, videoElement);
        });


        $('.popup-bg, .close-btn').on('click', function () {
            closeVideoPopup();
            return false;
        });


        $(document).on('keydown', function (event) {
            if (event.key === 'Escape') {
                closeVideoPopup();
            }
        });
    });






})(jQuery);