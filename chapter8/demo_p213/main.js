var InvoiceItemModel = Backbone.Model.extend({
    //Calculate amount.
    calculateAmount: function () {
        return this.get("price") * this.get("quantity");
    },

    constructor: function InvoiceItemModel() {
        InvoiceItemModel.__super__.constructor.apply(this, arguments);
    }
});

var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
});


// Define new view to render a model.
var InvoiceItemView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'tr',

    // Render view.
    render: function () {

        // Add cells to the table row.
        $(this.el).html(_.map([
            this.model.get('quantity'),
            this.model.get('description'),
            this.model.get('price'),
            this.model.calculateAmount()
        ], function (val, key) {
            return '<td>' + val + '</td>';
        }));

        return this;
    },

    initialize: function () {
        this.listenTo(this.model, 'destroy', this.destroy, this);
    },

    destroy: function () {
        this.remove();
    },

    constructor: function InvoiceItemView() {
        InvoiceItemView.__super__.constructor.apply(this, arguments);
    }
});


// Define new view to render a collection.
var InvoiceItemListView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'table',

    // Define element class name.
    className: 'invoice-item-view',

    // Render view.
    render: function () {

        $(this.el).empty();

        // Append table with a table header.
        $(this.el).append($('<tr></tr>')).html(
            _.map(['Quantity', 'Description', 'Price', 'Total'],
                function (val, key) {
                    return '<th>' + val + '</th>';
                }
            )
        );

        // Append table with a row.
        $(this.el).append(
            _.map(this.collection.models, function (model, key) {
                this.append(model);
            }, this)
        );

        return this;
    },

    // Add invoice item row to the table.
    append: function (model) {

        var view = new InvoiceItemView({model: model});

        $(this.el).append(
            view.render().el
        );

        view.listenTo(this, 'clear', this.remove);
    },

    remove: function(){
        this.trigger('clear');

        return InvoiceItemListView.__super__.remove.apply(this, arguments);
    },

    initialize: function () {
        this.listenTo(
            this.collection, 'add', this.append, this
        );
    },

    constructor: function InvoiceItemListView() {
        InvoiceItemListView.__super__.constructor.apply(this, arguments);
    }
});

var InvoiceItemListControlsView = Backbone.View.extend({

    initialize: function(options){
        this.options = options;
    },

    render: function () {
        var html = '<br><input id="add" type="button" value="Add"  >' +
            '<input id="remove" type="button" value="Remove">' +
            '<input id="removeListView" type="button" value="Remove list view">';
        $(this.el).html(html);

        return this;
    },

    // Handle HTML events.
    events: {
        'click #add': 'addNewInvoiceItem',
        'click #remove': 'removeInvoiceItem',
        'click #removeListView': 'removeInvoiceItemListView'
    },

    // Add button handler.
    addNewInvoiceItem: function () {
        var description = prompt('Enter item description', '');
        var price = prompt('Enter item price', '0');
        var quantity = prompt('Enter item quantity', '1');

        this.collection.add({
            description: description,
            price: price,
            quantity: quantity
        });
    },

    // Remove button handler.
    removeInvoiceItem: function () {
        var position = prompt('Enter position of item to remove', '');
        model = this.collection.at(position);
        model.destroy();
    },

    removeInvoiceItemListView: function() {
        this.options.invoiceItemListView.remove();
    },

    constructor: function InvoiceItemListControlsView() {
        InvoiceItemListControlsView.__super__.constructor.apply(this, arguments);
    }
});

var InvoiceItemListPageView = Backbone.View.extend({

    // Render whole page view.
    render: function () {

        var invoiceItemListView = new InvoiceItemListView({
            collection: this.collection
        });

        $(this.el).html(invoiceItemListView.render().el);

        $(this.el).append(new InvoiceItemListControlsView({
            collection: this.collection,
            invoiceItemListView: invoiceItemListView
        }).render().el);
    },

    constructor: function InvoiceItemListPageView() {
        InvoiceItemListPageView.__super__.constructor.apply(this, arguments);
    }
});


var invoiceItemCollection = new InvoiceItemCollection([
    {description: 'Wooden Toy House', price: 22, quantity: 3},
    {description: 'Farm Animal Set', price: 17, quantity: 1}
    //{description: 'Farmer Figure', price: 8, quantity: 1},
    //{description: 'Toy Tractor', price: 15, quantity: 1}
]);

var invoiceItemListPageView = new InvoiceItemListPageView({
    // Pass model as a parameter to a view.
    collection: invoiceItemCollection,
    el: 'body'
});

invoiceItemListPageView.render();



