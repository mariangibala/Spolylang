!(function() {

var lifes = {}
lifes.init = function(){

lifes.total = 3


// ----------------------------------------------------
// Local variables //
//-----------------------------------------------------

var container = $("#stars")



// ----------------------------------------------------
// generate img //
//-----------------------------------------------------

var generateImages = function(){

	// prepare to animation and clean content
	container.css("top", "10px")
    container.empty()
    
    for (var x=0; x<lifes.active; x++) {
    
        var star = '<img src="img/star@2x.png" width="30px" height="30px" class="star">';
       	container.append(star);
    

    }
    
	container.velocity({opacity:1, top:"40px"}, 300)

};

// ----------------------------------------------------
// Reset //
//-----------------------------------------------------


lifes.reset = function(){

	lifes.active = lifes.total;
	generateImages();

};


// ----------------------------------------------------
// Remove life //
//-----------------------------------------------------


lifes.removeOne = function(){

   $($("#stars > .star")[lifes.active-1]).velocity({opacity:0.3}, {duration:300})
   lifes.active--;

};

}

return window.lifes = lifes


})();