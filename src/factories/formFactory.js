function formFactory(config) {
    this._config = config;
}
formFactory.prototype = {
    create: function(key) {
        return $.ku4webApp.form(this._config[key]);
    }
};
$.ku4webApp.formFactory = function(config) {
    return new formFactory(config);
};