function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(data) {
        var config = this._config,
            callback = $.ku4webApp_testBundle.callback || function(data) { return data;},
            callbackData = callback(data),
            isError = /^__error__$/i.test(callbackData);
        if(!$.exists(config))
            throw $.ku4exception("$.service", "Test Bundle services require a valid config containing a " +
                                              "'success':[data] and an 'error':[data] configuration.");

        if($.exists(config.error) && isError) this._mediator.notify(config.error, callbackData);
        else if($.exists(config.success)) this._mediator.notify(config.success, callbackData);

        $.ku4webApp_testBundle.callback = function(data) { return data; };

        return this;
    }
};
$.ku4webApp_testBundle.service = function(mediator, config) {
    return new service(mediator, config);
};