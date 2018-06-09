!(function () {

// ----------------------------------------------------
// Score module //
//-----------------------------------------------------

  var score = {};
  score.init = function () {

// ----------------------------------------------------
// Local variables //
//-----------------------------------------------------

    var el = $("#scoreValue");

    var value = 0;

    var update = function (value) {

      // create temp copy to compare value
      var currentScore = score.value;

      score.value = score.value + value;

      // prevent score below 0
      if (score.value < 0) score.value = 0;

      // animate score only if there is any change
      if (currentScore !== score.value) {
        animateScore();
      }


    };

    var reset = function () {

      score.value = 0;
      animateScore();

      el.velocity({fontSize: "26px"}, {duration: 150, easing: "easeInOutQuint"})

    };


    var animateScore = function () {

      el.velocity({opacity: 0, top: "-20px"}, {
        duration: 150, easing: "easeInOutQuint", complete: function () {

          el.text(score.value);
          el.css("top", 20);
          el.velocity({opacity: 1, top: 0}, {duration: 150, easing: "easeInOutQuint"})

        }
      });

    };

    core.eventBus.on("wrongAnswer", function () {
      update(-150);
    });


    core.eventBus.on("correctAnswer", function () {
      // faster answer = more score
      var scoreUp = 100 + core.getScoreModificators()

      update(scoreUp);

    });

    core.eventBus.on("startGame", function () {
      reset()
    });

  };

  return window.score = score;


})();




