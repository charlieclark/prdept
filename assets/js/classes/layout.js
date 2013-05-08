var LAYOUT = new layoutClass();

function layoutClass(){
	
	var self = this;
	var curSlide = 0;
	var numSlides = null;
	var slideshowTimer = null;
	var sectionOrderArray = [ "splash" , "philosophy" , "services" , "clients" , "team" , "contact" ];
	var numBgs = 9;
	var curBgNum = null;
	var lastBgNum = null;
	var slideFading = false;




	self.init = function(){


			



			//gallery
			numSlides = copyData.philosophy.containerArray.length;
			for( var i = 0 ; i < numSlides ; i++)
			{
				$(".progress-container").append($("<div>" , {
					"class" : "progBlock"
				}))
			}

			for( var i = 0 ; i < numBgs ; i++)
			{
				$("#background-container").append( $("<div>" , {
					"class" : "background"
				}) );
			}

			//initial hides
			$(".background").addClass("loading").hide();

			self.showSection(-1);


	}

	//getters
	self.getBgData = function(){
		return {"lastBgNum" : lastBgNum , "curBgNum" : curBgNum};
	}

	//setters
	self.setBgIndex = function(index){
		showBg(index);
	}
	self.nextSlide = function(){nextSlide()}
	self.prevSlide = function(){prevSlide()}
	self.showSlide = function(index){showSlide(index,false)}

	self.showSection = function(index){

		

		$(".right-container").hide();
		if(index >= 0)
			$(".right-container").eq(index).show();
		curSectionName = sectionOrderArray[index+1];
		var tempBgNum = getBgNumber( sectionOrderArray[index+1] );
		showBg(tempBgNum);

		if(index == -1)
		{
			$("#right-content").hide();
		}
		else
		{
			$("#right-content").show();
		}


		isGallery = false;
		switch(index){

			case -1:
			{
				$("#left-menu .menu li").removeClass("active");
				break;
			}
			case 0 :
			{
				isGallery = true;
				initPhilosophy();
				break;
			}
		}

	}

	self.insertBackground = function(img , name){

		var curSection = null;
		var curSectionIndex = null;

		for( var i = 0 ; i < sectionOrderArray.length ; i++)
		{
			if(  name.indexOf( sectionOrderArray[i] ) >= 0 )
			{
				curSection = sectionOrderArray[i];
				curSectionIndex = getBgNumber(name);
				break;
			}
		}

		if(curSection)
		{
			$(".background").eq(curSectionIndex).append(img).removeClass("loading");
		}

		$(window).resize();


	}

	function showBg(index){

		if(index == curBgNum)
		{
			return;
		}
		else
		{
			if(curBgNum)
				lastBgNum = curBgNum
			curBgNum = index;
		}
		
		var fadeOut = false;

		if($(".background.active").length > 0)
		{
			fadeOut = true;
		}

		console.log("fadeout" , fadeOut)
		if(fadeOut)
		{
			$(".background.active").fadeOut("slow" , function(){
			}).removeClass("active");
		}

		fadeInBg();


		function fadeInBg(){

				
				$(".background").eq(index).fadeIn("slow").addClass("active");

		}


	}

	function getBgNumber(name){

		var philoIndex = null;
		var numPhilo = 4;
		var curPhiloNum = null;
		var normalIndex = null;
		var correctedIndex = null;

		if(name.indexOf("philosophy") >= 0)
		{
	
			if(name.indexOf("2") >= 0)
			{
				curPhiloNum = 1;
			}
			else if(name.indexOf("3") >= 0)
			{
				curPhiloNum = 2;
			}
			else if(name.indexOf("4") >= 0)
			{
				curPhiloNum = 3;
			}
			else
			{
				curPhiloNum = 0;
			}
		}

		console.log(name , curPhiloNum , "curPhiloNum");

		for( var i = 0 ; i < sectionOrderArray.length ; i++)
		{
			if(sectionOrderArray[i].indexOf("philosophy") >= 0)
			{
				philoIndex = i;
			}

			if( name.indexOf(sectionOrderArray[i]) >= 0)
			{
				normalIndex = i;
			}
			
		}

		if(curPhiloNum != null)
		{
			correctedIndex = normalIndex + curPhiloNum
		}
		else if(normalIndex > philoIndex)
		{
			correctedIndex = normalIndex + numPhilo - 1;
		}
		else
		{
			correctedIndex = normalIndex;
		}

		console.log(normalIndex , philoIndex , correctedIndex)
		return correctedIndex;

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
			if(curSectionName == "philosophy")
			{
				nextSlide();
			}
			else
			{
				clearInterval(slideshowTimer)
			}
		} , 10000)
	}

	function prevSlide(){

		var tempSlide = curSlide

		tempSlide--;

		if(tempSlide < 0)
		{
			tempSlide = numSlides-1;
		}
			

		showSlide(tempSlide , true);

	}

	function nextSlide(){
		
		var tempSlide = curSlide

		tempSlide++;

		if(tempSlide >= numSlides)
		{
			tempSlide = 0;
		}
			

		showSlide(tempSlide , true);
	}

	function showSlide(index , isAuto){

		if(slideFading  || !isGallery)
			return;

		curSlide = index;

		if(!isAuto)
		{
			if(slideshowTimer)
				clearInterval(slideshowTimer);
		}

		$(".progBlock").removeClass("active");
		$(".progBlock").eq(index).addClass("active");

		slideFading = true;

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

		showBg( getBgNumber("philosophy" + (index+1)) )

		function fadeInSlide(){
			$(".philosophy-gallery").eq(index).fadeIn("slow" , function(){
				if(!isAuto)
				{
					startSlideShow();
				}
			}).addClass("active");

			slideFading = false;
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

		
		var padding = 20;

		var leftOffset ;
		var leftHeight ;
		var leftWidth ;

		var rightOffsetTop;
		var rightOffsetLeft;
		var rightHeight;
		var rightWidth ;



		if(!DETECTION.isMobile)
		{
			leftOffset = 50;

			leftHeight = CONFIG.contentHeight - (leftOffset*2);
			leftWidth = 250;
			rightHeight = leftHeight * 0.7;
			rightWidth = rightHeight * 1.3;
			rightOffsetTop = CONFIG.contentHeight - (rightHeight + leftOffset)
			rightOffsetLeft = CONFIG.contentWidth - (rightWidth + leftOffset);
		}

			$("#content").css({
				"width" : CONFIG.contentWidth
			})

			console.log( CONFIG.windowHeight, CONFIG.contentHeight)

		//menu position
		var leftMenuCss = {
			"top" : leftOffset + "px",
			"left" : leftOffset + "px",
			"height" : leftHeight,
			"width" : leftWidth
		}

		var rightContentCss = {
			"top" : rightOffsetTop + "px",
			"left" : rightOffsetLeft + "px",
			"height" : rightHeight,
			"width" : rightWidth
		}


		//menu content
		var leftMenuContentCss = {
			"top" : padding + "px",
			"left" : padding + "px",
			"height" : leftMenuCss.height - (padding * 2),
			"width"	 : leftMenuCss.width - (padding * 2)
		}

		var rightMenuContentCss = {
			"top" : padding + "px",
			"left" : padding + "px",
			"height" : rightContentCss.height - (padding * 2),
			"width"	 : rightContentCss.width - (padding * 2)
		}

		$("#left-menu-container").css(leftMenuCss);
		$("#right-content").css(rightContentCss);

		$("#left-menu-container	 .menu-content").css(leftMenuContentCss);
		$("#right-content .menu-content").css(rightMenuContentCss);

		//resizing background images
		$(".background").each(function(){
			var img = $(this).find("img");

			if(img.length > 0)
			{
				var origDim = img[0].imgDim;
				var imgDim = UTILS.resizeWithExcessCalc(origDim.w , origDim.h , 0 , CONFIG.contentWidth , CONFIG.contentHeight);

				$(this).css({
					"width" : imgDim.w,
					"height" : imgDim.h,
					"top" : imgDim.t + "px",
					"left" : imgDim.l + "px"
				});
			}
		});

		//big resize

		


	}
}