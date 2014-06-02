define("questionsCollection", ["backbone", "questionsModel"], 
	function (Backbone, QuestionsModel) {
		var QuestionsCollection = Backbone.Collection.extend({
			model : QuestionsModel,
			url: 'data/questions.json',
			parse: function (response) {
				return response;
			}
		});
		return QuestionsCollection;
	});