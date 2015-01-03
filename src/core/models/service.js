function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;

    var service = $.service()[config.verb]().uri(config.uri);
        service.contentType(config.contentType);
        service.onSuccess(function(data) {
                if($.exists(config.success))
                    mediator.notify(data, service.processId(), config.success);
            }, this)
            .onError(function(data){
                if($.exists(config.error))
                    mediator.notify(data, service.processId(), config.error);
            }, this);

    this._service = service;
}
service.prototype = {
    cache: function() { this._service.cache(); return this; },
    noCache: function() { this._service.noCache(); return this; },
    abort: function() { this._service.abort(); return this; },
    call: function(params) { this._service.call(params); return this; }
};
$.ku4webApp.service = function(mediator, config) {
    return new service(mediator, config);
};