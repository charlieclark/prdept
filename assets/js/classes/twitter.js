var TWITTER  = new twitterClass();

function twitterClass(){
		
	var self = this;
	var user = "sicgrp";
	// var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name="+ user +"&include_entities=0&trim_user=1&count=10";
	var url = CONFIG.assetPath + "/js/testJson.js"

	self.init = function(){

		$.getJSON(url, function(data) {
			  buildTweets(data);
		});

	}

	function buildTweets(data){

		var tweetArray = [];

		for( var i = 0 ; i < data.length ; i++)
		{
			var obj = generateTweet(data[i]);
			tweetArray.push(obj);
		}
	}

	function generateTweet(obj){
		var d = obj.created_at;
			d = d.replace("+0000 ", "");
		var date = new Date(d);
		var stringDate = date.toLocaleDateString();
		var txt = obj.text;

		var url = "https://twitter.com/"+obj.user.id_str+"/status/" + obj.id_str;

		return( {text:txt, date:stringDate, url:url } );
	}

}