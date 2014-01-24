var controller;
$(function(){
    var appName = "example",
        app = $.ku4webApp.app().logErrors();
    APP = app;
    controller = $.ku4webApp.controllers[appName](app)
    $.ku4webApp.views[appName](app);
    $.ku4webApp.views.otherView(app);
    app.mediator.subscribe("createAccountCanceled", function() { console.log("here");} )
});