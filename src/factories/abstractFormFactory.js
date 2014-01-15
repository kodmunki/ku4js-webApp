function abstractFormFactory(config) {
    this._config = config;
}
abstractFormFactory.prototype = {
    $create: function(configKey) {
        return $.ku4webApp.form(this._config[configKey]);
    }
};
$.ku4webApp.formFactory = abstractFormFactory;