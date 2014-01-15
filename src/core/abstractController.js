/* serviceFactory must create services of type $.service
 * formFactory must create forms of type $.form
 */

function abstractController(mediator, serviceFactory, formFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._formFactory = formFactory;
}
abstractController.prototype = {
    $mediator: function() { return this._mediator; },
    $serviceFactory: function() { return this._serviceFactory; },
    $formFactory: function() { return this._formFactory; }
};
$.ku4webApp.controller = abstractController;