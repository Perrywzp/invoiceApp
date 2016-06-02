(function ($) {
    var BuyerModel = Backbone.Model.extend({
        defaults:{
            firstName: 'John',
            lastName: 'Smith'
        }
    });

    var BuyerCollection = Backbone.QueryCollection.extend({
        model:BuyerModel
    });
    //when document is ready create the model and show the view.
    $(function () {
        var result = buyerCollection.query({firstName: 'John'});

        var resultCollection = new BuyerCollection(result);
        resultCollection.pluck('firstName');
    });
})(jQuery);

