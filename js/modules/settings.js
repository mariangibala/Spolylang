!(function () {

// ----------------------------------------------------
// Settings module //
//-----------------------------------------------------

  var settings = {};
  settings.init = function () {


    settings.languageA = "en";
    settings.languageB = "pl";

    settings.languages = [

      {
        name: "English",
        value: "en"
      },
      {
        name: "Polish",
        value: "pl"
      }

    ];


    settings.update = function (setting, value) {
      settings[setting] = value;
    };

  };

  return window.settings = settings;


})();




