function testController(mediator, serviceFactory, formFactory) {
    testController.base.call(this, mediator, serviceFactory, formFactory);
}
testController.prototype = {
    mediator: function() { return this.$mediator(); },
    serviceFactory: function() { return this.$serviceFactory(); },
    formFactory: function() { return this.$formFactory(); }
};
$.Class.extend(testController, $.ku4webApp.controller);
$.tests.stubs.controller = function(mediator, serviceFactory, formFactory) {
    return new testController(mediator, serviceFactory, formFactory);
};