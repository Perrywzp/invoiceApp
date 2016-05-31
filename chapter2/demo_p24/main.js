(function($) {
    
    //when document is ready create the model and show the view.
    $(function() {
        var invoiceItemModel = new InvoiceItemModel();
        console.log(invoiceItemModel.get('quantity')+'\n');
        invoiceItemModel.set('quantity',5);
        invoiceItemModel.set({
            quantity: 5,
            price: 10
        });
        console.log(invoiceItemModel.get('quantity')+'\n');
        invoiceItemModel.unset('quantity');
        invoiceItemModel.clear();
        console.log(invoiceItemModel.get('quantity')+'\n');
        if(!invoiceItemModel.has('quantity')){
            console.log('Quantity attributes does not exists');
        }

        var hacker = new Backbone.Model({
            name: "<script>alert('xss');</script>"
        });
        var escaped_name = hacker.escape('name');
        console.log(escaped_name);

        invoiceItemModel.id = Math.random().toString(36).substr(2);
        var id = invoiceItemModel.id;
        console.log(id);
        console.log(invoiceItemModel.cid);
    });
})(jQuery);

//create new model object.
var InvoiceItemModel = Backbone.Model.extend({
    // set default attributes..
    defaults: {
        description: '',
        price: 0,
        quantity: 1,
        // Use function for multiline expression.
        date: function(){
            var date = new Date();
            // Return attribute value.
            return date.toISOString();
        }
    }
});

//create new model object.
var InvoiceItemModel = Backbone.Model.extend({
    // set default attributes..
    defaults: {
        description: '',
        price: 0,
        quantity: 1,
        // Set default values in initialize method.
        //Following method is run after the object is created.
        initialize:function(){

            // Check that attribute is not initialized yet.
            if(!this.has('date')){
                var date = new Date();

                // Set attribute value.
                this.set('date', date.toISOString());
            }
        }
    }
});





