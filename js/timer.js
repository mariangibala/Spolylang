var timer = (function(){

var timer = {}

timer.timeToAnswer = 5000;

timer.value = timer.timeToAnswer;

timer.start = function(){

    this.value = this.timeToAnswer;
    
    this.resetAnimation(timer.timeToAnswer)
    
    this.createNewInterval();

}

timer.stop = function(){

    clearInterval(timer.interval)
    $("#timerScale").stop(true,false)
    
};



timer.resetAnimation = function(animationTime){

    var windowWidth = $(window).width();
    
    $("#timerScale").stop(true,true).css("width", windowWidth).animate({ width:0 },  animationTime);

}


timer.createNewInterval = function(){

  
   
    if (typeof timer.interval !== "undefined") clearInterval(timer.interval);
    
    this.interval = setInterval(function(){
      
     
        timer.value -= 100;

        if (timer.value === 0) {
        
            clearInterval(timer.interval);
            
            $("body").trigger("wrongAnswer");
        
        
        }
        
        
        
    },100)



};



return timer


}())