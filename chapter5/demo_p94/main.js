var model = new Backbone.Model({
    firstName: 'John',
    lastName: 'Doe',
    age: 20
});

model.on('change', function(model){
    model.hasChanged('age');
    model.hasChanged('firstName');

    model.changedAttributes();

    model.previous('age');

    model.previousAttributes();

});
//when document is ready create the model and show the view.
$(function () {
    model.set('age', 21);

    model.set('age', 22, {silent: true});

    model.set({age: 25}, {silent: true});
});


