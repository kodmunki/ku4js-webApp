var controller;
$(function(){
    var appName = "example",
        app = $.ku4webApp.app().throwErrors();
    controller = $.ku4webApp.controllers[appName](app)
    $.ku4webApp.views[appName](app);
});