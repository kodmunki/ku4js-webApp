//NOTE: Expose your controllers to your DOM here
var controller;

$(function(){

    //NOTE: Giving your app an appropriate name helps make exception messaging
    //      more explicit and helpful.
    var app = $.ku4webApp.app("APP_NAME").throwErrors();

    //NOTE: Instantiate your controller(s) here. You can use dot syntax.
    controller = $.ku4webApp.controllers["CONTROLLER_NAME"](app);

    //NOTE: Instantiate your view(s) here. You can use dot syntax.
    $.ku4webApp.views["VIEW_NAME"](app);

/*===================================================
 * NOTE: Other desired initialization scripting here
 *==================================================*/

});