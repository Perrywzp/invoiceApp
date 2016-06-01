(function($) {
    //when document is ready create the model and show the view.
    $(function() {

    });
})(jQuery);

var AnotherInvoiceItemModel = Backbone.Model.extend({
    // Extend model instance with memento instance.
    // Ignore restoring of description attribute.
    initialize: function(){
        _.extend(this,new Backbone.Memento(
            this, { ignore: ["description"]}
        ))
    }
});
