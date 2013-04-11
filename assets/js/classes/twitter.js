var TWITTER  = new twitterClass();

function twitterClass(){
		
	var self = this;
	var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2";

	self.init = function(){

		console.log(url);

		$.getJSON(url, function(data) {
			  console.log(data);
		});

	}

}