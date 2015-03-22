
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

var score = 0;
var lifes = 6;
var word;
var languageA = "pl";
var languageB = "en";


// ----------------------------------------------------
// generate stars //
//-----------------------------------------------------

var generateStars = function(){

    for (var x=0; x<=lifes; x++) {
    
        var star = '<img src="img/star@2x.png" width="30px" height="30px" class="star">';
        $("#stars").append(star)
    
    
    }

};

var removeLife = function(){

   $($("#stars > .star")[lifes]).fadeTo(300,0.1)
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


// pass delay time as attribute so you can use diferent feedback time for wrong and correct answer
var nextWord = function(delayTime){


    $("#score").html(score);

    $("#container").delay(delayTime).fadeOut(300,function(){
     
     
          generateQuestion()
          timer.start()
          $("#container").fadeIn(300)
          interactionsActive = true;
     
    });
   

};


$("#container").on("click touchend","li", function(e){

    e.preventDefault()
    
    
    // we have to block interactions to avoid doubleclicks etc.
    if (interactionsActive === false) return;
    
    interactionsActive = false;
    
    $(this).css("background","rgba(0,0,0,0.3)")

    if (word[languageB] === $(this).text()) {
        
        
        $("body").trigger("correctAnswer")
       
        
    } else {
    

        $("body").trigger("wrongAnswer")
         
    }
    

})


$("body").on("wrongAnswer",function(){
 
    removeLife();
    score--
    
    showAnswer()
    nextWord(1500)

 })
 
 
 $("body").on("correctAnswer",function(){
 
    score++
    
    showAnswer()
    nextWord(400)

 })


nextWord()
generateStars()

}

init()