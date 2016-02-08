$(window).load(function() {

	var winHeight = $(window).height();
	var winWidth = $(window).width();
	var smallBreakpoint = 767;
	var midBreakpoint = 991;
	var largeBreakpoint = 1199;

	var ScreenIsSmall;
	var ScreenIsMid;
	var ScreenIsBig;
	var ScreenIsLarge;


	function resizeMainMenu( winWidth, winHeight ){
		var nav = $('#mainMenuPopup');
		var navItem = nav.find('.navListItem');
		var headerHeight = 80;
		var socialHeight = 45 + 20*2;
		var itemTextHeight = 0;
		if ( winWidth <= smallBreakpoint ){
			itemTextHeight = 37;
		} else {
			itemTextHeight = 50;
		}

		var itemPadding = (winHeight - headerHeight - socialHeight - itemTextHeight*4)/8;
		navItem.css('padding-top', itemPadding).css('padding-bottom', itemPadding);
	};


	function resizeAll( winWidth, winHeight ){
		ScreenIsSmall = ( winWidth <= smallBreakpoint );
		ScreenIsMid = ( winWidth > smallBreakpoint && winWidth <= midBreakpoint );
		ScreenIsBig = ( winWidth > midBreakpoint && winWidth <= largeBreakpoint );
		ScreenIsLarge = ( winWidth > largeBreakpoint );

		if ( $('.topBanner').hasClass('fitnessPageBanner') ){
			$('.topBanner').css('height', winHeight + 120);
		} else {
			$('.topBanner').css('height', winHeight);
		};
		$('.cartBlockWrapper').css('height', winHeight);

		//var mobileBgHeight = $('.smallScreenBg>.img').height();
		/*if ( !ScreenIsSmall ){
			if ( $('.topBanner').hasClass('fitnessPageBanner') ){
				$('.topBanner').css('height', winHeight + 120)
			} else {
				$('.topBanner').css('height', winHeight)
			};
		} else {
			$('.topBanner').css('height', mobileBgHeight)
		};
		$('.cartBlockWrapper').css('height', winHeight);
		*/

		resizeMainMenu( winWidth, winHeight );

		$('.trianBg').each(function(){
			$(this).css('margin-top', -$(this).height() );
		});


		if ( ScreenIsSmall ){
			// small screens resize
			console.log( 'Small screen. Window width = ' + winWidth + 'px' );
			$('.ipadBg').removeClass('wide').find('.ipadimgCont').removeClass('hidden');
		};

		if ( ScreenIsSmall || ScreenIsMid ){
			var articleCard = $('.articleTopCard.pos1');
			articleCard.css('margin-top',  -(articleCard.outerHeight() + 20 ) );
		}

		if ( ScreenIsMid || ScreenIsBig ){
			// medium screen resize
			console.log( 'Mediun screen. Window width = ' + winWidth + 'px' );
			$('.ipadBg').removeClass('wide').find('.ipadimgCont').removeClass('hidden');
		};

		if ( ScreenIsLarge ){
			// large screen resize
			console.log( 'Large screen. Window width = ' + winWidth + 'px' );
			$('.ipadBg').addClass('wide').find('.ipadimgCont').addClass('hidden');
		};

		if ( ScreenIsLarge || ScreenIsBig ){
			var blockHeight;
			var cardHeight;
			$('.cardCollage').each( function(){
				blockHeight = $(this).height();
				cardHeight = $(this).find('.infoCardWrapper').outerHeight();

				console.log( $(this).attr('class') );
				console.log(  blockHeight, cardHeight );
				if ( cardHeight > blockHeight ){
					$(this).height( cardHeight );
				}
			});
		}

		if ( ScreenIsLarge ){
			$('#cartIcon').mouseover( openCartPopup )
		} else {
			$('#cartIcon').click( openCartPopup )
		};
	};


	function openCartPopup(){
		var card = $('#cartPopup');
		var cardWrapper = $('#cartPopupWrapper');

		card.removeClass('hidden animated fadeOutDown').addClass('animated fadeInUp');
		cardWrapper.removeClass('hidden animated fadeOut').addClass('animated fadeIn').toggleClass('opened');
		$('#cartIcon').addClass('opened');
	};

	function openDownloadPopup(){
		var card = $('#downloadPopup');
		var cardWrapper = $('#downloadPopupWrapper');

		card.removeClass('hidden animated fadeOutDown').addClass('animated fadeInUp');
		cardWrapper.removeClass('hidden animated fadeOut').addClass('animated fadeIn').toggleClass('opened');
	};

	function closeCartPopup(){
		var card = $('#cartPopup');
		var cardWrapper = $('#cartPopupWrapper');

		card.removeClass('animated fadeInUp').addClass('animated fadeOutDown');
		cardWrapper.removeClass('animated fadeIn').addClass('animated fadeOut');
		card.delay(400).queue(function(){
			cardWrapper.addClass('hidden').removeClass('opened');
			card.addClass('hidden').dequeue();
		});
		$('#cartIcon').removeClass('opened');
	};

	function closeDownloadPopup(){
		var card = $('#downloadPopup');
		var cardWrapper = $('#downloadPopupWrapper');

		card.removeClass('animated fadeInUp').addClass('animated fadeOutDown');
		cardWrapper.removeClass('animated fadeIn').addClass('animated fadeOut');
		card.delay(400).queue(function(){
			cardWrapper.addClass('hidden').removeClass('opened');
			card.addClass('hidden').dequeue();
		});
	};


	function isEmpty( el ){
      return !$.trim( el.html() )
  }













	resizeAll( winWidth, winHeight );
	$(window).resize(function(event) {
		winHeight = $(window).height();
		winWidth = $(window).width();
		resizeAll( winWidth, winHeight );
	});


	$('#pressLogoCarousel').bxSlider({
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 200,
		moveSlides: 1,
		slideMargin: winWidth <= largeBreakpoint ? 5 : 30,
		pager: false,
		adaptiveHeight: true
	});



	$('.openDownloadPopup').click( openDownloadPopup );
	$('#cartPopupBg').click( closeCartPopup );
	$('#downloadPopupBg').click( closeDownloadPopup );





	$('#deleteProductPopupItem').click(function(){
		var product = $(this).parents('.listItem');
		var productList = $(this).parents('.products');
		var card = $(this).parents('.cartBlock');
		var cartIcon = $('.cartCont');

		console.log( productList.html() );
		product.remove();
		console.log( productList.html() );

		if ( isEmpty( productList ) ) {
			closeCartPopup();
			cartIcon.addClass('hidden');
		};
	});


	$('#nav-icon3').click( function(){
		var menuTitle = $('#headerMenuName');
		var navMenu = $('#mainMenuPopup');
		if ( $(this).hasClass('open') ){
			menuTitle.find('#closed').addClass('hidden');
			menuTitle.find('#opened').removeClass('hidden');
			navMenu.removeClass('animated fadeIn').addClass('animated fadeOut');
			navMenu.delay(400).queue(function(){
				$(this).addClass('hidden').dequeue();
			});
		} else {
			menuTitle.find('#closed').removeClass('hidden');
			menuTitle.find('#opened').addClass('hidden');
			navMenu.removeClass('hidden animated fadeOut').addClass('animated fadeIn');
		};
		if ( $('#cartIcon').hasClass('opened') ){
			closeCartPopup()
		}
		$(this).toggleClass('open');
	});


	$('#blogSearchInput').click(function(){
		var inpWrapper = $(this).parent('.transpAnimatedInputFldWrapper');
		var searchBlock = $(this).parents('.searchInpField');
		if ( !inpWrapper.hasClass('focused') ){
			inpWrapper.addClass('focused');
			searchBlock.addClass('active')
			$(this).removeClass('rightAlign')
		}
	});


	$('#blogSearchInp').click(function(){
		if ( !$(this).hasClass('active') ){
			/*if ( ScreenIsSmall ){
				$('#blogCatSelect-styler').addClass('hidden');
			}*/
			$('.transpAnimatedInputFldWrapper').addClass('focused');
			$('#blogSearchInp').addClass('active');
			$(this).find('input[name="searchRequest"]').focus();
		}
	});


	$("a[rel='m_PageScroll2id']").mPageScroll2id();

	$('.fancybox-media').fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        helpers : {
            media : {}
        }
    });

});