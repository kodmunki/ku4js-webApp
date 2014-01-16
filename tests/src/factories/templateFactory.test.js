function templateFactory(config) {
    this._config = config;
}
templateFactory.prototype = {
    cerate: function (key){ return $.ku4webApp.template[key](this._config); }
};
$.ku4webApp.templateFactory = function(templates) {
    return new templateFactory(templates);
};