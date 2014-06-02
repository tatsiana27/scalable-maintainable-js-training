require.config({
    baseUrl: 'scripts',
    paths: {
        "jquery": "libs/jquery",
        "underscore": "libs/underscore",
        "backbone": "libs/backbone",
        "app": "app",
        "questionsModel": "models/questions",
        "questionsCollection": "collections/questions",
        "questionsView": "views/questions",
        "resultsModel": "models/results",
        "resultsCollection": "collections/results",
        "resultsView": "views/results"
    },
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            exports: "Backbone"
        }
    }
});

require(["app"],
    function(App) {
        return App;
    });