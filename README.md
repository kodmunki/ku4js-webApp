#ku4js-webApp

kodmunki™ utilities for js Web Applications.

This project contains everything needed to create a compact and powerful MVC client application using kodmunki tools for JavaScript. A Web Application created with this project will contain html templating engines, ajax services, local persistence that leverages HTML5 localStorage, form reading, writing and validation, and an incredible suite of excellent JavaScript tools including specifcation patterns and DTO (Data Transfer Objects), brought to you by [ku4js-kernel](https://github.com/kodmunki/ku4js-kernel) and [ku4js-data](https://github.com/kodmunki/ku4js-data). All of these technologies are rooted in SOLID OO principles and thoughtful observation of JavaScript, HTML, and CSS SoC and IoC.

<img src="http://www.kodmunki.com/media/logo-small.png" alt="kodmunki" />

---
#Documentation

The ku4js-webApp library, at its core, consists of Models, Views, Controllers, Templates, and Configs. The following documentation discusses each of these parts, their roll in a ku4js-webApp application and their various components.

This documentation also disucsses the incredibly powerful ku4webApp Test Bundle. This test bundle enables developers to follow a TDD workflow and write deep, atomic unit tests for every aspect of their ku4js-webApp web application.

The API tables in each section of the documentation contain three columns.

| API | Return | Description |
| --- | --- | --- |
| This column contains the actual JavaScript API of the property or method in question. Proper syntax is depicted. Argument types are displyed in italics. Class/static methods are denoted with the class name, whereas instance level methods will begin with a dot. Example class/static method: **$.math.round(value:_Number_, nearest:_Number_)**. Example of an instance method: **.toString()**. Those methods prefixed by a $ are protected and should only be accessed from within a given instance. | The return values type, if any. A value of "this" in this column indicates the return of a reference to self | This column contains descriptions and any **Gotchas!** |

An example project can be found in the [_example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) directory at the project root.

---

#Setup
ku4js-webApp ships with a [_TEMPLATE/](https://github.com/kodmunki/ku4js-webApp/tree/master/_TEMPLATE) so, although there is a dependent directory structure for a ku4js-webApp project, getting started is very simple!

To get your project going simply follow these instructions:

1. Copy the contents of _TEMPLATE into your project.
2. Update the project name (PROJNAME variable) in the sh and cmd build script files. To do this, simply open these files in a text editor and update the PROJNAME variable found on line 29 of each of these files.
3. Build the application using the appropriate sh or cmd build script.

You now should have a "compiled" JavaScript artifacts in your /bin directory. One, that is compressed, and one that is not compressed.

To add your app to a web project:

1. Add a reference in the desired HTML page to **_one_** of the artifacts in the /bin directory. _(You will likely add refrence to the minified version)_
2. Add a reference in the desired HTML page to your ku4js-webApp project's app.js file.

There! You are now set up for development!

---

##Models
The first component of an MVC application is M (Model). ku4js-webApp projects keep all model files in the models/ directory. Each model represents a core component of the application. Each model has read/write access to the applications state, the client-side NoSQL database, ajax services, sockets, and the application mediator used to notify views of state changes. 

ku4js-webApp models are intended to be the sole driver of application state and the medium through which your application accesses the server and the client-side NoSQL database. Developer implemented ku4js-webApp models can be accessed by ku4js-webApp controllers and ku4js-webApp views, to call methods and read state respectively.

 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

API and template documentation follow:

###ku4js-webApp model API:

| API | Return | Description |
| --- | --- | --- |
| .$collection(name:_String_) | collection | Retrieves the collection named "name". |
| .$service(name:_String_) | service | Retrieves the service named "name". |
| .$socket(name:_String_) | service | Retrieves the socket named "name". _(included)_|
| .$validator(name:_String_) | validator | Retrieves the validator named "name". |
| .$state() | state | Retrieves the local state. |
| .$appState() | state | Retrieves the appliation state. |
| .$notify(name:_String_, data:_Object_, ...) | void | Sends a notification containg the data argument(s) to the name or names in the name string argument _(multiple names can be passed by seperating them with a comma)_ |

###ku4js-webApp model class template:
A ku4js-webApp models can be defined using a template like the one below. You never have to instantiate a ku4js-webApp model, only define it. ku4js-webApp models are managed by the ku4js-webApp runtime. You have access your defined model in your ku4js-webApp controllers and ku4js-webApp views via the .$model("name") API. _(See the [Controllers](#controllers) and [Views](#views) documentation for more details_

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
**For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

##Views

The V in MVC is for Views. ku4js-webApp views are responsible for interpreting model state and presenting appropriate data to the user. Though you are certain to see other libraries i.e. jQuery being used in the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application due to its excellence in working with the DOM, it must be stressed that ku4js-webApp views just like all of the ku4js-* JavaScript Framework suite, are independed of any other libraries or Frameworks outside of the ku4js-* Framework suite. This frees you to use as many or as few other frameworks as you desire.

ku4js-webApp views will commonly listen for notifications from ku4js-webApp models and then act in accordinance with the data they receive through these notifications.

 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

API and template documentation follow:

###ku4js-webApp view API:

| API | Return | Description |
| --- | --- | --- |
| .$template(name:_String_) | template | Retrieves the template named "name". |
| .$form(name:_String_) | form | Retrieves the form named "name". |
| .$navigator() | navigator | Retrieves the global navigator. |

###ku4js-webApp view class template:
A ku4js-webApp views can be defined using a template like the one below. 

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

Your views should be instantiated in the app.js file on app load using the following syntax, where "app" is a refrence to the ku4js-webApp app instance:

```javascript
$.ku4webApp.views.NAME(app);
```

 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

##Controllers

Controllers are the C in MVC. ku4js-controllers are intended to expose an API to DOM so that web pages and web apps can call your ku4js-webApp. Controllers are defined much like ku4js-webApp [Models](#models) and [Views](#views), and like ku4js-webApp views they should be instantiated in your app.js file, and referenced by a variable scoped so that DOM elements can access it.

 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

API and template documentation follow:

| API | Return | Description |
| --- | --- | --- |
| .$model(name:_String_) | model | Retrieves the model named "name". |
| .$form(name:_String_) | form | Retrieves the form named "name". |
| .$navigator() | navigator | Retrieves the global navigator. |

###ku4js-webApp controller class template:
A ku4js-webApp controllers can be defined using a template like the one below. 

```javascript
$.ku4webApp.controller("NAME", {
    //METHODS GO HERE
});
```

Your controllers should be instantiated in the app.js file on app load using the following syntax, where "app" is a refrence to the ku4js-webApp app instance:

```javascript
$.ku4webApp.controllers.NAME(app);
```
 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

##app.js file

This is the file in which you will build your application. If you are familiar with building Object Oriented models and then building up applications in an application layer using your various model classes this should be fairly straight forward. If you are unfamiliar with this workflow, the basic idea is to create models, views, controllers, and any other necessary classes in small testible, encapsulated, units, that express what it is they do via their API and are concerned with one specific concept or task. You then take all of those tools that you have developed and unit tested and leverage them in your application file, or in the case of a ku4js-webApp, your app.js file to build your applicaiton.

A template of an app.js file can be seen below. It is not necessary that your app.js file follow this format, though, for simple applications it is certainly a viable format. Some points of note to take away from the template in any case are the controller var that is exposed outside of the document load function, and the instatiation of the view as described in the [Views](#views) section of this document.

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

 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

When you have successfully integrated ku4js-webApp into your application you will be able to call your controller
methods by calling "controller.yourMethod" where "yourMethod" is some method that you have created in your custom
controller. For example, if you had implemented a controller with the method "execute" and wished to call it from
a button you would add the following HTML into the desired location of your web application:

```html
<button onclick="controller.execute(); return false;">Execute</button>
```

##Templates

ku4js-webApp templates are classes that collect and compile and render the text and HTML that you will likely use in your web appliation. These classes are intended to take on this, often ugly, task. Why not just do this in the views you might ask. ku4js-webApp views have different concerns and should be used to track view state, listen for model notifications, and set up runtime events to name a few. Templates allow views to offload the ofter verbose task of building up the actual content that will be displayed. Templates can collect the data that they need to create meaningful content from the [template view configs]() and [template form configs](), or they can also collect this data from HTML files or even call the server for this data. In any event, it is the job of the ku4js-webApp template to gather all necessary data and compile it into something meaningful that can be presented by the view. Furthermore, templates will be called by ku4js-webApp views who can pass data retreived from ku4js-webApp models to dynamically fill their compiled content with meaningful dynamic data.

 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

API and template documentation follow:

| API | Return | Description |
| --- | --- | --- |
| .$config(name:_String_) | config | Retrieves the template config named "name". |
| .$forms(name:_String_) | config | Retrieves the forms templates config named "name" (Shortcut for $config("forms")[name]). |
| .$views(name:_String_) | config | Retrieves the views templates config named "name" (Shortcut for $config("views")[name]). |
| .$render(template:_String_, data:_{}_) | String | Renders the template using object literal or dto data. |
| .$renderList(template:_String_, array:_Array<dto>_) | String | Renders template using object literal or dto data for each dto in array. |
| .$renderListWithAction(array:_Array<dto>_, func:_Function_) | String | Calls a specified render function for each dto in array. It is important that the specified action return a string value! |

###ku4js-webApp view class template:
A ku4js-webApp templates can be defined using a template like the one below. You never have to instantiate a ku4js-webApp template, only define it. ku4js-webApp templates, like ku4hjs-webApp [models](#models), are managed by the ku4js-webApp runtime. You have access your defined templates in your ku4js-webApp views via the .$template("name") API.

```javascript
$.ku4webApp.template("NAME", {
    //METHODS GO HERE
    METHOD: function() { }
});
```

##Configurations

ku4js-webApp is largely dependent upon the ku4js-webApp config files found in the config/ directory of a ku4js-webApp application. These files are required
for a ku4js-webApp project to work successfully. They are very simple files to configure. The ones listed here are required and must be included in your ku4js-web app. You can add more of them as you need making ku4js-webApp
**_very_** extensible! Documentation for each of the required configuration follows:

###config.collections

The collections configuration file configures the NoSQL database collections that can be accessed by your ku4js-webApp models. You must set a unique key as this will be the value by which your models access the collection via the .$collection("NAME") API. The only value that is required is a "COLLECTION NAME", this is often simply the same name as your NAME key. The other values are optional and simply defined notifiers that your classes, namely your models, can subscribe to and be notified when one of associated tasks completes. Because it is most likey that collections will be accessed unsing the asynchronous API from within the model, these options are unlikely to be used, though available if needed.

```javascript
/*
    //COLLECTION
    NAME: {
        name: "COLLECTION NAME",
        insert: "ON CREATED", //(OPTIONAL)
        find: "ON FOUND",  //(OPTIONAL)
        update: "ON UPDATED",  //(OPTIONAL)
        remove: "ON REMOVED"  //(OPTIONAL)
    }
 */

$.ku4webApp.config.collections = {
    //ADD YOUR COLLECTIONS HERE
};
```
 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

###config.services

The ku4js-webApp services configuration file configures ajax servers that are available to your models using the .$service("NAME") API. These services act as your models portal to your server and help keep your ku4js-webApp applications highly responsive. Note that XSS and CORS calls can be made by simply using the .$service("NAME").xss() and $.service("NAME").cors() API respectively, though note that XSS and CORS will require some server-side setup.

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

 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**
 
####Service processId

Sometimes developers retain state across service calls and must be infomed which service call is
responsible for making a callback. ku4webApp service calls contain a processId for developers to use in this case.
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

###config.sockets

This file configures web sockets leveraging socket.io (included). Do note that sockets to require some server-side work .

```javascript
/*
    NAME: {
        event: "NAME"
        success: "ON SUCCESS",
        error: "ON ERROR"
    }
 */
$.ku4webApp.config.sockets = {
    //ADD YOUR SERVICES HERE
};
```
 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

###config.forms

ku4js-webApp forms configurations configure the forms that your controllers will read when calling model methods that require user input, and those that
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
 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

###config.validators

ku4js-webApp validator configurations configure the validation rules that your models can use to validate data passed to them before they are transmit the data to the server. Often times in other architectures this validation is directly tied to the forms. In ku4js-webApps this functionality is decopled from the DOM and make available to both be unit tested and be leveraged for all incoming data whether from a form or anyother data source.

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

 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

###config.templates

ku4js-webApp template configurations are one means to store HTML templates that your ku4js-webApp [templates](#templates) can use to gather HTML templates and other textual data to compile meaningful data for their views. These are separated into two separate files file by default: forms, and views. Others can be added as needed.

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
 **For further details you can view the [example/](https://github.com/kodmunki/ku4js-webApp/tree/master/_example) application or watch the tutorial videos COMING SOON.**

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