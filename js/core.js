!(function() {

// ----------------------------------------------------
// Core is connector between modules //
//-----------------------------------------------------

var core = {}
core.init = function(){

core.game = {}
core.game.isPlayingStatus = false;


core.game.isPlaying = function(){

	return this.isPlayingStatus;
}

core.game.start = function(){

	this.isPlayingStatus = true;

}

core.game.end = function(){

	this.isPlayingStatus = false;

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