(function($) {

    //when document is ready create the model and show the view.
    $(function() {
        var buyerModel = new BuyerModel();
        buyerModel.set({
            firstName: 'John',
            lastName: 'Smith'
        });

        console.log(buyerModel.get('fullName'));
        console.log(buyerModel.get('firstName'));
        console.log(buyerModel.get('lastName'));
    });
})(jQuery);

var BuyerModel = Backbone.Model.extend({

    // Use mutators.
    mutators: {
        // Introduce virtual attribute.
        fullName: function() {
            return this.get('firstName') + ' ' + this.get('lastName');
        }
    }
});
