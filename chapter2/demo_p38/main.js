(function ($) {
    //when document is ready create the model and show the view.
    $(function () {
        var buyerModel = new BuyerModel();

        // Set attribute values which do not validate.
        buyerModel.set({
            email: 'http://example.com'
        },{validate:true});

        // Check if model is valid.
        buyerModel.isValid(); // false
        buyerModel.get('email'); // undefined
    });
})(jQuery);

var BuyerModel = Backbone.Model.extend({
    // Defining a validation criteria. 条件
    validation: {
        required: true
    },
    email: {
        pattern: 'email'
    }
});