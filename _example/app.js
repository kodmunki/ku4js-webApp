var cardController;
$(function(){
    var app = $.ku4webApp.app("example").throwErrors();

    cardController = $.ku4webApp.controllers.card(app);
    $.ku4webApp.views.card(app);

    cardController.list();
});