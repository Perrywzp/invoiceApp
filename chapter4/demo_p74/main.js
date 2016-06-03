(function ($) {
    var InvoiceItemView = Backbone.View.extend({
        // HTML element name, where to render a view.
        el: 'body',

        // Initialize view object values.
        initialize: function () {
            this.html = 'Description: Wooden Toy House. ' + 'Price: $22, Quantity: 3.'
        },

        // Render view.
        render: function () {
            // Set html for the view element using jQuery.
            $(this.el).html(this.html);
        }
    });
    // Define new view.
    var InvoiceItemView2 = Backbone.View.extend({
        // Set tag name and its attributes.
        tagName: 'p',
        className: 'item',
        attributes:{
            'align':'left'
        },

        // Initialize view object values.
        initialize: function() {
            this.html = 'Farm Animal Set. Price: $17. Quantity: 1.'
        },

        // Render View.
        render: function() {
            // Set html for the view element using jQuery.
            $(this.el).html(this.html);
        }
    });
    //when document is ready create the model and show the view.
    $(function () {
        var invoiceItemView = new InvoiceItemView();
        invoiceItemView.render();

        // Create new view instance.
        var invoiceItemView2 = new InvoiceItemView2();
        //invoiceItemView2.el;

        invoiceItemView2.render();
        $("body").append(invoiceItemView2.el);

        // 动态的改变视图元素
        // Change existing element to the new one.
        //invoiceItemView.setElement('li');

        // Change existing element to the one already exists
        // in the DOM tree.
        //invoiceItemView.setElement($('body div'));
    });
})(jQuery);

