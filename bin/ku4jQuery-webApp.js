(function(p){$=p;$.ku4webApp={config:{templates:{}},templates:{},models:{},controllers:{},views:{}};function d(l){d.base.call(this);$.list(l).each(this._add,this)}d.prototype={_add:function(l){var t=$[l.type](l.selector);if($.exists(l.spec)){t.spec(l.spec)}if(l.required&&$.exists(t.required)){t.required()}this.add(t.dom().name,t)}};$.Class.extend(d,$.form.Class);$.ku4webApp.form=function(l){return new d(l)};function g(l){this._container=$(l);this._display="css-responsebox-show"}g.prototype={show:function(l){this._container.html(l).addClass(this._display)},hide:function(){this._container.html("").removeClass(this._display)}};$.ku4webApp.responsebox=function(l){return new g(l)};function i(l){this._config=l}i.prototype={validate:function(u){var l=this._config,w=true,t=$.hash({}),v=u||$.dto();$.list(l).each(function(A){var y=A.name,x=A.spec,z=A.message,B=v.find(y);if(x.isSatisfiedBy(B)){return}w=false;t.add(y,z)});return{isValid:w,messages:t.toObject()}}};$.ku4webApp.validator=function(l){return new i(l)};function k(){var w=$.ku4webApp,u=$.mediator(),l=w.serviceFactory(u,w.config.services),v=w.storeFactory(u,w.config.collections),t=w.validatorFactory(w.config.validators);this.modelFactory=w.modelFactory(u,l,v,t);this.templateFactory=w.templateFactory(w.config.templates);this.formFactory=w.formFactory(w.config.forms);this.mediator=u}k.prototype={logErrors:function(){this.mediator.logErrors();return this},throwErrors:function(){this.mediator.throwErrors();return this}};$.ku4webApp.app=function(){return new k()};function r(u,l,w){var v=$.str.format("$.ku4webApp.{0}",u),t=$.str.format("Requires a valid {0}. {0}= {1}",l,w);if(!$.exists(w)){throw $.ku4exception(v,t)}else{return w}}function c(t,l){this._modelFactory=r("controllers","modelFactory",t);this._formFactory=r("controllers","formFactory",l)}c.prototype={$model:function(l){return this._modelFactory.create(l)},$form:function(l){return this._formFactory.create(l)}};$.ku4webApp.abstractController=c;$.ku4webApp.controller=function(t,u){function l(x,v,w){l.base.call(this,x,v,w)}l.prototype=u;$.Class.extend(l,c);$.ku4webApp.controllers[t]=function(x){var v=$.str.format("$.ku4webApp.controllers.{0}",t),w=$.str.format("Requires a valid app. app= {0}",x);if(!$.exists(x)){throw $.ku4exception(v,w)}return new l(x.modelFactory,x.formFactory,x.validatorFactory)}};function n(u,l,v,t){this._mediator=r("models","mediator",u);this._serviceFactory=r("models","serviceFactory",l);this._storeFactory=r("models","storeFactory",v);this._validatorFactory=r("models","validatorFactory",t)}n.prototype={$collection:function(l){return this._storeFactory.create(l)},$service:function(l){return this._serviceFactory.create(l)},$validator:function(l){return this._validatorFactory.create(l)},$notify:function(){var l=this._mediator;l.notify.apply(l,arguments);return this}};$.ku4webApp.abstractModel=n;$.ku4webApp.model=function(t,u,v){function l(y,w,z,x){l.base.call(this,y,w,z,x)}l.prototype=u;$.Class.extend(l,n);$.ku4webApp.models[t]=function(y,w,z,x){var A=new l(y,w,z,x);if($.exists(v)){$.hash(v).each(function(C){var B=C.key;y.unsubscribe(B,t).subscribe(B,A[C.value],A,t)})}return A}};function s(t,l){this._mediator=t;this._config=l;this._noCache=false}s.prototype={noCache:function(){this._noCache=true;return this},call:function(v){var t=this._config,u=this._mediator,l=$.service()[t.verb]().uri(t.uri);l.contentType(t.contentType);if(this._noCache){l.noCache()}l.onSuccess(function(w){if($.exists(t.success)){u.notify(w,l.processId(),t.success)}},this).onError(function(w){if($.exists(t.error)){u.notify(w,l.processId(),t.error)}},this).call(v);return l}};$.ku4webApp.service=function(t,l){return new s(t,l)};function j(u,l,t,v){this._mediator=u;this._config=l;this._key=t;this._join=v}j.prototype={insert:function(u){var t=r("Collection","config",this._config[this._key]),l=$.str.format('Cannot insert invalid type: {1} into Collection["{0}"]',t.name,u);if(!$.exists(u)){throw $.ku4exception("Collection",l)}var v=($.exists(u.toObject))?u.toObject():u,w=$.ku4store().read(t.name);w.insert(v);w.save();if($.exists(t.insert)){this._mediator.notify(w,t.insert)}return this},find:function(w){var l=r("Collection","config",this._config[this._key]),u=this._join,v=($.exists(u))?$.ku4store().read(l.name).join($.ku4store().read(u[0]),u[1],u[2]):$.ku4store().read(l.name),t=v.find(w);if($.exists(l.find)){this._mediator.notify(t,l.find)}return t},update:function(x,u){var t=r("Collection","config",this._config[this._key]),l=$.str.format('Cannot update type: {1} into Collection["{0}"]',t.name,u);if(!$.exists(u)){throw $.ku4exception("Collection",l)}var v=($.exists(u.toObject))?u.toObject():u;var w=$.ku4store().read(t.name).update(x,v).save();if($.exists(t.update)){this._mediator.notify(w,t.update)}return this},remove:function(t){var l=r("Collection","config",this._config[this._key]),u=($.exists(t)&&$.exists(t.toObject))?t.toObject():t,v=$.ku4store().read(l.name).remove(u).save();if($.exists(l.remove)){this._mediator.notify(v,l.remove)}return this},join:function(){var u=$.list.parseArguments(arguments).toArray(),t=this._config,l=u[0],v=t[l];if($.exists(v)){u[0]=v.name}return new j(this._mediator,this._config,this._key,u)}};$.ku4webApp.store=function(t,l,u){return new j(t,l,u)};function o(l){this._config=r("templates","config",l)}o.prototype={$config:function(l){return($.exists(l))?this._config[l]:this._config},$forms:function(l){return($.exists(l))?this._config.forms[l]:this._config.forms},$views:function(l){return($.exists(l))?this._config.views[l]:this._config.views},$render:function(l,t){return $.str.render(l,t)},$renderList:function(u,t){var l="";$.list(t).each(function(v){l+=this.$render(u,v)},this);return l},$renderListWithAction:function(t,u){var l="";$.list(t).each(function(v){l+=u.call(this,v)},this);return l}};$.ku4webApp.abstractTemplate=o;$.ku4webApp.template=function(l,u){function t(v){t.base.call(this,v)}t.prototype=u;$.Class.extend(t,o);$.ku4webApp.templates[l]=function(v){var w=r($.str.format("templates.{0}",l),"config",v);return new t(w)}};function a(t,l){this._templateFactory=r("views","templateFactory",t);this._formFactory=r("views","formFactory",l)}a.prototype={$template:function(l){return this._templateFactory.create(l)},$form:function(l){return this._formFactory.create(l)}};$.ku4webApp.abstractView=a;$.ku4webApp.__views={};$.ku4webApp.view=function(t,u,v){function l(x,w){l.base.call(this,x,w)}l.prototype=u;$.Class.extend(l,a);$.ku4webApp.views[t]=function(y){var w=$.str.format("$.ku4webApp.views.{0}",t),x=$.str.format("Requires a valid app. app= {0}",y);if(!$.exists(y)){throw $.ku4exception(w,x)}if(!$.exists($.ku4webApp.__views[t])){var z=new l(y.templateFactory,y.formFactory);if($.exists(v)){$.hash(v).each(function(A){y.mediator.subscribe(A.key,z[A.value],z)})}$.ku4webApp.__views[t]=z}return $.ku4webApp.__views[t]}};function e(l){this._config=l}e.prototype={create:function(l){return $.ku4webApp.form(this._config[l])}};$.ku4webApp.formFactory=function(l){return new e(l)};function h(u,l,v,t){this._mediator=u;this._serviceFactory=l;this._storeFactory=v;this._validatorFactory=t}h.prototype={create:function(l){return $.ku4webApp.models[l](this._mediator,this._serviceFactory,this._storeFactory,this._validatorFactory)}};$.ku4webApp.modelFactory=function(u,l,v,t){return new h(u,l,v,t)};function b(t,l){this._mediator=t;this._config=l}b.prototype={create:function(l){return $.ku4webApp.service(this._mediator,this._config[l])}};$.ku4webApp.serviceFactory=function(t,l){return new b(t,l)};function q(t,l){this._mediator=t;this._config=l}q.prototype={create:function(l){return $.ku4webApp.store(this._mediator,this._config,l)}};$.ku4webApp.storeFactory=function(t,l){return new q(t,l)};function m(l){this._config=l}m.prototype={create:function(l){return $.ku4webApp.templates[l](this._config)}};$.ku4webApp.templateFactory=function(l){return new m(l)};function f(l){this._config=l}f.prototype={create:function(l){return $.ku4webApp.validator(this._config[l])}};$.ku4webApp.validatorFactory=function(l){return new f(l)}})(jQuery);