(function ($) {
    // Define new model.
    var UserModel = Backbone.RelationalModel.extend({});

    var BuyerModel = Backbone.RelationalModel.extend({
        // Define one to one relationship.
        relations: [{
            // Relationship type
            type: Backbone.HasOne,

            // Relationship key in BuyerModel.
            key: 'user',

            // Related model.
            relatedModel: UserModel,

            // Define reverse relationship.
            reverseRelationship: {
                type: Backbone.HasOne,
                key: 'buyer'
            }
        }]
    });
    //when document is ready create the model and show the view.
    $(function () {
        var userModel1 = new UserModel({
            login: 'jsmith',
            email: 'jsmith@example.com'
        });

        var buyerModel1 = new BuyerModel({
            firstName: 'John',
            lastName: 'Smith',
            user: userModel1
        });

        var buyerModel = new BuyerModel({
            firstName: 'John',
            lastName: 'Smith',
            user: {
                login: 'jsmith',
                email: 'jsmith@example.com'
            }
        });


        var userModel = new UserModel({
            login: 'jsmith',
            email: 'jsmith@exapmle.com',
            buyer: {
                firstName: 'John',
                lastName: 'Smith'
            }
        });

        buyerModel.get('user').get('email'); //jsmith@example.com
        userModel.get('buyer').get('lastName'); //Smith
    });
})(jQuery);

