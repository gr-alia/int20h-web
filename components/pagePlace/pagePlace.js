var $ = require('jquery');
require('../../scripts/libs/colcarou.js'); 

var initPlaceGallery = function() {
	if ($(window).width() >= 992) {
		$('.placeContainer').colcarou();
	}
};

$(document).ready(function(){
	initPlaceGallery();
});