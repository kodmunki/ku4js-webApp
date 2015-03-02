(function(V){function R(){$.ku4={author:"kodmunki\u2122",license:'The MIT License (MIT)\n\nCopyright (c) 2013 kodmunki\u2122.\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the "Software"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'}}try{R()}catch(Z){$={};R()}$.isArray=function(e){return e instanceof Array};$.isBool=function(e){return(/boolean/i.test(typeof(e)))};$.isDate=function(e){return e instanceof Date};$.isEvent=function(l){try{return l instanceof Event}catch(af){return l===window.event}};$.isNumber=function(e){return((/number/i.test(typeof(e)))||e instanceof Number)&&!isNaN(e)};$.isObject=function(e){return $.exists(e)&&(/object/i.test(typeof(e)))&&!($.isBool(e)||$.isNumber(e)||$.isDate(e)||$.isArray(e)||$.isString(e)||$.isFunction(e))};$.isObjectLiteral=function(e){return $.isObject(e)&&e.constructor==({}).constructor};$.isFunction=function(e){return(e instanceof Function)};$.isString=function(e){return(/string/i.test(typeof(e)))||e instanceof String};$.isZero=function(e){return e===0};$.isEven=function(e){return($.isNullOrEmpty(e)||$.isDate(e))?false:(isNaN(e)?false:($.isZero(e)?false:e%2===0))};$.isOdd=function(e){return($.isNullOrEmpty(e)||$.isDate(e))?false:(isNaN(e)?false:($.isZero(e)?false:!$.isEven(e)))};$.isNull=function(e){return e===null};$.isUndefined=function(e){return typeof(e)=="undefined"};$.isEmpty=function(e){return $.isString(e)&&$.isZero(e.split(/\B/).length)};$.isNullOrEmpty=function(e){return !$.exists(e)||$.isEmpty(e)};$.exists=function(e){return(e!==null)&&(!$.isUndefined(e))};$.areEqual=function(l,e){if(this.exists(l)&&this.exists(e)){if(this.exists(l.equals)&&l.equals(e)){return true}if(this.exists(l.getTime)&&this.exists(e.getTime)&&l.getTime()==e.getTime()){return true}if(l===e){return true}else{return l===e}}else{return l===e}};$.xor=function(l,e){return !l!=!e};function s(l,af,e,ah){var ag="ku4EXCEPTION @ {0}: {1}\n\nBrowser Stack Trace:\n{2}\n\nku4Trace:\n{3}";return new Error($.str.format(ag,l.toUpperCase(),af,e,ah))}$.ku4exception=function(af,ag){var l=arguments.callee.caller,ah="",e="";(function(){try{generate.exeception}catch(ak){e=($.exists(ak.stack))?ak.stack.replace(/generate is.+/,""):"[Unavailable]";var aj=0,al,ai;while(l&&(aj<10)){al=l.toString().replace(/[\n\t\r\s]+/g," ").substring(0,100);ai=al.replace(/\W/g,"a").replace(/\s/g,"").replace(/.*base\.js:216/,"").split(/\B/).length>99?al+"...":al;ah+=$.str.format("<ku4Idx[{0}]>:{1}\n",aj,ai);l=l.caller;aj++}}})();return s(af,ag,e,ah)};$.ku4Log=function(){try{console.log.apply(console,arguments)}catch(l){alert(Array.prototype.slice.call(arguments).join("\n"))}};$.replicate=function(af){var e=($.isDate(af))?new Date(af):($.isArray(af))?[]:($.isObject(af))?{}:af,l;for(n in af){l=af[n];e[n]=(($.isArray(l))||($.isObject(l)))?$.replicate(l):l}return e};if(!$.exists($.obj)){$.obj={}}$.obj.keys=function(l){var e=[];for(n in l){e[e.length]=n}return e};$.obj.values=function(l){var e=[];for(n in l){e[e.length]=l[n]}return e};$.obj.count=function(e){var l=0;for(n in e){l++}return l};$.obj.hasProp=function(e,l){return($.exists(e.hasOwnProperty))?e.hasOwnProperty(l):false};$.obj.merge=function(l,e){var af=$.replicate(e);for(n in l){af[n]=l[n]}return af};$.obj.meld=function(af,l){var e=$.replicate(l);for(n in af){if($.exists(e[n])){continue}e[n]=af[n]}return e};$.obj.filter=function(){var e=Array.prototype.slice.call(arguments),ag={},ah=e[0],af=e.slice(1);for(var ai in af){var l=af[ai];ag[l]=ah[l]}return ag};if(!$.exists($.arr)){$.arr={}}$.arr.indexOfRegExp=function(af,l){for(n in af){var e=af[n];if(l.test(af[n])){return n}}return -1};$.arr.parseArguments=function(e){return Array.prototype.slice.call(e)};$.Class=function(){};$.Class.prototype={get:function(e){return this["_"+e]},set:function(l,e){this["_"+l]=e;return this},property:function(l,e){return($.isUndefined(e))?this.get(l):this.set(l,e)}};$.Class.extend=function(l,e){if(!l||!e){return null}var af=function(){};af.prototype=e.prototype;l.base=e;l.prototype=$.obj.merge(l.prototype,new af());l.prototype.constructor=l;return l};if(!$.exists($.enumeration)){$.enumeration=function(af){var ah={},e=af.length;for(var ag=0;ag<e;ag++){ah[af[ag]]=ag}return ah}}if(!$.exists($.evt)){$.evt={}}$.evt.mute=function(e){if(!$.exists(e)){return}if($.isFunction(e.preventDefault())){e.preventDefault()}if($.isFunction(e.stopPropagation())){e.stopPropagation()}if($.isFunction(e.stopImmediatePropagation())){e.stopImmediatePropagation()}e.cancelBubble=true};function g(e){g.base.call(this);this._isLocked=e||false}g.prototype={isLocked:function(){return this.get("isLocked")},lock:function(){this._isLocked=true;return this},unlock:function(){this._isLocked=false;return this}};$.Class.extend(g,$.Class);$.lock=function(e){return new g(e)};if(!$.exists($.math)){$.math={}}$.math.round=function(ag,af){var l=af||0,e=Math.pow(10,-l);return Math.round(parseFloat((ag*e).toFixed(Math.abs(l))))/e};$.math.roundUp=function(ag,af){var l=af||0,e=5*(Math.pow(10,l-1));return $.math.round(ag+e,af)};$.math.roundDown=function(ag,af){if(ag===0){return 0}var l=af||0,e=5*(Math.pow(10,l-1));return $.math.round(ag-e,af)};$.math.roundTowardZero=function(l,e){return(l<0)?$.math.roundUp(l,e):$.math.roundDown(l,e)};$.math.factorial=function(af){var e=af,l=af;while(l--){if(!!l){e*=l}}return e};$.math.divide=function(l,e){var af=$.isNumber(l)&&$.isNumber(e)&&!$.isZero(e);if(!af){throw $.ku4exception("$.math",$.str.format("Invalid division. value: {0}/{1} | type: {2}/{3}",l,e,typeof l,typeof e))}return l/e};$.math.gcd=function(l,e){return(e==0)?Math.abs(l):$.math.gcd(e,l%e)};if(!$.exists($.str)){$.str={}}var aa="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";$.str.build=function(){return"".concat.apply(new String(),arguments)};$.str.format=function(){var ag=arguments,ai=ag[0],af=ag.length,e,ah;for(i=1;i<af;i++){e=ag[i];ah=($.isNull(e))?"null":($.isUndefined(e))?"undefined":e.toString();ai=ai.replace(RegExp("\\{"+(i-1)+"\\}","g"),ah)}return ai};$.str.render=function(l,ag,af){var e=""+l;for(var ah in ag){e=e.replace(RegExp("\\{{"+ah+"\\}}","g"),ag[ah])}return $.exists(af)?e.replace(/\{\{[A-z0-9_]+\}\}/g,af):e};$.str.replaceCharsAtIndex=function(l,e,af,ag){if($.isNullOrEmpty(l)||e<0||e>l.length||$.isNullOrEmpty(ag)){throw $.ku4exception("Argument Exception","Invalid arguments at $.str.replaceStringAtIndex")}return l.substring(0,e)+ag+l.substring(e+af)};$.str.parse=function(){return String.fromCharCode.apply(String,arguments)};$.str.trim=function(e){return $.str.trimStart($.str.trimEnd(e))};$.str.trimStart=function(e){if(!$.isString(e)){throw new Error("Cannot trim non-string values")}return($.exists(e.replace))?e.replace(/^[\s\n]*/,""):e};$.str.trimEnd=function(e){if(!$.isString(e)){throw new Error("Cannot trim non-string values")}return($.exists(e.replace))?e.replace(/[\s\n]*$/,""):e};$.str.encodeBase64=function(ai){if(!$.isString(ai)){throw $.ku4exception("str","Cannot base64 encode non-string value.")}try{return btoa(ai)}catch(ah){var aj="",ag=0,aq=$.str.encodeUtf8(ai),ar,ao,am,ap,an,al,ak,l=function(e){return aq.charCodeAt(e)},af=function(e){return aa.charAt(e)};while(ag<aq.length){ar=l(ag++);ao=l(ag++);am=l(ag++);ap=ar>>2;an=((ar&3)<<4)|(ao>>4);al=((ao&15)<<2)|(am>>6);ak=am&63;if(isNaN(ao)){al=ak=64}else{if(isNaN(am)){ak=64}}aj+=(af(ap)+af(an)+af(al)+af(ak))}return aj}};$.str.decodeBase64=function(ai){if(!$.isString(ai)){throw $.ku4exception("str","Cannot base64 encode non-string value.")}try{return atob(ai)}catch(ah){var aj="",ag=0,aq=ai.replace(/[^A-Za-z0-9\+\/\=]/g,""),ar,ao,am,ap,an,al,ak,af=function(e){return aa.indexOf(aq.charAt(e))},l=function(e){return String.fromCharCode(e)};while(ag<aq.length){ap=af(ag++);an=af(ag++);al=af(ag++);ak=af(ag++);ar=(ap<<2)|(an>>4);ao=((an&15)<<4)|(al>>2);am=((al&3)<<6)|ak;aj+=l(ar);if(al!=64){aj+=l(ao)}if(ak!=64){aj+=l(am)}}return $.str.decodeUtf8(aj)}};$.str.encodeUtf8=function(e){var ai="",ag=e.replace(/\r\n/g,"\n");function ah(ak){return ag.charCodeAt(ak)}function af(ak){return String.fromCharCode(ak)}for(var l=0;l<ag.length;l++){var aj=ah(l);if(aj<128){ai+=af(aj)}else{if((aj>127)&&(aj<2048)){ai+=(af((aj>>6)|192)+af((aj&63)|128))}else{ai+=af((aj>>12)|224)+af(((aj>>6)&63)|128)+af((aj&63)|128)}}}return ai};$.str.decodeUtf8=function(aj){var ak="",ah=0,ai=0,ag=0,af=0,al=aj;function e(am){return al.charCodeAt(am)}function l(am){return String.fromCharCode(am)}while(ah<al.length){ai=e(ah);if(ai<128){ak+=l(ai);ah++}else{if((ai>191)&&(ai<224)){ag=e(ah+1);ak+=l(((ai&31)<<6)|(ag&63));ah+=2}else{ag=e(ah+1);af=e(ah+2);ak+=l(((ai&15)<<12)|((ag&63)<<6)|(af&63));ah+=3}}}return ak};$.uid=function(){var l=Math.random().toString().replace(/\b\.\b/,""),e=Math.random().toString().replace(/\b\.\b/,"");return $.str.encodeBase64($.str.format("{0}x{1}",l,e)).replace(/=+/g,"0").substr(3,32)};function h(e,l,af){h.base.call(this);this._local=e;this._domain=l;this._topLevelDomain=af}h.prototype={local:function(){return this._local},domain:function(){return this._domain},topLevelDomain:function(){return this._topLevelDomain},equals:function(e){if(!$.exists(e)){return false}return e.local()==this._local&&e.domain().toUpperCase()==this._domain.toUpperCase()&&e.topLevelDomain().toUpperCase()==this._topLevelDomain.toUpperCase()},toString:function(){return $.str.format("{0}@{1}.{2}",this._local,this._domain,this._topLevelDomain)}};$.Class.extend(h,$.Class);$.emailAddress=function(e,l,af){return new h(e,l,af)};$.emailAddress.Class=h;$.emailAddress.parse=function(aj){if(!($.exists(aj))&&/@{1}/.test(aj)){return null}var ag=aj.split("@"),e=ag[1],af=e.split("."),l=ag[0],ai=af.splice(af.length-1,1),ah=af.join(".");return new h(l,ah,ai)};function j(e){j.base.call(this);this._value=e}j.prototype={value:function(){return this._value},equals:function(e){if(!$.exists(e)){return false}return e.value()==this._value},toStringWithFormat:function(l){var e=l;$.list((this._value.toString().split(""))).each(function(af){e=e.replace("#",af)});return e.replace(/#/g,"")}};$.Class.extend(j,$.Class);$.phoneNumber=function(e){return new j(e)};$.phoneNumber.Class=j;$.phoneNumber.parse=function(e){return new j(parseInt(e.replace(/[^0-9]/gi,"")))};function W(af,e,l){W.base.call(this);this._first=af;this._middle=e||"";this._last=l}W.prototype={first:function(){return this._first},middle:function(){return this._middle},last:function(){return this._last},full:function(){var e=($.isNullOrEmpty(this._middle))?"{F} {L}":"{F} {M} {L}";return this.toStringWithFormat(e)},initials:function(){var e=($.isNullOrEmpty(this._middle))?"{f}.{l}.":"{f}.{m}.{l}.";return this.toStringWithFormat(e)},equals:function(e){if(!$.exists(e)){return false}return e.first()==this._first&&e.middle()==this._middle&&e.last()==this._last},toStringWithFormat:function(af){var e=this._first.charAt(0),l=this._middle.charAt(0),ag=this._last.charAt(0);return af.replace("{F}",this._first).replace("{M}",this._middle).replace("{L}",this._last).replace("{f}",e).replace("{m}",l).replace("{l}",ag)}};$.Class.extend(W,$.Class);$.properName=function(af,e,l){return new W(af,e,l)};$.properName.Class=W;function T(e){T.base.call(this);this.$h={};this._count=0;var l=($.exists(e)&&$.exists(e.toObject))?e.toObject():e;for(var af in l){this.add(af,l[af])}}T.prototype={count:function(){return this.get("count")},keys:function(){return $.obj.keys(this.$h)},values:function(){return $.obj.values(this.$h)},add:function(l,e){if((!($.isString(l)||$.isNumber(l)))||/(^null$)|(^undefined$)/.test(l)||this.containsKey(l)){throw $.ku4exception("$.hash",$.str.format("Invalid key: {0}. Must be unique number or string.",l))}if($.isUndefined(e)){return this}this.$h[l]=e;this._count++;return this},clear:function(){var e=this.$h;for(n in e){delete e[n]}this._count=0;return this},find:function(e){if(!$.exists(e)){return null}var l=this.$h[e];return($.isUndefined(l))?null:l},findKey:function(e){var l=this.$h;for(n in l){if($.areEqual(l[n],e)){return n}}return null},findValue:function(e){return this.find(e)},quit:function(){this._iterator.quit();return this},each:function(l,e){var af=e||this;this._iterator=$.iterator(this.toObject());this._iterator.each(l,af);return this},isEmpty:function(){return this._count<1},contains:function(e){if(!$.exists(e)||$.isNullOrEmpty(e)||$.hash(e).isEmpty()){return false}var af=$.exists(e.toObject)?e:$.hash(e),l=true;af.each(function(ah){if(!$.exists(ah)){l=false;af.quit()}else{var ag=ah.key;l=this.containsKey(ag)&&$.areEqual(this.findValue(ag),ah.value);if(!l){af.quit()}}},this);return l},containsKey:function(e){if(!$.exists(e)){return false}return !$.isUndefined(this.$h[e])},containsValue:function(l){var e=$.obj.values(this.$h),af=e.length;while(af--){if($.areEqual(l,e[af])){return true}}return false},merge:function(e){return S(this,e,"merge")},meld:function(e){return S(this,e,"meld")},filter:function(){var e=[this.$h].concat(Array.prototype.slice.call(arguments));return $.hash($.obj.filter.apply($.obj,e))},remove:function(e){if(!this.containsKey(e)){return this}var l=this.$h;l[e]="value";delete l[e];this._count--;return this},replicate:function(){return $.hash($.replicate(this.$h))},toObject:function(){return this.$h},update:function(l,e){if((!($.isString(l)||$.isNumber(l)))||/(^null$)|(^undefined$)/.test(l)){throw $.ku4exception("$.hash",$.str.format("Invalid key: {0}. Must be number or string.",l))}if($.isUndefined(e)){return this}if(!this.containsKey(l)){this._count++}this.$h[l]=e;return this}};$.Class.extend(T,$.Class);function S(af,l,e){var ag=($.exists(l)&&$.exists(l.toObject))?l.toObject():l;af.$h=$.obj[e](ag,af.$h);af._count=$.obj.count(af.$h);return af}$.hash=function(e){return new T(e)};$.hash.Class=T;function B(af){B.base.call(this);this._keys=[];this._hash=$.hash();this._count=this._keys.length;if(!$.exists(af)){return}var ah=0,e=af.length;while(ah<e){var ag=af[ah];if(!$.isUndefined(ag)){this.add(ag)}ah++}}B.prototype={count:function(){return this.get("count")},add:function(l){var e=this._keys,af=$.uid();e[e.length]=af;this._hash.add(af,l);this._count=this._keys.length;return this},clear:function(){this._hash.clear();this._keys=[];this._count=this._keys.length;return this},contains:function(e){return this._hash.containsValue(e)},find:function(l){var e=this._keys;return($.exists(e[l]))?this._hash.find(e[l]):null},quit:function(){this._iterator.quit();return this},each:function(l,e){var af=e||this;this._iterator=$.iterator(this.toArray());this._iterator.each(l,af);return this},isEmpty:function(){return this._count<1},remove:function(af){var l=this._hash;if(!this.contains(af)){return this}var e=l.findKey(af);this._keys.splice(e,1);l.remove(e);this._count=l.count();return this},toArray:function(){var e=[];this._hash.each(function(l){e.push(l.value)});return e}};$.Class.extend(B,$.Class);$.list=function(e){return new B(e)};$.list.Class=B;$.list.parseArguments=function(e){return new B(Array.prototype.slice.call(e))};function Y(l,af,e){Y.base.call(this);if((af<1)||(af>12)){throw $.ku4exception("$.dayPoint",$.str.format("Invalid month= {0}",af))}if((e<1)||(e>ad(af,l))){throw $.ku4exception("$.dayPoint",$.str.format("Invalid date= {0}",e))}this._value=(arguments.length>=3)?new Date(l,af-1,e):new Date();this._day=this._value.getDay();this._date=e;this._month=af;this._year=l}Y.prototype={value:function(){return this._value},day:function(){return this._day},date:function(){return this._date},month:function(){return this._month},year:function(){return this._year},shortYear:function(){var e=this._year.toString();return parseInt(e.substr(e.length-2))},isWeekday:function(){var e=this._day;return e>0&&e<6},isWeekend:function(){return !this.isWeekday()},isLeapYear:function(){return z(this._year)},nextDay:function(){return ae(this,1,0,0)},prevDay:function(){return ae(this,-1,0,0)},nextMonth:function(){return ae(this,0,1,0)},prevMonth:function(){return ae(this,0,-1,0)},nextYear:function(){return ae(this,0,0,1)},prevYear:function(){return ae(this,0,0,-1)},add:function(ai,e,am){function al(ao,at,ar){var ap=ao,aq=at;while(aq--){ap=ap[ar]()}return ap}var an=Math.abs,ak=an(ai),aj=an(am),af=an(e),l=ai<0?"prevYear":"nextYear",ah=am<0?"prevDay":"nextDay",ag=e<0?"prevMonth":"nextMonth";return al(al(al(this,ak,l),af,ag),aj,ah)},firstDayOfMonth:function(){return new Y(this._year,this._month,1)},lastDayOfMonth:function(){return new Y(this._year,this._month,ad(this._month,this._year))},isBefore:function(e){return !(this.isAfter(e)||this.equals(e))},isAfter:function(l){var e=this._year,ag=l.year(),af=this._month,ah=l.month();if(e>ag){return true}if((e==ag)&&(af>ah)){return true}return((e==ag)&&(af==ah)&&(this._date>l.date()))},equals:function(e){return(this._year==e.year())&&(this._month==e.month())&&(this._date==e.date())},toString:function(){return this.toStringWithFormat("mm/dd/yyyy")},toStringWithFormat:function(ag){var aj=(/y{3,}/i.test(ag))?this._year:this.shortYear(),e=this._month,ai=this._date,af="{0}",l=(/m{2}/i.test(ag)&&e<10)?"0{1}":"{1}",ah=(/d{2}/i.test(ag)&&ai<10)?"0{2}":"{2}";f=ag.replace(/y{1,}/gi,af).replace(/m{1,}/gi,l).replace(/d{1,}/gi,ah);return $.str.format(f,aj,e,ai)},toDate:function(){return this.value()},toJson:function(){return this.value().toJSON()}};$.Class.extend(Y,$.Class);$.dayPoint=function(ah,ai,af,e,ag,aj,l){if(!($.isDate(ah)||($.isNumber(ah)&&$.isNumber(ai)&&$.isNumber(af)))){return null}return new Y(ah,ai,af,e,ag,aj,l)};$.dayPoint.Class=Y;$.dayPoint.canParse=function(e){return($.isString(e)||$.isNumber(e)||$.isDate(e))?!isNaN(new Date(e).valueOf()):false};$.dayPoint.parse=function(ag){if(ag instanceof Y){return ag}var e=($.isString(ag)&&/^\d{4}\-\d{,12}\-\d{1,2}$/.test($.str.trim(ag)))?ag.replace(/(?:\D)(0)/g,"-").replace(/^0/,""):ag;if(/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(e)){var l=e.split("-"),af=l[0];l.push(af);l.shift();e=l.join("/")}var ah=new Date(e);if(!$.exists(e)||isNaN(ah).valueOf()){throw $.ku4exception("$.dayPoint",$.str.format("Cannot parse value= {0}",e))}return $.dayPoint(ah.getFullYear(),ah.getMonth()+1,ah.getDate())};$.dayPoint.tryParse=function(e){return $.dayPoint.canParse(e)?$.dayPoint.parse(e):null};var Q;$.dayPoint.assumeNow=function(e){Q=$.dayPoint.parse(e)};$.dayPoint.today=function(){return Q||$.dayPoint.parse(new Date())};function ad(af,l){var e=af,ag=l;if(e==2){return(z(ag))?29:28}return(((e<8)&&($.isEven(e)))||((e>7)&&($.isOdd(e))))?30:31}function z(e){var af=e.toString().split(/\B/),l=parseFloat($.str.build(af[af.length-2],af[af.length-1]));return(l%4==0)}function ae(aj,ao,af,aq){var at=aj.month(),ak=aj.year(),ah=aj.date(),e=ad(at,ak),ar=ao,ai=af,an=aq,l=ah+ar,am=at+ai,ap=ak+an;if((ah+ar)>e){l=1;am=(at+(ai+1))}if((ah+ar)<1){var ag=aj.prevMonth(),l=ad(ag.month(),ag.year());(am=at+(ai-1))}if((am)>12){am=1;ap=(ak+(an+1))}if((am)<1){am=12;ap=(ak+(an-1))}var al=ad(am,ap);l=(l>al)?al:l;return new Y(ap,am,l)}function O(af,l){if(!$.exists(af)||isNaN(af)){throw $.ku4exception("$.money",$.str.format("Invalid amount= {0}. Amount must be a number.",af))}O.base.call(this);var e=$.math.roundTowardZero(af);this._cents=af-e;this._dollars=e;this._currency=l||"$";this._value=af}O.prototype={value:function(){return this._value},dollars:function(){return this._dollars},cents:function(){return this._cents},currency:function(){return this._currency},add:function(e){E(this,e);return new O(this._value+e.value(),this._currency)},divide:function(e){if(!$.isNumber(e)){throw $.ku4exception("$.money",$.str.format("Invalid divisor value= {0}",e))}return new O(this._value/e,this._currency)},equals:function(e){return(this.isOfCurrency(e))&&(this._value==e.value())},exchange:function(l,e){return new O(this.multiply(l).value(),e)},isOfCurrency:function(e){return this._currency==e.currency()},isGreaterThan:function(e){E(this,e);return this._value>e.value()},isLessThan:function(e){E(this,e);return this._value<e.value()},multiply:function(e){if(!$.isNumber(e)){throw $.ku4exception("$.money",$.str.format("Invalid multiplier value= {0}",e))}return new O(this._value*e,this._currency)},nearestDollar:function(){return new O($.math.round(this.value(),0),this._currency)},round:function(){return new O($.math.round(this.value(),-2),this._currency)},roundDown:function(){return new O($.math.roundDown(this.value(),-2),this._currency)},roundUp:function(){return new O($.math.roundUp(this.value(),-2),this._currency)},subtract:function(e){E(this,e);return new O(this._value-e.value(),this._currency)},toString:function(ag,ak){var af=this.round(),ai=(af.isLessThan($.money.zero(this.currency())))?"({0}{1}{2}{3})":"{0}{1}{2}{3}",ah=ag||",",aj=ak||".";var l=v(af.dollars(),ah);var e=K(af.cents());return $.str.format(ai,this._currency,l,aj,e)}};$.Class.extend(O,$.Class);$.money=function(l,e){return new O(l,e)};$.money.Class=O;$.money.zero=function(e){return $.money(0,e)};$.money.isMoney=function(e){return e instanceof O};$.money.canParse=function(l){try{$.money.parse(l);return true}catch(af){return false}};$.money.parse=function(ai){if($.isNumber(ai)){return $.money(ai)}if(/\,\d{2}$/.test(ai)){var aj=ai.split(","),ah=aj.pop(),e=aj.join().replace(/\./g,",");ai=e+"."+ah}var ak=/(\(.*\))|(\-)/.test(ai),ag=(ak)?1:0,am=ai.match(/[^\d\.\,\-]/g)||[],af=$.exists(am[ag])?am[ag]:"$",l=parseFloat(ai.replace(/[^\d\.]/g,"")),al=(ak)?-l:l;return $.money(al,af)};$.money.tryParse=function(e){return $.money.canParse(e)?$.money.parse(e):null};function E(l,e){if(!l.isOfCurrency(e)){throw $.ku4exception("$.money",$.str.format("Invalid operation on non-conforming currencies. currency: {0} != currency: {1}",l._currency,e._currency))}}function v(e,ah){if($.isZero(e)){return"0"}var ai=e.toString(),ag=ai.replace(/[^\d]/,"").split(/\B/).reverse(),aj=ah||",",af=$.list(),l=0;$.list(ag).each(function(ak){if(l!=0&&(l%3==0)){af.add(aj);l=0}af.add(ak);l++});return $.str.build.apply(this,af.toArray().reverse()).replace(/[^\d]$/,"")}function K(l){var e=Math.abs($.math.round(l,-2)),af=e.toString().replace(/[^\d]|0\./g,"");if($.isZero(e)){return"00"}if(e<0.1){return"0"+af}if(/^\d$/.test(af)){return af+"0"}return af}function y(e,l){if(!$.isNumber(e)||!$.isNumber(l)){throw $.ku4exception("$.coord",$.str.format("Invalid arguments x= {0}, y= {1} ",e,l))}y.base.call(this);this.x(e).y(l)}y.prototype={x:function(e){return this.property("x",e)},y:function(e){return this.property("y",e)},abs:function(){return new y(Math.abs(this._x),Math.abs(this._y))},add:function(l){var e=this._x+l.x(),af=this._y+l.y();return new y(e,af)},divide:function(l){var e=this._x/l.x(),af=this._y/l.y();return new y(e,af)},equals:function(e){return(this._x===e.x())&&(this._y===e.y())},multiply:function(l){var e=this._x*l.x(),af=this._y*l.y();return new y(e,af)},subtract:function(l){var e=this._x-l.x(),af=this._y-l.y();return new y(e,af)},round:function(e){var l=e||0;return new y($.math.round(this.x(),l),$.math.round(this.y(),l))},half:function(){return this.divide(new y(2,2))},value:function(){return{x:this._x,y:this._y}},toEm:function(){return J(this,"em")},toPixel:function(){return J(this,"px")},toString:function(){return $.str.format("({0},{1})",this._x,this._y)}};$.Class.extend(y,$.Class);$.coord=function(e,l){return new y(e,l)};$.coord.Class=y;$.coord.isInstance=function(e){return e instanceof y};function J(l,e){return{x:function(){return l.x()+e},y:function(){return l.y()+e}}}function M(l){try{if($.isArray(l)){return !(isNaN(l[0])||isNaN(l[1]))}if($.isObjectLiteral(l)){if(("x" in l)&&("y" in l)){return !(isNaN(l.x)||isNaN(l.y))}if(("left" in l)&&("top" in l)){return !(isNaN(l.left)||isNaN(l.top))}if(("width" in l)&&("height" in l)){return !(isNaN(l.width)||isNaN(l.height))}}return $.coord.isInstance(l)}catch(af){return false}}function m(e){if(!$.exists(e)){return null}if($.coord.isInstance(e)){return e}if($.isArray(e)){return new y(e[0],e[1])}if($.isObjectLiteral(e)){if($.exists(e.left)&&$.exists(e.top)){return new y(e.left,e.top)}if($.exists(e.width)&&$.exists(e.height)){return new y(e.width,e.height)}if($.exists(e.x)&&$.exists(e.y)){return new y(e.x,e.y)}}return null}$.coord.zero=function(){return new y(0,0)};$.coord.random=function(af,l){var e=af*Math.random(),ag=l*Math.random(l);return new y(e,ag)};$.coord.canParse=M;$.coord.parse=m;$.coord.tryParse=function(e){return M(e)?m(e):null};function I(e,l){I.base.call(this,e,l)}I.prototype={isAbove:function(e){return this.y()<e.y()},isBelow:function(e){return this.y()>e.y()},isLeftOf:function(e){return this.x()<e.x()},isRightOf:function(e){return this.x()>e.x()},distanceFrom:function(e){return $.vector(this.x()-e.x(),this.y()-e.y())},distanceTo:function(e){return this.distanceFrom(e).invert()}};$.Class.extend(I,$.coord.Class);$.point=function(e,l){return new I(e,l)};$.point.Class=I;$.point.isInstance=function(e){return e instanceof I};$.point.zero=function(){return new I(0,0)};$.point.canParse=F;$.point.parse=a;$.point.tryParse=function(e){return F(e)?a(e):null};function F(l){try{return $.point.isInstance(I)||$.coord.canParse(l)}catch(af){return false}}function a(e){if($.point.isInstance(e)){return e}var l=$.coord.parse(e);return new I(l.x(),l.y())}function ac(e,l){ac.base.call(this);this._topLeft=$.point.parse(e);this._dims=$.point.parse(l);this._bottomRight=$.point.parse(this._topLeft.add(this._dims))}ac.prototype={dims:function(){return this.get("dims")},topLeft:function(){return this.get("topLeft")},bottomRight:function(){return this.get("bottomRight")},center:function(){return this._topLeft.add(this._bottomRight.subtract(this._topLeft)).half()},contains:function(af){var l=this._topLeft,e=this._bottomRight;return l.isAbove(af)&&l.isLeftOf(af)&&e.isRightOf(af)&&e.isBelow(af)},aspectToFit:function(l){var aj=this.dims(),ai=l.dims(),af=aj.x(),e=aj.y(),ah=ai.x(),ag=ai.y();if(af>e){if(af>ah){e*=ah/af;af=ah}}else{if(e>ag){af*=ag/e;e=ag}}return new ac(this._topLeft,{width:af,height:e})}};$.Class.extend(ac,$.Class);$.rectangle=function(e,l){return new ac(e,l)};$.rectangle.Class=ac;function b(e,l){if(!$.isNumber(e)||!$.isNumber(l)){throw $.ku4exception("$.vector",$.str.format("Invalid arguments x= {0}, y= {1} ",e,l))}b.base.call(this,e,l);this._lengthSquared=d(this,e,l);this._length=w(this,this._lengthSquared);this._unitNormalX=L(this,e);this._unitNormalY=L(this,l)}b.prototype={magnitude:function(){return this.get("length")},equals:function(e){return(e instanceof b)&&((this._x===e.x())&&(this._y===e.y()))},normal:function(){return $.vector(this._unitNormalX,this._unitNormalY)},invert:function(){return $.vector(this.x()*-1,this.y()*-1)},norm:function(){return $.vector(Math.abs(this.x()),Math.abs(this.y()))},perpendicular:function(){return $.vector(this.y()*-1,this.x())},isZero:function(){return this.x()==0&&this.y()==0},add:function(e){return $.vector(this.x()+e.x(),this.y()+e.y())},dot:function(e){return(this.x()*e.x())+(this.y()*e.y())},perpendicularAtTo:function(e){var l=e.add(this.projectionOfOnto(e).invert());return $.vector(l.x(),l.y())},projectionOfOnto:function(e){var l=e.normal().scale(this.dot(e.normal()));return $.vector(l.x(),l.y())},scale:function(e){return $.vector((this.x()*e),(this.y()*e))},unitNormalDot:function(e){return(this.normal().x()*e.normal().x())+(this.normal().y()*e.normal().y())},reflect:function(e){if(e.isZero()){return this}var l=e.normal();return this.add(l.scale(2*(l.dot(this))).invert())},round:function(e){var l=e||0;return $.vector($.math.round(this.x(),l),$.math.round(this.y(),l))}};$.Class.extend(b,$.coord.Class);$.vector=function(e,l){return new b(e,l)};$.vector.Class=b;$.vector.zero=function(){return $.vector(0,0)};$.vector.random=function(af,l){var e=af*Math.random(),ag=l*Math.random();return $.vector(e,ag)};function w(e,l){if(e.isZero()){return 0}return Math.sqrt(l)}function d(l,e,af){if(l.isZero()){return 0}return Math.pow(e,2)+Math.pow(af,2)}function L(l,e){if(l.isZero()){return 0}return e/l.magnitude()}function x(e,l){if(!$.isNumber(e)||!$.isNumber(l)){throw $.ku4exception("$.fraction",$.str.format("Invalid arguments numerator= {0}, denominator= {1} ",e,l))}this._numerator=e;this._denominator=l}x.prototype={numerator:function(){return this._numerator},denominator:function(){return this._denominator},value:function(){return this._numerator/this._denominator},equals:function(e){return this.value()==e.value()},add:function(e){var ah=this.commonDenominator(e),af=this.withDenominator(ah),l=e.withDenominator(ah),ag=af.numerator()+l.numerator();return new x(ag,ah)},subtract:function(e){var ah=this.commonDenominator(e),af=this.withDenominator(ah),l=e.withDenominator(ah),ag=af.numerator()-l.numerator();return new x(ag,ah)},multiply:function(e){var l=this._numerator*e.numerator(),af=this._denominator*e.denominator();return new x(l,af)},divide:function(e){return this.multiply(e.reciprocal())},reciprocal:function(){return new x(this._denominator,this._numerator)},commonDenominator:function(e){return this._denominator*e.denominator()},withDenominator:function(l){var e=(l/this._denominator)*this._numerator;return new x(e,l)},simplify:function(){var e=$.math.gcd(this._denominator,this._numerator);return new x(this._numerator/e,this._denominator/e)},toString:function(){return this._numerator+"/"+this._denominator}};$.fraction=function(e,l){return new x(e,l)};$.fraction.isInstance=function(e){return e instanceof x};$.abstractContext=function(e){$.abstractContext.base.call(this);this.state(e)};$.abstractContext.prototype={state:function(e){if(!$.exists(e)){return this._state}return this.set("state",e.context(this))}};$.Class.extend($.abstractContext,$.Class);$.abstractState=function(e){$.abstractState.base.call(this);this.states(e)};$.abstractState.prototype={context:function(e){return this.property("context",e)},states:function(e){return this.set("states",e)},state:function(e){var l=this._context;l.state(new this._states[e](l));return this}};$.Class.extend($.abstractState,$.Class);$.abstractVisitor=function(){};$.abstractVisitor.prototype={$visit:function(){throw new Error("visit method is abstract an must be defined.")},subject:function(e){return this.property("subject",$.replicate(e))},visit:function(){return this.$visit()}};function A(e){A.base.call(this);this.$current=0;this._quit=false;this.subject(e)}A.prototype={$hasNext:function(){return $.exists(this._subject[this.$current+1])},$hasPrev:function(){return $.exists(this._subject[this.$current-1])},$each:function(l,af){var e=af||this;this.reset();do{l.call(e,this.current())}while(this.next()&&(!this._quit));this._end=false;this.reset()},$exec:function(af){var e=this._subject,l=e[af];if(!$.exists(l)){return null}this.$current=af;return l},subject:function(l){var e=($.isArray(l))?l:($.isObject(l))?o(l):l;if(!$.isUndefined(l)){this.reset()}this.$subject=e;return this.property("subject",e)},current:function(){return this.$exec(this.$current)},next:function(){return this.$exec(this.$current+1)},prev:function(){return this.$exec(this.$current-1)},hasNext:function(){return this.$hasNext()},hasPrev:function(){return this.$hasPrev()},reset:function(){this.$current=0;return this},quit:function(){return this.set("quit",true)},each:function(e,l){if(this._subject.length<1){return this}this.$each(e,l);return this}};function o(e){var l=[];for(n in e){l.push({key:n,value:e[n]})}return l}$.Class.extend(A,$.Class);$.iterator=function(e){return new A(e)};$.iterator.Class=A;function G(e){G.base.call(this);this._name=e||$.uid();this._observers=$.hash();this._throwErrors=0}G.prototype={throwErrors:function(){this._throwErrors=2;return this},logErrors:function(){this._throwErrors=1;return this},catchErrors:function(){this._throwErrors=0;return this},isEmpty:function(){return this._observers.isEmpty()},count:function(){return this._observers.count()},activeSubscriptionKeys:function(){return this._observers.keys()},subscribe:function(e,ah,l,ag){var af=this._observers;if($.isNullOrEmpty(e)){throw $.ku4exception("$.mediator","subscribe name must be a valid, non-empty string value.")}if(!$.isFunction(ah)){throw $.ku4exception("$.mediator","subscribe method must be a valid function.")}ah.__ku4mediator_name__=this._name;if(af.containsKey(e)){af.find(e).add(ah,l,ag)}else{af.add(e,$.observer(e).add(ah,l,ag))}return this},unsubscribe:function(l,ag){var af=this._observers;if($.isNullOrEmpty(l)&&$.exists(ag)){af.each(function(ah){ah.value.remove(ag)})}else{if(af.containsKey(l)){var e=af.find(l);if($.exists(ag)){e.remove(ag)}else{e.clear()}}}return this},notify:function(){var l=Array.prototype.slice.call(arguments),e=l.shift();if($.exists(e)&&!$.isString(e)){throw new Error("Invalid first argument at mediator.notify: "+e)}var af=($.isNullOrEmpty(e))?null:e.replace(/\s/g,"").split(","),ag=$.list(af);return(ag.isEmpty())?this._notifyAll(l):this._notify(l,ag)},clear:function(){this._observers.each(function(e){e.value.clear()}).clear();return this},_notifyAll:function(e){$.list(this._observers.values()).each(function(l){l.notify.apply(l,e)});return this},_notify:function(ag,af){var ah=this._observers,l=this._throwErrors,e=this._name;af.each(function(aj){try{var ai=ah.find(aj);if(!$.exists(ai)){return}ai.notify.apply(ai,ag)}catch(am){var al="This exception may be thrown for various reasons. BE SURE TO CHECK FOR:\n\n1) INFINITE LOOPS: Occur due to inadvertent unfiltered calls to notify. Check calls to notify for inadvertent missing or misspelled filters.\n\n2) SUBSCRIBER EXCEPTIONS: Occur due to exceptions thrown in a subscriber. Check subscriber methods for uncaught exceptions.\n\n*NOTE: For more information see the documentation at https://github.com/kodmunki/ku4js-kernel#mediator",ak=$.ku4exception("$.mediator",$.str.format("{0}. \nMediator name = {1}\nSubscriber name = {2}\n\n {3}\n",am.message,e,aj,al));if(l==2){throw ak}if(l==1){$.ku4Log(ak.message)}}});return this}};$.Class.extend(G,$.Class);$.mediator=function(e){return new G(e)};$.mediator.Class=G;function H(e){H.base.call(this);this._name=e||$.uid();this._methods=new $.hash()}H.prototype={add:function(ah,l,ag){var e=ag||$.uid(),af=l||this;ah.__ku4observer_name__=this._name;ah.__ku4observer_method_id__=e;this._methods.add(e,{m:ah,s:af});return this},remove:function(e){this._methods.remove(e);return this},clear:function(){this._methods.clear();return this},notify:function(){var af=new $.iterator(this._methods.values()),l=arguments,e=this._name;af.each(function(ag){var ai=ag.m;if(!$.exists(ai)){throw $.ku4exception("$.observer",$.str.format("Attempt to call invalid or undefined method @ observer: {0}.\n",e))}else{try{ai.apply(ag.s,l)}catch(ah){throw $.ku4exception("$.observer",$.str.format("Error in subscribed method @ observer: {0} methodId: {1}.\nmessage:{2}\n\n",e,ai.__ku4observer_method_id__,ah.message))}}});return this},isEmpty:function(){return this._methods.isEmpty()}};$.Class.extend(H,$.Class);$.observer=function(e){return new H(e)};$.observer.Class=H;function p(){this._q=[]}p.prototype={isEmpty:function(){return this._q.length==0},enqueue:function(e){var l=this._q;l[l.length]=e;return this},dequeue:function(){var l=this._q,e=l[0];l.splice(0,1);return e},clear:function(){this._q=[]}};$.fifo=function(){return new p()};$.fifo.Class=p;function P(e){P.base.call(this,e)}P.prototype={$hasNext:function(){var ag=this.$subject,e=ag.length-1,ai=this.$current,ah=ai+1,af=(ah>e)?0:ah;return $.exists(ag[af])},$hasPrev:function(){var ag=this.$subject,e=ag.length-1,ai=this.$current,ah=ai+1,af=(ah<0)?e:ah;return $.exists(ag[af])},$each:function(l,af){var e=af||this;this.reset();do{l.call(af,this.current())}while(this.next()&&(this.$current>0));this.reset()},$exec:function(ag){var af=this.$subject,e=(af.length-1);this.$current=(ag>e)?0:((ag<0)?e:ag);return af[this.$current]}};$.Class.extend(P,$.iterator.Class);$.rolodex=function(e){return new P(e)};$.rolodex.Class=P;function ab(){}ab.prototype={$isSatisfiedBy:function(e){return},isSatisfiedBy:function(e){return this.$isSatisfiedBy(e)},and:function(e){return new N(this,e)},or:function(e){return new q(this,e)},xor:function(e){return new D(this,e)},not:function(){return new X(this)}};function N(l,e){N.base.call(this);this.$1=l;this.$2=e}N.prototype.$isSatisfiedBy=function(e){return this.$1.isSatisfiedBy(e)&&this.$2.isSatisfiedBy(e)};$.Class.extend(N,ab);function q(l,e){q.base.call(this);this.$1=l;this.$2=e}q.prototype.$isSatisfiedBy=function(e){return this.$1.isSatisfiedBy(e)||this.$2.isSatisfiedBy(e)};$.Class.extend(q,ab);function D(l,e){D.base.call(this);this.$1=l;this.$2=e}D.prototype.$isSatisfiedBy=function(e){return $.xor(this.$1.isSatisfiedBy(e),this.$2.isSatisfiedBy(e))};$.Class.extend(D,ab);function r(){r.base.call(this)}r.prototype.$isSatisfiedBy=function(e){return true};$.Class.extend(r,ab);function k(){k.base.call(this)}k.prototype.$isSatisfiedBy=function(e){return false};$.Class.extend(k,ab);function X(e){X.base.call(this);this._s=e}X.prototype.$isSatisfiedBy=function(e){return !this._s.isSatisfiedBy(e)};$.Class.extend(X,ab);function t(e){t.base.call(this);this.$isSatisfiedBy=e}$.Class.extend(t,ab);$.spec=function(e){return new t(e)};function C(){this._q=[]}C.prototype={isEmpty:function(){return this._q.length==0},push:function(e){var l=this._q;l[l.length]=e;return this},pop:function(){return this._q.pop()},clear:function(){this._q=[]}};$.lifo=function(){return new C()};$.lifo.Class=C;function U(e){this._func=e;this._testNotRun="Test not run. Call within() to run test."}U.prototype={mark0:function(){return this._mark0||NaN},mark1:function(){return this._mark1||NaN},time:function(){return this._time||NaN},note:function(){return this._note||this._testNotRun},within:function(e){var ag=c();this._func();var l=c();this._mark0=ag;this._mark1=l;this._time=l-ag;var af=this._time;this._note=u(af,e);return af<=e}};function c(){return($.exists(performance))?performance.now():(new Date()).valueOf()}function u(l,e){return(l<=e)?"Pass":$.str.format("Performance Fail - Expected: {0} but was: {1}",e,l)}$.ku4performance=function(e){return new U(e)}})();