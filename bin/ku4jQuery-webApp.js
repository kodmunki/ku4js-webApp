(function(f){$=f;$.ku4webApp={config:{templates:{}},templates:{},controllers:{},views:{}};function a(l){a.base.call(this);$.list(l).each(this._add,this)}a.prototype={_add:function(l){var o=$[l.type](l.selector);if($.exists(l.spec)){o.spec(l.spec)}if(l.required&&$.exists(o.required)){o.required()}this.add(o.dom().name,o)}};$.Class.extend(a,$.form.Class);$.ku4webApp.form=function(l){return new a(l)};function e(l){this._container=$(l);this._display="css-responsebox-show"}e.prototype={show:function(l){this._container.html(l).addClass(this._display)},hide:function(){this._container.html("").removeClass(this._display)}};$.ku4webApp.responsebox=function(l){return new e(l)};function i(l){this._config=l}i.prototype={validate:function(q){var o=this._config,r=true,p=$.hash({}),l=q.fields();$.list(o).each(function(u){var s=u.name,t=u.message,v=l.find(s);if(!$.exists(v)||v.isValid()){return}r=false;p.add(s,t)});return{isValid:r,messages:p.toObject()}}};$.ku4webApp.validator=function(l){return new i(l)};function g(q,o,l,p){this._mediator=q;this._serviceFactory=o;this._formFactory=l;this._validatorFactory=p}g.prototype={$mediator:function(){return this._mediator},$service:function(l){return this._serviceFactory.create(l)},$validate:function(o){var p=this._formFactory.create(o),l=this._validatorFactory.create(o);return l.validate(p)},$read:function(l){return this._formFactory.create(l).read()},$clear:function(l){this._formFactory.create(l).clear();return this},$notify:function(){var l=this._mediator;l.notify.apply(l,arguments);return this}};$.ku4webApp.abstractController=g;function n(l){this._config=l}n.prototype={$forms:function(l){return this._config.forms[l]},$views:function(l){return this._config.views[l]},$render:function(l,o){return $.str.render(l,o)},$renderList:function(p,o){var l="";$.list(o).each(function(q){l+=this.$render(p,q)},this);return l},$renderWithAction:function(o,l){return l.call(this,o)},$renderListWithAction:function(o,p){var l="";$.list(o).each(function(q){l+=this.$renderWithAction(q,p)},this);return l}};$.ku4webApp.abstractTemplate=n;function b(p,l,o){this._mediator=p;this._responsebox=l;this._templateFactory=o}b.prototype={subscribe:function(l,o){this._mediator.subscribe(l,this[o],this);return this},$mediator:function(){return this._mediator},$responsebox:function(){return this._responsebox},$template:function(l){return this._templateFactory.create(l)}};$.ku4webApp.abstractView=b;function d(){var l=$.ku4webApp;this.mediator=$.mediator();this.serviceFactory=l.serviceFactory(this.mediator,l.config.services);this.templateFactory=l.templateFactory(l.config.templates);this.formFactory=l.formFactory(l.config.forms);this.validatorFactory=l.validatorFactory(l.config.validators);this.responsebox=l.responsebox(".ku4webApp-responsebox")}$.ku4webApp.app=function(){return new d()};$.ku4webApp.controller=function(o,p){function l(t,r,q,s){l.base.call(this,t,r,q,s)}l.prototype=p;$.Class.extend(l,g);$.ku4webApp.controllers[o]=function(q){return new l(q.mediator,q.serviceFactory,q.formFactory,q.validatorFactory)}};function k(o,l){this._mediator=o;this._config=l}k.prototype={call:function(p){var l=this._config,o=this._mediator;$.service()[l.verb]().uri(l.uri).onSuccess(function(q){if(response.isError){o.notify(response,l.error)}else{o.notify(response.data,l.success)}},this).onError(function(q){o.notify(q,l.error)},this).call(p);return this}};$.ku4webApp.service=function(o,l){return new k(o,l)};$.ku4webApp.template=function(l,p){function o(q){o.base.call(this,q)}o.prototype=p;$.Class.extend(o,n);$.ku4webApp.templates[l]=function(q){return new o(q)}};$.ku4webApp.view=function(o,p,q){function l(t,r,s){l.base.call(this,t,r,s)}l.prototype=p;$.Class.extend(l,b);$.ku4webApp.views[o]=function(s){var r=s.mediator,t=new l(r,s.responsebox,s.templateFactory);if($.exists(q)){$.hash(q).each(function(u){r.subscribe(u.key,t[u.value],t)})}return t}};function m(l){this._config=l}m.prototype={create:function(l){return $.ku4webApp.form(this._config[l])}};$.ku4webApp.formFactory=function(l){return new m(l)};function j(o,l){this._mediator=o;this._config=l}j.prototype={create:function(l){return $.ku4webApp.service(this._mediator,this._config[l])}};$.ku4webApp.serviceFactory=function(o,l){return new j(o,l)};function c(l){this._config=l}c.prototype={create:function(l){return $.ku4webApp.templates[l](this._config)}};$.ku4webApp.templateFactory=function(l){return new c(l)};function h(l){this._config=l}h.prototype={create:function(l){return $.ku4webApp.validator(this._config[l])}};$.ku4webApp.validatorFactory=function(l){return new h(l)}})(jQuery);