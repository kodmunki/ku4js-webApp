function app() {
    var app = $.ku4webApp;
    this.mediator = $.mediator();
    this.serviceFactory = app.serviceFactory(this.mediator, app.config.services);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.validatorFactory = app.validatorFactory(app.config.validators);
    this.responsebox = app.responsebox(".ku4webApp-responsebox");
}

$.ku4webApp.app = function() { return new app(); }