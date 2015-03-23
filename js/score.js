define(["./core"], function(core) {
 
// ----------------------------------------------------
// Score module //
//-----------------------------------------------------

        
var score = {}


// ----------------------------------------------------
// Local variables //
//-----------------------------------------------------

var el = $("#scoreValue");

score.value = 0

score.update = function(value){

    score.value = score.value + value;
    
   	el.velocity({opacity:0, top:"-20px"},{duration:150, easing:"easeInOutQuint", complete:function(){
     
        el.html(score.value);
        el.css("top", 20);
        el.velocity({opacity:1, top:0}, {duration:150, easing:"easeInOutQuint"})
     

    }})
 

};

score.reset = function(){

	score.value = 0;
	score.update(0);
	
	el.velocity({fontSize:"26px"}, {duration:150, easing:"easeInOutQuint"})

};



return score;		
		
		
		

		
		
});




