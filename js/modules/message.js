!(function() {

// ----------------------------------------------------
// Messages module //
//-----------------------------------------------------

var message = {}

message.init = function(){

// ----------------------------------------------------
// Local variables //
//-----------------------------------------------------
	
var el = $("#messages");
var topPosition = parseInt(el.css("top"),10);
var topPositionBeforeShow = topPosition - 25;

var isShowingMessage = false;
var fastTrack = false;
var messages = [];

// ----------------------------------------------------
// Create new message //
//-----------------------------------------------------

var createMessage = function(text){

    messages.push(text);
    
    
    // if this is first message - show it
    if ((!isShowingMessage) && (messages.length === 1) ) {  
    
        isShowingMessage = true;
        showMessage();

    // if there are other messages - activate fastTrack
    } else if ((isShowingMessage) && (messages.length > 1) && (!fastTrack)){
    
        activateFastTrack()
    
    } 

};


// ----------------------------------------------------
// Takes message from the queue and activates animation //
//-----------------------------------------------------

var showMessage = function(){

    var messageText = messages.shift()
  
    el.text(messageText)
    el.css("top",topPositionBeforeShow)

    animateMessage()
    
};


// ----------------------------------------------------
// Fast track - change speed to faster when other messages are in the queue //
//-----------------------------------------------------

var activateFastTrack = function(){
 
    fastTrack = true;

    el.velocity("stop");
    
    animateMessage();
    

};


// ----------------------------------------------------
// Animation  //
//-----------------------------------------------------

var animateMessage = function(){

    if (fastTrack) {
        
        showTime = 200; 
    
    } else {
    
        showTime = 2200;
    
    } 
    
    
    el.velocity({opacity:1, top:topPosition}, {delay: 50, display:"block", duration:350, easing:"easeOutQuart", complete:function(){
        
    
            el.velocity({opacity:0},{display:"none", duration:400, easing:"easeOutQuart", delay:showTime, complete:function(){
            
                
                checkQueue();
            
            
            } })
       
    }})


};

// ----------------------------------------------------
// Queue //
//-----------------------------------------------------


var checkQueue = function(){
        
    if (messages.length == 1) {  
        
        fastTrack = false;
        showMessage(); 

    } else if (messages.length > 0) {
        
        showMessage();
    
    } else {
    
        isShowingMessage = false;

    }

};



// ----------------------------------------------------
// Exposed methods //
//-----------------------------------------------------

message.show = function(text){
    
   
    createMessage(text);
    

};

}

return window.message = message

})();