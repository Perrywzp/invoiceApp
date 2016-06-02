(function ($) {

    var InvoiceItemModel = Backbone.RelationalModel.extend({});

    var InvoiceItemCollection = Backbone.Collection.extend({
        model: InvoiceItemModel
    });

    var InvoiceModel = Backbone.RelationalModel.extend({
        // Define one-to-many relationship.
        relations: [{
            //  Relationship type
            type: Backbone.HasMany,

            //  Relationship key in BuyerModel.
            key: 'items',

            // Related model.
            relatedModel: InvoiceItemModel,

            // Collection to store related models.
            collectionType: InvoiceItemCollection,

            // Define reverse relationship.
            reverseRelation: {
                key: 'invoice'
            }
        }]
    });

    //when document is ready create the model and show the view.
    $(function () {
        var invoiceModel = new InvoiceModel({
            referenceNumber: '12345',
            date: '2012-09-01',
            items: [
                {description: 'Wooden Toy House', price:22, quantity: 3},
                {description: 'Farm Animal Set', price:17, quantity:1}
            ]
        });

        invoiceModel.get('items').at(0).get('description');

        invoiceModel.get('items').at(0).get('invoice');

        // Add new model to a collection
        invoiceModel.get('items').add({
            description: 'Powerboat',
            price: 12,
            quantity: 1
        });

        console.log(invoiceModel.get('items').at(2).get('invoice') == invoiceModel);

        // Add new model
        invoiceItemModel = new InvoiceItemModel({
            description: 'Jet Ski',
            price: 12,
            quantity: 1,
            invoice: invoiceModel
        });

        invoiceModel.get('items').at(3).get('description');
    });
})(jQuery);

