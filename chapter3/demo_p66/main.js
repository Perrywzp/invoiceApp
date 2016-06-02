(function ($) {
    var IndividualContactModel = Backbone.Model.extend({
        name: function(){
            return this.get('firstName') + ' ' + this.get('lastName');
        }
    });

    var OrganizationContactModel = Backbone.Model.extend({
        name: function(){
            return this.get('businessName') + ', '
            + this.get('businessType');
        }
    });

    var ContactCollection = Backbone.Collection.extend({
        model: {
            // Pass chosen properties.
            chosen: {
                // Attribute that should contain model type.
                attr: 'type',

                // Default model class.
                defaults: IndividualContactModel,

                // Mapping attribute values to model classes.
                map: {
                    individual: IndividualContactModel,
                    organization: OrganizationContactModel
                }
            }
        }
    });
    //when document is ready create the model and show the view.
    $(function () {
        var contactCollection = new ContactCollection([
            {
                "firstName": "John",
                "lastName": "Smith",
                "type": "individual"
            },
            {
                "businessName": "North American Veeblefetzer",
                "businessType": "LLC",
                "type": "organization"
            }
        ]);

        contactCollection.at(0) instanceof IndividualContactModel;

        contactCollection.at(0).name();

        contactCollection.at(1) instanceof IndividualContactModel;

        contactCollection.at(1).name();

        var contactCollection = new ContactCollection([
            {
                firstName: 'John',
                lastName: 'Smith',
                options: {type: 'individual'}
            },
            {
                businessName: 'North American Veeblefetzer',
                businessType: 'LLC',
                options: {type: 'organization'}
            }
        ]);

        var ContactCollection = Backbone.Collection.extend({
            model: {
                chosen: function(rawData){
                    if(rawData.spice === 'salt'){
                        return SaltyModel;
                    }
                    if(rawData.spice === 'sugar'){
                        return SweetyModel;
                    }
                    return BoringModel;
                }
            }
        })
    });
})(jQuery);

