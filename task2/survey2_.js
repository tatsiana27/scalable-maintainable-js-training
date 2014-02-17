var APP = APP || {};
 
// module-"class" (constructor)
APP.Questions = (function (APP, $, undefined) {

	var defaults = {
		currentIndex: 0,
            result: 0,
            survey: {},
            survey_length: 0,
           surveyComplete: function () {}
        },
        options = {};
		       
   
    // static variables and methods

    return {
    	
    	init: function () {
    		options = $.extend( {}, defaults) ;
    	 	
        	this.getData();
        	this.bindClick();
        },

        getData: function () {
        	
        	var self = this;

        	$.getJSON("questions.json", function (data) {
        		for(var key in data){
        			options.survey[key] = data[key];
        			options.survey_length++;	
        		}
        		//a = options;
        		//options.survey_length = options.survey.length;
        		console.log(options.survey_length, 'getData');
        		//options.survey[i] = data;
  				console.log(options.survey, 'getData');
  				
    	 		self.getHtml(options.currentIndex);
    	 		

    	 		
    	 	});
    	 	
    	 	
        },

        getHtml: function (index) {
        	
        	//globalVar = options;
        	//console.log(options.survey[index], index);
        	var html = '';

        	html = '<h3>'+options.survey[index].question+'</h3>';
        	for (var i=0, max=options.survey[index].answers.length; i<max; i+=1) {
        		html += '<input type="radio" name="answer" id="r'+i+'" data-answer="'+i+'"><label for="r'+i+'">'+options.survey[index].answers[i] + '</label><br>';
        	}
        	$('.content').html(html);

        },

        bindClick: function () {
        	var self = this;

	        $('.content').on('click', 'input', function() {
	        	//console.log(options.survey[options.currentIndex].points[$(this).attr('data-answer')]);
	            self.getPoints(options.survey[options.currentIndex].points[$(this).attr('data-answer')]);
	        });

        },

        getPoints: function (points) {

        	//console.log(options.survey_length, 'getPoints');
        	//console.log(options.currentIndex, 'getPoints');
        	
        	options.result += points;

        	//console.log(options.currentIndex < options.survey_length-1);
      
        	if (options.currentIndex < (options.survey_length-1)) {
        		//console.log(options.currentIndex, 'getPoints');

        		this.getHtml(++options.currentIndex);
        	} else {
        		if (typeof options.surveyComplete === "function") {
        			APP.Results.init(options.result);
        			//options.surveyComplete({point: options.result});
            	}
       		}


        }

       
    };
    
}(APP, jQuery));

APP.Questions.init();
