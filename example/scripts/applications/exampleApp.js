var controller;
$(function(){
    var app = $.ku4webApp.app();
    controller = $.ku4webApp.controllers.example(app),
    $.ku4webApp.views.example(app);
});