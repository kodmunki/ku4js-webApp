function abstractStateMachine(modelFactory) {
    this._modelFactory = classRefcheck("stateMachine", "modelFactory", modelFactory);
    this._state = $.ku4webApp.state();
    this._securityLock = $.lock();
}

abstractStateMachine.prototype = {
    $model: function(name) { return this._modelFactory.create(name); },
    is: function(value) { return this._state.is(value); },
    set: function(value) { this._state.set(value); return this; },
    read: function(key) { return this._state.read(key); },
    write: function(key, value) { this._state.write(key, value); return this; },
    lock: function() { this._securityLock.lock(); return this; },
    unlock: function() { this._securityLock.unlock(); return this; },
    isLocked: function() { return this._securityLock.isLocked(); },
    isUnlocked: function() { return !this.isLocked(); },
    value: function() { return this._state.value(); }
};