/*
    //NAVIGATOR
    "HASH": {
        model: "MODEL NAME",
        method: "MODEL METHOD"
    },
 */

$.ku4webApp.config.navigator = {

    //NOTE: When configured, this function will run on application load.
    //      This gives developers the opportunity to redirect the application
    //      to the appropriate location per the currentHash value. This can
    //      be valuable when certain hash values require arguments that are not
    //      supplied the developer can redirect the user to a more generic
    //      application state.
    "ku4OnAppLoad": function(navigator) { }

    //ADD YOUR NAVIGATORS HERE
};