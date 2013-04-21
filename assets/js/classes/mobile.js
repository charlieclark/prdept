var MOBILE = new mobileClass();

function mobileClass(){
	
	var self = this;
	var hasInit = false;
	var menuOpen = false;


	self.init = function(){



		self.activate();

		if(!hasInit) // do things once
		{
			hasInit = true;

			
		}

	}

	self.deactivate = function(){
		$("#desktop-content").show();
		$("#mobile-content").empty();
		$(".progress-container").show();
		$(".mobile-show").hide();
	}

	self.activate = function(){

		$(".mobile-show").show();

		$(".progress-container").hide();

		$("body").css({
			"overflow-x" : "hidden",
			"overflow-y": "auto"
		})

		$("#desktop-content").hide();

		$(".mobile-container").each(function(){
			$(this).clone().appendTo($("#mobile-content"));
		});

		$("#mobile-content .right-container").show();

		$("#left-menu .menu-content").css({
			"top" : 0,
			"left" : 0 ,
			"width" : "auto",
			"height" : "auto",
		})

		//adding clicks

		$("#mobile-content .services .bullet .title").click(function(){
			LAYOUT.showBullet($(this).index("#mobile-content .services .bullet .title") , "#mobile-content .services .bullet .body" );
		});

		$("#mobile-content .team .bullet .title").click(function(){
			LAYOUT.showBullet($(this).index("#mobile-content .team .bullet .title") , "#mobile-content .team .bullet .body" );
		});

		$("#mobile-content .menu li").click(function(){

			var strollToEl = $("#mobile-content .content-container").eq($(this).index());
			var strollToHeight = strollToEl.offset().top;

			$("html,body").animate({ scrollTop: strollToHeight -20 + "px" } , "slow");

	
			// $("#mobile-content").animate({ scrollTop : 0 } , 500);

		});

		$("#mobile-content .social-icon").click(function(){
			if($(this).is(".fbook-icon"))
			{
				// SHARE.fbShare();
				window.open("https://www.facebook.com/pages/PR-dept/422386757809542")
			}
			else if($(this).is(".twitter-icon"))
			{
				// SHARE.twShare();
				window.open("https://twitter.com/PR_dept");
			}
		});

	}

	self.mobileData = function(){
	}
	
}