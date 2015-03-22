// ----------------------------------------------------
// Helper functions //
//-----------------------------------------------------
var basic = (function(){

var basic = {}

basic.getRandomBetween = function(a, b) {
   
    return Math.floor(Math.random() * ( b - a + 1)) + a;

};


// randomize function Fisher–Yates algorithm
basic.shuffle = function(array) {
    
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










return basic;


}())

