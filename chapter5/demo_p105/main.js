var InvoiceItemModel = Backbone.Model.extend({});

var InvoiceItemFormView = Backbone.View.extend({
    // Define class name of view element.
    className: 'invoice-item-form-view',

    bindings: {
        '#description': 'description',
        '#price': {
            observe: 'price'
        },
        '#quantity': 'quantity'
    },

    render: function () {
        var html = '<label>Description: </label>' +
            '<input type="text" id="description"> <br>' +
            '<label>Price: </label>' +
            '<input type="text" id="price"><br>' +
            '<label>Quantity: </label>' +
            '<input type="text" id="quantity"><br>';

        // Set html for the view element using jQuery.
        $(this.el).html(html);

        // Here binding occurs.
        this.stickit();

        return this;
    }
});

var InvoiceItemView = Backbone.View.extend({
    // Define class name of view element.
    className: 'invoice-item-view',

    // Bind HTML elements to the view model.
    bindings: {
        '#description': 'description',
        '#price': {
            observe: 'price'
        },
        '#quantity': 'quantity'
    },

    highlight: function ($el, val, options) {
        $el.animate({backgroundColor: "#ff9999"}, "fast")
            .animate({backgroundColor: "#ffffff"}, "fast");
    },

    // Render view.
    render: function () {
        var html = 'Description: ' +
            '<span id="description"></span>, ' +
            'Price: <span id="price"></span>, ' +
            'Quantity: <span id="quantity"></span>.';
        // Set html for the view element using jQuery.
        $(this.el).html(html);

        // Here binding occurs.
        this.stickit();

        return this;
    }


});

//when document is ready create the model and show the view.
$(function () {

    var invoiceItemModel = new InvoiceItemModel({
        description: 'Farmer Figure',
        price: 8,
        quantity: 1
    });

    $('body')
        .append(new InvoiceItemView({
            model: invoiceItemModel
        }).render().el)
        .append(new InvoiceItemFormView({
            model: invoiceItemModel
        }).render().el);

});


