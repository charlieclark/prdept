var MOBILE = new mobileClass();

function mobileClass(){
	
	var self = this;
	var hasInit = false;
	var menuOpen = false;

	//config
	var menuOffset = 50;

	self.init = function(){

		if(!hasInit)
		{
			hasInit = true;

			$("#mobile-menu-close").click(function(){
				self.toggleMenu(!menuOpen);
			})
		}

		self.activate();
	}

	self.deactivate = function(){
		$(".mobile-item-show").hide();
		$(".mobile-item-hide").show();
	}

	self.activate = function(){
		menuOpen = false;
		self.toggleMenu(false);
		$(".mobile-item-hide").hide();
		$(".mobile-item-show").show();
	}

	self.mobileData = function(){
		return { "menuOffset" : menuOffset }
	}


	//global functions
	self.toggleMenu = function(isOpen){

		menuOpen = isOpen;

		if(menuOpen)
		{
			$("#mobile-menu-close").html("close");
			$("#left-menu").css({
				"top" : 0
			});
		}
		else
		{
			$("#mobile-menu-close").html("open");
			$("#left-menu").css({
				"top" : -$("#left-menu").height() + 50 +"px"
			});
		}
	}

	
}