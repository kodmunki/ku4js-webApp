#ku4jQuery-_template


kodmunki™ utilities for jQuery (or other library) project template.

This project is defaulted to leverage jQuery but can be set to leverage any JavaScript library or none at all. The template includes a build process that requires a specific project directory setup. This process is simple and convenient. It is a great way to manage a JavaScript project from Unit Testing into development and through compilation for production. This project template is the same one used for the ku4jQuery products yet is in no way dependent upon the ku4* libraries. Freeing you to chose if or when you will include a ku4* library in your project.


*(The following are the instructions from the build script found in the template at /_build/build.sh)*

####kodmunki™ build process
---

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
