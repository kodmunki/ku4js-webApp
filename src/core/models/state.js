function state(value) {
    this._value = value;
}
state.prototype = {
    is: function(value) { return this._value === value; },
    checkAndSet: function(value) {
        var isValue = this.is(value);
        this._value = value;
        return isValue;
    }
};

var __appState = new state("__ku4appStarted__");