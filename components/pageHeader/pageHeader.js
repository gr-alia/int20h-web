var $ = require('jquery');
require('unitegallery');

$(document).ready(function(){
	console.log('pageHeader script loaded'); // eslint-disable-line no-console
	jQuery("#gallery").unitegallery({
		tiles_type:"nested"		
		}
	); 
			
});
