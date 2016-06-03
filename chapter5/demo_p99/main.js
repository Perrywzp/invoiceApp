var InvoiceItemModel = Backbone.Model.extend({});

var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
});

var InvoiceItemView = Backbone.View.extend({
    // HTML element name, where to render a view.
    el: 'body',

    // Render view.
    render: function () {
        var html = '';

        _.each(this.collection.models, function(model, index, list) {
            var item_html = 'Description: ' +
                model.get('description') + '. ' +
                'Price: ' + model.get('price') + '. ' +
                'Quantity: ' + model.get('quantity') + '.';
                html = html + '<li>' + item_html + '</li>';
        });

        html = '<ul>' + html + '</ul>';
        // Set html for the view element using jQuery.
        $(this.el).html(html);
    }
});

//when document is ready create the model and show the view.
$(function () {

    var invoiceItemCollection = new InvoiceItemCollection([
        { description: 'Wooden Toy House', price: 22, quantity: 3},
        { description: 'Farm Animal Set', price: 17, quantity: 1},
        { description: 'Farmer Figure', price: 8, quantity: 1},
        { description: 'Toy Tractor', price: 15, quantity: 1}
    ]);

    var invoiceItemListView = new InvoiceItemView({
        // Pass model as a parameter to a view.
        collection: invoiceItemCollection
    });

    invoiceItemListView.render();

});


