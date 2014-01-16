function abstractView(mediator, responsebox, templateFactory, formFactory) {
    this._mediator = mediator;
    this._responsebox = responsebox;
    this._templateFactory = templateFactory;
    this._formFactory = formFactory;
}
abstractView.prototype = {
    $mediator: function() { return this._mediator; },
    $responsebox: function() { return this._responsebox; },
    $template: function(key) { return this._templateFactory.create(key); },
    $write: function(key, data) {
        var dto = ($.exists(data.find)) ? data : $.dto(data);
        return this._formFactory.create(key).write(dto);
    }
};
$.ku4webApp.abstractView = abstractView;