require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        "QuestionsModule": "survey",
        "EventBus": "event-bus",
        "ResultsModule": "result"

    }
  

});

require([
    "QuestionsModule", "jquery", "EventBus", "ResultsModule"],
    function(Questions, $, EventBus, ResultsModule ){
        
        var quiz = new Questions(), quiz1 = new Questions();
        
        quiz.init({
            element: $('.content'),
            questionsUrl : "questions.json",
            callbackMethod: ResultsModule,
            callbackOptions: {
                element: $('.content'),
                resultsUrl : "results.json"
            }
        });
        quiz1.init({
            element: $('.content1'),
            questionsUrl : "questions.json",
            callbackMethod: ResultsModule,
            callbackOptions: {
                element: $('.content1'),
                resultsUrl : "results.json"
            }
        });
        EventBus.bind('surveyComplete', quiz.surveyComplete, Questions);
        
    });

    
  



/*$(function() {

    APP.Questions({
        element: $('.content'),
        questionsUrl : "questions.json",
        callbackMethod: "js/result3",
        callbackOptions: {
            element: $('.content'),
            resultsUrl : "results.json"
        }
    });

    APP.Questions({
        element: $('.content1'),
        questionsUrl : "questions.json",
        callbackMethod: APP.Results,
        callbackOptions: {
            element: $('.content1'),
            resultsUrl : "results.json"
        }
    });
  

    APP.EventBus.bind('surveyComplete', APP.surveyComplete, APP.Questions);
});*/