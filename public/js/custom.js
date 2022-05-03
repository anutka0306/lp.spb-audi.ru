$(document).ready(function (){
$("input[type='phone']").inputmask("+7-999-999-99-99");
$("input[type='tel']").inputmask("+7-999-999-99-99");
    if(window.innerWidth <= 420){
        $(window).scroll(function() {
           $('.top-menu').css({'background-color':'rgba(0,0,0,.8)'});
        });
    }

   $(".photo-service__slick1") .slick({
       infinite: true,
       autoplay: true,
       dots: true,
   });

    $(".photo-service__slick2") .slick({
        infinite: true,
        autoplay: true,
        dots: true,
    });

    $(".our-works__slider_content").slick({
       infinite: true,
       autoplay: false,
       dots: false,
       arrows: true,
    });
    $('.our-works__slider_content').on('beforeChange', function(event, slick, currentSlide, nextSlide){
       let current = $('.our-works__slider_content .slick-slide[data-slick-index ='+nextSlide+']').attr('data-image');
       $('.our-works__slider_img img').attr('src', '/images/news/'+current);
        console.log(current);
    });

    $(".all-reviews").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:false,
                    dots:true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $(".drive-reviews").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:false,
                    dots:true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $(".google-reviews").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:false,
                    dots:true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $(".gis-reviews").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:false,
                    dots:true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $(".yandex-reviews").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:false,
                    dots:true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $(".certificates__slider") .slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        dots: true,
        arrows:false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false,
                    dots:true,
                }
            },

            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });


    /* Popup */
    $('.header__callback_btn').magnificPopup({
        type: 'inline',
        focus: '#popup1_tel'
    });

    $('.about_send_btn').magnificPopup({
        type: 'inline',
        focus: '#popup1_tel'
    });

    $('.offer_btn').magnificPopup({
        type: 'inline',
        focus: '#popup1_tel'
    });

    $('.map__callback_btn').magnificPopup({
        type: 'inline',
        focus: '#popup1_tel'
    });



    $('.consult_btn').magnificPopup({
        type: 'inline',
        focus: '#popup1_tel'
    });


    $('.popup_close').click(function () {
        $.magnificPopup.close();
    });


});