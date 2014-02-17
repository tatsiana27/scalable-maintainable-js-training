
define (
    "QuestionsModule",[
    "EventBus",
    "jquery"],
    function (EventBus, $) {

        console.log('QuestionsModule');

        return function (inputOptions) {
            var defaults = {
                currentIndex: 0,
                result: 0,
                survey: {},
                survey_length: 0,
                surveyComplete: function () {}
            },
            options = {};

            this.init = function (newOptions) {
            
                options = $.extend( {}, defaults, newOptions) ;
                console.log(options.element, 'init');
                bindClick();
                getData();
            
            };

            var getData = function () {

                $.getJSON(options.questionsUrl, function (data) {
                    for(var key in data){
                        options.survey[key] = data[key];
                        options.survey_length++;    
                    }
                    getHtml(options.currentIndex);
                });
            };

            var getHtml = function (index) {
                console.log(options.element, 'getHtml');
                
                var html = '';

                html = '<h3>'+options.survey[index].question+'</h3>';
                for (var i=0, max=options.survey[index].answers.length; i<max; i+=1) {
                    html += '<input type="radio" name="answer" id="r'+i+'" data-answer="'+i+'"><label for="r'+i+'">'+options.survey[index].answers[i] + '</label><br>';
                }
                options.element.html(html);
            };

            var bindClick = function () {
                console.log(options.element, 'bindClick');
                options.element.on('click', 'input', function() {
                    getPoints(options.survey[options.currentIndex].points[$(this).attr('data-answer')]);
                });

            };

            var getPoints = function (points) {

                options.result += points;

                if (options.currentIndex < (options.survey_length-1)) {
                    getHtml(++options.currentIndex);
                } else {
                    

                    var outputOptions = $.extend(
                        {},
                        {answerResult: options.result},
                        options.callbackOptions);
                        EventBus.trigger ('surveyComplete', {callbackOptions: outputOptions, callbackMethod: options.callbackMethod});
                    }
            };

            this.surveyComplete = function(surveyOptions) {

                console.log(surveyOptions, 'surveyComplete');
                if(typeof surveyOptions.callbackMethod === "function")
                {
                    surveyOptions.callbackMethod(surveyOptions.callbackOptions);
                }
            };



        };
       
      

    });




/*define(
    'QuestionsModule',[
    "event-bus",
    "jquery"],
    function(EventBus, $) {
        console.log('hello');
        return function (inputOptions) {

        var defaults = {
        currentIndex: 0,
           result: 0,
           survey: {},
           survey_length: 0,
           el: null,
           surveyComplete: function () {}
        },
        options = {};
        //console.log(inputOptions);
       // console.log(this);
        var init = function (newOptions) {
            
            options = $.extend( {}, defaults, newOptions) ;
            console.log(options.element, 'init');
            bindClick();
            getData();
            
        };

        var getData = function () {
            var self = this;
           // console.log(, 'getData');
            $.getJSON(options.questionsUrl, function (data) {
                for(var key in data){
                    options.survey[key] = data[key];
                    options.survey_length++;    
                }
                
                getHtml(options.currentIndex);

            });
      
        };

        var getHtml = function (index) {
            console.log(options.element, 'getHtml');
            
            var html = '';

            html = '<h3>'+options.survey[index].question+'</h3>';
            for (var i=0, max=options.survey[index].answers.length; i<max; i+=1) {
                html += '<input type="radio" name="answer" id="r'+i+'" data-answer="'+i+'"><label for="r'+i+'">'+options.survey[index].answers[i] + '</label><br>';
            }
            options.element.html(html);
            

        };

        var bindClick = function () {
            console.log(options.element, 'bindClick');
            options.element.on('click', 'input', function() {
                getPoints(options.survey[options.currentIndex].points[$(this).attr('data-answer')]);
            });

        };

        var getPoints = function (points) {

            options.result += points;

            if (options.currentIndex < (options.survey_length-1)) {
                getHtml(++options.currentIndex);
            } else {
                

                var outputOptions = $.extend(
                    {},
                    {answerResult: options.result},
                    options.callbackOptions);
                EventBus.trigger ('surveyComplete',
                    {callbackOptions: outputOptions, callbackMethod: options.callbackMethod});
                }

        };

        this.surveyComplete = function(surveyOptions)
        {
            if(typeof surveyOptions.callbackMethod === "function")
            {
                surveyOptions.callbackMethod(surveyOptions.callbackOptions);
            }
        };

        init(inputOptions);
        return this;

    };


    });
*/

