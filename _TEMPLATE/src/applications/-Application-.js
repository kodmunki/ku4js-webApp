var controller;
$(function(){
    var appName = "[ENTER YOUR APP NAME HERE]",
        app = $.ku4webApp.app();
    controller = $.ku4webApp.controllers[appName](app)
    $.ku4webApp.views.[appName](app);
});