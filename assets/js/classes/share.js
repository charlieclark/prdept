var SHARE = new shareClass();

function shareClass(){
	
	var self = this;
	var popupDim = null;
	var defaultShareUrl = CONFIG.baseURL;
	var defaultTitle = "PR DEPT, a full service entertainment & lifestyle  public relations firm.";

	self.init = function(){

		popupDim = {
			"w" : 999,
			"h" : 575
		}
	}


	self.fbShare = function() {

		var newUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + defaultShareUrl;
		openPopup(newUrl);
	}

	self.twShare = function(){


		var shareURL = encodeURIComponent( defaultShareUrl );
		var via = "";
		var text = encodeURIComponent( defaultTitle );
		var newUrl = 'https://twitter.com/intent/tweet?text=' + text;
		
		openPopup(newUrl);

	}

	function openPopup( url )
	{
			window.open( url , "_blank" , "width=" + popupDim.w +",height=" +popupDim.h +",left=" + ( window.screen.width - popupDim.w ) * 0.5 + ",top=" + ( window.screen.height - popupDim.h ) * 0.5 ); 
	}

}