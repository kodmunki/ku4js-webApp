function state(value) {
    this._value = value;
    this._data = $.hash();
}
state.prototype = {
    is: function(value) { return this._value === value; },
    set: function(value) {
        this._value = value;
        return this;
    },
    read: function(key) {
        return this._data.findValue(key);
    },
    write: function(key, value) {
        this._data.update(key, value);
        return this;
    },
    value: function() {
        return this._value;
    }
};
$.ku4webApp.state = function(value) {
    return new state(value);
};