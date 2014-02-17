
define (
    "QuestionsModule",[
    "EventBus",
    "jquery",
    "handlebars"],
    function (EventBus, $, Handlebars) {

        return function (inputOptions) {
            var defaults = {
                currentIndex: 0,
                result: 0,
                data: [],
                survey_length: 0,
                source: '',
                template: function () {},
                surveyComplete: function () {}
            }, options = {};

            this.init = function (newOptions) {
                options = $.extend( {}, defaults, newOptions);
                options.source = $('#template').html(),
                options.template = Handlebars.compile(options.source);
                
                bindClick();
                getData();
            };
            var getData = function () {
                var self = this;
                $.getJSON(options.questionsUrl, function(data) {
                    options.data = data;
                    options.survey_length = data.length;
                    getHtml(options.currentIndex);
                });
            };
            var getHtml = function(index) {
                var context = {}, contextAnswer = {}, html = '';
               
                for (var i=0, max=options.data[index].answers.length; i<max; i+=1) {
                    contextAnswer[i] = {id: i, value: options.data[index].answers[i]};
                }
                context = {question: options.data[index].question, items: contextAnswer};
                html = options.template(context);
                $(options.element).html(html); 
            };
            var bindClick = function () {
                options.element.on('click', 'input', function() {
                    getPoints(options.data[options.currentIndex].points[$(this).attr('data-answer')]);
                });

            };
            var getPoints = function (points) {
                options.result += points;

                if (options.currentIndex < (options.survey_length-1)) {
                    getHtml(++options.currentIndex);
                } else {
                    var outputOptions = $.extend(
                        {},
                        {answerResult: options.result,
                        source_res: options.source},
                        options.callbackOptions);
                        EventBus.trigger ('surveyComplete', {callbackOptions: outputOptions, callbackMethod: options.callbackMethod});
                    }
            };
            this.surveyComplete = function(surveyOptions) {

                if(typeof surveyOptions.callbackMethod === "function")
                {
                    surveyOptions.callbackMethod(surveyOptions.callbackOptions);
                }
            };
        };
    });
