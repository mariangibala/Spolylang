
function init(){

// block iOS vertical scroll and bounce effect
document.addEventListener('touchmove',function(e){
      
      e.preventDefault();
  
});

// ----------------------------------------------------
// Import database //
//-----------------------------------------------------

db = db.words;

console.log(db.length + " words in the database")

// ----------------------------------------------------
// Import modules //
//-----------------------------------------------------

// ----------------------------------------------------
// Define global variables //
//-----------------------------------------------------

var game = {}
game.score = 0;

var lifes;
var word;
var languageA = "pl";
var languageB = "en";
var body = $('body');


// ----------------------------------------------------
// generate stars //
//-----------------------------------------------------

var generateStars = function(){

    $("#stars").css("top", "10px")
    $("#stars").empty()
    
    for (var x=0; x<lifes; x++) {
    
        var star = '<img src="img/star@2x.png" width="30px" height="30px" class="star">';
        $("#stars").append(star)
    
    
    }
    
    $("#stars").velocity({opacity:1, top:"40px"}, 300)

};

var removeLife = function(){

   $($("#stars > .star")[lifes-1]).velocity({opacity:0.3}, {duration:300})
   lifes--;

};




// ----------------------------------------------------
// Generate question//
//-----------------------------------------------------


var generateQuestion = function(){
    
    var lastWord = db.length-1;
    
    // select random word to show
    // later change random to statistical choice
    var randomNumber = basic.getRandomBetween(0, lastWord)
    word = db[randomNumber]
    
    // grab correct answer
    var answers = []
    answers.push(word[languageB])
    
    // grab random incorrect answers
    var x = 2;
    
    while ( x > 0 ) {
   
        var incorrectWord = db[basic.getRandomBetween(0, lastWord)][languageB]
        
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
    

};



var showAnswer = function() {
    
   timer.stop()
    
    $("ul li").each(function(index,element){
        
       if ($(element).text() === word[languageB]) {

             $(element).css("background","rgba(0,255,0,0.3)")

       }     
        
        
    });

};


var updateScore = function(value){

    game.score = game.score + value
    
    $("#scoreValue").velocity({opacity:0, top:"-20px"},{duration:150, easing:"easeInOutQuint", complete:function(){
     
        $("#scoreValue").html(game.score);
        $("#scoreValue").css("top", 20);
        $("#scoreValue").velocity({opacity:1, top:0}, {duration:150, easing:"easeInOutQuint"})
     
     
     
    }})
    
   


};


// pass delay time as attribute so you can use diferent feedback time for wrong and correct answer
var nextWord = function(delayTime){
    

    $("#container").velocity("fadeOut", {duration:300, delay:delayTime, complete:function(){
     
          if (lifes > 0) {
          
              generateQuestion()
              timer.start(game.score)
              $("#container").velocity("fadeIn", {duration:300})
              interactionsActive = true;
          
          } else  {
          
              gameOver()
          
          }
     
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
        
        
        body.trigger("correctAnswer")
       
        
    } else {
    

        body.trigger("wrongAnswer")
         
    }
    

});


body.on("wrongAnswer",function(){
 
    removeLife();
    updateScore(-150);
    
    showAnswer();
    nextWord(1500);

 })
 
 
<<<<<<< HEAD
$("body").on("correctAnswer",function(){

    // faster answer = more score
    var scoreUp = 100 + (Math.floor(timer.value / 100))
    updateScore(scoreUp);
=======
body.on("correctAnswer",function(){
 
    score++
>>>>>>> origin/master
    
    showAnswer()
    nextWord(400)

})
 
 
$("#modal").on("click touchend",function(e){

    e.preventDefault()
    
    $(this).velocity("fadeOut",{duration:300, display:"none"})
    startGame();


});

 

var resetGame = function(){


    lifes = 3;
    game.score = 0;
    updateScore(0);
    $("#scoreValue").velocity({fontSize:"26px"}, {duration:150, easing:"easeInOutQuint"})

}


var startGame = function(){


    resetGame();
    generateStars();
  
    nextWord(0);

}

var gameOver = function(){


    $("#modalContent").html("<p>Try Again</p>")
    $("#modal").velocity("fadeIn",{ display:"block", duration:300})
    $("#scoreValue").velocity({fontSize:"50px"}, {duration:150, easing:"easeInOutQuint"})

}





}

init()