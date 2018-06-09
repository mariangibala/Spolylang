!(function () {

// ----------------------------------------------------
// Levels module
//-----------------------------------------------------

  var levels = {};
  levels.init = function () {


// ----------------------------------------------------
// Local variables
//-----------------------------------------------------

    var level = 0;
    var answers = 0;
    var modules = [];

// ----------------------------------------------------
// Reset levels
//-----------------------------------------------------

    var reset = function () {

      level = 0;
      answers = 0;

      for (var x = 0; x < modules.length; x++) {
        updateModuleSettings(modules[x])
      }

    };


// ----------------------------------------------------
// Helper function to get current level settings
//-----------------------------------------------------

    // type in the console levels.getCurrent() to see active level configuration

    levels.getCurrent = function () {

      for (var x = 0; x < modules.length; x++) {
        console.log(modules[x].module.name, modules[x].config[level])
      }

    };

// ----------------------------------------------------
// Register module
//-----------------------------------------------------

    // We are pushing module settings here when initialize module

    levels.registerModule = function (module, config) {

      var obj = {module: module, config: config};
      modules.push(obj);
      updateModuleSettings(obj);

    };


// ----------------------------------------------------
// Update module settings due to level settings
//-----------------------------------------------------

    // Loop through all registered modules and update their settings

    var levelUp = function () {

      level++;

      for (var x = 0; x < modules.length; x++) {
        updateModuleSettings(modules[x])
      }

    };


    var updateModuleSettings = function (obj) {

      for (var key in obj.config[level]) {

        if (obj.module.hasOwnProperty(key)) {
          obj.module[key] = obj.config[level][key]
        }

      }

    };


// ----------------------------------------------------
// Check game status - is it time to levelup?
//-----------------------------------------------------

    var checkStatus = function () {

      answers++;

      if (answers === 5) {

        levelUp();
        message.show("Level 2");

      } else if (answers === 8) {

        levelUp();
        message.show("Level 3");

      }

    }

// ----------------------------------------------------
// Add event listeners
//-----------------------------------------------------

    core.eventBus.on("correctAnswer", function () {
      checkStatus();
    });

    core.eventBus.on("wrongAnswer", function () {
      checkStatus();
    });

    core.eventBus.on("startGame", function () {
      reset();
    });

  }

  return window.levels = levels


})();