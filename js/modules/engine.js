!(function () {

// ----------------------------------------------------
// Engine //
//-----------------------------------------------------

  var engine = {};

  engine.init = function () {

    // block iOS vertical scroll and bounce effect
    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    });


    // pass delay time as attribute so you can use different feedback time
    // for wrong and correct answer
    var nextStep = function (delayTime) {

      $("#question_placeholder").velocity("fadeOut", {
        queue: false, duration: 300, delay: delayTime, complete: function () {

          if (core.game.isPlaying() === true) {

            question.generate();
            core.eventBus.triggerHandler("showQuestion");

            $("#question_placeholder").velocity("fadeIn", {duration: 300});

          } else {

            $("#modalContent").html("<p>Try Again</p>");
            $("#modal").velocity("fadeIn", {display: "block", duration: 300});
            $("#scoreValue")
              .velocity({fontSize: "50px"}, {duration: 150, easing: "easeInOutQuint"});

          }
        }
      });

    };


    core.eventBus.on("wrongAnswer", function () {
      nextStep(1500);
    });


    core.eventBus.on("correctAnswer", function () {
      nextStep(400)
    });


    $("#modal").on("click touchend", function (e) {
      e.preventDefault();
      $(this).velocity("fadeOut", {duration: 300, display: "none"});
      core.eventBus.triggerHandler("startGame");
    });


    core.eventBus.on("startGame", function () {
      core.game.start();
      nextStep(0);
      message.show("GO!");
    });

    core.eventBus.on("gameOver", function () {
      core.game.end();
      message.show("Game Over!");
    });

    $(document).ready(function () {
      core.eventBus.triggerHandler("startApp");
    });

  };


  return window.engine = engine;

})();

