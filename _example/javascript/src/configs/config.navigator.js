$.ku4webApp.config.navigator = {
    "ku4OnAppLoad": function(navigator) {
            if (navigator.hashContainsArguments() &&
                navigator.hashEquals("card.edit")) {
                navigator.execute(navigator.read())
            }
            else navigator.execute("card.list");
    },

    "card.list": {
        model: "card",
        method: "listCards"
    },
    "card.add": {
        model: "card",
        method: "createCard"
    },
    "card.edit": {
        model: "card",
        method: "editCard"
    }
};