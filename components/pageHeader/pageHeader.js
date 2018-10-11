var $ = require('jquery');
window.jQuery = $; // make jQuery visible from global scope for libs
window.$ = $;

require('chocolat');
require('slick-carousel');
require('flip');

var initContactGallery = function() {
	if ($(window).width() <= 576) {
		$('.contactsContainer').slick({
			// normal options...
			infinite: false,
			arrows: false,
	
			// the magic
			responsive: [{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					dots: true
				}
			}]
		});
	}
};

$(document).ready(function(){
	$('.pageBenefits-card').flip({
		trigger: 'hover'
	});

	$('.pageLast-photos').Chocolat({
		enableZoom: false,
		loop: true
	}
	);

	initContactGallery();
	// $(window).on('resize', initContactGallery);
});
