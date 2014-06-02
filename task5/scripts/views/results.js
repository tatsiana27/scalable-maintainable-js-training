define("resultsView", ["jquery", "backbone"],
	function ($, Backbone) {
		var ResultsView = Backbone.View.extend({
			
			initialize: function () {
				this.render();
			},
			render: function () {
				var self = this;

				this.collection.fetch({
					success: function (collection) {
						for(var i=0; i<collection.models.length; i+=1) {
							if(self.options.answerResult <= collection.models[i].get("to")) {
								self.options.el.html(collection.models[i].get("status"));
								return;
							}
						}
					}
				});
			}
		});
		return ResultsView;
});