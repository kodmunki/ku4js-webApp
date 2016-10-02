/* This file assumes that it will be placed in the same directory
 * as the files on which it depends:
 *
 * - ku4js-kernel.js
 * - ku4js-data.js
 * - ku4js-reflection.js
 * - ku4js-workers.js
 *
 *
 * In all ku4js-* instances this should be the lib directory of the scripts
 * project. If you are not using the standard ku4* method of scripting and
 * file management you will need to modify this file accordingly.
 */

importScripts("ku4js-kernel.js");
importScripts("ku4js-data.js");
importScripts("ku4js-reflection.js");
importScripts("ku4js-workers.js");

/*== Add additional imports here ==*/
/* This list should import all scripts
 * that you expect to be available to
 * the threads that you will spawn
 * with this receiver. Think of this
 * list as you do the list of scripts
 * that you list in an HTML page. If
 * you want the feature in, you must
 * the script file you must include
 * it in the HTML file. The same
 * goes here.
 */

//importScripts("[PATH]");

/*=================================*/

onmessage = function(event) {
    $.ku4workerReceiver().execute(event, function() {
        var result = $.list.parseArguments(arguments).toArray();
        postMessage($.json.serialize(result));
    });
};