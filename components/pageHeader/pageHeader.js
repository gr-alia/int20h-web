var $= require('jquery');
require('chocolat');
require('slick-carousel');
require('flip');

$(document).ready(function(){
	$('.pageBenefits-card').flip({
		trigger: 'hover'
	});

	$('.pageLast-photos').Chocolat({
		enableZoom: false,
		loop: true
	}
	);

	$('.contactsContainer').slick({
		// normal options...
		infinite: false,
		arrows: false,

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
				dots: true
			}
		}]
	});
});
