var controller;
$(function(){
    var mediator = $.mediator(),
        serviceFactory = $.ku4webApp.service(mediator, $.example.config.services),
        responsebox = $.example.views.responsebox(".js-responsebox"),
        templateFactory = $.example.templates.factory($.example.localization, $.example.config.templates),
        formFactory = $.example.forms.factory($.example.config.forms);

    controller = $.example.controllers.account(mediator, serviceFactory, formFactory);
    $.example.views(mediator, responsebox, templateFactory);
});