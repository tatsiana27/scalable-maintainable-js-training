define("app",["underscore", "backbone", "questionsCollection", "questionsView", "resultsCollection", "resultsView"],
	function (_, Backbone, QuestionsCollection, QuestionsView, ResultsCollection, ResultsView) {
		var questionsCollection = new QuestionsCollection,
			questionsView = new QuestionsView ({ collection: questionsCollection, el: $('.content')});

			questionsView.bind('complete', function (options) {
			
				var resultsCollection = new ResultsCollection,
					resultsView = new ResultsView({collection: resultsCollection, answerResult: options.answerResult, el: $('.content')});
			});
		
			var questionsCollection1 = new QuestionsCollection,
			questionsView1 = new QuestionsView ({ collection: questionsCollection1, el: $('.content1')});

			questionsView1.bind('complete', function (options) {
			
				var resultsCollection1 = new ResultsCollection
					resultsView1 = new ResultsView({collection: resultsCollection1, answerResult: options.answerResult, el: $('.content1')});
			});
});