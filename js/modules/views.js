!(function () {

// ----------------------------------------------------
// Views //
//-----------------------------------------------------

  var views = {};
  views.init = function () {

    // move all views to right side
    var view = $(".view");
    view.css("left", $(window).width());
    view.css("display", "block");

    // views tree stores user journey through views (main >> menu >> options etc.)
    var viewsTree = ["main"];

    views.open = function (requestedView) {

      var currentView = viewsTree[viewsTree.length - 1];

      // do not continue if requested view is already open
      if (currentView === requestedView) return;

      // store requested view in the viewsTree array to keep views tracking
      viewsTree.push(requestedView);

      // convert names to jQuery selectors
      var currentViewId = "#" + currentView;
      currentViewId = $(currentViewId);


      var requestedViewId = "#" + requestedView;
      requestedViewId = $(requestedViewId);

      // animate views out-in
      currentViewId.velocity("stop")
        .velocity({left: $(window).width() * -1, opacity: 0}, {
          duration: 400,
          easing: "easeOutQuart"
        });

      requestedViewId.velocity("stop").velocity({left: 0, opacity: 1}, {
        delay: 200,
        duration: 400,
        easing: "easeOutQuart"
      });

      // trigger pause
      core.eventBus.triggerHandler("pauseGame");

    }


    views.close = function () {

      var currentView = viewsTree.pop();
      var requestedView = viewsTree[viewsTree.length - 1];

      // convert names to jQuery selectors
      var currentViewId = "#" + currentView;
      currentViewId = $(currentViewId);

      var requestedViewId = "#" + requestedView;
      requestedViewId = $(requestedViewId);


      // animate views out-in
      currentViewId.velocity("stop").velocity({left: $(window).width(), opacity: 0}, {
        duration: 400,
        easing: "easeOutQuart"
      });

      requestedViewId.velocity("stop").velocity({left: 0, opacity: 1}, {
        delay: 200,
        duration: 400,
        easing: "easeOutQuart"
      });

      // continue game when user comes back to game view and game is started
      if ((requestedView === "main") && (core.game.isPlaying() === true)) {
        core.eventBus.triggerHandler("continueGame");
      }

    };


    $(".navigationIcon").on("click touchend", function (e) {

      e.preventDefault();

      // if this is main view - open menu, otherwise go back one level
      if (viewsTree.length === 1) {

        views.open("menuView");

      } else {

        views.close();

      }


    });


// ----------------------------------------------------
// Attach events //
//-----------------------------------------------------

    $("[link]").on("click touchend", function (e) {

      e.preventDefault();
      views.open($(this).attr("link"));

    });

// ----------------------------------------------------
// Setup start screen//
//-----------------------------------------------------

    core.eventBus.on("startApp", function () {

      $("#main").css("left", 0);
      $("#main").velocity({opacity: 1}, {display: "block"});

    });

  };


  return window.views = views;


})();

