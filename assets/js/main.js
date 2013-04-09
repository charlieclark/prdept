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

	$("#container").mousemove(function(e){
		CONFIG.mouseX = e.pageX;
		CONFIG.mouseY = e.pageY;
	});
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




