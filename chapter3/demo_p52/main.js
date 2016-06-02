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

        var invoiceItemModel1 = new InvoiceItemModel({
            description: 'Wooden Toy House',
            price: 22,
            quantity: 3
        });

        // invoiceItemModel1.id = Math.random().toString(36).substr(2);

        var invoiceItemModel2 = new InvoiceItemModel({
            description: 'Farm Animal Set',
            price: 17,
            quantity:1
        });

        var invoiceItemCollection2 = new InvoiceItemCollection([
            invoiceItemModel1,
            invoiceItemModel2
        ]);

        var model = invoiceItemCollection.at(2);
        model.get('description');

        invoiceItemCollection.indexOf(model);

        model.set('description', 'Superman Figure');

        invoiceItemCollection.at(2).get('description'); //Superman Figure

        var anotherModel = invoiceItemCollection.at(2).clone();
        anotherModel.set('description', 'Another Figure');
        invoiceItemCollection.at(2).get('description');

        var length = invoiceItemCollection.length; //4
        model = invoiceItemCollection.at(length -1 );
        model.get('description'); //Toy Tractor

        model = invoiceItemCollection2.get('‌‌72504sjbe00db1qzvt4o9od2t9');

        model = invoiceItemCollection.get('c4');

        model.get('description'); //Toy Tractor


        invoiceItemCollection.add({
            description: 'Toy Track',
            price: 10,
            quantity: 1
        });

        invoiceItemCollection.add(
            {description: 'Fisherman Hut', price: 5, quantity: 1},

            {at: 0}
        );

        invoiceItemCollection.add([
            {description: 'Powerboat', price: 12, quantity: 1},
            {description: 'Jet Ski', price: 5, quantity: 1}
        ]);

        invoiceItemCollection.remove(['c0','c1','c2','c3']);

        invoiceItemCollection.reset([
            {description: 'Wooden Toy House', price: 22, quantity: 3},
            {description: 'Farm Animal Set', price: 17, quantity: 1}
        ]);

        invoiceItemCollection.push(model);

        model = invoiceItemCollection.pop();

        invoiceItemCollection.unshift(model);

        model = invoiceItemCollection.shift();


        invoiceItemCollection.comparator = function(model){
            return model.get('price');
        };

        invoiceItemCollection.sort();

        invoiceItemCollection.pluck("price");

        invoiceItemCollection.comparator = function(m1,m2){
            return m1.get("description").length - m2.get("description").length;
        };

        invoiceItemCollection.sort();
        invoiceItemCollection.pluck("description");

        var result = invoiceItemCollection.where({quantity: 1});
        // Result is just an array of models, so let`s create new collection.
        var resultCollection = new InvoiceItemCollection(result);
        resultCollection.pluck('quantity');

        invoiceItemCollection.where({quantity: 1, price: 10});


        var description_txt = '';
        invoiceItemCollection.each(function(model, index, list){
            description_txt += description_txt ? ', ' : '';
            description_txt += model.get('description');
        });
        console.log(description_txt);


    });
})(jQuery);

