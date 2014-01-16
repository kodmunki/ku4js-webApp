function templateFactory(config) {
    this._config = config;
}
templateFactory.prototype = {
    create: function (name){ return $.ku4webApp.templates[name](this._config); }
};
$.ku4webApp.templateFactory = function(templates) {
    return new templateFactory(templates);
};