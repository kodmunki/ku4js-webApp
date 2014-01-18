/* Has access to the following protected methods
    $collection(NAME): Retrieves the collection named NAME
    $service(NAME): Retrieves the service named NAME
    $validator(NAME): Retrieves the validator named NAME
    $notify([DATA], NAME, ...) Notifies the subscribers in the list or arguments passing DATA if supplied.
                               Calling this function without a list of subscribers will notify ALL subscribers!
 */

$.ku4webApp.model("NAME", {
    //METHODS GO HERE
    METHOD: function() { },
    CALLBACK: function() { }
},
{
    //MEDIATOR SUBSCRIPTIONS GO HERE
    "SUBSCRIPTION": CALLBACK
});