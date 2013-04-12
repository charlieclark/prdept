//global vars

var mainPath = document.URL;
var assetPath = document.URL + "assets";
var curLang = "en";
var curLayoutTag = null;


$(document).ready(function(){
	init();
});

function init(){


	//init preload
	PRELOAD.init(preloadData.defaultSections , [] );

	//initializing classes
	TEMPLATE.init();
	CONFIG.init();
	LAYOUT.init();
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
}

function loadHandlers(){

	 $(PRELOAD).on('group-finished' , function(event , data){

	 	var tag = data.groupTag;
	 	var elArray = data.elementArray;

	 	if(tag == "firstAssets")
	 	{
	 		LAYOUT.insertBackground(elArray[0] , elArray[0].name);
	 	}
	 	else if(tag == "backgrounds")
	 	{
	 		for( var i = 0 ; i < elArray.length ; i++)
	 		{
	 			var img = elArray[i];
	 			LAYOUT.insertBackground(img , img.name)
	 		}
	 	}
	 	
	 });
}

function mouseEvents(){

	//global
	$("#container").mousemove(function(e){
		CONFIG.mouseX = e.pageX;
		CONFIG.mouseY = e.pageY;
	});

	$("#left-menu .menu li").click(function(){
		console.log("click");
		LAYOUT.showSection($(this).index());
	});

	//philosophy
	$(".progBlock").click(function(){
		LAYOUT.gallerySlide($(this).index());
	})

	//services
	$("#services-container .bullet .title").click(function(){
		LAYOUT.showBullet($(this).index("#services-container .bullet .title") , "#services-container .bullet .body" );
	})

	$("#team-container .bullet .title").click(function(){
		LAYOUT.showBullet($(this).index("#team-container .bullet .title") , "#team-container .bullet .body" );
	})
}

//resize logic

$(window).resize(function(){
		getWidthHeight();
		LAYOUT.resize();
		checkBreakpoints();
			
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
			$("#content").removeClass(allLayoutTags[i]);
		}

		$("#content").addClass(curLayoutTag);
	}
}

function getWidthHeight(){
		CONFIG.windowHeight = $(window).height();
		CONFIG.windowWidth 	= $(window).width();

		CONFIG.contentHeight = CONFIG.windowHeight;
		CONFIG.contentWidth = CONFIG.windowWidth;
}




