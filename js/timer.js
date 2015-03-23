define(["./core", "./score"], function(core, score) {

// ----------------------------------------------------
// Timer module //
//-----------------------------------------------------

var timer = {}

timer.timeToAnswer = 5000 ;

timer.value = timer.timeToAnswer;

timer.start = function(score){

    this.value = Math.floor(this.timeToAnswer - score) ;
    
    this.resetAnimation(this.value)
    
    this.createNewInterval();

};


timer.play = function(){
 
    this.continueAnimation(this.value)
    
    this.createNewInterval();

};

timer.stop = function(){

    clearInterval(timer.interval)
    $("#timerScale").velocity("stop")

};





timer.resetAnimation = function(animationTime){

    var windowWidth = $(window).width();
    
    $("#timerScale").velocity("stop").css("width", windowWidth).velocity({ width:0 },  animationTime);
	

};


timer.continueAnimation = function(animationTime){

    
    $("#timerScale").velocity("stop").velocity({ width:0 },  animationTime);
	

};


timer.createNewInterval = function(){

   
    if (typeof timer.interval !== "undefined") clearInterval(timer.interval);
    
    this.interval = setInterval(function(){
      
     
        timer.value -= 100;

        if (timer.value < 0) {
        
            clearInterval(timer.interval);
            
            core.eventBus.triggerHandler("wrongAnswer");
        
        
        }
        
        
        
    },100)



};

// ----------------------------------------------------
// Add event listeners //
//-----------------------------------------------------

core.eventBus.on("showAnswer",function(){
	
	timer.stop();

});


core.eventBus.on("showQuestion",function(){
	
	
	timer.start(score.value);

});


core.eventBus.on("pauseGame",function(){
	
	
	timer.stop();

});


core.eventBus.on("continueGame",function(){
	
	
	timer.play();

});

 



// ----------------------------------------------------
// Push score modificator to core //
//-----------------------------------------------------

var scoreModificator = {
	
	name:"timer", 
	calc: function(){
		
		return Math.floor(timer.value / 100)

	}
}

core.scoreModificators.push(scoreModificator);




return timer


});