(function($) {
    //when document is ready create the model and show the view.
    $(function() {
       var buyerModel3 = new BuyerModel();
       buyerModel3.set({
       		fullName: 'Mister X',
       		vip: 'VIP'
       });
       console.log(buyerModel3.get('vip'));	// VIP
       console.log(buyerModel3.attributes.vip); // true


       buyerModel3.on('mutators:set:fullName',function(a,b,c,d){
       		console.log('mutators:set:fullName is triggered');
       		console.log(a);
       		console.log(b);
       		console.log(c);
       		console.log(d);
       });
       buyerModel3.set({
       		fullName: 'Mister Y'
       });
    });
})(jQuery);

var BuyerModel = Backbone.Model.extend({
	// Use mutartos.//增变基因
	mutators:{
		//Override existing attribute.
		vip: {
			get: function(){
				return this.vip === true ? 'VIP' : 'Regular';
			},
			set: function(key,value,options,set){
				set(key, value === 'VIP', options);
			}
		}
	}
});
