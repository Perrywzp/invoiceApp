var InvoiceModel = Backbone.Model.extend({
    schema: {
        referenceNumber: { type: 'Text'},

        date: {type: 'Date'},

        status: {
            type: 'Select',
            options: [
                { val: 'draft', label: 'Draft'},
                { val: 'issued', label: 'Issued'},
                { val: 'paid', label: 'Paid'},
                { val: 'canceled', label: 'Canceled'}
            ]
        },

        paidDate: { type: 'Date'}
    }
});

var InvoiceForm = Backbone.Form.extend({
    initialize: function() {

        // Call parent method.
        InvoiceForm.__super__.initialize.apply(this,arguments);

        // Bind change status change event to the update callback.
        this.on('status:change', this.update);
    },

    update: function(form, error) {
        if(form.fields.paidDate.editor.getValue() == 'paid') {
            form.fields.paidDate.$el.show();
        }else{
            form.fields.paidDate.$el.hide();
        }
    },

    render: function() {
        // Call parent method.
        InvoiceForm.__super__.render.apply(this, arguments);

        // Ensure dependent are shown properly
        this.update(this);

        return this;

    }
});

//when document is ready create the model and show the view.
$(function () {

    var buyerModel = new BuyerModel({});

    new BuyerFormView({
        model: buyerModel
    }).render();

});


