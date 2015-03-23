define(["../db/db","./basic", "./core"], function( db, basic, core) {

var question = {}

// ----------------------------------------------------
// Import database //
//-----------------------------------------------------

db = db.words;

console.log(db.length + " words in the database")


// ----------------------------------------------------
// Liocal variables //
//-----------------------------------------------------
var languageA = "pl";
var languageB = "en";
var word;
var interactionsActive =  false

// ----------------------------------------------------
// Generate question//
//-----------------------------------------------------


question.generate = function(){
    
    var lastWord = db.length-1;
    
    // select random word to show
    // later change random to statistical choice
    var randomNumber = basic.getRandomNumber(0, lastWord)
    word = db[randomNumber]
    
    // grab correct answer
    var answers = []
    answers.push(word[languageB])
    
    // grab random incorrect answers
    var x = 2;
    
    while ( x > 0 ) {
   
        var incorrectWord = db[basic.getRandomNumber(0, lastWord)][languageB]
        
        if (answers.indexOf(incorrectWord) == -1) {
        
            answers.push(incorrectWord)
            x--
        
        }
    
    }
    
    
    answers = basic.shuffle(answers)
  

    var template =  '<div id="word"><p>' + word[languageA] + '</p></div>'+
                    '<ul>'+
                    '<li>' + answers[0] + '</li>'+
                    '<li>' + answers[1] + '</li>'+
                    '<li>' + answers[2] + '</li>'+
                    '</ul>'
    
    $("#container").html(template)
	interactionsActive = true;
    

};


question.showAnswer = function() {
    
   core.eventBus.triggerHandler("showAnswer")
    
    $("ul li").each(function(index,element){
        
       if ($(element).text() === word[languageB]) {

             $(element).css("background","rgba(0,255,0,0.3)")

       }     
        
        
    });

};

$("#container").on("click touchend","li", function(e){

    e.preventDefault()
    
    
    // we have to block interactions to avoid doubleclicks etc.
    if (interactionsActive === false) return;
    
    interactionsActive = false;
    
    $(this).css("background","rgba(0,0,0,0.3)")

    if (word[languageB] === $(this).text()) {
        
        
        core.eventBus.triggerHandler("correctAnswer")
       
        
    } else {
    

       core.eventBus.triggerHandler("wrongAnswer")
         
    }
    

});




return question


});