var CONFIG = new configClass();

function configClass(){

	var self = this;

	self.windowHeight = 0;
	self.windowWidth = 0;

	self.contentHeight = 0;
	self.contentWidth = 0;

	self.mouseX = 0;
	self.mouseY = 0;

	self.baseURL = document.URL;

	self.assetPath = self.baseURL + "assets";
	self.imagePath = self.assetPath + "/img/";

	//debug variables
	self.mobileDebug = false;


	self.init = function(){

		

		URLConditions();


	}

	function URLConditions(){
		var curURL = self.baseURL;

		if( curURL.indexOf("charlieclark")>=0 )
		{
			
		}

	}
 
}
 
