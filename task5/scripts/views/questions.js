define("questionsView", ["jquery", "underscore", "backbone", "app"], 
	function ($, _, Backbone, App) {
		var QuestionsView = Backbone.View.extend({
			
			currentIndex: 0,
			result: 0,
			
			initialize: function () {
				this.render();
			},
			render: function () {
				var contextAnswer = {};
				var self = this;
				
				this.collection.fetch({
					success: function (collection) {
						for (var i=0, max = collection.models[self.currentIndex].get("answers").length; i<max; i+=1) {
							contextAnswer[i] = {id: i, value: collection.models[self.currentIndex].get("answers")[i]};
						}
					
						var template = _.template( $('#SurveyTemplate').html(), {question: collection.models[self.currentIndex].get("question"), items: contextAnswer});
						self.options.el.html(template);
					}
				});

			return this;
			},
			events: {
				'click .answer': 'bindEvent'
			},
			bindEvent: function (e) {
				var numberPoint = ($(e.currentTarget).data("answer"));
				this.getPoints(this.collection.models[this.currentIndex].get("points")[numberPoint]);
			},
			getPoints: function(points) {
				this.result +=points;
				if (this.currentIndex < (this.collection.models.length-1)) {
					++this.currentIndex;
					this.render();
                    } else {
                    	
                    	this.trigger("complete", {answerResult: this.result});
                    }
            }
		});
		return QuestionsView;
	});