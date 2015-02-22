(function(w){$.ku4webApp={config:{templates:{}},templates:{},models:{},controllers:{},views:{}};function e(l){e.base.call(this);$.list(l).each(this._add,this)}e.prototype={_add:function(l){var B=$[l.type](l.selector);if($.exists(l.spec)){B.spec(l.spec)}if($.exists(l.maxDims)){B.maxDims(l.maxDims)}if(l.required&&$.exists(B.required)){B.required()}if($.isNullOrEmpty(B.dom().name)){throw $.ku4exception("form","Form requires all field DOM elements have a valid 'name' attribute")}else{this.add(B.dom().name,B)}}};$.Class.extend(e,$.form.Class);$.ku4webApp.form=function(l){return new e(l)};function i(l){this._container=$(l);this._display="css-responsebox-show"}i.prototype={show:function(l){this._container.html(l).addClass(this._display)},hide:function(){this._container.html("").removeClass(this._display)}};$.ku4webApp.responsebox=function(l){return new i(l)};function m(l){this._config=l}m.prototype={validate:function(C){var l=this._config,E=true,B=$.hash({}),D=C||$.dto();$.list(l).each(function(I){var G=I.name,F=I.spec,H=I.message,J=D.find(G);if(F.isSatisfiedBy(J)){return}E=false;B.add(G,H)});return{isValid:E,messages:B.toObject()}}};$.ku4webApp.validator=function(l){return new m(l)};function d(C,B,l){this._modelFactory=z("controllers","modelFactory",C);this._formFactory=z("controllers","formFactory",B);this._navigator=l}d.prototype={$model:function(l){return this._modelFactory.create(l)},$form:function(l){return this._formFactory.create(l)},$navigator:function(){return this._navigator}};$.ku4webApp.abstractController=d;$.ku4webApp.controller=function(B,C){function l(F,E,D){l.base.call(this,F,E,D)}l.prototype=C;$.Class.extend(l,d);$.ku4webApp.controllers[B]=function(F){var D=$.str.format("$.ku4webApp.controllers.{0}",B),E=$.str.format("Requires a valid app. app= {0}",F);if(!$.exists(F)){throw $.ku4exception(D,E)}return new l(F.modelFactory,F.formFactory,F.navigator)}};function t(D,l,B,E,C){this._mediator=z("models","mediator",D);this._serviceFactory=z("models","serviceFactory",l);this._socketFactory=z("models","socketFactory",B);this._storeFactory=z("models","storeFactory",E);this._validatorFactory=z("models","validatorFactory",C);this._state=new k()}t.prototype={$mediator:function(){return this._mediator},$collection:function(l){return this._storeFactory.create(l)},$service:function(l){return this._serviceFactory.create(l)},$socket:function(l){return this._socketFactory.create(l)},$validator:function(l){return this._validatorFactory.create(l)},$state:function(){return this._state},$appState:function(l){if(!$.exists(l)){return a}a=new k(l);return this},$notify:function(){var l=this._mediator;l.notify.apply(l,arguments);return this}};$.ku4webApp.abstractModel=t;$.ku4webApp.model=function(B,C,D){function l(H,E,F,I,G){l.base.call(this,H,E,F,I,G)}l.prototype=C;$.Class.extend(l,t);$.ku4webApp.models[B]=function(H,E,F,I,G){var J=new l(H,E,F,I,G);if($.exists(D)){$.hash(D).each(function(N){var K=N.key,L=N.value,P=$.str.format("ku4webApp.model.{0}_{1}",B,L),O=J[L];try{H.unsubscribe(K,P).subscribe(K,O,J,P)}catch(M){throw $.ku4exception("$.ku4webApp.model",$.str.format("$.ku4webApp.model.{0} cannot subscribe to mediator with name: {1} or method: {2}.\n\nmessage:{3}\n\n",B,K,L,M.message))}})}return J}};function A(D,C,B){this._mediator=D;this._config=B;var l=$.service(C)[B.verb]().uri(B.uri);l.contentType(B.contentType);if($.exists(B.success)){l.onSuccess(function(E){D.notify(B.success,E,l.processId())},this,B.success)}if($.exists(B.error)){l.onError(function(E){D.notify(B.error,E,l.processId())},this,B.success)}if($.exists(B.complete)){l.onError(function(E){D.notify(B.complete,E,l.processId())},this,B.complete)}this._service=l}A.prototype={cache:function(){this._service.cache();return this},noCache:function(){this._service.noCache();return this},lock:function(){this._service.lock();return this},unlock:function(){this._service.unlock();return this},abort:function(){this._service.abort();return this},call:function(l){this._service.call(l);return this}};$.ku4webApp.service=function(C,B,l){return new A(C,B,l)};var x,o;function s(){if($.isUndefined(x)){x=($.exists(o))?o():null}return x}function q(C,B){if(!$.exists(B.event)){throw new Error("Invalid socket event configuration")}this._event=B.event;var l=s();if(!$.exists(l)){throw new Error("Missing socket.io dependency. Add socket.io to your application.")}if($.exists(B.success)){l.on(this._event,function(D){C.notify(B.success,D)})}if($.exists(B.error)){l.on("error",function(D){C.notify(B.error,D)})}}q.prototype={call:function(l){s().emit(this._event,l)}};$.ku4webApp.socket=function(B,l){return new q(B,l)};function k(l){this._value=l;this._data=$.hash()}k.prototype={is:function(l){return this._value===l},set:function(l){this._value=l;return this},read:function(l){return this._data.findValue(l)},write:function(l,B){this._data.update(l,B);return this}};var a=new k("__ku4appStarted__");function n(C,l,B,D){this._mediator=C;this._config=l;this._key=B;this._collection=D}n.prototype={init:function(l){this.__collection().init(l).save();return this},find:function(C){var l=this.__config(),B=this.__collection().find(C);if($.exists(l.find)){this._mediator.notify(l.find,B)}return B},insert:function(C){var l=this.__config(),B=$.str.format('Cannot insert invalid type: {1} into Collection["{0}"]',l.name,C),D=this.__collection();if(!$.exists(C)){throw $.ku4exception("Collection",B)}D.insert(C).save();if($.exists(l.insert)){this._mediator.notify(l.insert,D)}return this},insertList:function(l){this.__collection().insertList(l).save();return this},update:function(F,C){var B=this.__config(),l=$.str.format('Cannot update type: {1} into Collection["{0}"]',B.name,C);if(!$.exists(C)){throw $.ku4exception("Collection",l)}var D=($.exists(C.toObject))?C.toObject():C;var E=this.__collection().update(F,D).save();if($.exists(B.update)){this._mediator.notify(B.update,E)}return this},remove:function(B){var C=($.exists(B)&&$.exists(B.toObject))?B.toObject():B,l=this.__config(),D=this.__collection().remove(C).save();if($.exists(l.remove)){this._mediator.notify(l.remove,D)}return this},join:function(){var D=this._config,l=arguments[0],J=arguments[1],C=arguments[2],L=arguments[3],K=D[l],F=($.exists(K))?K.name:l,H=this.__collection(),E=$.ku4store().read(F),B=H.join(E,J,C,L),I=B.name(),G=$.hash(D).replicate().add(I,{name:I}).toObject();return new n(this._mediator,G,I,B)},exec:function(l){this._collection=this.__collection().exec(l);return this},__config:function(){return z("Collection","config",this._config[this._key])},__store:function(){var l=this._config.storeType;switch(l){case"memory":return $.ku4memoryStore();case"indexedDB":return $.ku4indexedDbStore();default:return $.ku4localStorageStore()}},__collection:function(){var l=this._collection;return($.exists(l))?l:this.__store().read(this.__config().name)}};$.ku4webApp.store=function(C,l,B,D){return new n(C,l,B,D)};function f(D,B){this._modelFactory=D;this._config=B;this._notify=true;var C=this;function l(){if(C._notify){C.execute(C.read())}C._notify=true}if($.exists(window.addEventListener)){window.addEventListener("hashchange",l)}else{if($.exists(window.attachEvent)){window.attachEvent("onhashchange",l)}}}f.prototype={hashEquals:function(l){return this.read()==l},hash:function(l){return($.exists(l))?this.write(l,true):this.read()},read:function(){return location.hash.substr(1)},write:function(C,B){var l=this.read();this._notify=(B)?false:true;location.hash=C;return this},forward:function(){window.history.forward();return this},back:function(){window.history.back();return this},execute:function(E){var D=this._config;if(!$.exists(D)){return}var H=D[E];if(!$.exists(H)){return}var l=H.model,B=H.method,G=this._modelFactory;if($.exists(l)&&$.exists(B)){try{var C=G.create(l);C[B]()}catch(F){}}return this},executeOrDefault:function(C,B){var l=this._config;if(!$.exists(l)){return}var D=l[C];return($.exists(D))?this.execute(C):this.execute(B)}};$.ku4webApp.navigator=function(B,l){return new f(B,l)};function v(l){this._config=z("templates","config",l)}v.prototype={$config:function(l){return($.exists(l))?this._config[l]:this._config},$forms:function(l){return($.exists(l))?this._config.forms[l]:this._config.forms},$views:function(l){return($.exists(l))?this._config.views[l]:this._config.views},$render:function(l,B,C){return $.str.render(l,B,C)},$renderList:function(D,C,F,E){var l="",G=(!$.isFunction(F))?F:null,B=($.isFunction(F))?F:($.isFunction(E))?E:function(H){return H};$.list(C).each(function(H){l+=this.$render(D,B(H),G)},this);return l},$renderListWithAction:function(C,D,E){var l="",B=E||function(F){return F};$.list(C).each(function(F){l+=D.call(this,B(F))},this);return l}};$.ku4webApp.abstractTemplate=v;$.ku4webApp.template=function(l,C){function B(D){B.base.call(this,D)}B.prototype=C;$.Class.extend(B,v);$.ku4webApp.templates[l]=function(D){var E=z($.str.format("templates.{0}",l),"config",D);return new B(E)}};function b(C,B,l){this._templateFactory=z("views","templateFactory",C);this._formFactory=z("views","formFactory",B);this._navigator=z("views","navigator",l);this._state=new k()}b.prototype={$template:function(l){return this._templateFactory.create(l)},$form:function(l){return this._formFactory.create(l)},$navigator:function(){return this._navigator},$state:function(){return this._state}};$.ku4webApp.abstractView=b;$.ku4webApp.__views={};$.ku4webApp.view=function(B,C,D){function l(G,F,E){l.base.call(this,G,F,E)}l.prototype=C;$.Class.extend(l,b);$.ku4webApp.views[B]=function(G){var E=$.str.format("$.ku4webApp.views.{0}",B),F=$.str.format("Requires a valid app. app= {0}",G);if(!$.exists(G)){throw $.ku4exception(E,F)}if(!$.exists($.ku4webApp.__views[B])){var H=new l(G.templateFactory,G.formFactory,G.navigator);if($.exists(D)){$.hash(D).each(function(L){var I=L.key,J=L.value,N=$.str.format("ku4webApp.view_{0}_{1}",B,J),M=H[J];try{G.mediator.unsubscribe(I,N).subscribe(I,M,H,N)}catch(K){throw $.ku4exception("$.ku4webApp.view",$.str.format("$.ku4webApp.view.{0} cannot subscribe to mediator with name: {1} or key: {2}.\n\nmessage:{3}\n\n",B,I,J,K.message))}})}$.ku4webApp.__views[B]=H}return $.ku4webApp.__views[B]}};function g(l){this._config=l}g.prototype={create:function(l){return $.ku4webApp.form(this._config[l])}};$.ku4webApp.formFactory=function(l){return new g(l)};function j(D,l,B,E,C){var F=$.hash();$.hash($.ku4webApp.models).each(function(G){F.add(G.key,G.value(D,l,B,E,C))},this);this._models=F}j.prototype={create:function(l){return this._models.find(l)}};$.ku4webApp.modelFactory=function(D,l,B,E,C){return new j(D,l,B,E,C)};function c(C,l){var B=$.hash();$.hash(l).each(function(D){B.add(D.key,$.ku4webApp.service(C,D.key,D.value))},this);this._services=B}c.prototype={create:function(l){return this._services.find(l)}};$.ku4webApp.serviceFactory=function(B,l){return new c(B,l)};function u(C,l){var B=$.hash();$.hash(l).each(function(D){B.add(D.key,$.ku4webApp.socket(C,D.value))},this);this._sockets=B}u.prototype={create:function(l){return this._sockets.find(l)}};$.ku4webApp.socketFactory=function(B,l){return new u(B,l)};function y(B,l){this._mediator=B;this._config=l}y.prototype={create:function(l){return $.ku4webApp.store(this._mediator,this._config,l)}};$.ku4webApp.storeFactory=function(B,l){return new y(B,l)};function r(l){this._config=l}r.prototype={create:function(l){return $.ku4webApp.templates[l](this._config)}};$.ku4webApp.templateFactory=function(l){return new r(l)};function h(l){this._config=l}h.prototype={create:function(l){return $.ku4webApp.validator(this._config[l])}};$.ku4webApp.validatorFactory=function(l){return new h(l)};function p(B){var l=B||$.uid(),H=$.ku4webApp,F=$.mediator("ku4webApp_"+l),C=H.serviceFactory(F,H.config.services),D=H.socketFactory(F,H.config.sockets),G=H.storeFactory(F,H.config.collections),E=H.validatorFactory(H.config.validators);this.modelFactory=H.modelFactory(F,C,D,G,E);this.templateFactory=H.templateFactory(H.config.templates);this.formFactory=H.formFactory(H.config.forms);this.navigator=H.navigator(this.modelFactory,H.config.navigator);this.mediator=F}p.prototype={logErrors:function(){this.mediator.logErrors();return this},throwErrors:function(){this.mediator.throwErrors();return this}};$.ku4webApp.app=function(l){return new p(l)};function z(C,l,E){var D=$.str.format("$.ku4webApp.{0}",C),B=$.str.format("Requires a valid {0}. {0}= {1}",l,E);if(!$.exists(E)){throw $.ku4exception(D,B)}else{return E}}})();