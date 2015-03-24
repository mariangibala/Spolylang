!(function() {

// ----------------------------------------------------
// Engine //
//-----------------------------------------------------

var engine = {}

engine.init = function(){

// block iOS vertical scroll and bounce effect
document.addEventListener('touchmove',function(e){
      
      e.preventDefault();
  
});




// pass delay time as attribute so you can use diferent feedback time for wrong and correct answer
var nextWord = function(delayTime){
    

    $("#container").velocity("fadeOut", {  queue: false, duration:300, delay:delayTime, complete:function(){
     
          if (lifes.active > 0) {
          
              question.generate()
              core.eventBus.triggerHandler("showQuestion")
              $("#container").velocity("fadeIn", {duration:300})
              
          
          } else  {
          
              gameOver()
			  message.show("Game Over!")
          
          }
     
    }
    
    });
   

};


core.eventBus.on("wrongAnswer",function(){
 
    lifes.removeOne();
    score.update(-150);
    
    question.showAnswer()
    nextWord(1500);

});
 
 
core.eventBus.on("correctAnswer",function(){

    // faster answer = more score
    var scoreUp = 100 + core.getScoreModificators()
    score.update(scoreUp);
    
    question.showAnswer()
    nextWord(400)

});
 
 

 
$("#modal").on("click touchend",function(e){

    e.preventDefault()
    
    $(this).velocity("fadeOut",{duration:300, display:"none"})
    startGame();
	


});

 

var resetGame = function(){


    lifes.reset();
    score.reset(); 

}


var startGame = function(){

    resetGame();
	message.show("GO!")
    nextWord(0);
	core.game.start()

}

var gameOver = function(){

	core.game.end()
    
	$("#modalContent").html("<p>Try Again</p>")
    $("#modal").velocity("fadeIn",{ display:"block", duration:300})
    $("#scoreValue").velocity({fontSize:"50px"}, {duration:150, easing:"easeInOutQuint"})

}





}


return window.engine = engine

})();

