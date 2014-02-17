var APP = APP || {};
 
// module-"class" (constructor)
APP.Results = (function (APP, $, undefined) {
	var defaults = {
		results: {},
		answer_res: 0,
		results_length: 0
	},
	options = {};

	return {
    	
    	init: function (points) {
    		options = $.extend( {}, defaults);
    		options.answer_res = points;
    		this.getData();
        },

        getData: function () {
        	var self = this;

        	$.getJSON("results.json", function (data) {
        		for(var key in data){
        			options.results[key] = data[key];
        			options.results_length++;
        		}
        		self.getResult();
        	});
        },

        getResult: function () {

        	for(var i=0; i<options.results_length; i+=1) {
            if (options.answer_res <=options.results[i].to) {
                $('.content').html('Your result: '+options.results[i].status);
                return;
            }
        }

        }
    };

}(APP, jQuery));