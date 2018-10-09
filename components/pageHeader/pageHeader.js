var $ = require('jquery');
require('chocolat');
require('slick-carousel');

$(document).ready(function(){
	$('.pageLast-photos').Chocolat({
		enableZoom: false,
		loop: true
	}
	);
	$('.contactsContainer').slick({
		// normal options...
		infinite: false,

		// the magic
		responsive: [{
			breakpoint: 21000,
			settings: {
				slidesToShow: 3,
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				dots: true,
				infinite: true
			}
		}]
	});
});
