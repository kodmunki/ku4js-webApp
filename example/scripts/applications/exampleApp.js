var controller;
$(function(){
    var app = $.ku4webApp.app().logErrors();
    $.ku4webApp.views.example(app);
    controller = $.ku4webApp.controllers.example(app);
});