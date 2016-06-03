/*给view视图绑定事件*/

var InvoiceItemModel = Backbone.Model.extend({
    //Calculate amount.
    calculateAmount: function() {
        return this.get("price") * this.get("quantity");
    }
});

var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
});


// Define new view to render a model.
var InvoiceItemView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'tr',

    renderViewMode: function() {
        // Add cells to the table row.
        $(this.el).html(_.map([
            this.model.get('quantity'),
            this.model.get('description'),
            this.model.get('price'),
            this.model.calculateAmount(),
            '<button class="edit">Edit</button>'
        ], function(val,key) {
            return '<td>' + val + '</td>';
        }));
    },

    renderEditMode: function() {
        $(this.el).html(_.map([
            '<input class="quantity" value="' + this.model.get('quantity') + '">',
            '<input class="description" value="' + this.model.get('description') + '">',
            '<input class="price" value="' + this.model.get('price') + '">',
            this.model.calculateAmount(),
            '<button class="save">Save</button>' +
            '<button class="cancel">Cancel</button>'
        ], function(val, key){
            return '<td>' + val + '</td>';
        }));
    },

    renderCallback: 'renderViewMode',

    // Render view.
    render: function () {
        this[this.renderCallback](); // this.renderCallback = 'renderViewMode'
        return this;
    },

    events: {
        'click button.edit': 'edit',
        'click button.save': 'save',
        'click button.cancel': 'cancel',
    },

    // Edit button click handler.
    edit: function() {
        this.renderCallback = 'renderEditMode';

        this.render();
    },

    // Save button click handler.
    save: function() {
        this.model.set({
            quantity: $(this.el).find('input.quantity').val(),
            description: this.$('input.description').val(),
            price: this.$('input.price').val()
        });

        this.renderCallback = 'renderViewMode';

        this.render();
    },

    // cancel button click handler.
    cancel: function() {
        this.renderCallback = 'renderViewMode';

        this.render();
    }
});


// Define new view to render a collection.
var InvoiceItemListView = Backbone.View.extend({

    // Define element tag name.
    tagName: 'table',

    // Define element class name.
    className: 'invoice-item-view',

    // Render view.
    render: function() {

        $(this.el).empty();

        // Append table with a table header.
        $(this.el).append($('<tr></tr>')).html(
            _.map(['Quantity', 'Description', 'Price', 'Total','Handle'],
                function(val, key){
                    return '<th>' + val + '</th>';
                }
            )
        );

        // Append table with a row.
        $(this.el).append(
            _.map(this.collection.models, function(model, key) {
                return new InvoiceItemView({
                    model: model
                }).render().el;
            })
        );

        return this;
    }
});

var InvoiceItemListPageView = Backbone.View.extend({

    // Render whole page view.
    render: function() {
        $(this.el).html(new InvoiceItemListView({
            collection: this.collection
        }).render().el);
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

    var invoiceItemListPageView = new InvoiceItemListPageView({
        // Pass model as a parameter to a view.
        collection: invoiceItemCollection,
        el: 'body'
    });

    invoiceItemListPageView.render();
});


