(function ($) {
    // Define new model.
    var BuyerModel = Backbone.NestedModel.extend({});
    //when document is ready create the model and show the view.
    $(function () {
        // Create new model instance.
        var buyerModel = new BuyerModel();

        buyerModel.set({
            'name.title': 'Mr',
            'name.generation': 'II'
        });

        buyerModel.set({
            name: {
                first: 'John',
                last: 'Smith',
                middle: {
                    initial: 'P',
                    full: 'Peter'
                }
            }
        });

        buyerModel.get('name.middle.full'); //Peter
        buyerModel.get('name.middle'); // {full: 'Peter',initial: 'P'}
        buyerModel.get('name.title'); // Mr


        buyerModel.set({
            'address': [
                {city: 'Brooklyn', state: 'NY'},
                {city: 'Oak Oak', state: 'IL'}
            ]
        });

        buyerModel.set({'addresses[1].state': 'MI'});
        buyerModel.get('addresses[0].state'); // NY
        buyerModel.get('addresses[1].state'); // MI

        buyerModel.add('addresses',{
            city: 'Seattle',
            state: 'WA'
        });

        buyerModel.get('addresses[2]'); // {city:'Seattle' , state: 'WA'}

        buyerModel.remove('addresses[1]');
        buyerModel.get('addresses').length; //2

        buyerModel.bind('change:addresses[0].city',function(model,value){
            console.log(value);
        });

        buyerModel.set('addresses[0].city','Chicago');
    });
})(jQuery);

