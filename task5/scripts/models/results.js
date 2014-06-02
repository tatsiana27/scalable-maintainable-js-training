define("resultsModel",["backbone"],
	function(Backbone) {
		var ResultsModel = Backbone.Model.extend({
			defaults: {
				to: '',
				status: ''
			}
		});
		return ResultsModel;
	});