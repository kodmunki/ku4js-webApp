function abstractView(mediator, responsebox, templateFactory, formFactory) {
    this._mediator = mediator;
    this._responsebox = responsebox;
    this._templateFactory = templateFactory;
    this._formFactory = formFactory;
}
abstractView.prototype = {
    $mediator: function() { return this._mediator; },
    $template: function(key) { return this._templateFactory.create(key); },
    $show: function(html) { this._responsebox.show(html); },
    $hide: function() { this._responsebox.hide(); },
    $write: function(key, data) {
        var dto = ($.exists(data.find)) ? data : $.dto(data);
        return this._formFactory.create(key).write(dto);
    }
};
$.ku4webApp.abstractView = abstractView;