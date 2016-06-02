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

        var buyerModel2 = new BuyerModel();
        buyerModel2.set('fullName', 'Joe Bloggs');

        console.log(buyerModel2.get('fullName'));
        console.log(buyerModel2.get('firstName'));
        console.log(buyerModel2.get('lastName'));
    });
})(jQuery);

var BuyerModel = Backbone.Model.extend({

    // Use mutators.
    mutators: {
        // Introduce virtual attribute.
        fullName: {
            set: function(key, value, options, set) {
                var names = value.split(' ');
                this.set('firstName', names[0], options);
                this.set('lastName', names[1], options);
            },
            get: function() {
                return this.get('firstName') + ' ' + this.get('lastName');
            }
        }
    },

    defaults: {
        firstName: 'Sugar',
        lastName: 'Daddy'
    }

});
