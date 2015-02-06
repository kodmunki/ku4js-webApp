function service(mediator, name, config) {
    this._mediator = mediator;
    this._config = config;

    var service = $.service(name)[config.verb]().uri(config.uri);
        service.contentType(config.contentType);

        if($.exists(config.success)) service.onSuccess(function(data) {
            mediator.notify(data, service.processId(), config.success);
        }, this, config.success);

        if($.exists(config.error)) service.onError(function(data){
            mediator.notify(data, service.processId(), config.error);
        }, this, config.success);

        if($.exists(config.complete)) service.onError(function(data){
            mediator.notify(data, service.processId(), config.complete);
        }, this, config.complete);

    this._service = service;
}
service.prototype = {
    cache: function() { this._service.cache(); return this; },
    noCache: function() { this._service.noCache(); return this; },
    lock: function() { this._service.lock(); return this; },
    unlock: function() { this._service.unlock(); return this; },
    abort: function() { this._service.abort(); return this; },
    call: function(params) { this._service.call(params); return this; }
};
$.ku4webApp.service = function(mediator, name, config) {
    return new service(mediator, name, config);
};