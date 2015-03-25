!(function() {

// ----------------------------------------------------
// Modal module //
//-----------------------------------------------------

var message = {}

message.init = function(){
	
el = $("#messages")

message.show = function(text){

	el.text(text)
	
	el.velocity({opacity:1}, {delay: 50, display:"block", duration:300, complete:function(){
	
	
		el.velocity({opacity:0},{display:"none", duration:300, delay:2500 })
	
	
	
	}})


}

}

return window.message = message

})();