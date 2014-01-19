(function(K){$=K;$.isArray=function(l){return l instanceof Array};$.isBool=function(l){return(/boolean/i.test(typeof(l)))};$.isDate=function(l){return l instanceof Date};$.isEvent=function(l){try{return l instanceof Event}catch(T){return l===window.event}};$.isNumber=function(l){return(/number/i.test(typeof(l)))&&!isNaN(l)};$.isObject=function(l){return $.exists(l)&&(/object/i.test(typeof(l)))};$.isFunction=function(l){return(l instanceof Function)};$.isString=function(l){return(/string/i.test(typeof(l)))||l instanceof String};$.isZero=function(l){return l===0};$.isEven=function(l){return($.isNullOrEmpty(l)||$.isDate(l))?false:(isNaN(l)?false:($.isZero(l)?false:l%2===0))};$.isOdd=function(l){return($.isNullOrEmpty(l)||$.isDate(l))?false:(isNaN(l)?false:($.isZero(l)?false:!$.isEven(l)))};$.isNull=function(l){return l===null};$.isUndefined=function(l){return(/undefined/i.test(typeof(l)))};$.isEmpty=function(l){return $.isString(l)&&$.isZero(l.split(/\B/).length)};$.isNullOrEmpty=function(l){return !$.exists(l)||$.isEmpty(l)};$.exists=function(l){return(l!==null)&&(!$.isUndefined(l))};$.areEqual=function(T,l){if(this.exists(T)&&this.exists(l)){if(this.exists(T.equals)&&value.equals(l)){return true}if(this.exists(T.getTime)&&this.exists(l.getTime)&&T.getTime()==l.getTime()){return true}if(T===l){return true}}else{if(T===l){return true}}};$.xor=function(T,l){return !T!=!l};$.replicate=function(U){var l=($.isDate(U))?new Date(U):($.isArray(U))?[]:($.isObject(U))?{}:U,T;for(n in U){T=U[n];l[n]=(($.isArray(T))||($.isObject(T)))?$.replicate(T):T}return l};if(!$.exists($.obj)){$.obj={}}$.obj.keys=function(T){var l=[];for(n in T){l[l.length]=n}return l};$.obj.values=function(T){var l=[];for(n in T){l[l.length]=T[n]}return l};$.obj.count=function(l){var T=0;for(n in l){T++}return T};$.obj.hasProp=function(l,T){return($.exists(l.hasOwnProperty))?l.hasOwnProperty(T):false};$.obj.merge=function(T,l){var U=$.replicate(l);for(n in T){U[n]=T[n]}return U};$.obj.meld=function(U,T){var l=$.replicate(T);for(n in U){if($.exists(l[n])){continue}l[n]=U[n]}return l};$.Class=function(){};$.Class.prototype={get:function(l){return this["_"+l]},set:function(T,l){this["_"+T]=l;return this},property:function(T,l){return($.isUndefined(l))?this.get(T):this.set(T,l)},isTypeOf:function(l){return this instanceof l}};$.Class.extend=function(T,l){if(!T||!l){return null}var U=function(){};U.prototype=l.prototype;T.base=l;T.prototype=$.obj.merge(T.prototype,new U());T.prototype.constructor=T;return T};function d(l){d.base.call(this);this._isLocked=l||false}d.prototype={isLocked:function(){return this.get("isLocked")},lock:function(){this._isLocked=true;return this},unlock:function(){this._isLocked=false;return this}};$.Class.extend(d,$.Class);$.lock=function(l){return new d(l)};if(!$.exists($.math)){$.math={}}$.math.round=function(V,U){var T=U||0,l=Math.pow(10,-T);return Math.round(parseFloat((V*l).toFixed(Math.abs(T))))/l};$.math.roundUp=function(V,U){var T=U||0,l=5*(Math.pow(10,T-1));return $.math.round(V+l,U)};$.math.roundDown=function(V,U){var T=U||0,l=5*(Math.pow(10,T-1));return $.math.round(V-l,U)};$.math.factorial=function(U){var l=U,T=U;while(T--){if(!!T){l*=T}}return l};$.math.divide=function(T,l){var U=$.isNumber(T)&&$.isNumber(l)&&!$.isZero(l);if(!U){throw new Error($.str.format("Invalid division. value: {0}/{1} | type: {2}/{3}",T,l,typeof T,typeof l))}return T/l};if(!$.exists($.str)){$.str={}}var O="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";$.str.build=function(){return"".concat.apply(new String(),arguments)};$.str.format=function(){var V=arguments,X=V[0],U=V.length,T,W;for(i=1;i<U;i++){T=V[i];W=($.isNull(T))?"null":($.isUndefined(T))?"undefined":T.toString();X=X.replace(RegExp("\\{"+(i-1)+"\\}","g"),W)}return X};$.str.render=function(T,U){var l=""+T;for(var V in U){l=l.replace(RegExp("\\{{"+V+"\\}}","g"),U[V])}return l};$.str.parse=function(){return String.fromCharCode.apply(String,arguments)};$.str.trim=function(l){return $.str.trimStart($.str.trimEnd(l))};$.str.trimStart=function(l){if(!$.isString(l)){throw new Error("Cannot trim non-string values")}return($.exists(l.replace))?l.replace(/^\s*\b/,""):l};$.str.trimEnd=function(l){if(!$.isString(l)){throw new Error("Cannot trim non-string values")}return($.exists(l.replace))?l.replace(/\b\s*$/,""):l};$.str.encodeBase64=function(V){var W="",U=0,ad=$.str.encodeUtf8(V),ae,ab,Z,ac,aa,Y,X,l=function(af){return ad.charCodeAt(af)},T=function(af){return O.charAt(af)};while(U<ad.length){ae=l(U++);ab=l(U++);Z=l(U++);ac=ae>>2;aa=((ae&3)<<4)|(ab>>4);Y=((ab&15)<<2)|(Z>>6);X=Z&63;if(isNaN(ab)){Y=X=64}else{if(isNaN(Z)){X=64}}W+=(T(ac)+T(aa)+T(Y)+T(X))}return W};$.str.decodeBase64=function(V){var W="",U=0,ad=V.replace(/[^A-Za-z0-9\+\/\=]/g,""),ae,ab,Z,ac,aa,Y,X,T=function(af){return O.indexOf(ad.charAt(af))},l=function(af){return String.fromCharCode(af)};while(U<ad.length){ac=T(U++);aa=T(U++);Y=T(U++);X=T(U++);ae=(ac<<2)|(aa>>4);ab=((aa&15)<<4)|(Y>>2);Z=((Y&3)<<6)|X;W+=l(ae);if(Y!=64){W+=l(ab)}if(X!=64){W+=l(Z)}}return $.str.decodeUtf8(W)};$.str.encodeUtf8=function(l){var X="",V=l.replace(/\r\n/g,"\n"),W=function(Z){return V.charCodeAt(Z)},U=function(Z){return String.fromCharCode(Z)};for(var T=0;T<V.length;T++){var Y=W(T);if(Y<128){X+=U(Y)}else{if((Y>127)&&(Y<2048)){X+=(U((Y>>6)|192)+U((Y&63)|128))}else{X+=U((Y>>12)|224)+U(((Y>>6)&63)|128)+U((Y&63)|128)}}}return X};$.str.decodeUtf8=function(Y){var Z="",W=0,X=0,V=0,U=0,aa=Y,l=function(ab){return aa.charCodeAt(ab)},T=function(ab){return String.fromCharCode(ab)};while(W<aa.length){X=l(W);if(X<128){Z+=T(X);W++}else{if((X>191)&&(X<224)){V=l(W+1);Z+=T(((X&31)<<6)|(V&63));W+=2}else{V=l(W+1);U=l(W+2);Z+=T(((X&15)<<12)|((V&63)<<6)|(U&63));W+=3}}}return Z};$.uid=function(U){var T=Math.random().toString().replace(/\b\.\b/,""),l=Math.random().toString().replace(/\b\.\b/,"");return $.str.encodeBase64($.str.format("{0}x{1}",T,l)).replace(/=+/g,"0").substr(3,32)};function e(U,l,T){e.base.call(this);this._username=U;this._domain=l;this._topLevelDomain=T}e.prototype={username:function(){return this._username},domain:function(){return this._domain},topLevelDomain:function(){return this._topLevelDomain},equals:function(l){if(!$.exists(l)){return false}return l.username()==this._username&&l.domain()==this._domain&&l.topLevelDomain()==this._topLevelDomain},toString:function(){return $.str.format("{0}@{1}.{2}",this._username,this._domain,this._topLevelDomain)}};$.Class.extend(e,$.Class);$.emailAddress=function(U,l,T){return new e(U,l,T)};$.emailAddress.Class=e;$.emailAddress.parse=function(V){if(!($.exists(V))&&/@{1}/.test(V)){return null}var U=V.split("@"),l=U[1],T=l.split("."),W=U[0];topLevelDomain=T.splice(T.length-1,1),domain=T.join(".");return new e(W,domain,topLevelDomain)};function f(l){f.base.call(this);this._value=l}f.prototype={value:function(){return this._value},equals:function(l){if(!$.exists(l)){return false}return l.value()==this._value},toStringWithFormat:function(T){var l=T;$.list((this._value.toString().split(""))).each(function(U){l.replace("#",U)});return l.replace(/#/g,"")}};$.Class.extend(f,$.Class);$.phoneNumber=function(l){return new f(l)};$.phoneNumber.Class=f;$.phoneNumber.parse=function(l){return new f(parseInt(l.replace(/[^0-9]/gi,"")))};function L(U,l,T){L.base.call(this);this._first=U;this._middle=l||"";this._last=T}L.prototype={first:function(){return this._first},middle:function(){return this._middle},last:function(){return this._last},full:function(){var l=($.isNullOrEmpty(this._middle))?"{F} {L}":"{F} {M} {L}";return this.toStringWithFormat(l)},initials:function(){var l=($.isNullOrEmpty(this._middle))?"{f}.{l}.":"{f}.{m}.{l}.";return this.toStringWithFormat(l)},equals:function(l){if(!$.exists(l)){return false}return l.first()==this._first&&l.middle()==this._middle&&l.last()==this._last},toStringWithFormat:function(U){var l=this._first.charAt(0),T=this._middle.charAt(0),V=this._last.charAt(0);return U.replace("{F}",this._first).replace("{M}",this._middle).replace("{L}",this._last).replace("{f}",l).replace("{m}",T).replace("{l}",V)}};$.Class.extend(L,$.Class);$.properName=function(U,l,T){return new L(U,l,T)};$.properName.Class=L;function J(l){J.base.call(this);var T=(!$.exists(l)||!l.toObject)?l:l.toObject();this.$h=($.exists(T))?T:{};this._count=0;for(n in this.$h){this._count++}}J.prototype={count:function(){return this.get("count")},keys:function(){return $.obj.keys(this.$h)},values:function(){return $.obj.values(this.$h)},add:function(T,l){if((!($.isString(T)||$.isNumber(T)))||/(null)|(undefined)/.test(T)||this.containsKey(T)){throw new Error($.str.format("Invalid key: {0}. Must be unique number or string.",T))}if($.isUndefined(l)){throw new Error($.str.format("Invalid value: {0}. Cannot be undefined.",l))}this.$h[T]=l;this._count++;return this},clear:function(){var l=this.$h;for(n in l){delete l[n]}this._count=0;return this},find:function(l){if(!$.exists(l)){return null}return this.$h[l]},findKey:function(l){var T=this.$h;for(n in T){if($.areEqual(T[n],l)){return n}}return null},findValue:function(l){return this.find(l)},quit:function(){this._iterator.quit();return this},each:function(T,l){var U=l||this;this._iterator=$.iterator(this.toObject());this._iterator.each(T,U);return this},isEmpty:function(){return this._count<1},contains:function(l){if(!$.exists(l)||$.isNullOrEmpty(l)||$.hash(l).isEmpty()){return false}var U=$.exists(l.toObject)?l:$.hash(l),T=true;U.each(function(W){if(!$.exists(W)){T=false;U.quit()}else{var V=W.key;T=this.containsKey(V)&&$.areEqual(this.findValue(V),W.value);if(!T){U.quit()}}},this);return T},containsKey:function(l){if(!$.exists(l)){return false}return !$.isUndefined(this.$h[l])},containsValue:function(T){var l=$.obj.values(this.$h),U=l.length;while(U--){if($.areEqual(l[U],T)){return true}}return false},merge:function(l){return I(this,l,"merge")},meld:function(l){return I(this,l,"meld")},remove:function(l){if(!this.containsKey(l)){return this}var T=this.$h;T[l]="value";delete T[l];this._count--;return this},replicate:function(){return $.hash($.replicate(this.$h))},toObject:function(){return this.$h},update:function(T,l){if(!$.exists(T)){return this}if(!this.containsKey(T)){this._count++}this.$h[T]=l;return this}};$.Class.extend(J,$.Class);function I(U,T,l){var V=(!T.toObject)?T:T.toObject();U.$h=$.obj[l](V,U.$h);U._count=$.obj.count(U.$h);return U}$.hash=function(l){return new J(l)};$.hash.Class=J;function u(U){u.base.call(this);this._keys=[];this._hash=$.hash();this._count=this._keys.length;if(!$.exists(U)){return}var W=0,T=U.length;while(W<T){var V=U[W];if(!$.isUndefined(V)){this.add(V)}W++}}u.prototype={count:function(){return this.get("count")},add:function(T){var l=this._keys,U=$.uid();l[l.length]=U;this._hash.add(U,T);this._count=this._keys.length;return this},clear:function(){this._hash.clear();this._keys=[];this._count=this._keys.length;return this},contains:function(l){return this._hash.containsValue(l)},find:function(T){var l=this._keys;return($.exists(l[T]))?this._hash.find(l[T]):null},quit:function(){this._iterator.quit();return this},each:function(T,l){var U=l||this;this._iterator=$.iterator(this.toArray());this._iterator.each(T,U);return this},isEmpty:function(){return this._count<1},remove:function(U){var T=this._hash;if(!this.contains(U)){return this}var l=T.findKey(U);this._keys.splice(l,1);T.remove(l);this._count=T.count();return this},toArray:function(){var l=[];this._hash.each(function(T){l.push(T.value)});return l}};$.Class.extend(u,$.Class);$.list=function(l){return new u(l)};$.list.Class=u;$.list.parseArguments=function(l){return new u(Array.prototype.slice.call(l))};function N(X,V,l,Y,U,Z,T){N.base.call(this);if((V<1)||(V>12)){throw new Error("Invalid month at $.dayPoint")}if((l<1)||(l>R(V,X))){throw new Error("Invalid date at $.dayPoint")}this._value=(arguments.length>=3)?new Date(X,V-1,l,Y||0,U||0,Z||0,T||0):new Date();var aa=this._value;function ab(ac){return ac<10?"0"+ac:""+ac}this._day=aa.getDay();this._date=l;this._month=V;this._year=X;this._hour=ab(aa.getHours());this._minute=ab(aa.getMinutes());this._second=ab(aa.getSeconds());this._millisecond=ab(aa.getMilliseconds());var W=this._day;this._isWeekday=W>0&&W<6;this._isWeekend=!this._isWeekday}N.prototype={value:function(){return this._value},day:function(){return this._day},date:function(){return this._date},month:function(){return this._month},year:function(){return this._year},hour:function(){return this._hour},minute:function(){return this._minute},second:function(){return this._second},millisecond:function(){return this._millisecond},isWeekday:function(){return this._isWeekday},isWeekend:function(){return this._isWeekend},nextDay:function(){return S(this,1,0,0)},prevDay:function(){return S(this,-1,0,0)},nextMonth:function(){return S(this,0,1,0)},prevMonth:function(){return S(this,0,-1,0)},nextYear:function(){return S(this,0,0,1)},prevYear:function(){return S(this,0,0,-1)},add:function(X,l,ac){function ab(ae,ai,ah){var af=ae,ag=ai;while(ag--){af=af[ah]()}return af}var aa=X<0,ad=Math.abs,Z=ad(X),Y=ad(ac),U=ad(l),T=aa?"prevYear":"nextYear",W=aa?"prevDay":"nextDay",V=aa?"prevMonth":"nextMonth";return ab(ab(ab(this,Z,T),U,V),Y,W)},firstDayOfMonth:function(){return new N(this._year,this._month,1)},lastDayOfMonth:function(){return new N(this._year,this._month,R(this._month,this._year))},isBefore:function(l){return !(this.isAfter(l)||this.equals(l))},isAfter:function(T){var l=this._year,V=T.year(),U=this._month,W=T.month();if(l>V){return true}if((l==V)&&(U>W)){return true}return((l==V)&&(U==W)&&(this._date>T.date()))},equals:function(l){return(this._year==l.year())&&(this._month==l.month())&&(this._date==l.date())},toString:function(){var V=this._year,l=this._month,U=this._date,T=(l<10&&U<10)?"0{1}/0{2}/{0}":(l<10)?"0{1}/{2}/{0}":(U<10)?"{1}/0{2}/{0}":"{1}/{2}/{0}";return $.str.format(T,V,l,U)},toDate:function(){return this.value()},toJson:function(){return this.value().toJSON()}};$.Class.extend(N,$.Class);$.dayPoint=function(W,X,U,l,V,Y,T){if(!($.isDate(W)||($.isNumber(W)&&$.isNumber(X)&&$.isNumber(U)))){return null}return new N(W,X,U,l,V,Y,T)};$.dayPoint.Class=N;$.dayPoint.canParse=function(l){return($.isString(l)||$.isNumber(l)||$.isDate(l))?!isNaN(new Date(l).valueOf()):false};$.dayPoint.parse=function(Z){if(Z instanceof N){return Z}if(!($.isDate(Z)||this.canParse(Z))){return null}var l=new Date(Z),Y=l.getFullYear(),U=l.getMonth()+1,X=l.getDate(),V=l.getHours(),W=l.getMinutes(),aa=l.getSeconds(),T=l.getMilliseconds();return $.dayPoint(Y,U,X,V,W,aa,T)};$.dayPoint.tryParse=function(l){return $.dayPoint.canParse(l)?$.dayPoint.parse(l):null};var H;$.dayPoint.assumeNow=function(l){H=$.dayPoint.parse(l)};$.dayPoint.today=function(){return H||$.dayPoint.parse(new Date())};function R(U,T){var l=U,V=T;if(l==2){return(s(V))?29:28}return(((l<8)&&($.isEven(l)))||((l>7)&&($.isOdd(l))))?30:31}function s(l){var U=l.toString().split(/\B/),T=parseFloat($.str.build(U[U.length-2],U[U.length-1]));return(T%4==0)}function S(Y,ad,U,af){var ah=Y.month(),Z=Y.year(),W=Y.date(),l=R(ah,Z),ag=ad,X=U,ac=af,T=W+ag,ab=ah+X,ae=Z+ac;if((W+ag)>l){T=1;ab=(ah+(X+1))}if((W+ag)<1){var V=Y.prevMonth(),T=R(V.month(),V.year());(ab=ah+(X-1))}if((ab)>12){ab=1;ae=(Z+(ac+1))}if((ab)<1){ab=12;ae=(Z+(ac-1))}var aa=R(ab,ae);T=(T>aa)?aa:T;return new N(ae,ab,T)}function F(U,T){if(!$.exists(U)||isNaN(U)){throw new Error($.str.format("$.money requires a number. Passed {0}",U))}F.base.call(this);var l=$.math.roundDown(U);this._cents=U-l;this._dollars=l;this._type=T||"$";this._value=U}F.prototype={cents:function(){return this._cents},dollars:function(){return this._dollars},type:function(){return this._type},value:function(){return this._value},add:function(l){money_checkType(this,l);return new F(this._value+l.value())},divide:function(l){if(!$.isNumber(l)){throw new Error()}return new F(this._value/l)},equals:function(l){return(this.isOfType(l))&&(this._value==l.value())},isOfType:function(l){return this._type==l.type()},isGreaterThan:function(l){money_checkType(this,l);return this._value>l.value()},isLessThan:function(l){money_checkType(this,l);return this._value<l.value()},multiply:function(l){if(!$.isNumber(l)){throw new Error()}return new F(this._value*l)},round:function(){return new F($.math.round(this.value,-2))},roundDown:function(){return new F($.math.roundDown(this.value,-2))},roundUp:function(){return new F($.math.roundUp(this.value,-2))},subtract:function(l){money_checkType(this,l);return new F(this._value-l.value())},toString:function(){var l=(this.value<0)?"({0}{1}.{2})":"{0}{1}.{2}";return $.str.format(l,this._type,money_formatDollars(this),money_formatCents(this))}};$.Class.extend(F,$.Class);$.money=function(T,l){return new F(T,l)};$.money.Class=F;$.money.zero=function(){return $.money(0)};$.money.isMoney=function(l){return l instanceof F};$.money.canParse=function(l){try{$.money.parse(l);return true}catch(T){return false}};$.money.parse=function(Y){if($.isNumber(Y)){return $.money(Y)}var l=/(\(.*\))|(\-)/.test(Y),X=(l)?1:0,W=Y.match(/[^\d\.\,\-]/g)||[],V=$.exists(W[X])?W[X]:"$",Z=parseFloat(Y.replace(/[^\d\.]/g,"")),T=(l)?-Z:Z;return $.money(T,V)};$.money.tryParse=function(l){return $.money.canParse(l)?$.money.parse(l):null};money_checkType=function(T,l){if(!T.isOfType(l)){throw new Error("Invalid operation on non-conforming currencies.")}};money_formatDollars=function(T){var U=T.dollars(),W=(T.cents()>=0.995)?(U+1):U,ab=W.toString(),Y=ab.replace(/\-/,"").split(/\B/).reverse(),V=Y.length,Z=V>3,X=0,aa=[];while(X<V){aa[aa.length]=Y[X];X++;if(!$.exists(Y[X])){break}if((X%3==0)&&Z){aa[aa.length]=","}}return $.str.build.apply(this,aa.reverse())};money_formatCents=function(V){var W=$.math.round(V.cents(),-3),U=W.toString(),X=U.replace(/\-|(0\.)/g,"").concat("0").split(/\B/),T=X.length;if($.isZero(T)||W>=0.995){return"00"}if(T<2){return"0"+X[0]}return(parseInt(X[2])>4)?X[0]+(parseInt(X[1])+1):X[0]+X[1]};function r(l,T){if(!$.isNumber(l)||!$.isNumber(T)){throw new Error($.str.format("at $.coord({0},{1}). Requires valid numbers.",l,T))}r.base.call(this);this.x(l).y(T)}r.prototype={x:function(l){return this.property("x",l)},y:function(l){return this.property("y",l)},abs:function(){return new r(Math.abs(this._x),Math.abs(this._y))},add:function(T){var l=this._x+T.x(),U=this._y+T.y();return new r(l,U)},divide:function(T){var l=this._x/T.x(),U=this._y/T.y();return new r(l,U)},equals:function(l){return(this._x===l.x())&&(this._y===l.y())},multiply:function(T){var l=this._x*T.x(),U=this._y*T.y();return new r(l,U)},subtract:function(T){var l=this._x-T.x(),U=this._y-T.y();return new r(l,U)},round:function(l){var T=l||0;return new r($.math.round(this.x(),T),$.math.round(this.y(),T))},half:function(){return this.divide(new r(2,2))},value:function(){return{x:this._x,y:this._y}},toEm:function(){return B(this,"em")},toPixel:function(){return B(this,"px")},toString:function(){return $.str.format("({0},{1})",this._x,this._y)}};$.Class.extend(r,$.Class);$.coord=function(l,T){return new r(l,T)};$.coord.Class=r;function B(T,l){return{x:function(){return T.x()+l},y:function(){return T.y()+l}}}function D(l){try{if(("left" in l)&&("top" in l)){return !isNaN(l.left)&&!isNaN(l.top)}if(("width" in l)&&("height" in l)){return !isNaN(l.width)&&!isNaN(l.height)}return false}catch(T){return false}}function h(l){if(("left" in l)&&("top" in l)){return new r(l.left,l.top)}if(("width" in l)&&("height" in l)){return new r(l.width,l.height)}return null}$.coord.zero=function(){return new r(0,0)};$.coord.random=function(U,T){var l=U*Math.random(),V=T*Math.random(T);return new r(l,V)};$.coord.canParse=h;$.coord.parse=h;$.coord.tryParse=function(l){return D(l)?h(l):null};function A(l,T){A.base.call(this,l,T)}A.prototype={isAbove:function(l){return this.y()<l.y()},isBelow:function(l){return this.y()>l.y()},isLeftOf:function(l){return this.x()<l.x()},isRightOf:function(l){return this.x()>l.x()},distanceFrom:function(l){return $.vector(this.x()-l.x(),this.y()-l.y())},distanceTo:function(l){return this.distanceFrom(l).invert()}};$.Class.extend(A,$.coord.Class);$.point=function(l,T){return new A(l,T)};$.point.Class=A;$.point.zero=function(){return new A(0,0)};$.point.canParse=x;$.point.parse=a;$.point.tryParse=function(l){return x(l)?a(l):null};function x(l){try{return !isNaN(l.x())&&!isNaN(l.y())}catch(T){return false}}function a(l){return new A(l.x(),l.y())}function P(l,T){P.base.call(this);this._topLeft=$.point.parse(l);this._dims=$.point.parse(T);this._bottomRight=$.point.parse(l.add(T))}P.prototype={dims:function(){return this.get("dims")},topLeft:function(){return this.get("topLeft")},bottomRight:function(){return this.get("bottomRight")},center:function(){return this._topLeft.add(this._bottomRight.subtract(this._topLeft)).half()},contains:function(U){var T=this._topLeft,l=this._bottomRight;return T.isAbove(U)&&T.isLeftOf(U)&&l.isRightOf(U)&&l.isBelow(U)}};$.Class.extend(P,$.Class);$.rectangle=function(T,l){return new P(T,l)};$.rectangle.Class=P;function b(l,T){if(!$.isNumber(l)||!$.isNumber(T)){throw new Error($.str.format("at $.vector({0},{1})",l,T))}b.base.call(this,l,T);this._lengthSquared=c(this,l,T);this._length=q(this,this._lengthSquared);this._unitNormalX=C(this,l);this._unitNormalY=C(this,T)}b.prototype={magnitude:function(){return this.get("length")},equals:function(l){return(l instanceof b)&&((this._x===l.x())&&(this._y===l.y()))},normal:function(){return $.vector(this._unitNormalX,this._unitNormalY)},invert:function(){return $.vector(this.x()*-1,this.y()*-1)},norm:function(){return $.vector(Math.abs(this.x()),Math.abs(this.y()))},perpendicular:function(){return $.vector(this.y()*-1,this.x())},isZero:function(){return this.x()==0&&this.y()==0},add:function(l){return $.vector(this.x()+l.x(),this.y()+l.y())},dot:function(l){return(this.x()*l.x())+(this.y()*l.y())},perpendicularAtTo:function(l){var T=l.add(this.projectionOfOnto(l).invert());return $.vector(T.x(),T.y())},projectionOfOnto:function(l){var T=l.normal().scale(this.dot(l.normal()));return $.vector(T.x(),T.y())},scale:function(l){return $.vector((this.x()*l),(this.y()*l))},unitNormalDot:function(l){return(this.normal().x()*l.normal().x())+(this.normal().y()*l.normal().y())},reflect:function(l){if(l.isZero()){return this}var T=l.normal();return this.add(T.scale(2*(T.dot(this))).invert())},round:function(l){var T=l||0;return $.vector($.math.round(this.x(),T),$.math.round(this.y(),T))}};$.Class.extend(b,$.coord.Class);$.vector=function(l,T){return new b(l,T)};$.vector.Class=b;$.vector.zero=function(){return $.vector(0,0)};$.vector.random=function(U,T){var l=U*Math.random(),V=T*Math.random();return $.vector(l,V)};function q(l,T){if(l.isZero()){return 0}return Math.sqrt(T)}function c(T,l,U){if(T.isZero()){return 0}return Math.pow(l,2)+Math.pow(U,2)}function C(T,l){if(T.isZero()){return 0}return l/T.magnitude()}$.abstractContext=function(l){$.abstractContext.base.call(this);this.state(l)};$.abstractContext.prototype={state:function(l){if(!$.exists(l)){return this._state}return this.set("state",l.context(this))}};$.Class.extend($.abstractContext,$.Class);$.abstractState=function(l){$.abstractState.base.call(this);this.states(l)};$.abstractState.prototype={context:function(l){return this.property("context",l)},states:function(l){return this.set("states",l)},state:function(l){var T=this._context;T.state(new this._states[l](T));return this}};$.Class.extend($.abstractState,$.Class);$.abstractVisitor=function(){};$.abstractVisitor.prototype={$visit:function(){throw new Error("visit method is abstract an must be defined.")},subject:function(l){return this.property("subject",$.replicate(l))},visit:function(){return this.$visit()}};function t(l){t.base.call(this);this.$current=0;this._quit=false;this.subject(l)}t.prototype={$hasNext:function(){return $.exists(this._subject[this.$current+1])},$hasPrev:function(){return $.exists(this._subject[this.$current-1])},$each:function(T,U){var l=U||this;this.reset();do{T.call(l,this.current())}while(this.next()&&(!this._quit));this._end=false;this.reset()},$exec:function(U){var l=this._subject,T=l[U];if(!$.exists(T)){return null}this.$current=U;return T},subject:function(T){var l=($.isArray(T))?T:($.isObject(T))?j(T):T;if(!$.isUndefined(T)){this.reset()}this.$subject=l;return this.property("subject",l)},current:function(){return this.$exec(this.$current)},next:function(){return this.$exec(this.$current+1)},prev:function(){return this.$exec(this.$current-1)},hasNext:function(){return this.$hasNext()},hasPrev:function(){return this.$hasPrev()},reset:function(){this.$current=0;return this},quit:function(){return this.set("quit",true)},each:function(l,T){if(this._subject.length<1){return this}this.$each(l,T);return this}};function j(l){var T=[];for(n in l){T.push({key:n,value:l[n]})}return T}$.Class.extend(t,$.Class);$.iterator=function(l){return new t(l)};$.iterator.Class=t;function y(){y.base.call(this);this._observers=$.hash();this._throwErrors=false}y.prototype={throwErrors:function(){this._throwErrors=true;return this},catchErrors:function(){this._throwErrors=false;return this},subscribe:function(l,W,T,V){var U=this._observers;if(U.containsKey(l)){U.find(l).add(W,T,V)}else{U.add(l,$.observer().add(W,T,V))}return this},unsubscribe:function(l,U){var T=this._observers;if(T.containsKey(l)){T.find(l).remove(U)}return this},notify:function(){var V=$.list.parseArguments(arguments),l=V.find(0),U=!this._observers.containsKey(l),T=!U||(V.count()>1),W=U?l:null,X=U?V.remove(l):V;return(T)?this._notify(W,X):this._notifyAll(W)},clear:function(){this._observers.each(function(l){l.value.clear()}).clear();return this},isEmpty:function(){return this._observers.isEmpty()},_notifyAll:function(l){$.list(this._observers.values()).each(function(T){T.notify(l)});return this},_notify:function(U,T){var V=this._observers,l=this._throwErrors;T.each(function(W){try{V.find(W).notify(U)}catch(X){if(l){var Y="MEDIATOR NOTIFY EXCEPTION:\nMessage:{0}\nObserver:{1}\nCall Stack:{2}";throw new Error($.str.format(Y,X.message,W,X.stack))}}});return this}};$.Class.extend(y,$.Class);$.mediator=function(){return new y()};$.mediator.Class=y;function z(){z.base.call(this);this._methods=new $.hash()}z.prototype={add:function(W,T,V){var l=V||$.uid("observerMethod"),U=T||this;this._methods.add(l,{m:W,s:U});return this},remove:function(l){this._methods.remove(l);return this},clear:function(){this._methods.clear();return this},notify:function(){var T=new $.iterator(this._methods.values()),l=arguments;T.each(function(U){if(!$.exists(U.m)){throw new Error($.str("Invalid function: {0} in observer."))}U.m.apply(U.s,l)});return this},isEmpty:function(){return this._methods.isEmpty()}};$.Class.extend(z,$.Class);$.observer=function(){return new z()};$.observer.Class=z;function k(){this._q=[]}k.prototype={isEmpty:function(){return this._q.length==0},enqueue:function(l){var T=this._q;T[T.length]=l;return this},dequeue:function(){var T=this._q,l=T[0];T.splice(0,1);return l},clear:function(){this._q=[]}};$.fifo=function(){return new k()};$.fifo.Class=k;function G(l){G.base.call(this,l)}G.prototype={$hasNext:function(){var V=this.$subject,T=V.length-1,X=this.$current,W=X+1,U=(W>T)?0:W;return $.exists(V[U])},$hasPrev:function(){var V=this.$subject,T=V.length-1,X=this.$current,W=X+1,U=(W<0)?T:W;return $.exists(V[U])},$each:function(T,U){var l=U||this;this.reset();do{T.call(U,this.current())}while(this.next()&&(this.$current>0));this.reset()},$exec:function(V){var U=this.$subject,T=(U.length-1);this.$current=(V>T)?0:((V<0)?T:V);return U[this.$current]}};$.Class.extend(G,$.iterator.Class);$.rolodex=function(l){return new G(l)};$.rolodex.Class=G;function Q(){}Q.prototype={$isSatisfiedBy:function(l){return},isSatisfiedBy:function(l){return this.$isSatisfiedBy(l)},and:function(l){return new E(this,l)},or:function(l){return new m(this,l)},xor:function(l){return new w(this,l)},not:function(){return new M(this)}};function E(T,l){E.base.call(this);this.$1=T;this.$2=l}E.prototype.$isSatisfiedBy=function(l){return this.$1.isSatisfiedBy(l)&&this.$2.isSatisfiedBy(l)};$.Class.extend(E,Q);function m(T,l){m.base.call(this);this.$1=T;this.$2=l}m.prototype.$isSatisfiedBy=function(l){return this.$1.isSatisfiedBy(l)||this.$2.isSatisfiedBy(l)};$.Class.extend(m,Q);function w(T,l){w.base.call(this);this.$1=T;this.$2=l}w.prototype.$isSatisfiedBy=function(l){return $.xor(this.$1.isSatisfiedBy(l),this.$2.isSatisfiedBy(l))};$.Class.extend(w,Q);function o(){o.base.call(this)}o.prototype.$isSatisfiedBy=function(l){return true};$.Class.extend(o,Q);function g(){g.base.call(this)}g.prototype.$isSatisfiedBy=function(l){return false};$.Class.extend(g,Q);function M(l){M.base.call(this);this._s=l}M.prototype.$isSatisfiedBy=function(l){return !this._s.isSatisfiedBy(l)};$.Class.extend(M,Q);function p(l){p.base.call(this);this.$isSatisfiedBy=l}$.Class.extend(p,Q);$.spec=function(l){return new p(l)};function v(){this._q=[]}v.prototype={isEmpty:function(){return this._q.length==0},push:function(l){var T=this._q;T[T.length]=l;return this},pop:function(){return this._q.pop()},clear:function(){this._q=[]}};$.lifo=function(){return new v()};$.lifo.Class=v})(jQuery);