$.ku4webApp.stateMachine = function(proto) {
    function stateMachine(modelFactory) {
        stateMachine.base.call(this, modelFactory);
    }
    stateMachine.prototype = proto;
    $.Class.extend(stateMachine, abstractStateMachine);

    $.ku4webApp.$stateMachine = function(modelFactory) {
        return new stateMachine(modelFactory);
    }
};