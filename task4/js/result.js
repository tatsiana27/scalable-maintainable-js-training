define ("ResultsModule", [
        "jquery",
        "handlebars"],
    function($, Handlebars){
        var defaults = {
        results_length: 0,
        template: function () {},
        data: []
    },
    options = {};

    return function (inputOptions) {
           
        var init = function (newOptions) {
            options = $.extend({}, defaults, newOptions);
            options.template = Handlebars.compile(options.source_res);

            getData();
        };
        var getData = function () {
            $.getJSON(options.resultsUrl, function (data) {
                options.data = data;
                options.results_length = data.length;
                
                getResult(options.answerResult);
            });
        };
        var getResult = function (points) {
            var context, html = '';
            for(var i=0; i<options.results_length; i+=1) {
                if (options.answerResult <=options.data[i].to) {
                    context = {result: options.data[i].status};
                    html = options.template(context);
                    $(options.element).html(html);
                    return;
                }
            }
        };

        init(inputOptions);
        return this;
    };
});