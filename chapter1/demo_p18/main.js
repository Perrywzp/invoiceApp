(function($) {
    //when document is ready create the model and show the view.
    $(function() {
        new Workspace();
        Backbone.history.start();
    });
})(jQuery);

var InvoicePageView = Backbone.View.extend({
    //Render view.
    render: function() {
        //Set html for the view element using jQuery.
        $(this.el).html('Displaying invoices #' + this.id);
    }
});
var Workspace = Backbone.Router.extend({
	routes:{
        // Usage of fragment parameter.
		'invoice/:id': 'invoicePage',
	},

    // Shows invoice page.
    invoicePage:function(id){
        var invoicePageView = new InvoicePageView({
            el: 'body',
            id: id
        });
        invoicePageView.render();
    },
});
