function abstractTemplate(config) {
    this._config = config;
}
abstractTemplate.prototype = {
    $localization: function(key) { return this._config.localization[key]; },
    $config: function(key) { return ($.exists(key)) ? this._config[key] : this._config; },
    $forms: function(key) { return ($.exists(key)) ? this._config.forms[key] : this._config.forms; },
    $views: function(key) { return ($.exists(key)) ? this._config.views[key] : this._config.views; },
    $render: function(template, data) { return $.str.render(template, data); },
    $renderList: function(template, dataList) {
        var rendering = "";
        $.list(dataList).each(function(entity) {
            rendering += this.$render(template, entity);
        }, this);
        return rendering;
    },
    $renderWithAction: function(data, renderAction) {
        return renderAction.call(this, data);
    },
    $renderListWithAction: function(dataList, renderAction) {
        var rendering = "";
        $.list(dataList).each(function(entity) {
            rendering += this.$renderWithAction(entity, renderAction);
        }, this);
        return rendering;
    }
};
$.ku4webApp.abstractTemplate = abstractTemplate;