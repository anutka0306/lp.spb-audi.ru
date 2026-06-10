$(document).ready(function () {
  $("input[type='phone']").inputmask("+7-999-999-99-99"),
    $("input[type='tel']").inputmask("+7-999-999-99-99"),
    window.innerWidth <= 420 &&
      $(window).scroll(function () {
        $(".top-menu").css({ "background-color": "rgba(0,0,0,.8)" });
      }),
    $(".photo-service__slick1").slick({ infinite: !0, autoplay: !0, dots: !0 }),
    $(".photo-service__slick2").slick({ infinite: !0, autoplay: !0, dots: !0 }),
    $(".our-works__slider_content").slick({
      infinite: !0,
      autoplay: !1,
      dots: !1,
      arrows: !0,
    }),
    $(".our-works__slider_content").on("beforeChange", function (o, s, i, e) {
      let l = $(
        ".our-works__slider_content .slick-slide[data-slick-index =" + e + "]"
      ).attr("data-image");
      $(".our-works__slider_img img").attr("src", "/images/news/" + l),
        console.log(l);
    }),
    $(".all-reviews").slick({
      infinite: !0,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1400,
          settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: !1,
            dots: !0,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !0,
            dots: !1,
          },
        },
      ],
    }),
    $(".drive-reviews").slick({
      infinite: !0,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: !0,
      responsive: [
        {
          breakpoint: 1400,
          settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: !1,
            dots: !0,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !0,
            dots: !1,
          },
        },
      ],
    }),
    $(".google-reviews").slick({
      infinite: !0,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: !0,
      responsive: [
        {
          breakpoint: 1400,
          settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: !1,
            dots: !0,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !0,
            dots: !1,
          },
        },
      ],
    }),
    $(".gis-reviews").slick({
      infinite: !0,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1400,
          settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: !1,
            dots: !0,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !0,
            dots: !1,
          },
        },
      ],
    }),
    $(".yandex-reviews").slick({
      infinite: !0,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1400,
          settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: !1,
            dots: !0,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !0,
            dots: !1,
          },
        },
      ],
    }),
    $(".certificates__slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: !0,
      autoplay: !0,
      dots: !0,
      arrows: !1,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 2, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !1,
            dots: !0,
          },
        },
      ],
    }),
    $(".header__callback_btn").magnificPopup({
      type: "inline",
      focus: "#popup1_tel",
    }),
    $(".about_send_btn").magnificPopup({
      type: "inline",
      focus: "#popup1_tel",
    }),
    $(".offer_btn").magnificPopup({ type: "inline", focus: "#popup1_tel" }),
    $(".map__callback_btn").magnificPopup({
      type: "inline",
      focus: "#popup1_tel",
    }),
    $(".consult_btn").magnificPopup({ type: "inline", focus: "#popup1_tel" }),
    $(".popup_close").click(function () {
      $.magnificPopup.close();
    });
}),
  $(document).ready(function () {
    $(".popup1_send").click(function (o) {
      if ((o.preventDefault(), "" == $("#popup1_tel").val()))
        return void alert("Заполните поле телефон");
      if ($("#popup1_tel").val().length < 11)
        return void alert("Неверный формат номер телефона");
      let s = $("#popup1_tel").val(),
        i = $("#popup1_name").val(),
        l = $("#popup1_address").val();
      $.ajax({
        url: "/callback_form",
        type: "POST",
        dataType: "html",
        data: { phone: s, name: i, address: l },
        success: function (o) {
          $.magnificPopup.close(),
            console.log(o),
            window.location.replace("/confirm");
        },
        error: function (o) {
          console.log("error");
        },
      });
    });
  });



  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });