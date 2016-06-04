/**
 * 模板加载器
 * @author wangzhipei
 * @date 2016/6/4/0004.
 */
(function($){
     $(function(){
        // Store validate within global jQuery object.
         $.tpl = {};

         $('script.template').each(function(index){

             // Load template from DOM.
             $.tpl[$(this).attr('id')] = _.template($(this).html());

             // Remove template from DOM.
             $(this).remove();
         });
     });
})(jQuery);