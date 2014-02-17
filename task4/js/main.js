require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "libs/jquery",
        "QuestionsModule": "survey",
        "EventBus": "event-bus",
        "ResultsModule": "result",
        // "yepnope": "libs/yepnope",
        "modernizr": "libs/modernizr",
        "handlebars": "libs/handlebars-v1.3.0"
    },
    shim: {
        "handlebars": {
            exports: "Handlebars"
        }/*,
        "yepnope": {
            exports: "Yepnope"
        }*/
    }
});

require([
    "QuestionsModule", "jquery", "EventBus", "ResultsModule", "handlebars", "libs/yepnope"],
    function(Questions, $, EventBus, ResultsModule, Handlebars, yepnope) {
         // debugger;
         console.log(arguments);
        // yepnope.load({
        //     test: Modernizr.json,
        //     nope: 'js/libs/json3.js'

        // });

   
        var survey = new Questions(), survey1 = new Questions();
        
        survey.init({
            element: $('.content'),
            questionsUrl : "questions.json",
            callbackMethod: ResultsModule,
            callbackOptions: {
                element: $('.content'),
                resultsUrl : "results.json"
            }
        });
        survey1.init({
            element: $('.content1'),
            questionsUrl : "questions.json",
            callbackMethod: ResultsModule,
            callbackOptions: {
                element: $('.content1'),
                resultsUrl : "results.json"
            }
        });
        EventBus.bind('surveyComplete', survey.surveyComplete, Questions);
        debugger;
    });