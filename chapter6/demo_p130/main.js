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
    },

    items: {
        type: 'List',
        itemType: 'Object',
        subSchema: {
            description: {
                validators: ['required']
            },
            price: 'Number',
            quantity: 'Number'
        }
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

InvoiceForm.setTemplates({
    form: '<form class="form-horizontal">{{fieldsets}}</form>',

    field:
    '<div class="control-group field-{{key}}">' +
    '   <label for="{{id}}" class="control-label">' +
    '       {{title}}' +
    '   </label>' +
    '   <div class="controls">' +
    '       {{editor}}' +
    '       <div class="help-inline">{{error}}</div>' +
    '       <div class="help-block">{{help}}</div>' +
    '   </div>' +
    '</div>'
},  {
    error: 'error'
});

//when document is ready create the model and show the view.
$(function () {

    var buyerModel = new BuyerModel({});

    new BuyerFormView({
        model: buyerModel
    }).render();

});


