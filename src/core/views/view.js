$.ku4webApp.__views = { };
$.ku4webApp.view = function(name, proto, subscriptions) {

    function view(templateFactory, formFactory, navigator) {
        view.base.call(this, templateFactory, formFactory, navigator);
    }
    view.prototype = proto;
    $.Class.extend(view, abstractView);

    $.ku4webApp.views[name] = function(app) {
        var className = $.str.format("$.ku4webApp.views.{0}", name),
            message = $.str.format("Requires a valid app. app= {0}", app);
        if(!$.exists(app)) throw $.ku4exception(className, message);

        if(!$.exists($.ku4webApp.__views[name])) {
            var _view = new view(app.templateFactory, app.formFactory, app.navigator);
            if($.exists(subscriptions))
                $.hash(subscriptions).each(function(obj) {
                    var key = obj.key,
                        value = obj.value,
                        id = $.str.format("ku4webApp.view_{0}_{1}", name, key),
                        method = _view[value];

                    try {
                        app.mediator
                            .unsubscribe(key, id)
                            .subscribe(key, method, _view, id);
                    }
                    catch(e) {
                        throw $.ku4exception("$.ku4webApp.view", $.str.format("$.ku4webApp.view.{0} cannot subscribe to mediator with name: {1} or key: {2}.\n\nmessage:{3}\n\n", name, key, value, e.message));
                    }
                });
            $.ku4webApp.__views[name] = _view;
        }
        return $.ku4webApp.__views[name];
    }
};