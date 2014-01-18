/* Has access to the following protected methods
    $template(NAME): Retrieves the template named NAME
    $write(NAME, DTO): Writes the DTO to the form named NAME
 */

$.ku4webApp.view("NAME", {
    //METHODS GO HERE
    METHOD: function() { },
    CALLBACK: function() { }
},
{
    //MEDIATOR SUBSCRIPTIONS GO HERE
    "SUBSCRIPTION": CALLBACK
});