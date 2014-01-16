function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(params) {
        var config = this._config;
        $.service()[config.verb]().uri(config.uri)
            .onSuccess(function(datagram){
                var response = $.dto.parseJson(datagram).toObject();
                if (response.isError) this._mediator.notify(response, config.error);
                else this._mediator.notify(response.data, config.success);
            }, this)
            .onError(function(data){ this._mediator.notify(data, config.error); }, this)
            .call(params);
        return this;
    }
};
$.ku4webApp.service = function(mediator, config) {
    return new service(mediator, config);
};