(function(a){$.exampleErrorMessage=function(b){var c="";$.hash(b).each(function(d){c+=$.str.format("* Field: {0} -- {1}\n",d.key,d.value)});return c};$.ku4webApp.config.collections={ku4StoreType:"localStorage",card:{name:"card"}};$.ku4webApp.config.forms={card:[{selector:"#cardId",type:"field",required:true},{selector:"#cardNameField",type:"field",required:true},{selector:"#cardPhotoField",type:"imageFileField",maxDims:[100,100]},{selector:"#cardValueField",type:"field",required:true,format:function(b){var b=$.money.tryParse(b);return $.money.isMoney(b)?b.value():""}},{selector:"#cardDescriptionField",type:"field",required:true}]};$.ku4webApp.config.navigator={ku4OnAppLoad:function(b){if(b.hashContainsArguments()&&b.hashEquals("card.edit")){b.execute(b.read())}else{b.execute("card.list")}},"card.list":{model:"card",method:"listCards"},"card.add":{model:"card",method:"createCard"},"card.edit":{model:"card",method:"editCard"}};$.ku4webApp.config.services={"card.list":{verb:"GET",uri:"./_serverStub/cardList.json",contentType:"text/json",success:"svc+cardsListed",error:"svc-cardsListed"},"card.add":{verb:"POST",uri:"./_serverStub/cardAdd.json",contentType:"text/json",success:"svc+cardAdded",error:"svc-cardAdded"}};$.ku4webApp.config.sockets={};$.ku4webApp.config.templates.forms={card:'<form id="cardForm" class="card-form" action=""><fieldset><legend>Card Info</legend><input id="cardId" name="id" type="hidden" /><div class="card-photo-container"><img src="{{photo}}" class="card-photo js-card-photo"/></div><input id="cardPhotoField" name="photo" class="card-photo-field" type="file" accept="image/*" capture="camera" /><input id="cardNameField" name="name" class="card-name-field" type="text" placeholder="Card Name"/><input id="cardValueField" name="value" class="card-value-field" type="number" placeholder="999.99"/><textarea id="cardDescriptionField" name="description" class="card-description-field" placeholder="Description"></textarea></fieldset><div class="card-form-controls">{{controls}}</div></form>',cardAddControl:'<button class="card-add-control" onclick="cardController.add(); return false;">Add</button>',cardEditControl:'<button class="card-update-control" onclick="cardController.update(); return false;">Update</button>'};$.ku4webApp.config.templates.views={cardList:'<div class="card-list js-card-list">{{cardList}}<button class="card-add-control js-card-add-control" onclick="cardController.create();">Add Card</button></div>',card:'<div class="card js-card js-{{id}}"><div class="card-photo-container"><img src="{{photo}}" class="card-photo js-card-photo"/></div><span class="card-name js-card-name">{{name}}</span><span class="card-value js-card-value">{{value}}</span><span class="card-description js-card-description">{{description}}</span><button class="card-edit-control" onclick="cardController.edit(\'{{id}}\');">Edit</button></div>'};$.ku4webApp.config.validators={card:[{name:"name",spec:$.spec(function(b){return/^.{1,140}$/.test(b)}),message:"Name is invalid."},{name:"description",spec:$.spec(function(b){return/^.{1,140}$/.test(b)}),message:"Invalid description."},{name:"value",spec:$.spec(function(b){return $.money.canParse(b)}),message:"Invalid value."}]};$.ku4webApp.controller("card",{list:function(){this.$model("card").listCards();return this},create:function(){this.$model("card").createCard();return this},add:function(){this.$model("card").addCard(this.$form("card").read());return this},edit:function(b){this.$model("card").editCard(b);return this},update:function(){this.$model("card").updateCard(this.$form("card").read());return this}});$.ku4webApp.model("card",{listCards:function(){if(this.$state().is("cardsListed")){this.$collection("card").find({},function(c,b){if($.exists(c)){this.$notify("onCardsListedError",c)}else{this.$notify("onCardsListed",b)}},this)}else{this.$service("card.list").call()}return this},createCard:function(){this.$notify("onCreateCard");return this},addCard:function(e){var b=this.$validator("card").validate(e);if(b.isValid()){var d=this;function c(g){var f=g.update("id",$.uid()).toObject();d.$collection("card").insert(f,function(h){if($.exists(h)){this.$notify("addCardError",h)}else{this.$collection("card").find({},function(j,i){if($.exists(j)||!($.isArray(i)&&i.length>0)){this.$notify("onCardAddedError",new Error("Card collection add failed."))}else{this.$notify("onCardAdded",i)}},this)}},d)}if(e.containsKey("photo")){$.image.dataUrlFromFile(e.find("photo"),function(f){e.update("photo",f);c(e)},this,{maxDims:[200,200]})}else{c(e)}}else{this.$notify("onCardInvalid",b.messages())}return this},editCard:function(b){this.$collection("card").find({id:b},function(d,c){if($.exists(d)){this.$notify("editCardError",d)}else{if(!($.isArray(c)&&c.length==1)){this.$notify("onError",new Error("Card collection corrupted."))}else{this.$notify("onEditCard",c[0])}}},this);return this},updateCard:function(e){var b=this.$validator("card").validate(e);if(b.isValid()){var d=e.toObject(),c=e.find("photo");function f(){this.$collection("card").update({id:d.id},d,function(g){if($.exists(g)){this.$notify("onCardUpdatedError",g)}else{this.$collection("card").find({},function(i,h){if($.exists(i)||!($.isArray(h)&&h.length>0)){this.$notify("onCardUpdatedError",new Error("Card collection update failed."))}else{this.$notify("onCardUpdated",h)}},this)}},this)}if($.exists(c)){$.image.dataUrlFromFile(c,function(g){e.update("photo",g);f.call(this)},this,{maxDims:[200,200]})}else{f.call(this)}}else{this.$notify("onCardInvalid",b.messages())}return this},onCardsListed:function(c){var b=$.dto.parseJson(c).toObject();this.$collection("card").find({},function(e,d){if(d.length>0){this.$state().set("cardsListed");this.$notify("onCardsListed",d)}else{this.$collection("card").init(b,function(f){if($.exists(f)){this.$notify("onCardsListedError",f)}else{this.$state().set("cardsListed");this.$notify("onCardsListed",b)}},this)}},this)},onCardAdded:function(c){var b=$.dto.parseJson(c).toObject();this.$collection("card").insert(b,function(d){if($.exists(d)){this.$notify("onCardAddedError",d)}else{this.$notify("onCardAdded",b)}})},onCardsListedError:function(b){this.$notify("onCardListedError, onError",new Error("Card listing exception."))}},{"svc+cardsListed":"onCardsListed","svc-cardsListed":"onCardsListedError"});$.ku4webApp.template("card",{renderAddCardForm:function(){var b=this.$forms("cardAddControl");return this.$render(this.$forms("card"),{controls:b},"")},renderEditCardForm:function(c){var b=this.$forms("cardEditControl");return this.$render(this.$forms("card"),{photo:c.photo,controls:b},"")},renderCard:function(b){return this.$render(this.$views("card"),b,"",function(c){c.value=$.money.parse(c.value).toString();return c})},renderCardList:function(c){var b=this.$renderList(this.$views("card"),c,"",function(d){d.value=$.money.parse(d.value).toString();return d});return this.$render(this.$views("cardList"),{cardList:b})}});$.ku4webApp.view("card",{displayCardList:function(c){this._clearSite();var b=this.$template("card").renderCardList(c);$("#site").append(b);this.$navigator().write("card.list")},displayCreateCard:function(c){this._clearSite();var b=this.$template("card").renderAddCardForm();$("#site").append(b);this.$navigator().write("card.add");$("#cardPhotoField").on("change",function(){$.image.dataUrlFromFile(this.files[0],function(d){$(".js-card-photo").attr("src",d)},this,{maxDims:[200,200]})})},displayAddCard:function(c){this._clearSite();var b=this.$template("card").renderAddCardForm();$("#site").append(b);this.$navigator().write("card.list")},displayEditCard:function(c){this._clearSite();var b=this.$template("card").renderEditCardForm(c);$("#site").append(b);this.$form("card").write(c);this.$navigator().write("card.edit",c.id);$("#cardPhotoField").on("change",function(){$.image.dataUrlFromFile(this.files[0],function(d){$(".js-card-photo").attr("src",d)},this,{maxDims:[200,200]})})},displayCardInvalid:function(b){alert($.exampleErrorMessage(b))},displayCardListError:function(b){console.log("ERROR",b)},displayCardUpdatedError:function(b){console.log("ERROR",b)},displayError:function(b){console.log("ERROR",b)},_clearSite:function(){$("#site").html("")}},{onCardsListed:"displayCardList",onCardAdded:"displayCardList",onCreateCard:"displayCreateCard",onAddCard:"displayAddCard",onEditCard:"displayEditCard",onCardInvalid:"displayCardInvalid",onCardUpdated:"displayCardList",onCardsListedError:"displayCardListError",onCardUpdatedError:"displayCardUpdatedError",onError:"displayError"})})();