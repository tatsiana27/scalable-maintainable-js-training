define("resultsCollection", ["backbone", "resultsModel"], 
	function (Backbone, ResultsModel) {
		var ResultsCollection = Backbone.Collection.extend({
			model : ResultsModel,
			url: 'data/results.json',
			parse: function (response) {
				return response;
			}
		});
		return ResultsCollection;
	});