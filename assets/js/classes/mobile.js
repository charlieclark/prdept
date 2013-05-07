var MOBILE = new mobileClass();

function mobileClass(){
	
	var self = this;
	var hasInit = false;
	var menuOpen = false;

	var mobileContainers = [];


	self.init = function(){



		self.activate();

		if(!hasInit) // do things once
		{
			hasInit = true;

			$(window).scroll(function(){

				// getCurentScrollSection( $("body").scrollTop() );
				
			})
			
		}


	}

	self.checkScroll = function(){
		var curScroll = $("body").scrollTop();
		getCurentScrollSection(curScroll);
	}

	self.deactivate = function(){
		$("#desktop-content").show();
		$("#mobile-content").empty();
		$(".progress-container").show();
		$(".mobile-show").hide();

		LAYOUT.showSlide(0);
		LAYOUT.showSection(-1);
		mobileContainers = [];
	}

	self.activate = function(){

		$(".philosophy-gallery").show();

		$(".mobile-show").show();

		$(".progress-container").hide();

		$("body").css({
			"overflow-x" : "hidden",
			"overflow-y": "auto"
		})

		$("#desktop-content").hide();

		$(".mobile-container").each(function(){
			var newContainer = 	$(this).clone();
			newContainer.appendTo($("#mobile-content"));
			
		});

		$("#mobile-content .mobile-bg-el").each(function(){
			mobileContainers.push($(this));
		})

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

	function getCurentScrollSection(scroll){

		var bgData = LAYOUT.getBgData();
		var curBgNum = bgData.curBgNum;
		var lastBgNum = bgData.lastBgNum;
		var dir = null;

		if(curBgNum > lastBgNum || lastBgNum == null)
		{
			dir = 1;
		}
		else
		{
			dir = -1;
		}

		var curStep = 0;

		for(var i = 0 ; i < mobileContainers.length-1 ; i++)
		{
			var elScroll1 = mobileContainers[i].position().top -100;
			var elScroll2 = mobileContainers[i+1].position().top -100;

			if(scroll > elScroll1 && scroll < elScroll2)
			{
				curStep = i;
				break
			}
		}

		if( curStep == 0 && scroll > mobileContainers[2].position().top)
		{
			curStep = mobileContainers.length-1;
		}

		LAYOUT.setBgIndex(curStep);
	}

	self.mobileData = function(){
	}
	
}