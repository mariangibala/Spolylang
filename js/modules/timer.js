!(function() {

// ----------------------------------------------------
// Timer module //
//-----------------------------------------------------

var timer = {}
timer.init = function(){

timer.name = "timer";	
timer.timeToAnswer = null;

var time;
var timerScale = $("#timerScale");


// ----------------------------------------------------
// Basic functions //
//-----------------------------------------------------

var start = function(){
    	
	time = timer.timeToAnswer;
    
    resetAnimation(time);
    
    createNewInterval();

};


var play = function(){
 
    continueAnimation(time);
    
    createNewInterval();

};

var stop = function(){

    clearInterval(timer.interval);
    timerScale.velocity("stop");

};


// ----------------------------------------------------
// Controll animation //
//-----------------------------------------------------

var resetAnimation = function(animationTime){

    var windowWidth = $(window).width();
    
    timerScale.velocity("stop").css("width", windowWidth).velocity({ width:0 },  animationTime);
	
};


var continueAnimation = function(animationTime){
    
    timerScale.velocity("stop").velocity({ width:0 },  animationTime);
	
};

// ----------------------------------------------------
// Interval function //
//-----------------------------------------------------

var createNewInterval = function(){

   
    if (typeof timer.interval !== "undefined") clearInterval(timer.interval);
    
    timer.interval = setInterval(function(){
      
     
        time -= 100;

        // timeout - trigger wrong answer event
		if (time < 0) {
        
            clearInterval(timer.interval);
            
            core.eventBus.triggerHandler("wrongAnswer");
                
        }
        
        
        
    },100)



};

// ----------------------------------------------------
// Add event listeners //
//-----------------------------------------------------

core.eventBus.on("showAnswer",function(){
	
	stop();

});


core.eventBus.on("showQuestion",function(){
	
	
	start();

});


core.eventBus.on("pauseGame",function(){
	
	
	stop();

});


core.eventBus.on("continueGame",function(){
	
	
	// create timer only when game started and user have still have some time
	if ( (core.game.isPlaying() === true) && (time > 0) ) play();

});

 

// ----------------------------------------------------
// Push score modificator to core //
//-----------------------------------------------------

var scoreModificator = {
	
	name:"timer", 
	calc: function(){
		
		return Math.floor(time / 100)

	}
}

core.scoreModificators.push(scoreModificator);


// ----------------------------------------------------
// Register module levels //
//-----------------------------------------------------


var levelsConfig = [
	
	{timeToAnswer:10000},
	{timeToAnswer:5000},
	{timeToAnswer:2800}
	
]

levels.registerModule(timer,levelsConfig)


}

return window.timer = timer


})();