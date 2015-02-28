function service(mediator, name, config, onServiceCall) {
    this._mediator = mediator;
    this._name = name;
    this._config = config;
    this._onServiceCall = onServiceCall;
}
service.prototype = {
    cache: function() { return this; },
    noCache: function() { return this; },
    lock: function() { return this; },
    unlock: function() { return this; },
    abort: function() { return this; },
    call: function(data) {
        var config = this._config,
            callback = this._onServiceCall.find(this._name),
            callbackData = ($.isFunction(callback)) ? callback(data) : {},
            isError = callbackData instanceof Error;

        if(!$.exists(config))
            throw $.ku4exception("$.service", "Test Bundle services require a valid config containing a " +
                                              "'success':[data] and an 'error':[data] configuration.");

        if($.exists(config.error) && isError) this._mediator.notify(config.error, callbackData);
        else if($.exists(config.success)) this._mediator.notify(config.success, callbackData);

        return this;
    }
};
$.ku4webApp_testBundle.service = function(mediator, name, config, onServiceCall) {
    return new service(mediator, name, config, onServiceCall);
};