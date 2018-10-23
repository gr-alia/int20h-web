var $ = require('jquery');
require('../../scripts/libs/colcarou.js'); 
var isColcarouStarted = false;

var initPlaceGallery = function() {
	if ($(window).width() >= 805 && !isColcarouStarted) {
		$('.placeContainer-desktop').colcarou();
		isColcarouStarted = true;
	}
};

$(document).ready(function(){
	$(window).on('resize', initPlaceGallery);
	initPlaceGallery();
});