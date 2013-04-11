var TEMPLATE = new templateClass();

function templateClass(){
	
	var self = this;

	self.init = function(){
		buildTemplates();
	}

	self.compileTemplate = function(selector , context , dest){

		var source   = $("#"+selector).html();
		var template = Handlebars.compile(source);
		var html = template(context);

		if(dest)

			dest.html(html)

		return html;

	}
	function buildTemplates(){

		processLanguageTemplate( $("#philosophy-container") , "philosophy" , copyData["philosophy"] );
		processLanguageTemplate( $("#services-container") , "services" , copyData["services"] );
		processLanguageTemplate( $("#clients-container") , "clients" , copyData["clients"] );
		processLanguageTemplate( $("#team-container") , "team" , copyData["team"] );

	}

	function processLanguageTemplate( el , templateClass , copy){
		var newCopyObj = {};

		//looping through propreties of copy object
		for( copyEl in copy)
		{
			var tempObj = copy[copyEl]

			//checking if object is an array and if so looping through contents and getting correct language
			var isArray =  $.isArray( tempObj ) ;
			var arrayObj = [];

			if( isArray )
			{
				for( var j = 0 ; j < tempObj.length ; j++)
				{
					var obj = tempObj[j];

					if( obj[curLang] )
					{
						arrayObj.push( obj[curLang] )
					}	
					else
					{
						if(typeof obj == 'string')
						{
							arrayObj.push(obj) 
						}
						else
						{
							var newObj = {};
							for( p in obj)
							{
								if(  obj[p][curLang] )
								{
									newObj[p] = obj[p][curLang]
								}
								else
								{
									newObj[p] = obj[p]
								}
								
							}
							arrayObj.push(newObj) 
						}
						
					}			
				}

				newCopyObj[copyEl] = arrayObj;

			}
			else
			{
				if( tempObj[curLang] )
				{
					newCopyObj[copyEl] = getMobileCopy(tempObj , curLang)
				}
				else
				{
					newCopyObj[copyEl] = tempObj
				}
			}						
		}

		self.compileTemplate( templateClass ,  newCopyObj , el );
	}

	function getMobileCopy( obj , lang )
	{

		var tag = lang;

		if(DETECTION.isMobile)
		{
			tag = "mobile-" + lang;

			if(obj[tag])
			{
				return obj[tag]
			}
			else
			{
				return obj[lang]
			}
		}
		else
		{
			return obj[tag]
		}

		
	}

	

}