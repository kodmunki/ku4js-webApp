$.exampleErrorMessage = function(messageObject) {
    var message = "";
    $.hash(messageObject).each(function(obj) {
        message += $.str.format("* Field: {0} -- {1}\n", obj.key, obj.value);
    });
    return message;
};