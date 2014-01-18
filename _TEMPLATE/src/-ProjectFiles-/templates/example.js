/* Has access to the following protected methods
    $localization(NAME): Retrieves the localization config named NAME if one exists
    $config(NAME): Retrieves the template config named NAME
    $forms(NAME): Retrieves the forms templates config named NAME (Shortcut for $config("forms")[NAME])
    $views(NAME): Retrieves the views templates config named NAME (Shortcut for $config("views")[NAME])
    $render(TEMPLATE, DTO): Renders the TEMPLATE using DTO data
    $renderList(TEMPLATE, Array[DTO]): Renders TEMPLATE using DTO data for each DTO in Array
 */

$.ku4webApp.template("NAME", {
    //METHODS GO HERE
    METHOD: function() { },
    CALLBACK: function() { }
});