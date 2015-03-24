!(function() {

// ----------------------------------------------------
// Core is singleton connector between modules //
//-----------------------------------------------------

var core = {}
core.init = function(){

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