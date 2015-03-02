function abstractController(modelFactory, formFactory, navigator, stateMachine) {
    this._modelFactory = classRefcheck("controllers", "modelFactory", modelFactory);
    this._formFactory = classRefcheck("controllers", "formFactory", formFactory);
    this._navigator = navigator;
    this._stateMachine = stateMachine;
}
abstractController.prototype = {
    $model: function(name) { return this._modelFactory.create(name); },
    $form: function(name) { return this._formFactory.create(name); },
    $navigator: function() { return this._navigator; },
    $stateMachine: function() { return this._stateMachine; }
};