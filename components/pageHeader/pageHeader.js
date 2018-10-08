var $ = require('jquery');
require('chocolat');

$(document).ready(function(){
	console.log('pageHeader script loaded'); // eslint-disable-line no-console
	$('.gallery-last').Chocolat({
			imageSelector     : '.chocolat-image',
			loop           : true,
  			fullWindow     : 'cover',
 			overlayOpacity : 0.9			
		}
	);

	
			
});
