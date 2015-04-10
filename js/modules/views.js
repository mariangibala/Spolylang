!(function() {

// ----------------------------------------------------
// Views //
//-----------------------------------------------------

var views = {} 
views.init = function(){

// move all views to right side
var view = $(".view")
view.css("left",$(window).width())
view.css("display","block")

// views tree stores user jurney through views (main >> menu >> options etc.) 
var viewsTree = ["main"]


views.open = function(requestedView){

    var currentView = viewsTree[viewsTree.length - 1];
    
    if (currentView == requestedView) return;
    
    // store requested view in the array
    viewsTree.push(requestedView)
    
    // convert views names to jQuery selectors
    currentView = "#" + currentView;
    currentView = $(currentView)
  
    
    requestedView = "#" + requestedView;
    requestedView = $(requestedView)
    
    // animate views out-in
    currentView.velocity("stop").velocity({left: $(window).width()*-1, opacity:0},{duration:400, easing:"easeOutQuart"})
    requestedView.velocity("stop").velocity({left:0, opacity:1},{delay:200, duration:400, easing:"easeOutQuart"})
    
    // trigger pause
    core.eventBus.triggerHandler("pauseGame")
    

}


views.close = function(){
    
    var currentView = viewsTree.pop()
    var newView = viewsTree[viewsTree.length - 1];
       
    // convert views names to jQuery selectors
    currentView = "#" + currentView;
    currentView = $(currentView);
    
    newView = "#" + newView;
    newView = $(newView);
    
      
    // animate views out-in
    currentView.velocity("stop").velocity({left: $(window).width(), opacity:0},{ duration:400, easing:"easeOutQuart"})
    newView.velocity("stop").velocity({left:0, opacity:1},{delay:200, duration:400, easing:"easeOutQuart"})
    
    // continue game if started
    if (core.game.isPlaying() == true) core.eventBus.triggerHandler("continueGame");
    

};


$(".navigationIcon").on("click touchend", function(e){
   
    e.preventDefault()
    
    // if this is main view - open menu, otherwise go back one level
    if (viewsTree.length === 1) {
    
        views.open("menuView");
    
    } else {
    
        views.close();
    
    }
    

});


// ----------------------------------------------------
// Attach events //
//-----------------------------------------------------

$("[link]").on("click touchend", function(e){

    e.preventDefault();
    views.open($(this).attr("link"));

});

// ----------------------------------------------------
// Setup start screen//
//-----------------------------------------------------

core.eventBus.on("startApp", function(){

    $("#main").css("left",0);
    $("#main").velocity({opacity:1},{display:"block"});

});

};


return window.views = views;


})();

