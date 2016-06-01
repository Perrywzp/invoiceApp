(function($) {
    //when document is ready create the model and show the view.
    $(function() {
        new Workspace();
        Backbone.history.start();
    });
})(jQuery);


var Workspace = Backbone.Router.extend({
	routes:{
		//Default path.
		'': 'invoiceList',

		//Usage of static path.
		'invoice': 'invoiceList',
	},
    invoiceList:function(){
        var invoiceListView = new InvoiceListView({
            el: 'body'
        });
        invoiceListView.render();
    }
});
var InvoiceListView = Backbone.View.extend({
    //Render view.
    render: function() {
        //Set html for the view element using jQuery.
        $(this.el).html('Displaying list of invoices');
    }
});