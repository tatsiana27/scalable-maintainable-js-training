var APP = APP || {};
 
// module-"class" (constructor)
APP.Results = (function (APP, $, undefined) {
	var defaults = {
		results: {},
		answer_res: 0,
		results_length: 0
	},
	options = {};

    return function (inputOptions) {
        
        var init = function (newOptions) {
            options = $.extend({}, defaults, newOptions);
            getData();

        };

        var getData = function () {
            
            $.getJSON(options.resultsUrl, function (data) {
                for(var key in data){
                    options.results[key] = data[key];
                    options.results_length++;
                }
                getResult(options.answerResult);
            });

        };

        var getResult = function (points) {
            for(var i=0; i<options.results_length; i+=1) {
                if (options.answerResult <=options.results[i].to) {
                    $(options.element).html('Your result: '+options.results[i].status);
                    return;
                }
            }
        };

        init(inputOptions);
        return this;
    };

}(APP, jQuery));