//global vars

var mainPath = document.URL;
var assetPath = document.URL + "assets";
var curLang = "en";


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
			
});

function getWidthHeight(){
		CONFIG.windowHeight = $(window).height();
		CONFIG.windowWidth 	= $(window).width();

		CONFIG.contentHeight = CONFIG.windowHeight;
		CONFIG.contentWidth = CONFIG.windowWidth;
}




