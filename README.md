#ku4js-webApp

kodmunki™ utilities for js Web Applications.

This project contains everything needed to create a compact and powerful MVC client application using kodmunki tools
for JavaScript. A Web Application created with this project will contain html templating engines,
ajax services, local persistence that leverages HTML5 localStorage, form reading, writing and validation, and an
incredible suite of excellent JavaScript tools including specifcation patterns and DTO (Data Transfer Objects),
brought to you by [ku4js-kernel](https://github.com/kodmunki/ku4js-kernel) and
[ku4js-data](https://github.com/kodmunki/ku4js-data). All of these technologies are rooted in SOLID OO
principles and thoughtful observation of JavaScript, HTML, and CSS SoC and IoC.

---

#kodmunki™ build process

This build process is dependent upon yuicompressor and a specific directory structure:

* root  
 * _build (This build script and the yuicompressor)
 * bin (The compiled scripts will appear here)
 * src (All script files go here)

The following variables found in setup () are
expected to be changed by the developer running
this process:

* PROJNAME (The name of your project)
* STARTMSG (A message to echo at start of build)
* ENDMSG (A message to echo at end of build)

---

#Setup
To get your project going simply follow these instructions:

1. Copy the contents of _TEMPLATE into your project.
2. Update the project name in the build scripts.
3. Rename the /src/-ProjectFiles- directory to the name that you set for the project name in #2 above.
4. Enter your app name per the instructions found on line 3 of the /application/-Application-.js file.
5. Rename the /application/-Application-.js file to a desired name.
6. Build the application using the appropriate sh or cmd build script.
7. Add a reference in the desired HTML page to **_one_** of the artifacts in the /bin directory.
8. Add a reference in the desired HTML page to the renamed -Application-.js file.
9. ROCK AND ROLL!

---

#Documentation
The following is the documentation for the template engine and the MVC application classes. For further information
check out the [example project](https://github.com/kodmunki/ku4js-webApp/tree/master/example)

##Templates
Has access to the following protected methods and properties:

| API | Return | Description |
| --- | --- | --- |
| $config(name:_String_) | config | Retrieves the template config named "name". |
| $forms(name:_String_) | config | Retrieves the forms templates config named "name" (Shortcut for $config("forms")[name]). |
| $views(name:_String_) | config | Retrieves the views templates config named "name" (Shortcut for $config("views")[name]). |
| $render(template:_String_, data:_{}_) | String | Renders the template using object literal or dto data. |
| $renderList(template:_String_, array:_Array<dto>_) | String | Renders template using object literal or dto data for each dto in array. |
| $renderListWithAction(array:_Array<dto>_, func:_Function_) | String | Calls a specified render function for each dto in array. It is important that the specified action return a string value! |

* Runtime instantiation requires valid templates config. _(This is a potential scenario in advanced development of an
enterprise applications and should be heeded. For example, if you create a template for generic form fields
specifically, i.e. $.ku4webApp.template("forms", { /*Your methods here*/ }, and want to access it from another template,
 you will have to instantiate it on the fly and pass the local config to it: $.ku4webApp.template.forms(this.$config()))_.

```javascript
$.ku4webApp.template("NAME", {
    //METHODS GO HERE
    METHOD: function() { }
});
```

##Models
Has access to the following protected methods and properties:

| API | Return | Description |
| --- | --- | --- |
| $collection(name:_String_) | collection | Retrieves the collection named "name". |
| $service(name:_String_) | service | Retrieves the service named "name". |
| $validator(name:_String_) | validator | Retrieves the validator named "name". |
| $state() | state | Retrieves the local state machine. |
| $appState() | state | Retrieves the global state machine. |
| $notify(data:_Object_, NAME, ...) | void | Notifies the subscribers in the list or arguments passing data if supplied. Calling this function without a list of subscribers will notify _all_ subscribers!|

* Runtime instantiation requires a valid mediator, serviceFactory, storeFactory, and validatorFactory. _(This is a
very unlikely scenario)_.

```javascript
$.ku4webApp.model("NAME", {
    //METHODS GO HERE
    METHOD: function() { },
    CALLBACK: function() { }
},
{
    //MEDIATOR SUBSCRIPTIONS GO HERE
    "SUBSCRIPTION": CALLBACK
});
```

##Views

Has access to the following protected methods and properties:

| API | Return | Description |
| --- | --- | --- |
| $template(name:_String_) | template | Retrieves the template named "name". |
| $form(name:_String_) | form | Retrieves the form named "name". |
| $navigator() | navigator | Retrieves the global navigator. |

* Runtime instantiation requires a valid templateFactory and formFactory. _(This is an absurd scenario. If you require it,
it is likely that you need to revisit [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). If you
find a necessary reason, please contact [support@kodmunki.com](mailto:support@kodmunki.com) to share)_.

```javascript
$.ku4webApp.view("NAME", {
    //METHODS GO HERE
    METHOD: function() { },
    CALLBACK: function() { }
},
{
    //MEDIATOR SUBSCRIPTIONS GO HERE
    "SUBSCRIPTION": CALLBACK
});
```

##Controllers

Has access to the following protected methods and properties:

| API | Return | Description |
| --- | --- | --- |
| $model(name:_String_) | model | Retrieves the model named "name". |
| $form(name:_String_) | form | Retrieves the form named "name". |
| $navigator() | navigator | Retrieves the global navigator. |

* Runtime instantiation requires a valid modelFactory and formFactory.

```javascript
$.ku4webApp.controller("NAME", {
    //METHODS GO HERE
});
```

##Applications/ files

These files are where you will initialize your controllers and views and expose your controller to the HTML page.

```javascript
var controller;
$(function(){
    var appName = "[ENTER YOUR APP NAME HERE]",
        app = $.ku4webApp.app();
    controller = $.ku4webApp.controllers[appName](app)
    $.ku4webApp.views[appName](app);

/*======================================================*/

 //[Other desired views or initialization scripting HERE]

/*======================================================*/

});
```

When you have successfully integrated ku4js-webApp into your application you will be able to call your controller
methods by calling "controller.yourMethod" where "yourMethod" is some method that you have created in your custom
controller. For example, if you had implemented a controller with the method "execute" and wished to call it from
a button you would add the following HTML into the desired location of your web application:

```html
<button onclick="controller.execute(); return false;">Execute</button>
```

##Configurations

The dependency injection of ku4js-webApp is largely dependent upon the configuration files. These files are required
for a ku4js-webApp project to work successfully. They are very simple files to configure. The ones listed here
are required and must be included in your ku4js-web app. You can add more of them as you need making ku4js-webApp
**_very_** extensible! Documentation for each of the required configuration follows:

###config.collections

Configures the local client-side persistence callback structure.

```javascript
/*
    //COLLECTION
    NAME: {
        name: "COLLECTION NAME",
        insert: "ON CREATED",
        find: "ON FOUND",
        update: "ON UPDATED",
        remove: "ON REMOVED"
    }
 */

$.ku4webApp.config.collections = {
    //ADD YOUR COLLECTIONS HERE
};
```

###config.services

Configures the ajax services

```javascript
/*
    NAME: {
        verb: "VERB",
        uri: "URI",
        contentType: "Content-Type" //(OPTIONAL)
        success: "ON SUCCESS",
        error: "ON ERROR"
    }
 */
$.ku4webApp.config.services = {
    //ADD YOUR SERVICES HERE
};
```

####Service processId

Sometimes a developer retains state across service calls and in their architecture must be infomed which service call is
responsible for making the callback. ku4webApp service calls contain a processId for developers to use in this case.
This processId is returned when invoking the call method. This processId can be used to inform the system as to which
service call is making a notification of its callback. When a service makes a notification of its callback it will
notify each subscriber by passing any server data that was returned as a first argument and its processId as the second
arguments. Note the example callback method below:

```javascript
function callback(serverData, processId) {
    console.log(serverData); //This will log returned data
    console.log(processId); //This will log the notifying servers processId
};
```



###config.forms

Configures the forms that your controllers will read from when calling model methods that require user input, and that
your views will write to when there is data coming from the server that should be placed into the form on load, e.g.
when a user is editing information that they have already provided.

```javascript
/*
    NAME: [
        //FIRST FIELD
        {
            selector: "DOM SELECTOR",
            type: "TYPE", (OPTIONS: field, select, checkbox)
            required: BOOL
        },
        //SECOND FIELD
        {
            selector: "DOM SELECTOR",
            type: "TYPE", (OPTIONS: field, select, checkbox)
            required: BOOL
        }]
 */
$.ku4webApp.config.forms = {
    //ADD YOUR FORMS HERE
};
```

###config.validators

Configures the validation rules that your models can use to validate operation classes before they are transmitted
to the server.

```javascript
/*
    //VALIDATOR
    NAME: [
        //VALIDATION RULE 1
        {
            name: "DTO KEY TO VALIDATE",
            spec: SPEC ($.spec),
            message: "MESSAGE IF INVALID"
        },
        //VALIDATION RULE 2
        {
            name: "DTO KEY TO VALIDATE",
            spec: SPEC ($.spec),
            message: "MESSAGE IF INVALID"
        }]
 */
$.ku4webApp.config.validators = {
    //ADD YOUR VALIDATORS HERE
};
```

###config.templates

Configures the templates in your web application. config.templates.forms and config.templates.views are required
template configurations.

####config.templates.forms

```javascript
/*
    NAME: 'HTML FORM FORMAT'
 */

$.ku4webApp.config.templates.forms = {
    //ADD YOUR FORM TEMPLATES HERE
};
```

####config.templates.views

```javascript
/*
    NAME: 'HTML FORMAT'
 */

$.ku4webApp.config.templates.views = {
    //ADD YOUR VIEW TEMPLATES HERE
};
```

#Dependencies

This project requires the following dependencies:

* [ku4js-kernel](https://github.com/kodmunki/ku4js-kernel)
* [ku4js-data](https://github.com/kodmunki/ku4js-data)

#Gotchas!

So, as with much JavaScript development, there may be a couple of gotchas! Below are listed a few of the items that
noobs (meant respectfully) may encounter. Let's just clear those up here, and if you have further questions, please,
send them to [support@kodmunki.com](mailto:support@kodmunki.com).

1. Again, the configurations are **_key_** in this solution. They make things **_incredibly_** extensible but can
be a source of confusion for those new to IoC. The idea here is that you delegate your logic to the objects that "care"
and **_only_** when they **_do_** "care". For example, your $collection may care about what it is and what it is
supposed to do, but it only "cares" when it actually has to perform it's operation. That said, you will **_certainly_**
find exceptions when you make calls to a collection via "this.$collection("[NAME]") if you have not **_configured_** a
collection in the required config "config.collections.js". If you find yourself with a "Cannot read property 'name' of
undefined" error, for example. This likely means that you have not set up a config. In this example case, specifically,
this would indicate that you has not "config-ed" a collection that you are calling in your model. Config your collection
in the appropriate "config.collections.js" my simply creating a "key, object" pair, i.e. "[NAME]:{ name: "[COLLECTION]"}
and you should resolve your exception. Generally, this holds true for services, forms, validators, and templates, as
well.

2. Note that when you create a controller, model, or view, you do so with the english singular, e.g.
$.ku4webApp.**_view_**("[NAME]", { /*Your methods here*/}, {/*Your listeners here*/}). When you call it after it is
instantiated, you will call it using the english plural, as it has become part of a collection of **_views_**.
Therefore, you would call this view in your [application].js as $.ku4webApp.**_views_**.NAME. If misspelled you are
certain to run into to rather convoluted: "Uncaught TypeError: Object function (s,t,u){function l(w,v){l.base.call(this,
w,v)}l.prototype=t;$.Class.extend(l,b);$.ku4webApp.views[s]=function(v){var w=new l(v.templateFactory,v.formFactory);if(
$.exists(u)){$.hash(u).each(function(x){v.mediator.subscribe(x.key,w[x.value],w)})}return w}} has no method 'NAME'"
error. This is telling you that you have a missed "Plural" in your [application].js (A less obfuscated exception message
is in progress).

3. You are, certainly able to access external controllers, models, views, and templates from within the current method
in scope, but you must ensure that you have instantiated it correctly. That is, you must pass **_all_** relevant
parameters to the instance. This is only likely in an advanced development scenario with regard to templates. If you have
questions, please, review the documentation above, or contact [support@kodmunki.com](mailto:support@kodmunki.com).

4. If you find **_any_** instance of an error that states, "ku4EXCEPTION @ $.MEDIATOR:" Check the call stack. You are
likely to have not subscribed to a notification. The mediator attempted to call it and could not find a subscriber.
This means that the named notifier is erroneous and should, likely, be removed.

5. Along with #4 above, you could also have an exception in your callback method. Read the stack trace and your method
implementation carefully, you will likely find your issue in the implementation. For further questions, contact
[support@kodmunki.com](mailto:support@kodmunki.com).

#Other cool features

1. Did you know that along with the simple CRUD ops of find, insert, update and remove, you can also include $in,
and $orderby in your find criteria? The $in query takes an object whose key is the property that you are interested in
and an array value whose content are the values that you would like to include in the search. $orderby, on the other
hand, takes an object whose key is the property that you are interested in and a numeric value or 1 or -1. 1 for
ascending ordering and -1 for descending. For example: if you had a collection of persons and wanted to find all of the
people whose first name was John, Linda or Larry and order them by their age in ascending order you could query from
your model as follows:

```javascript
    return this.$collection("persons")
        .find({$in: {name: ["John", "Linda", "Larry"]}, $orderby: { age: 1 }});
```

2. Did you know that ku4js-webApps ships with a testingBundle for you to use for your unit tests? You can see it
at work in the example project's unit tests. For more info, check out the model, view and controller of the example
application in this project.