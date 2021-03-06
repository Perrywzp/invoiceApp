var BuyerModel = Backbone.Model.extend({
    schema: {
        title: {type: 'Select', options: ['Mr', 'Mrs', 'Ms']},
        name: 'Text',
        email: {validators: ['required', 'email']},
        birthday: 'Date'
    }
});


var BuyerFormView = Backbone.View.extend({

    el:'body',

    render: function() {
        this.form = new Backbone.Form({ model: this.model });

        this.$el.html('<h3>Enter buyer details below</h3>');
        this.$el.append(this.form.render().el);
        this.$el.append('<button>Submit</button>');

        return this;
    },

    events: {
        'click button': 'submit'
    },

    submit: function() {
        this.form.commit();

        console.log(this.model.toJSON());
    }
});




//when document is ready create the model and show the view.
$(function () {

    var buyerModel = new BuyerModel({});

    new BuyerFormView({
        model: buyerModel
    }).render();

});


