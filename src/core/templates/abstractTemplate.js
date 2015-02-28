function abstractTemplate(config) {
    this._config = classRefcheck("templates", "config", config);
}
abstractTemplate.prototype = {
    $config: function(name) { return ($.exists(name)) ? this._config[name] : this._config; },
    $forms: function(name) { return ($.exists(name)) ? this._config.forms[name] : this._config.forms; },
    $views: function(name) { return ($.exists(name)) ? this._config.views[name] : this._config.views; },
    $render: function(template, data, alt, formatFunc) {
        var _formatFunc = formatFunc || function(value) { return value; };
        return $.str.render(template, _formatFunc(data), alt);
    },
    $renderList: function(template, dataList, alt, formatFunc) {
        var rendering = "",
            _alt = (!$.isFunction(alt)) ? alt : null,
            _formatFunc = ($.isFunction(alt))
                ? alt : ($.isFunction(formatFunc))
                ? formatFunc : function(value) { return value; };

        $.list(dataList).each(function(entity) {
            rendering += this.$render(template, _formatFunc(entity), _alt);
        }, this);
        return rendering;
    },
    $renderListWithAction: function(dataList, action, formatFunc) {
        var rendering = "",
            _formatFunc = formatFunc || function(value) { return value; };

        $.list(dataList).each(function(entity) {
            rendering += action.call(this, _formatFunc(entity));
        }, this);
        return rendering;
    }
};
$.ku4webApp.abstractTemplate = abstractTemplate;