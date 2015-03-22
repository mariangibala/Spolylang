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
    
        $("#menuView").velocity("stop").velocity({"left":$(window).width(), opacity:0},{duration:400, easing:"easeOutQuart"})
        $("#view1").velocity("stop").velocity({"left":0, opacity:1},{duration:400, easing:"easeOutQuart"})
        menuActive = !menuActive;
    
    } else {
    
    
        $("#menuView").velocity("stop").velocity({"left":0, opacity:1},{duration:400, easing:"easeOutQuart"})
        $("#view1").velocity("stop").velocity({"left":$(window).width()*-1, opacity:0},{duration:400, easing:"easeOutQuart"})
        menuActive = !menuActive;
    
    }


})






return views;


}())

