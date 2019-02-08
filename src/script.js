$(document).ready(function(){
    var toggle = document.querySelector(".nav-toggle");
    var oldHeight;
    var newHeight;
    toggle.addEventListener("click", function(e) {
        this.classList.toggle("opened");
        $(".header__column").toggle();
    })();
});


//choice marker
$(".examples__choice").click(function(){
    if(!($(this).hasClass("examples__choice_active"))){
        $(this).addClass("examples__choice_active");
        $(this).next().removeClass("examples__choice_active");
        $(this).prev().removeClass("examples__choice_active");
        if($(this).hasClass("examples__choice_scheme")){
            $(this).closest(".examples__container").next().children(":first").addClass("examples__room_scheme");
        }else{
            $(this).closest(".examples__container").next().children(":first").removeClass("examples__room_scheme");
        }
    }
});

//hover on picture
$(".examples__roomContainer").hover(function(){
    $(this).children(".examples__room").css("opacity", "0.7");
    $(this).children(".examples__roomLoop").css("display", "block");
}, function(){
    $(this).children(".examples__room").css("opacity", "1");
    $(this).children(".examples__roomLoop").css("display", "none");
});

//click on picture
$(".examples__roomContainer").click(function(){
    var exaRoom = this;
    setTimeout(function(){
        var imgUrl = $(exaRoom).children(".examples__room").css('background-image');
        imgUrl = imgUrl + " no-repeat center/contain";
        $(".hidden__container").css({"display":"block", "cursor":"pointer", "background-color":"#fff"});
        $(".hidden").css({"background":imgUrl, "z-index":"101"});
        $(".examples__roomContainer").css({"display":"none"});
        $("body").css("overflow","hidden");
        $(".slider").css("display","none");
        $(".header__hidden").css({"display":"none"});
        $(".map").css({"display":"none"});
    }, 10);
})

//close picture
$("main").click(function(){
    if($(".hidden").css("display") == "block"){
        $(".hidden__container").css({"display":"none"});
        $(".hidden").css({"z-index":"-10"});
        $("main").css({"cursor":"default"});
        $(".examples__roomContainer").css({"display":"block"});
        $("body").css("overflow","auto");
        $(".slider").css("display","block");
        $(".header__hidden").css({"display":"block"});
        $(".map").css({"display":"block"});
    }
})

//slow anchor
$(".header__link").click(function() {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({
    scrollTop: destination
    }, 500);
    return false;
});

//hidden menu
$(window).scroll(function(){
    var headerHeight = $(".header").height();
    if(headerHeight < $(window).scrollTop()){
        $(".header__hidden").css({"display":"block"});
    }else{
        $(".header__hidden").css({"display":"none"});
    }
});

//yandex map
ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        center: [48.703357, 44.510123],
        zoom: 16,
        controls: []
    }),

    HintContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="font-size: 16px">$[properties.hintContent]</div>'
    ),

    markFirst = new ymaps.Placemark([48.703357, 44.510123], {
        hintContent: 'Станция скоростного трамвая "Пионерская"'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/markFirst.png',
        // Размеры метки.
        iconImageSize: [60, 72],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -60],
        hintContentLayout: HintContentLayout
    }),

    markSecond = new ymaps.Placemark([48.701056, 44.519428], {
        hintContent: 'ЖК Тест, отдел продаж'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/markSecond.png',
        iconImageSize: [60, 72],
        iconImageOffset: [-5, -60],
        hintContentLayout: HintContentLayout
    }),

    markThird = new ymaps.Placemark([48.707190, 44.520023], {
        hintContent: 'Центральный рынок'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/markThird.png',
        iconImageSize: [60, 72],
        iconImageOffset: [-5, -60],
        hintContentLayout: HintContentLayout
    })

    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects
        .add(markFirst)
        .add(markSecond)
        .add(markThird);
});
