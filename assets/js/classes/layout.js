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

			self.showSection(0);


	}

	self.showSection = function(index){
		$(".right-container").hide();
		$(".right-container").eq(index).show();


		switch(index){
			case 0 :
			{
				initPhilosophy();
				break;
			}
		}

	}

	//gallery functionality
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
		} , 2000)
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

	self.resize = function(){

		var offset = 50;


		var leftMenuCss = {
			"top" : offset,
			"left" : offset,
			"height" : CONFIG.contentHeight - (offset*2),
			"width" : 300
		}

		var rightContentCss = {
			"bottom" : offset,
			"right" : offset,
			"height" : 600,
			"width" : 600
		}

		$("#left-menu").css(leftMenuCss);
		$("#right-content").css(rightContentCss);
		//resizing left menu


	}
}