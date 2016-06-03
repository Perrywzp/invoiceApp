var InvoiceItemModel = Backbone.Model.extend({});

var InvoiceItemView = Backbone.View.extend({
    // HTML element name, where to render a view.
    el: 'body',

    // Render view.
    render: function () {
        var html = 'Description: ' +
            this.model.get('description') + '. ' +
            'Price: ' + this.model.get('price') + '. ' +
            'Quantity: ' + this.model.get('quantity') + '.';

        // Set html for the view element using jQuery.
        $(this.el).html(html);
    }
});

//when document is ready create the model and show the view.
$(function () {

    var invoiceItemModel = new InvoiceItemModel({
        description: 'Farmer Figure',
        price: 8,
        quantity: 1
    });

    var invoiceItemView = new InvoiceItemView({
        // Pass model as a parameter to a view.
        model: invoiceItemModel
    });

    invoiceItemView.render();

});


