$(function() {

    APP.Questions({
        element: $('.content'),
        questionsUrl : "questions.json",
        callbackMethod: APP.Results,
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
});