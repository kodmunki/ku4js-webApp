#ku4jQuery-webApp

kodmunki™ utilities for jQuery Web Applications.

This project contains everything needed to create a compact and powerful MVC client application using kodmunki tools
in conjunction with jQuery. A Web Application created with this project will contain html templating engines,
ajax services, local persistence that leverages HTML5 localStorage, form reading, writing and validation, and an
incredible suite of excellent JavaScript tools that includes such excellent tools and patterns such as
the specifcation pattern and DTO (Data Transfer Objects), brought to you by
[ku4jQuery-kernel](https://github.com/kodmunki/ku4jQuery-kernel) and
[ku4jQuery-data](https://github.com/kodmunki/ku4jQuery-data).

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

* LIBRARY (The library to build for or {} for none)
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
check out the [example project](https://github.com/kodmunki/ku4jQuery-webApp/tree/master/example)

##Templates

Has access to the following protected methods
* $localization(NAME): _Retrieves the localization config named NAME if one exists._
* $config(NAME): _Retrieves the template config named NAME._
* $forms(NAME): _Retrieves the forms templates config named NAME (Shortcut for $config("forms")[NAME])._
* $views(NAME): _Retrieves the views templates config named NAME (Shortcut for $config("views")[NAME])._
* $render(TEMPLATE, DTO): _Renders the TEMPLATE using DTO data._
* $renderList(TEMPLATE, Array[DTO]): _Renders TEMPLATE using DTO data for each DTO in Array._
* $renderListWithAction(Array[DTO], FUNCTION) Calls a specified render function for each DTO in Array.
                                              It is important that the specified action return a string value!

```javascript
$.ku4webApp.template("NAME", {
    //METHODS GO HERE
    METHOD: function() { },
    CALLBACK: function() { }
});
```

##Models
Has access to the following protected methods
* $collection(NAME): Retrieves the collection named NAME._
* $service(NAME): Retrieves the service named NAME._
* $validator(NAME): Retrieves the validator named NAME._
* $notify([DATA], NAME, ...) _Notifies the subscribers in the list or arguments passing DATA if supplied.
                             Calling this function without a list of subscribers will notify ALL subscribers!_

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

Has access to the following protected methods
* $template(NAME): Retrieves the template named NAME
* $form(NAME): Retrieves the form named NAME

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

Has access to the following protected methods
* $model(NAME): Retrieves the model named NAME
* $form(NAME): Retrieves the form named NAME

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

When you have successfully integrated ku4jQuery-webApp into your application you will be able to call your controller
methods by calling "controller.yourMethod" where "yourMethod" is some method that you have created in your custom
controller. For example, if you had implemented a controller with the method "execute" and wished to call it from
a button you would add the following HTML into the desired location of your web application:

```html
<button onclick="controller.execute(); return false;">Execute</button>
```
