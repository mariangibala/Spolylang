!(function () {

  var question = {};
  question.init = function () {

// ----------------------------------------------------
// Import database
//-----------------------------------------------------

    db = db.words;

    console.log(db.length + " words in the database");


// ----------------------------------------------------
// Local variables
//-----------------------------------------------------

    var word;
    var interactionsActive = false;
    var container = $("#question_placeholder");

// ----------------------------------------------------
// Generate question
//-----------------------------------------------------

    question.generate = function () {

      var lastWord = db.length - 1;

      // select random word to show
      // later change random to statistical choice
      var randomNumber = basic.getRandomNumber(0, lastWord);
      word = db[randomNumber];

      // grab correct answer
      var answers = [];
      answers.push(word[settings.languageB]);

      // grab random incorrect answers
      var x = 2;

      while (x > 0) {

        var incorrectWord = db[basic.getRandomNumber(0, lastWord)][settings.languageB];

        if (answers.indexOf(incorrectWord) === -1) {

          answers.push(incorrectWord);
          x--;

        }

      }


      answers = basic.shuffle(answers);

      var template = '<div id="word"><p>' + word[settings.languageA] + '</p></div>' +
        '<ul id="answers">' +
        '<li>' + answers[0] + '</li>' +
        '<li>' + answers[1] + '</li>' +
        '<li>' + answers[2] + '</li>' +
        '</ul>';

      container.html(template);
      question.activateInteractions();

    };


    question.blockInteractions = function () {
      interactionsActive = false;
    };


    question.activateInteractions = function () {
      interactionsActive = true;
    };


    question.showAnswer = function () {

      core.eventBus.triggerHandler("showAnswer");

      $("ul li").each(function (index, element) {

        if ($(element).text() === word[settings.languageB]) {
          $(element).css("background", "rgba(0,255,0,0.5)")
        }

      });

    };

    container.on("click touchend", "li", function (e) {

      e.preventDefault();


      // we have to block interactions to avoid doubleclicks etc.
      if (interactionsActive === false) return;

      question.blockInteractions();

      $(this).css("background", "rgba(0,0,0,0.5)");

      if (word[settings.languageB] === $(this).text()) {

        core.eventBus.triggerHandler("correctAnswer");

      } else {

        core.eventBus.triggerHandler("wrongAnswer");

      }

      question.showAnswer();

    });

  };

  return window.question = question;

})();