function testService(mediator, config) {
    testService.base.call(this, mediator, config);
}
testService.prototype = {
    call: function(dto) { return this.$call("GET", "test", "testResponded", dto.toQueryString()); }
};
$.Class.extend(testService, $.ku4webApp.service);
$.tests.stubs.service = function(mediator, config) {
    return new testService(mediator, config);
};