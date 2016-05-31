(function($) {
    var InvoiceItemModel = Backbone.Model.extend({
        //Set default value
        defaults: {
            price: 0,
            quantity: 0
        },
        //Calculate amount.
        calculateAmont: function() {
            return this.get("price") * this.get("quantity");
        }
    });



    var PreviewInvoiceItemView = Backbone.View.extend({
        //Define template using templating engine from
        //Underscore.js
        template: _.template('Price: <%= price %>.\
						  Quantity: <%= quantity %>.\
						  Amount: <%= amont %>.\
  		'),

        //Render view.
        render: function() {
            // Generate HTML by rendering the template.
            var html = this.template({
                //Pass model properties to the template.
                price: this.model.get('price'),
                quantity: this.model.get('quantity'),

                //Calculate amount and pass it to the template.
                amount: this.model.calculateAmont()
            });

            //Set html for the view element using jQuery.
            $(this.el).html(html);
        }
    });
    //when document is ready create the model and show the view.
    $(function() {
        //Create InvoiceItemModel instance and set model attributes.
        var invoiceItemModel = new InvoiceItemModel({
            price: 2,
            quantity: 3
        });

        //Create PreviewInvoiceItemView instance.
        var previewInvoiceItemView = new PreviewInvoiceItemView({
            // Pass our model.
            model: invoiceItemModel,

            // Set element where to render HTML.
            el: 'body'
        });

        //Render view manually.
        previewInvoiceItemView.render();
    });
})(jQuery);
