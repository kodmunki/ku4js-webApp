function testTemplate(templates) {
    testTemplate.base.call(this, templates);
}
testTemplate.prototype = {
    renderDiv: function(data) { return this.$render(this.$templates().test, data); }
};
$.Class.extend(testTemplate, $.ku4webApp.template);
$.tests.stubs.template = function(templates) {
    return new testTemplate(templates);
};