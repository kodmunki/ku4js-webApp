function testView(mediator, responsebox, templateFactory) {
    testView.base.call(this, mediator, responsebox, templateFactory);
}
testView.prototype = { };
$.Class.extend(testView, $.ku4webApp.view);
$.tests.stubs.view = function(mediator, responsebox, templateFactory) {
    return new testView(mediator, responsebox, templateFactory);
};