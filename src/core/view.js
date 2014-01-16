$.ku4webApp.view = function(name, proto, subscriptions) {

    function view(mediator, responsebox, templateFactory) {
        view.base.call(this, mediator, responsebox, templateFactory);
    }
    view.prototype = proto;
    $.Class.extend(view, abstractView);

    $.ku4webApp.views[name] = function(app) {
        var mediator = app.mediator,
            _view = new view(mediator, app.responsebox, app.templateFactory);
        if($.exists(subscriptions))
            $.hash(subscriptions).each(function(obj) {
                mediator.subscribe(obj.key, _view[obj.value], _view);
            });
        return _view;
    }
}