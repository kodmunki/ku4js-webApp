function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(params) {
        var config = this._config,
            mediator = this._mediator;
        $.service()[config.verb]().uri(config.uri)
            .onSuccess(function(datagram){
                if (response.isError) mediator.notify(response, config.error);
                else mediator.notify(response.data, config.success);
            }, this)
            .onError(function(data){ mediator.notify(data, config.error); }, this)
            .call(params);
        return this;
    }
};
$.ku4webApp.service = function(mediator, config) {
    return new service(mediator, config);
};