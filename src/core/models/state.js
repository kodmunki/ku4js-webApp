function state(value) {
    this._value = value;
}
state.prototype = {
    is: function(value) { return this._value === value; }
};