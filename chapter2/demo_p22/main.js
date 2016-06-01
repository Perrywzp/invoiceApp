(function($) {
    //when document is ready create the model and show the view.
    
})(jQuery);

var InvoiceItemModel = Backbone.Model.extend({
    // Define default attributes.
    defaults: {
        date: '',
        description: '',
        price: 0,
        quantity: 1
    },
});

var invoiceItemModel = new InvoiceItemModel({
    date: '2013-04-24',
    description: 'Wooden Toy House',
    price: 22,
    quantity: 3
});

var invoiceItemModel2 = new InvoiceItemModel({
    description: 'Farm Animal Set',
    price: 17
});

console.log(invoiceItemModel2.get('date') != undefined +'\n'); //true
console.log(invoiceItemModel2.get('quantity') ); //1