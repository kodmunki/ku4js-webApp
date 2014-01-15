/* The config for a validator should contain an array of key, value pairs
 * per field that is intended to be included in the validation output.
 * Each fields config should contain a name and a message.
 */

function formValidator(config) {
    this._config = config;
}
formValidator.prototype = {
    validate: function(form) {
        var config = this._config,
            isValid = true,
            messages = $.hash({}),
            fields = form.fields();

        $.list(config).each(function(item) {
            var name = item.name,
                message = item.message,
                field = fields.find(name);
            if(!$.exists(field) || field.isValid()) return;
            isValid = false;
            messages.add(name, message);
        });
        return { isValid: isValid, messages: messages.toObject() };
    }
};
$.ku4webApp.validator = function(config) {
    return new formValidator(config);
};