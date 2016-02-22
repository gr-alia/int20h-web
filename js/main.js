$(document).ready(function() {

	var winHeight = $(window).height();
	var winWidth = $(window).width();
	var smallBreakpoint = 767;
	var midBreakpoint = 991;
	var largeBreakpoint = 1199;

	var ScreenIsSmall;
	var ScreenIsMid;
	var ScreenIsBig;
	var ScreenIsLarge;

	function resizeAll( winWidth, winHeight ){
		ScreenIsSmall = ( winWidth <= smallBreakpoint );
		ScreenIsMid = ( winWidth > smallBreakpoint && winWidth <= midBreakpoint );
		ScreenIsBig = ( winWidth > midBreakpoint && winWidth <= largeBreakpoint );
		ScreenIsLarge = ( winWidth > largeBreakpoint );


	};
	resizeAll( winWidth, winHeight );
	$(window).resize(function(event) {
		winHeight = $(window).height();
		winWidth = $(window).width();
		resizeAll( winWidth, winHeight );
	});



});
