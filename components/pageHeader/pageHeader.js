var $ = require('jquery');
require('chocolat');

$(document).ready(function(){
	$('.pageLast-photos').Chocolat({
		enableZoom: false,
		loop: true
	}
	);
});
