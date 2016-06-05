var InvoiceModel = Backbone.Model.extend({});

var InvoiceCollection = Backbone.Collection.extend({
    model: InvoiceModel
});

var invoiceCollection = new InvoiceCollection();

var columns = [
    {
        name: "referenceNumber",
        label: "Ref #",
        editable: false,
        cell: 'string'
    },
    {
        name: 'date',
        label: 'Date',
        cell: 'date'
    },
    {
        name: "status",
        label: "Status",
        cell: Backgrid.SelectCell.extend({
            optionValues: [
                ['Draft', 'draft'],
                ['Issued', 'issued']
            ]
        })
    }
];



invoiceCollection.add([
    {
        referenceNumber: 'AB 12345',
        date: new Date().toISOString(),
        status: 'draft'
    },
    {
        referenceNumber: 'ZX 98765',
        date: new Date().toISOString(),
        status: 'issued'
    }
]);

var TableView = Backbone.View.extend({

    initialize: function (columns, collection) {
        this.collection = collection;

        columns = [{
            name: "",
            cell: "select-row",
            headerCell: "select-all"
        }].concat(columns);

        this.grid = new Backgrid.Grid({
            columns: columns,
            collection: this.collection
        });

        this.clientSideFilter = new Backgrid.Extension.ClientSideFilter({
            collection: collection,
            placeholder: "Search by Ref #",
            fields: ['referenceNumber'],
            wait: 150
        });
    },

    events: {
        'click button.delete': 'delete'
    },

    delete: function () {
        _.each(this.grid.getSelectedModels(), function (model) {
            model.destroy();
        });
    },

    render: function () {
        this.$el.html(this.grid.render().$el);

        this.$el.append('<button class="delete">Delete</button>');

        this.$el.prepend(this.clientSideFilter.render().$el);
        return this;
    }
});

//when document is ready create the model and show the view.
$(function () {
    $("body").append(new TableView(columns, invoiceCollection).render().$el);

    Backbone.history.start();

});


