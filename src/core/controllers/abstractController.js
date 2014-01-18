function abstractController(modelFactory, formFactory) {
    this._modelFactory = modelFactory;
    this._formFactory = formFactory;
}
abstractController.prototype = {
    $model: function(name) { return this._modelFactory.create(name); },
    $form: function(name) { return this._formFactory.create(name); }
};
$.ku4webApp.abstractController = abstractController;