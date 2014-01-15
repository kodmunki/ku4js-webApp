/* config must follow format: { action: "/service/url" }
 */

function abstractService(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
abstractService.prototype = {
    $call: function(verb, action, success, params) {
        $.service()[verb]().uri(this._config[action])
            .onSuccess(function(datagram){
                var response = $.dto.parseJson(datagram).toObject();
                if (response.isError) this._mediator.notify(response, "error");
                else this._mediator.notify(response.data, success);
            }, this)
            .onError(function(data){ this._mediator.notify(data, "error"); }, this)
            .call(params);
        return this;
    }
};
$.ku4webApp.service = abstractService;