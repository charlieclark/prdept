//global vars

var mainPath = document.URL;
var assetPath = document.URL + "assets";
var curLang = "en";
var curLayoutTag = null;
var isMobile = null;
var isGallery = null;


$(document).ready(function(){
	init();
});

function init(){


	//init preload
	PRELOAD.init(preloadData.defaultSections , [] );

	//initializing classes
	DETECTION.init();
	TEMPLATE.init();
	CONFIG.init();
	LAYOUT.init();
	SHARE.init();
	TWITTER.init();


	//init render loop
	animate();

	//mouseEvents
	mouseEvents();
	loadHandlers();

	//resize
	$(window).resize();

}

function animate(){
	requestAnimFrame(animate);
	renderLoop();
}

function renderLoop(){
	//render classes here
	if(isMobile)
	{
		MOBILE.checkScroll();
	}
}

function loadHandlers(){

	 $(PRELOAD).on('group-finished' , function(event , data){

	 	var tag = data.groupTag;
	 	var elArray = data.elementArray;


	 	for (var i = 0 ; i < elArray.length ; i++)
	 	{
	 		var curEl = elArray[i];
	 		handleAssetLoad(curEl , tag , i);
	 	}

	 	$(window).resize();
	 	
	 }); 
}

function handleAssetLoad(el , tag , index)
{
	var name = el.name;

	if( tag.indexOf("first-assets") >= 0 )
	{
		LAYOUT.insertBackground(el , name);
	}
	else if(tag.indexOf("backgrounds") >= 0)
 	{
 		LAYOUT.insertBackground(el , name)
 	}
}


function mouseEvents(){

	//global
	$("#background-container").mousemove(function(e){
		CONFIG.mouseX = e.pageX;
		CONFIG.mouseY = e.pageY;

		if(isGallery)
		{
			if(CONFIG.mouseX >  CONFIG.windowWidth/2)
			{
				$("body").addClass("rightArrow");
				$("body").removeClass("leftArrow");
			}
			else
			{
				$("body").addClass("leftArrow");
				$("body").removeClass("rightArrow");
			}
		}
		else
		{
			$("body").removeClass("leftArrow");
			$("body").removeClass("rightArrow");
		}
	});

	$("#content").click(function(){
		if($("body").hasClass("leftArrow"))
		{
			LAYOUT.prevSlide();
		}
		else if($("body").hasClass("rightArrow"))
		{
			LAYOUT.nextSlide();
		}
	})

	$("#left-menu .menu li").click(function(){

		LAYOUT.showSection($(this).index());
		$("#left-menu .menu li").removeClass("active");
		$(this).addClass("active")

	});

	$("#left-menu .title").click(function(){
		LAYOUT.showSection(-1);
		
	})

	//philosophy
	$(".progBlock").click(function(){
		LAYOUT.gallerySlide($(this).index());
	});

	//services
	$("#services-container .bullet .title").click(function(){
		LAYOUT.showBullet($(this).index("#services-container .bullet .title") , "#services-container .bullet .body" );
		
		var curBullet = $(this).parents(".bullet").find(".bullet-icon");
		var allBullets = $("#services-container .bullet .bullet-icon");

		if(curBullet.hasClass("open"))
		{
			allBullets.removeClass("open");
		}
		else
		{
			allBullets.removeClass("open");
			curBullet.addClass("open");
		}	
	});

	$("#team-container .bullet .title").click(function(){
		LAYOUT.showBullet($(this).index("#team-container .bullet .title") , "#team-container .bullet .body" );

		var curBullet = $(this).parents(".bullet").find(".bullet-icon");
		var allBullets = $("#team-container .bullet .bullet-icon");

		if(curBullet.hasClass("open"))
		{
			allBullets.removeClass("open");
		}
		else
		{
			allBullets.removeClass("open");
			curBullet.addClass("open");
		}
	
	});

	$(".social-icon").click(function(){
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

//resize logic

$(window).resize(function(){
		getWidthHeight();
		checkBreakpoints();

		//resizing classes
		LAYOUT.resize();
		DETECTION.resize();
			
});

function checkBreakpoints(){

	if(CONFIG.contentWidth < 500)
	{
		layoutChange("mobile");
	}
	else
	{
		layoutChange("desktop")
	}

}

function layoutChange(tag){

	var allLayoutTags = ["desktop" , "mobile"];

	if( curLayoutTag != tag)
	{
		curLayoutTag = tag;

		for( var i = 0 ; i < allLayoutTags.length ; i++)
		{
			$("body").removeClass(allLayoutTags[i]);
		}

		$("body").addClass(curLayoutTag);

		if(curLayoutTag == "mobile")
		{
			MOBILE.init();
			isMobile = true;
		}
		else if(curLayoutTag == "desktop")
		{
			MOBILE.deactivate();
			isMobile = false;
		}
	}
}

function getWidthHeight(){
		CONFIG.windowHeight = $(window).height();
		CONFIG.windowWidth 	= $(window).width();

		CONFIG.contentHeight = CONFIG.windowHeight;
		CONFIG.contentWidth = CONFIG.windowWidth;
}




