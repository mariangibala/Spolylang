!(function() {

// ----------------------------------------------------
// Core is connector between modules //
//-----------------------------------------------------

var core = {}
core.init = function(){

core.game = {}


// ----------------------------------------------------
// Game status, Did player start the game? 
//-----------------------------------------------------

var isPlaying = false;

core.game.isPlaying = function(){

	return isPlaying;
}

core.game.start = function(){

	isPlaying = true;

}

core.game.end = function(){

	isPlaying = false;

}




core.eventBus = $(window)

// ----------------------------------------------------
// Score modificators  //
//-----------------------------------------------------

core.scoreModificators = []

core.getScoreModificators = function(){
	
	var value = 0
	
	for (var x=0; x<core.scoreModificators.length; x++) {
		
		 	value += core.scoreModificators[x].calc()
	
	}
	
	return value
	
}

}

return window.core = core


})();