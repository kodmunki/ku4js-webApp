$.ku4webApp.stateMachine = function(proto, subscriptions) {
    function stateMachine(modelFactory) {
        stateMachine.base.call(this, modelFactory);
    }
    stateMachine.prototype = proto;
    $.Class.extend(stateMachine, abstractStateMachine);

    $.ku4webApp.$stateMachine = function(mediator, modelFactory) {
        var _stateMachine = new stateMachine(modelFactory);

        if($.exists(subscriptions)) {
            $.hash(subscriptions).each(function (obj) {
                var key = obj.key,
                    value = obj.value,
                    id = $.str.format("ku4webApp.stateMachine.{0}", value),
                    method = _stateMachine[value];

                try {
                    mediator
                        .unsubscribe(key, id)
                        .subscribe(key, method, _stateMachine, id);
                }
                catch (e) {
                    throw $.ku4exception("$.ku4webApp.stateMachine", $.str.format("$.ku4webApp.stateMachine cannot subscribe to mediator with name: {0} or method: {1}.\n\nmessage:{2}\n\n", key, value, e.message));
                }
            });
        }
        return _stateMachine;
    }
};