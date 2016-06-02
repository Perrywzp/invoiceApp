(function ($) {
    var InvoiceItemModel = Backbone.Model.extend({
        defaults: {
            description: '',
            price: 0,
            quantity: 0
        }
    });

    var InvoiceItemCollection = Backbone.Collection.extend({
        model: InvoiceItemModel
    });

    //when document is ready create the model and show the view.
    $(function () {
        var invoiceItemCollection = new InvoiceItemCollection([
            {description: 'Wooden Toy House', price: 22, quantity: 3},
            {description: 'Farm Animal Set', price: 17, quantity: 3},
            {description: 'Farmer Figure', price: 8, quantity: 3},
            {description: 'Toy Tractor', price: 15, quantity: 3}
        ]);

        var multiple = invoiceItemCollection.every(function(model){
            return model.get('quantity') > 1;
        });

        console.log(multiple);

        multiple = invoiceItemCollection.some(function(model){
            return model.get('quantity') > 1;
        });
        console.log(multiple);

        var descriptions = invoiceItemCollection.pluck("description");
        console.log(descriptions);

        var count = invoiceItemCollection.reduce(function(memo,model){
            return memo + model.get('quantity');
        },0);
        console.log(count);

        var amounts = invoiceItemCollection.map(function(model){
            return model.get('quantity') * model.get('price');
        });
        console.log(amounts);

        var total_amount = _.reduce(amounts, function(memo, val){
            return memo + val;
        }, 0);
        console.log(total_amount);

        amounts = invoiceItemCollection.chain()
            .map(function(model){
                return model.get('quantity') * model.get('price');
            })
            .reduce(function(memo, val){
                return memo + val;
            })
            .value();
        console.log(amounts);
    });
})(jQuery);

