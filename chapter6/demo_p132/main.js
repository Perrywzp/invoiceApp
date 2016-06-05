var InvoiceModel = Backbone.Model.extend({});

var InvoiceCollection = Backbone.Collection.extend({
    model: InvoiceModel
});

var InvoiceListPane = Backbone.Layout.extend({

    // Return selector for template.
    template: "#invoice-list-pane",

    // Set selector for template.
    serialize: function () {
        return {
            // Wrap the collection.
            invoices: _.chain(this.collection.models)
        };
    }
});

var InvoicePane = Backbone.Layout.extend({

    // Set selector for template.
    template: "#invoice-pane",

    // Returns data for template.
    serialize: function () {
        return {
            invoice: this.model
        };
    }
});

var Workspace = Backbone.Router.extend({
    routes: {
        '': 'page',
        'invoice/:id': 'page'
    },

    // Initialize function run when Router object instance is created.
    initialize: function () {
        // Create collection
        this.collection = new InvoiceCollection([
            {
                referenceNumber: 'AB 12345',
                date: new Date().toISOString(),
                status: 'draft'
            }, {
                referenceNumber: 'ZX 98765',
                date: new Date().toISOString(),
                status: 'issued'
            }
        ]);
    },

    page: function (id) {
        if (!id) {
            // Set default id.
            id = this.collection.at(0).cid;
        }

        var layout = new Backbone.Layout({
            // Attach the layout to the main container.
            el: "body",

            // Set template selector.
            template: "#layout",

            // Declaratively bind a nested View to the layout.
            views: {
                "#invoice-list-pane": new InvoiceListPane({
                    collection: this.collection
                }),

                "#invoice-pane": new InvoicePane({
                    model: this.collection.get(id)
                })
            }
        });

        // Render the layout.
        layout.render();
    }
});

//when document is ready create the model and show the view.
$(function () {

    new Workspace();

    Backbone.history.start();

});


