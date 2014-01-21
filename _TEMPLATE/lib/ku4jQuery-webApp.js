(function(h){$=h;$.ku4webApp={config:{templates:{}},templates:{},models:{},controllers:{},views:{}};function c(l){c.base.call(this);$.list(l).each(this._add,this)}c.prototype={_add:function(l){var s=$[l.type](l.selector);if($.exists(l.spec)){s.spec(l.spec)}if(l.required&&$.exists(s.required)){s.required()}this.add(s.dom().name,s)}};$.Class.extend(c,$.form.Class);$.ku4webApp.form=function(l){return new c(l)};function g(l){this._container=$(l);this._display="css-responsebox-show"}g.prototype={show:function(l){this._container.html(l).addClass(this._display)},hide:function(){this._container.html("").removeClass(this._display)}};$.ku4webApp.responsebox=function(l){return new g(l)};function a(l){this._config=l}a.prototype={validate:function(t){var l=this._config,v=true,s=$.hash({}),u=t||$.dto();$.list(l).each(function(z){var x=z.name,w=z.spec,y=z.message,A=u.find(x);if(w.isSatisfiedBy(A)){return}v=false;s.add(x,y)});return{isValid:v,messages:s.toObject()}}};$.ku4webApp.validator=function(l){return new a(l)};function f(){var v=$.ku4webApp,t=$.mediator(),l=v.serviceFactory(t,v.config.services),u=v.storeFactory(t,v.config.collections),s=v.validatorFactory(v.config.validators);this.mediator=t;this.modelFactory=v.modelFactory(t,l,u,s);this.templateFactory=v.templateFactory(v.config.templates);this.formFactory=v.formFactory(v.config.forms);this.responsebox=v.responsebox(".ku4webApp-responsebox")}f.prototype={throwErrors:function(){this.mediator.throwErrors();return this}};$.ku4webApp.app=function(){return new f()};function i(s,l){this._modelFactory=s;this._formFactory=l}i.prototype={$model:function(l){return this._modelFactory.create(l)},$form:function(l){return this._formFactory.create(l)}};$.ku4webApp.abstractController=i;$.ku4webApp.controller=function(s,t){function l(w,u,v){l.base.call(this,w,u,v)}l.prototype=t;$.Class.extend(l,i);$.ku4webApp.controllers[s]=function(u){return new l(u.modelFactory,u.formFactory,u.validatorFactory)}};function p(t,l,u,s){this._mediator=t;this._serviceFactory=l;this._storeFactory=u;this._validatorFactory=s}p.prototype={$collection:function(l){return this._storeFactory.create(l)},$service:function(l){return this._serviceFactory.create(l)},$validator:function(l){return this._validatorFactory.create(l)},$notify:function(){var l=this._mediator;l.notify.apply(l,arguments);return this}};$.ku4webApp.abstractModel=p;$.ku4webApp.model=function(s,t,u){function l(x,v,y,w){l.base.call(this,x,v,y,w)}l.prototype=t;$.Class.extend(l,p);$.ku4webApp.models[s]=function(x,v,y,w){var z=new l(x,v,y,w);if($.exists(u)){$.hash(u).each(function(A){x.subscribe(A.key,z[A.value],z)})}return z}};function m(s,l){this._mediator=s;this._config=l}m.prototype={call:function(s){var l=this._config,t=this._mediator,u=(!$.exists(s))?"":($.exists(s.toQueryString))?s.toQueryString():$.dto(s).toQueryString();$.service()[l.verb]().uri(l.uri).onSuccess(function(v){var w=$.dto.parseJson(v).toObject();if(w.isError&&$.exists(l.error)){t.notify(w,l.error)}else{if($.exists(l.success)){t.notify(w,l.success)}}},this).onError(function(v){if($.exists(l.error)){t.notify(v,l.error)}},this).call(u);return this}};$.ku4webApp.service=function(s,l){return new m(s,l)};function o(s,l){this._mediator=s;this._config=l}o.prototype={insert:function(s){if(!$.exists(s)){throw new Error($.str.format("Cannot insert invalid type: {0}",s))}var l=this._config,t=($.exists(s.toObject))?s.toObject():s,u=$.ku4store().read(l.name);u.insert(t);u.save();if($.exists(l.insert)){this._mediator.notify(u,l.insert)}return this},find:function(u){var l=this._config,t=$.ku4store().read(l.name),s=t.find(u);if($.exists(l.find)){this._mediator.notify(s,l.find)}return s},update:function(s){if(!$.exists(s)){throw new Error($.str.format("Cannot update type: {0}",s))}var l=this._config,t=($.exists(s.toObject))?s.toObject():s,u=$.ku4store().read(l.name).update({_ku4Id:t._ku4Id},t).save();if($.exists(l.update)){this._mediator.notify(u,l.update)}return this},remove:function(s){var l=this._config,t=($.exists(s)&&$.exists(s.toObject))?s.toObject():s,u=$.ku4store().read(l.name).remove(t).save();if($.exists(l.remove)){this._mediator.notify(u,l.remove)}return this}};$.ku4webApp.store=function(s,l){return new o(s,l)};function r(l){this._config=l}r.prototype={$config:function(l){return($.exists(l))?this._config[l]:this._config},$forms:function(l){return($.exists(l))?this._config.forms[l]:this._config.forms},$views:function(l){return($.exists(l))?this._config.views[l]:this._config.views},$render:function(l,s){return $.str.render(l,s)},$renderList:function(t,s){var l="";$.list(s).each(function(u){l+=this.$render(t,u)},this);return l},$renderListWithAction:function(s,t){var l="";$.list(s).each(function(u){l+=t.call(this,u)},this);return l}};$.ku4webApp.abstractTemplate=r;$.ku4webApp.template=function(l,t){function s(u){s.base.call(this,u)}s.prototype=t;$.Class.extend(s,r);$.ku4webApp.templates[l]=function(u){return new s(u)}};function b(s,l){this._templateFactory=s;this._formFactory=l}b.prototype={$template:function(l){return this._templateFactory.create(l)},$form:function(l){return this._formFactory.create(l)}};$.ku4webApp.abstractView=b;$.ku4webApp.view=function(s,t,u){function l(w,v){l.base.call(this,w,v)}l.prototype=t;$.Class.extend(l,b);$.ku4webApp.views[s]=function(v){var w=new l(v.templateFactory,v.formFactory);if($.exists(u)){$.hash(u).each(function(x){v.mediator.subscribe(x.key,w[x.value],w)})}return w}};function n(l){this._config=l}n.prototype={create:function(l){return $.ku4webApp.form(this._config[l])}};$.ku4webApp.formFactory=function(l){return new n(l)};function q(t,l,u,s){this._mediator=t;this._serviceFactory=l;this._storeFactory=u;this._validatorFactory=s}q.prototype={create:function(l){return $.ku4webApp.models[l](this._mediator,this._serviceFactory,this._storeFactory,this._validatorFactory)}};$.ku4webApp.modelFactory=function(t,l,u,s){return new q(t,l,u,s)};function k(s,l){this._mediator=s;this._config=l}k.prototype={create:function(l){return $.ku4webApp.service(this._mediator,this._config[l])}};$.ku4webApp.serviceFactory=function(s,l){return new k(s,l)};function d(s,l){this._mediator=s;this._config=l}d.prototype={create:function(l){return $.ku4webApp.store(this._mediator,this._config[l])}};$.ku4webApp.storeFactory=function(s,l){return new d(s,l)};function e(l){this._config=l}e.prototype={create:function(l){return $.ku4webApp.templates[l](this._config)}};$.ku4webApp.templateFactory=function(l){return new e(l)};function j(l){this._config=l}j.prototype={create:function(l){return $.ku4webApp.validator(this._config[l])}};$.ku4webApp.validatorFactory=function(l){return new j(l)}})(jQuery);