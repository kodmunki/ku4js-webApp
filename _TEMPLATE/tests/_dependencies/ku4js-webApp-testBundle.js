(function(c){$.ku4webApp_testBundle={};$.ku4webAppUT={};function i(){var j=$.ku4webApp_testBundle.app();this._mediator=j.mediator;this._navigator=j.navigator;this._app=j;this._onModelCall=$.mediator();this._onServiceCall=$.hash();j.onModelCall(this._onModelCall).onServiceCall(this._onServiceCall)}i.prototype={mediator:function(){return this._mediator},navigator:function(){return this._navigator},logErrors:function(){this._mediator.logErrors();this._navigator.logErrors();return this},throwErrors:function(){this._mediator.throwErrors();this._navigator.throwErrors();return this},catchErrors:function(){this._mediator.catchErrors();this._navigator.catchErrors();return this},onModelCall:function(j,l,k){this._onModelCall.subscribe(j,function(){l.apply(k,arguments)});return this},onServiceCall:function(j,k){this._onServiceCall.add(j,function(){return k.apply(k,arguments)});return this},subscribe:function(j,l,k,m){this._mediator.subscribe(j,l,k,m);return this},unsubscribe:function(j,k){this._mediator.subscribe(j,k);return this},initCollection:function(j,k){this.collection(j).init(k);return this},clear:function(){this._onModelCall.clear();this._onServiceCall.clear()},form:function(j){return this._app.formFactory.create(j)},model:function(j){var k=this._app.prodModel();return $.ku4webApp.models[j](this._mediator,k.serviceFactory.onServiceCall(this._onServiceCall),k.socketFactory,k.storeFactory,k.validatorFactory,this._app.state)},stateMachine:function(){return $.ku4webApp.$stateMachine(this._app.prodModel().modelFactory)},view:function(j){return $.ku4webApp.views[j](this._app.prodModel())},controller:function(j){return $.ku4webApp.controllers[j](this._app.stubModel())},template:function(j){return this._app.prodModel().templateFactory.create(j)},collection:function(j){var k=this._app.prodModel();return k.storeFactory.create(j)}};$.ku4webAppUT.bundle=function(){return new i()};function b(){var j=$.ku4webApp;this.state=$.ku4webApp.state("__ku4appTestStarted__");this.mediator=$.mediator("ku4webApp_testBundle");this.serviceFactory=$.ku4webApp_testBundle.serviceFactory(this.mediator,j.config.services);this.socketFactory=$.ku4webApp_testBundle.socketFactory(this.mediator,j.config.sockets);this.storeFactory=j.storeFactory(this.mediator,j.config.collections);this.validatorFactory=j.validatorFactory(j.config.validators);this.templateFactory=j.templateFactory(j.config.templates);this.formFactory=j.formFactory(j.config.forms)}b.prototype={logErrors:function(){this._mediator.logErrors();this._navigator.logErrors();return this},throwErrors:function(){this._mediator.throwErrors();this._navigator.throwErrors();return this},catchErrors:function(){this._mediator.catchErrors();this._navigator.catchErrors();return this},stubModel:function(){this.modelFactory=$.ku4webApp_testBundle.stubModelFactory(this.mediator,this.serviceFactory.onServiceCall(this._onServiceCall),this.socketFactory,this.storeFactory,this.validatorFactory,this._onModelCall);var k=$.ku4webApp,j=$.ku4webApp.$stateMachine;this.stateMachine=($.isFunction(j))?j(this.modelFactory):null;this.navigator=k.navigator(this.modelFactory,k.config.navigator,this.stateMachine);return this},prodModel:function(){this.modelFactory=$.ku4webApp_testBundle.testModelFactory(this.mediator,this.serviceFactory.onServiceCall(this._onServiceCall),this.socketFactory,this.storeFactory,this.validatorFactory,this.state);var k=$.ku4webApp,j=$.ku4webApp.$stateMachine;this.stateMachine=($.isFunction(j))?j(this.modelFactory):null;this.navigator=k.navigator(this.modelFactory,k.config.navigator,this.stateMachine);return this},onModelCall:function(j){this._onModelCall=j;return this},onServiceCall:function(j){this._onServiceCall=j;return this}};$.ku4webApp_testBundle.app=function(){return new b()};function g(l,j,n){var m=$.str.format("$.ku4webApp.{0}",l),k=$.str.format("Requires a valid {0}. {0}= {1}",j,n);if(!$.exists(n)){throw $.ku4exception(m,k)}else{return n}}$.ku4webApp_testBundle.model=function(l,j,s,k,m,q,u){var r=$.ku4webApp.models[l](j,s,k,m,q),p={};for(var o in r){function t(n){return function(){var v=[n].concat($.arr.parseArguments(arguments));u.notify.apply(u,v)}}p[o]=t(o)}return p};function f(m,l,k,j){this._mediator=m;this._name=l;this._config=k;this._onServiceCall=j}f.prototype={cache:function(){return this},noCache:function(){return this},lock:function(){return this},unlock:function(){return this},abort:function(){return this},call:function(m){var k=this._config,n=this._onServiceCall.find(this._name),j=($.isFunction(n))?n(m):{},l=j instanceof Error;if(!$.exists(k)){throw $.ku4exception("$.service","Test Bundle services require a valid config containing a 'success':[data] and an 'error':[data] configuration.")}if($.exists(k.error)&&l){this._mediator.notify(k.error,j)}else{if($.exists(k.success)){this._mediator.notify(k.success,j)}}return this}};$.ku4webApp_testBundle.service=function(m,l,k,j){return new f(m,l,k,j)};function h(n,j,k,o,l,m){this._mediator=n;this._serviceFactory=j;this._socketFactory=k;this._storeFactory=o;this._validatorFactory=l;this._appState=m}h.prototype={create:function(j){return $.ku4webApp.models[j](this._mediator,this._serviceFactory,this._socketFactory,this._storeFactory,this._validatorFactory,this._appState)}};$.ku4webApp_testBundle.testModelFactory=function(n,j,k,o,l,m){return new h(n,j,k,o,l,m)};function e(k,j){this._mediator=k;this._config=j}e.prototype={create:function(j){return $.ku4webApp_testBundle.service(this._mediator,j,this._config[j],this._onServiceCall)},onServiceCall:function(j){this._onServiceCall=j;return this}};$.ku4webApp_testBundle.serviceFactory=function(k,j){return new e(k,j)};function a(k,j){this._mediator=k;this._config=j}a.prototype={create:function(j){return $.ku4webApp_testBundle.service(this._mediator,this._config[j])}};$.ku4webApp_testBundle.socketFactory=function(k,j){return new a(k,j)};function d(n,k,l,o,m,j){this._mediator=n;this._serviceFactory=k;this._socketFactory=l;this._storeFactory=o;this._validatorFactory=m;this._onModelCall=j}d.prototype={create:function(j){return $.ku4webApp_testBundle.model(j,this._mediator,this._serviceFactory,this._socketFactory,this._storeFactory,this._validatorFactory,this._onModelCall)}};$.ku4webApp_testBundle.stubModelFactory=function(n,k,l,o,m,j){return new d(n,k,l,o,m,j)}})();