!(function () {

// ----------------------------------------------------
// Bonus module //
//-----------------------------------------------------

  var bonus = {};
  bonus.init = function () {
    bonus.name = "bonus";

    // store number of correct answers
    var correctAnswers = 0;
    bonus.answersToActivateBonus = null;

    bonus.value = 0;
    bonus.active = false;

// ----------------------------------------------------
// Add event listeners //
//-----------------------------------------------------

    core.eventBus.on("correctAnswer", function () {

      correctAnswers++;

      if (correctAnswers >= bonus.answersToActivateBonus) {

        if (bonus.active === false) {

          message.show("Bonus Counting!");
          bonus.active = true;

        }

        bonus.value = bonus.value + 50;

      }

    });

    core.eventBus.on("wrongAnswer", function () {

      correctAnswers = 0;
      bonus.value = 0;
      bonus.active = false;

    });


// ----------------------------------------------------
// Push score modificator to core //
//-----------------------------------------------------

    var scoreModificator = {
      name: "bonus",
      calc: function () {
        return Math.floor(bonus.value)
      }
    };

    core.scoreModificators.push(scoreModificator);

// ----------------------------------------------------
// Register module levels //
//-----------------------------------------------------

    var levelsConfig = [
      {answersToActivateBonus: 3},
      {answersToActivateBonus: 5},
      {answersToActivateBonus: 10}
    ];

    levels.registerModule(bonus, levelsConfig);

  };

  return window.bonus = bonus;

})();