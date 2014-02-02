function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(dto) {
        if(!$.exists(dto)) throw $.ku4exception("$.service", "Test Bundle services require a valid dto containing a 'success':true or an 'error':true key value pair.")
        var success = dto.find("success"),
            error = dto.find("error");

        if($.exists(success)) this._mediator.notify(success, this._config.success);
        else if($.exists(error)) this._mediator.notify(error, this._config.error);
        return this;
    }
};
$.ku4webApp_testBundle.service = function(mediator, config) {
    return new service(mediator, config);
};