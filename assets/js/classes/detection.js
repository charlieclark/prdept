var DETECTION = new detectionClass();

function detectionClass = function(){
	
	var self = this;

	self.isMobile = null;
	self.isTouchDevice	= null;

	self.init = function(){

		self.isTouchDevice = isTouchDevice();


	}

	//public functions

	self.isTouch = function(){
		return !!('ontouchstart' in window)         
	}

	//private functions

	function isTouchDevice(){
		var is = false;

		if(self.isTouch())
			is = true;

		return is;
	}
}