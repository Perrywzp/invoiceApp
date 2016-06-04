var InvoiceModel = Backbone.Model.extend({
    defaults: {
        referenceNumber: 0
    }
});

var InvoiceCollection = Backbone.Collection.extend({
    model: InvoiceModel
});

var InvoiceListView = Backbone.View.extend({

    tagName: 'div',

    render: function () {
        var html = '';
        _.each(this.collection.models, function (model, index, list) {
            html += '<li>Invoice #' + model.get('referenceNumber') + ' - <a href="#invoice/c' + (index+1) + '" >view details</a></li>';
        });

        html = '<h1>Displaying all invoices</h1><ul>'+html+'</ul>';
        // Set html for the view element using jQuery.
        $(this.el).html(html);

        return this;
    },
    events: {
        'click a.view': 'showPage'
    }
});


var InvoicePageView = Backbone.View.extend({

    tagName: 'div',

    render: function () {
        var html = '<h1>Displaing invoice #' + this.model.get('referenceNumber') + '</h1>' +
            '<p><a href="#invoice">View all invoices</a></p>';
        $(this.el).html(html);
        return this;
    }
});

var Workspace = Backbone.Router.extend({
    // Define routes
    routes: {
        '': 'invoiceList',
        'invoice': 'invoiceList',
        'invoice/:id': 'invoicePage',
    },

    initialize: function () {

        // Create collection
        this.invoiceCollection = new InvoiceCollection([
            {referenceNumber: 1234},
            {referenceNumber: 2345},
            {referenceNumber: 3456},
            {referenceNumber: 4567}
        ]);

        Backbone.history.on('route', this.routeTracker);
        this.on('route:invoicePage', this.invoicePageEvent);
    },

    routeTracker: function(router, route, params){
        console.log(
            'routeTracker --- Route: ' + route + '. Params: ' + params + '.'
        );
    },

    invoicePageEvent: function(param1, param2){
        console.log('invoicePageEvent --- param:' + param1 +', '+ param2);
    },

    invoiceList: function () {
        this.changeView(new InvoiceListView({
            collection: this.invoiceCollection
        }));
    },

    invoicePage: function (id) {
        this.changeView(new InvoicePageView({
            model: this.invoiceCollection.get(id)
        }));
    },

    changeView: function (view) {
        if (this.currentView) {
            if (this.currentView == 'view') {
                return;
            }

            this.currentView.remove();
        }

        $('body').append(view.render().el);

        this.currentView = view;
    }
});
//when document is ready create the model and show the view.
$(function () {
    new Workspace();
    Backbone.history.start();
});


