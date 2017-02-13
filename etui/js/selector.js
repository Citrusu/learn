/**
 * Created by Kodachi on 2016/10/13.
 */
define(function(require, exports, module){
    var $ = require('$');
    require('picker');
    (function($){
        $.fn.newPicker = function(options) {
            var $this = this;
            var values = [];
            var displayValues = [];
            var $options = $this.find('option');
            $.each($options,function(index,item){
                var $item = $(item);
                values.push($item.val());
                displayValues.push($item.text());
            });
            return this.picker({
                textAlign: 'center',
                cols: [
                    {
                        values:values,
                        displayValues:displayValues
                    }
                ]
                /*onChange:function (picker, values, displayValues) {
                 //console.log(p);
                 }*/
            });
        };
    })($);
});
