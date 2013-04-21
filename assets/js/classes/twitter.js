var TWITTER  = new twitterClass();

function twitterClass(){
		
	var self = this;
	var user = "PR_DEPT";
	var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name="+ user +"&include_entities=0&trim_user=1&count=10";
	// var url = CONFIG.assetPath + "/js/testJson.js"

	self.init = function(){

		$.ajax({
		     type : "GET",
		     dataType : "jsonp",
		     url : url , // ?callback=?
		     success: function(data){
		           buildTweets(data)
		     }
		});

	}

	function buildTweets(data){

		var tweetArray = [];

		for( var i = 0 ; i < data.length ; i++)
		{
			var obj = generateTweet(data[i]);
			tweetArray.push(obj);
		}

		var copyObj = {"tweet" : tweetArray} ;

		console.log(data , copyObj)


		TEMPLATE.compileTemplate( "twitter-template" ,  copyObj , $("#desktop-content .twitter-container") );
		TEMPLATE.compileTemplate( "twitter-template" ,  copyObj , $("#mobile-content .twitter-container") );

	}

	function generateTweet(obj){
		var d = obj.created_at;
			d = d.replace("+0000 ", "");
		var date = new Date(d);
		var stringDate = date.toLocaleDateString();
		var txt = obj.text;

		var url = "https://twitter.com/"+obj.user.id_str+"/status/" + obj.id_str;

		return( {text:txt, date:stringDate, url:url , user: user }  );
	}

}