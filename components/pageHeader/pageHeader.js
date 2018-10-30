var $ = require('jquery');
window.jQuery = $; // make jQuery visible from global scope for libs
window.$ = $;

require('chocolat');
require('slick-carousel');
require('flip');

var initContactGallery = function() {
	$('.contactsContainer').slick({
		slidesToShow: 3,
		responsive: [{
			breakpoint: 1024,
			settings: {
				arrows: false,
				slidesToShow: 3
			}
		},

		{
			breakpoint: 768,
			settings: {
				arrows: false,
				dots: true,
				slidesToShow: 1
			}
		}]
	});
};

var firstCardFlipped = false;
var flipFirstCardOnMobile = function(){
	var cardElem = $('#firstCard');
	var cardSourceTop = cardElem.offset().top - $(window).height()/3;
	window.onscroll = function() {
		if (!firstCardFlipped && window.pageYOffset > cardSourceTop){
			$('#firstCard').flip('toggle');
			firstCardFlipped = true;
		}
	};
};

$(document).ready(function(){
	$('.pageBenefits-card').flip({
		trigger: 'hover'
	});

	if ($(window).width() <= 576) {
		flipFirstCardOnMobile();
	}


	$('.pageLast-photos').Chocolat({
		enableZoom: false,
		loop: true
	}
	);

	initContactGallery();
});
