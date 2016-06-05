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
        label:'Date',
        cell: 'date'
    },
    {
        name: "status",
        label: "Status",
        cell: Backgrid.SelectCell.extend({
            optionValues: [
                ['Draft','draft'],
                ['Issued', 'issued']
            ]
        })
    }
];

var grid = new Backgrid.Grid({
    columns: columns,
    collection: invoiceCollection
});

$("body").append(grid.render().$el);

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

//when document is ready create the model and show the view.
$(function () {

    Backbone.history.start();

});


