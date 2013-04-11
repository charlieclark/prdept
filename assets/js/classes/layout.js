var LAYOUT = new layoutClass();

function layoutClass(){
	
	var self = this;
	var curSlide = 0;
	var numSlides = null;
	var slideshowTimer = null;

	self.init = function(){


			//initial hides
			//gallery
			numSlides = copyData.philosophy.containerArray.length;
			for( var i = 0 ; i < numSlides ; i++)
			{
				$(".progress-container").append($("<div>" , {
					"class" : "progBlock"
				}))
			}

			self.showSection(-1);


	}

	self.showSection = function(index){
		$(".right-container").hide();
		$(".right-container").eq(index).show();


		if(index == -1)
		{
			$("#right-content").hide();
		}
		else
		{
			$("#right-content").show();
		}


		switch(index){
			case 0 :
			{
				initPhilosophy();
				break;
			}
		}

	}


	

	//philosophy functionality

	self.gallerySlide = function(index){
		showSlide(index , false)
	}

	function initPhilosophy(){
		$(".philosophy-gallery").hide();
		showSlide(0);
		startSlideShow();


	}

	function startSlideShow(){

		if(slideshowTimer)
			clearInterval(slideshowTimer);

		slideshowTimer = setInterval(function(){
			nextSlide();	
			console.log("getting here")
		} , 5000)
	}

	function nextSlide(){
		curSlide++;

		if(curSlide >= numSlides)
			curSlide = 0;

		showSlide(curSlide);
	}

	function showSlide(index , isAuto){
		if($(".philosophy-gallery.active").length >= 1 )
		{
			$(".philosophy-gallery.active").fadeOut("slow" , function(){
				$(this).removeClass("active")
				fadeInSlide();
			});
		}
		else
		{
			fadeInSlide();
		}

		function fadeInSlide(){
			$(".philosophy-gallery").eq(index).fadeIn("slow").addClass("active");
			$(".progBlock").removeClass("active");
			$(".progBlock").eq(index).addClass("active");
		}
		
	}


	//services

	self.showBullet = function(index , selectorString){

		var shouldSlideDown = true;
		$(selectorString).each(function(){
			if($(this).hasClass("active"))
			{
				$(this).slideUp().removeClass("active");
				if($(this).index(selectorString) == index)
				{
					shouldSlideDown = false;
				}

			}
		});
		if(shouldSlideDown)
			$(selectorString).eq(index).slideDown().addClass("active");
	}

	self.resize = function(){

		var offset = 50;
		var padding = 20;

		var leftHeight = CONFIG.contentHeight - (offset*2);
		var rightHeight = leftHeight * 0.7;


		var leftMenuCss = {
			"top" : offset,
			"left" : offset,
			"height" : leftHeight,
			"width" : 300
		}

		var leftMenuContentCss = {
			"top" : padding,
			"left" : padding,
			"height" : leftMenuCss.height - (padding * 2),
			"width"	 : leftMenuCss.width - (padding * 2)
		}

		var rightContentCss = {
			"bottom" : offset,
			"right" : offset,
			"height" : rightHeight,
			"width" : rightHeight
		}

		var rightMenuContentCss = {
			"top" : padding,
			"left" : padding,
			"height" : rightContentCss.height - (padding * 2),
			"width"	 : rightContentCss.width - (padding * 2)
		}

		$("#left-menu").css(leftMenuCss);
		$("#right-content").css(rightContentCss);

		$("#left-menu .menu-content").css(leftMenuContentCss);
		$("#right-content .menu-content").css(rightMenuContentCss);

		//resizing left menu


	}
}