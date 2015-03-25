!(function() {

// ----------------------------------------------------
// Views //
//-----------------------------------------------------

var views = {} 
views.init = function(){


var menuActive = false
mainView =  $("#view1")
$("#menuView").css("display","block")

$("#menuView").css("left",$(window).width())

$("#menuIcon").on("click touchend", function(e){

    e.preventDefault();
    
    if (menuActive) {
    
        $("#menuView").velocity("stop").velocity({left: $(window).width(), opacity:0},{ duration:400, easing:"easeOutQuart"})
        mainView.velocity("stop").velocity({left:0, opacity:1},{delay:200, duration:400, easing:"easeOutQuart"})
        menuActive = !menuActive;
        
		
		if (core.game.isPlaying() == true) core.eventBus.triggerHandler("continueGame");
		
    
    } else {
    
    
        $("#menuView").velocity("stop").velocity({left:0, opacity:1},{delay:200, duration:400, easing:"easeOutQuart"})
        mainView.velocity("stop").velocity({left: $(window).width()*-1, opacity:0},{duration:400, easing:"easeOutQuart"})
        menuActive = !menuActive;
		
		core.eventBus.triggerHandler("pauseGame")
    
    }


})

core.eventBus.on("startApp", function(){

    mainView.velocity({opacity:1},{display:"block"})

})

}


return window.views = views;


})();

