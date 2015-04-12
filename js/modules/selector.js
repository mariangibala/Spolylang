!(function() {
 
// ----------------------------------------------------
// Selector component for options //
//-----------------------------------------------------

        
var selector = {}
selector.init = function(){

// ----------------------------------------------------
// Take data and render DOM //
//-----------------------------------------------------

selector.create = function(element){
 
    // create reference to object
    var el = $(element)
    
    // take setting name and value
    var basket = el.attr("basket")
    var option = el.attr("option")
    
    var optionValue = settings[option]
    var optionName 
    
    // calculate index
    
    var selectedOptionIndex;
    for (var x=0; x< settings[basket].length; x++ ) {
    
        
        if (settings[basket][x].value == optionValue) {
            
            selectedOptionIndex = x;
            optionName = settings[basket][x].name
            
            
    
        }
    
    
    }
    
    
    el.attr("selected-index", selectedOptionIndex)
    
   
    var buttonLeft = '<span class="btn btnLeft fa fa-arrow-left"></span>'
    var buttonRight = '<span class="btn btnRight fa fa-arrow-right"></span>'
    var selectedOption = '<p class="selectedOption">' + optionName + '</p>'

    var description =  el.attr("description")
    description = '<p class="description">' + description + '</p>'
    
    var DOM = buttonLeft + buttonRight + selectedOption + description;
    

    el.html(DOM)


}

// ----------------------------------------------------
// Attach navigation events //
//-----------------------------------------------------

$(".selector").on("click touchend", ".btnLeft", function(e){

    
    e.preventDefault()
    
    var el = $(this).parent()
    
    var optionContainer = el.find(".selectedOption")
    var optionName = el.attr("option")
    var basket = el.attr("basket")
    
    
    var optionIndex = parseInt(el.attr("selected-index"))
    
    var nextIndex = optionIndex + 1
    
    if (nextIndex > settings[basket].length -1) nextIndex = 0;
    
    var newOption = settings[basket][nextIndex]
    
    el.attr("selected-index", nextIndex)
    
    optionContainer.velocity("stop").velocity({left: 100, opacity:0},{duration:400, easing:"easeOutQuart", complete:function(){
      
        optionContainer.text(newOption.name)
        optionContainer.css("left", -100)
        optionContainer.velocity({left: 0, opacity:100},{duration:400, easing:"easeOutQuart", delay:30})
        
        
        }})
        
     
     settings.update(optionName, newOption.value)
    
 

});


$(".selector").on("click touchend", ".btnRight", function(e){

    
    e.preventDefault()
    
    var el = $(this).parent()
    
    var optionContainer = el.find(".selectedOption")
    var optionName = el.attr("option")
    var basket = el.attr("basket")
    
    
    var optionIndex = parseInt(el.attr("selected-index"))
    
    var nextIndex = optionIndex - 1
    
    if (nextIndex < 0 ) nextIndex = settings[basket].length -1;
    
    var newOption = settings[basket][nextIndex]
    
    el.attr("selected-index", nextIndex)
    
    optionContainer.velocity("stop").velocity({left: -100, opacity:0},{duration:400, easing:"easeOutQuart", complete:function(){
      
        optionContainer.text(newOption.name)
        optionContainer.css("left", 100)
        optionContainer.velocity({left: 0, opacity:100},{duration:400, easing:"easeOutQuart", delay:30})
        
        
        }})
        
     
     settings.update(optionName, newOption.value)
    
 

});




// ----------------------------------------------------
// Take all components and render //
//-----------------------------------------------------


$(".selector").each(function(index, element){

  
    selector.create(element)


})



}


return window.selector = selector;		
		
	
		
})();




