function abstractController(modelFactory, formFactory) {
    this._modelFactory = modelFactory;
    this._formFactory = formFactory;
}
abstractController.prototype = {
    $model: function(name) { return this._modelFactory.create(name); },
    $read: function(name) { return this._formFactory.create(name).read(); },
    $clear: function(name) { this._formFactory.create(name).clear(); return this;}
};
$.ku4webApp.abstractController = abstractController;