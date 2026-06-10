// 4 sec lazyload
function loadScript(url, callback){
    var script = document.createElement("script");
    if (script.readyState){  // IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
          callback();
        };
    }
    script.src = url;
    document.getElementById("ymaps_lazy").append(script);
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function(){
        ..перенесено в custom.js
        // loadScript("https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ade10cd703999873b83a1849058be30acc9f9e1c8c106d81832972f69b5822ae5&amp;width=100%25&amp;height=550&amp;lang=ru_RU&amp;scroll=true" ,
        // loadScript(		"https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A04a8e00d3d756f3bb8c985c50f72712a73a94044c9272a1820b2c96e3a5ab3e3&amp;width=100%25&amp;height=550&amp;lang=ru_RU&amp;scroll=true" ,
		//"https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aafb014c55b012f74aace9f2aa03513e60f3f9bb14f26648fd5bebe0077c39459&amp;width=100%25&amp;height=550&amp;lang=ru_RU&amp;scroll=true" ,
        // loadScript("https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af58113ed258aeb9bb21bb696fa039a817bd7cb1af3c9de4bc3fc31d2609f7124&amp;width=100%25&amp;height=550&amp;lang=ru_RU&amp;scroll=true" ,
        function(){});
   }, 6000);
});
$(".workshop-area").slick({infinite:!0,dots:!0,slidesToShow:2,slidesToScroll:2,arrows:!0,autoplay:!0,autoplaySpeed:4400,responsive:[{breakpoint:1400,settings:{slidesToShow:2,slidesToScroll:2,infinite:!0}},{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:2,arrows:!1,dots:!0}},{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0,dots:!1}}]});