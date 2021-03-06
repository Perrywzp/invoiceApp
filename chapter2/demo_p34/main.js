(function($) {

    //when document is ready create the model and show the view.
    $(function() {
        var invoiceItemModel = new InvoiceItemModel({
            description: 'Wooden Toy House',
            price: 0
        });

        // Set value that is not valid.
        invoiceItemModel.set('quantity', -1 , {valiate:true});
        
        invoiceItemModel.on('invalid',function(model,error){
            console.log(error);
        });

        var invoiceItemModel2 = new InvoiceItemModel({
            description: 'Animal Farm',
            price: 17
        });
        invoiceItemModel2.set({
            quantity: 0
        },{
            invalid:function(model,error){
                console.log(error);
            },
            validate:true
        });

        var invoiceItemModel3 = new InvoiceItemModel({
            description: 'Wooden Toy House',
            price: 10,
            quantity: -5
        });
        console.log(invoiceItemModel3.isValid());
    });
})(jQuery);

var InvoiceItemModel = Backbone.Model.extend({
    // Define validation criteria.
    validate: function(attrs) {
        if (attrs.quantity <= 0) {
            return 'quantity can`t be negative or equal to zero';
        }
    }
});
