var controller;
$(function(){
    var app = $.ku4webApp.app().throwErrors();
    controller = $.ku4webApp.controllers.example(app)
    $.ku4webApp.views.example(app);
});