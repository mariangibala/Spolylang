// ----------------------------------------------------
// Views //
//-----------------------------------------------------
var view = (function(){

var views = {}

var menuActive = false

$("#menuView").css("left",$(window).width())

$("#menu").on("click touchend", function(e){

    e.preventDefault();
    
    if (menuActive) {
    
        $("#menuView").stop(true,true).animate({"left":$(window).width(), opacity:0},{duration:400, easing:"easeOutQuart"})
        $("#view1").stop(true,true).animate({"left":0, opacity:1},{duration:400, easing:"easeOutQuart"})
        menuActive = !menuActive;
    
    } else {
    
    
        $("#menuView").stop(true,true).animate({"left":0, opacity:1},{duration:400, easing:"easeOutQuart"})
        $("#view1").stop(true,true).animate({"left":$(window).width()*-1, opacity:0},{duration:400, easing:"easeOutQuart"})
        menuActive = !menuActive;
    
    }


})






return views;


}())

