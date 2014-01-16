function abstractView(mediator, responsebox, templateFactory) {
    this._mediator = mediator;
    this._responsebox = responsebox;
    this._templateFactory = templateFactory;
}
abstractView.prototype = {
    subscribe: function(observer, action) {
        this._mediator.subscribe(observer, this[action], this);
        return this;
    },
    $mediator: function() { return this._mediator; },
    $responsebox: function() { return this._responsebox; },
    $templateFactory: function() { return this._templateFactory; }
};
$.ku4webApp.abstractView = abstractView;