define("questionsModel",["backbone"],
	function(Backbone) {
		var QuestionsModel = Backbone.Model.extend({
			defaults: {
				question: '',
				answers: [],					
				points: []
			}
	});
		return QuestionsModel;
	});