/* responsebox must implement interface: show(html) hide()
 * templateFactory must create classes that inherit from baseTemplate
 */

function abstractView(mediator, responsebox, templateFactory) {
    this._mediator = mediator;
    this._responsebox = responsebox;
    this._templateFactory = templateFactory;
}
abstractView.prototype = {
    $mediator: function() { return this._mediator; },
    $responsebox: function() { return this._responsebox; },
    $templateFactory: function() { return this._templateFactory; }
};
$.ku4webApp.view = abstractView;