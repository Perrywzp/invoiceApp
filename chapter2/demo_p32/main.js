(function ($) {
    //when document is ready create the model and show the view.
    $(function () {
        var invoiceItemModel = new InvoiceItemModel();
        invoiceItemModel.set('price', 10);

        invoiceItemModel.store();

        invoiceItemModel.set('price', 20);

        invoiceItemModel.restore();

        invoiceItemModel.get('price'); //10

        // States stack demo.
        var invoiceItemModel2 = new InvoiceItemModel();
        invoiceItemModel2.set('price', 10);

        // Save state and update value.
        invoiceItemModel2.store();
        invoiceItemModel2.set('price',20);

        // Save state and update value.
        invoiceItemModel2.store();
        invoiceItemModel2.set('price',30);

        // Restore last state and get value.
        invoiceItemModel2.restore();
        invoiceItemModel2.get('price'); //20

        // Restore last state and get value.
        invoiceItemModel2.restore();
        invoiceItemModel2.get('price'); //10

        invoiceItemModel2.restart();
    });
})(jQuery);

var InvoiceItemModel = Backbone.Model.extend({
    // Extend model instance with memento instance.
    initialize: function () {
        _.extend(this, new Backbone.Memento(this));
    }
});

var AnotherInvoiceItemModel = Backbone.Model.extend({
    // Extend model instance with memento instance.
    // Ignore restoring of description attribute.
    initialize: function(){
        _.extend(this, new Backbone.Memento(
            this, {ignore: ["description"]}
        ));
    }
});
