var InvoiceItemModel = Backbone.Model.extend({});

var InvoiceItemCollection = Backbone.Collection.extend({
    model: InvoiceItemModel
});

var InvoiceItemListView = Backbone.View.extend({

    // HTML element name, where to render a view.
    tagName: 'ul',

    // Define template.
    template:   '{{#items}}<li>' +
                '   Description: {{description}}.' +
                '   Price: {{price}}.' +
                '   Quantity: {{quantity}}.' +
                '</li>{{/items}}',

    // Render view.
    render: function() {
        // 版本更新后，不再用compile预编译，通用parse执行。若使用模板部件，则用{{>item}}来表示子模块
        Mustache.parse();

        // Render template and set html for the view element
        // using jQuery.
        this.$el.html(Mustache.render(this.template,{
            items: this.collection.toJSON()
        }));

        return this;
    }
});


//when document is ready create the model and show the view.
$(function () {
    var invoiceItemCollection = new InvoiceItemCollection([
        { description: 'Wooden Toy House', price: 22, quantity: 3},
        { description: 'Farm Animal Set', price: 17, quantity: 1},
        { description: 'Farmer Figure', price: 8, quantity: 1},
        { description: 'Toy Tractor', price: 19, quantity: 1},
    ]);

    $('body').html(new InvoiceItemListView({
        collection: invoiceItemCollection
    }).render().el);
});


