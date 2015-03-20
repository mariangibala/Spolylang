
function init(database){

// block iOS vertical scroll and bounce effect
document.addEventListener('touchmove',function(e){
      
      e.preventDefault();
  
});

// ----------------------------------------------------
// Import database //
//-----------------------------------------------------

var db = database;
console.log(db.length + " words in the database")

// ----------------------------------------------------
// Define global variables //
//-----------------------------------------------------

var score = 0;
var lifes = 6;
var word;
var languageA = "pl";
var languageB = "en";





// ----------------------------------------------------
// Helper functions //
//-----------------------------------------------------


var getRandomBetween = function(a, b) {
   
    return Math.floor(Math.random() * ( b - a + 1)) + a;

};


// randomize function Fisher–Yates algorithm
var shuffle = function(array) {
    
    var m = array.length, t, i;
    
    // While there remain elements to shuffle…
    while (m) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
      
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    
    }
    
    return array;
};

// ----------------------------------------------------
// generate stars //
//-----------------------------------------------------

var generateStars = function(){

    for (var x=0; x<=lifes; x++) {
    
        var star = '<img src="img/star.png" class="star">';
        $("#stars").append(star)
    
    
    }

};

var removeLife = function(){

   $($("#stars > .star")[lifes]).fadeTo(300,0.1)
   lifes--;

};




// ----------------------------------------------------
// Helper functions //
//-----------------------------------------------------


var generateQuestion = function(){
    
    var lastWord = db.length-1;
    
    // select random word to show
    // later change random to statistical choice
    var randomNumber = getRandomBetween(0, lastWord)
    word = db[randomNumber]
    
    // grab correct answer
    var answers = []
    answers.push(word[languageB])
    
    // grab random incorrect answers
    var x = 2;
    
    while ( x > 0 ) {
   
        var incorrectWord = db[getRandomBetween(0, lastWord)][languageB]
        
        if (answers.indexOf(incorrectWord) == -1) {
        
            answers.push(incorrectWord)
            x--
        
        }
    
    }
    
    
    answers = shuffle(answers)
   
    

    var template =  '<div id="word"><p>' + word[languageA] + '</p></div>'+
                    '<ul>'+
                    '<li>' + answers[0] + '</li>'+
                    '<li>' + answers[1] + '</li>'+
                    '<li>' + answers[2] + '</li>'+
                    '</ul>'
    
    $("#container").html(template)
    

};



var showCorrect = function() {
    
    $("ul li").each(function(index,element){
        
       if ($(element).text() === word[languageB]) {

             $(element).css("background","rgba(0,255,0,0.3)")

       }     
        
        
    });

};



var nextWord = function(){


    $("#score").html(score);

    $("#container").delay(0).fadeOut(300,function(){
     
     
          generateQuestion()
          $("#container").fadeIn(300)
     
    });
   

};


$("#container").on("click touchend","li",function(e){

    e.preventDefault()

    if (word[languageB] === $(this).text()) {
        
        
        score++
       
        
    } else {
    
        
        removeLife();
        score--
         
    }
    
    showCorrect()
    nextWord()

})





generateQuestion()
generateStars()

}

init(db)