function abstractStateMachine(modelFactory) {
    this._modelFactory = classRefcheck("stateMachine", "modelFactory", modelFactory);
    this._state = $.ku4webApp.state();
}

abstractStateMachine.prototype = {
    is: function(value) { return this._state.is(value); },
    set: function(value) { this._state.set(value); return this; },
    read: function(key) { return this._state.read(key); },
    write: function(key, value) { this._state.write(key, value); return this; },
    $model: function(name) { return this._modelFactory.create(name); }
};