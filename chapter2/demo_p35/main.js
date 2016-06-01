(function ($) {
    //when document is ready create the model and show the view.
    $(function () {
        var invoiceModel = new InvoiceModel();
        invoiceModel.get('status'); // draft

        invoiceModel.triggerEvent('issue');
        invoiceModel.get('status'); // issued

        invoiceModel.triggerEvent('payout');
        invoiceModel.get('status'); // paid

    });
})(jQuery);

var InvoiceModel = Backbone.Model.extend({
    // Define workflow states.
    workflow: {
        // Define initial state.
        initial: 'draft',

        // Define state transitions.
        events: [
            {name: 'issue', from: 'draft', to: 'issued'},
            {name: 'payout', from: 'issued', to: 'paid'},
            {name: 'cancel', from: 'draft', to: 'canceled'},
            {name: 'cancel', from: 'issued', to: 'canceled'}
        ]
    },
    initialize: function () {
        // Extend model instance width workflow instance.
        // Set attribute name which contains status.
        _.extend(this,
            new Backbone.Workflow(this, {attrName: 'status'})
        );
    }
});