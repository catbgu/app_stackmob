var screenWidth = $(window).width();
var screenHeight = $(window).height();

$(document).ready(function(){
	// Check if a new cache is available on page load. Swap it in and reload the page to get the new hotness.
	window.addEventListener('load', function(e) {
	  window.applicationCache.addEventListener('updateready', function(e) {
	    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	      // Browser downloaded a new app cache. Swap it in and reload the page to get the new hotness.
	      window.applicationCache.swapCache();
	      window.location.reload();
	    } 
	  }, false);
	}, false);
	
	/* Different layout for desktop browsers */
	var mobile = navigator.userAgent.match(/iPhone|Android|Windows Phone|BlackBerry/i);
	if(!mobile){
		//Music.html page
		$(".row.artist-list").wrapInner("<ul class='medium-block-grid-4 large-block-grid-6'  id='grid' style='width: 100.1%;'></ul>");
		
		$(".four.columns.artist-btn").removeClass("four columns artist-btn").addClass("centred").wrap("<li class='element'></li>").prepend("<img class='music-icon' src='../static/img/icons/music-icon-small.png' />");
		
		$(".artist-name").wrap("<div class='video-info'></div>");
		$(".artist-name").wrapInner("<h5></h5>");
		
		//Artist.html page
		$(".row.artist-video-list").wrapInner("<ul class='medium-block-grid-4 large-block-grid-6'  id='grid' style='width: 100.1%;'></ul>");
		
		$(".four.columns.artist-video-btn").removeClass("four columns artist-video-btn").addClass("centred").wrap("<li class='element'></li>").prepend("<img class='shop-icon' src='../../../static/img/icons/shop-icon-small.png' style='width: 55px; height: 55px;' />");
		
		$(".video-title").removeClass("video-title").addClass("artist-name");
		//$(".video-title").wrapInner("<h5></h5>");
	}

	$(document).foundation(); 
	//Define Click Event for Mobile
	if( 'ontouchstart' in window ){ 
		var click = 'singleTap'; 
	}else{ 
		var click = 'click';
	}	

    //$("#spinner").css('top', screenHeight/2+10);

	window.onload = function(){
	  //$(".spinner-wrap").fadeOut(50);
	  $(".footer").fadeIn(100);
	};  	

/*FOOTER BUTTONS*/
  //Settings MENU
	/*	Reveal Menu */
	$('.footer-settings').on(click, function(e){
		e.stopImmediatePropagation();
		e.preventDefault();	
		if( !$('.content').hasClass('inactive') ){				
			// Slide and scale content		
			$('.footer').hide();
			$('.content, .settings-menu').addClass('inactive');
			setTimeout(function(){ $('.content').addClass('flag'); }, 100);
			
			// Change status bar
			$('.status').fadeOut(100, function(){
				$(this).toggleClass('active').fadeIn(300);
			});
			
			// Slide in menu links
			var timer = 0;
			$.each($('li'), function(i,v){
				timer = 40 * i;
				setTimeout(function(){
					$(v).addClass('visible');
				}, timer);
			});
		}
	});

	/*	Close Menu */
	function closeMenu() {		
		// Slide and scale content
		$('.content, .settings-menu').removeClass('inactive flag');
		
		// Change status bar
		$('.status').fadeOut(100, function(){
			$(this).toggleClass('active').fadeIn(300);
		});

		// $(".fx-container").css("width", screenWidth);			
		
		// Reset menu
		setTimeout(function(){
			$('li').removeClass('visible');
			$('.footer').fadeIn(100);
		}, 300);
	}
	
	$('.content').on(click, function(){
		if( $('.content').hasClass('flag') ){
			closeMenu();
		}
	});
	$('.settings-back').on(click, function(e){
		e.preventDefault();
		closeMenu();
	});
	$('.settings-back-back').on(click, function(){
		$('.settings-back-back').hide();
		$('.settings-menu-list, .settings-back').show();
		$(".ajax-container").html("");
		$('.settings-title').text('Settings');
	});	
	$('.my-profile').on(click,function(){
	   $.ajax({
	      url:"../templates/settings/my-profile.html",
	      dataType:'html',
	      success:function(data) {
	        $(".ajax-container").html(data);
	      }
	   });
	   $('.settings-title').text('My Profile');
	   $('.settings-footer, .settings-menu-list, .settings-back').hide();
	   $('.settings-back-back').show();
	});	
	$('.email-preferences').on(click,function(){
	   $.ajax({
	      url:"../templates/settings/email-preferences.html",
	      dataType:'html',
	      success:function(data) {
	        $(".ajax-container").html(data);
	      }
	   });
	   $('.settings-title').text('Email Preferences');
	   $('.settings-footer, .settings-menu-list, .settings-back').hide();
	   $('.settings-back-back').show();
	});		
	$('.invite-friends').on(click,function(){
	   $.ajax({
	      url:"../templates/settings/invite-friends.html",
	      dataType:'html',
	      success:function(data) {
	        $(".ajax-container").html(data);
	      }
	   });
	   $('.settings-title').text('Invite Friends');
	   $('.settings-footer, .settings-menu-list, .settings-back').hide();
	   $('.settings-back-back').show();
	});
	$('.send-feedback').on(click,function(){
	   $.ajax({
	      url:"../templates/settings/send-feedback.html",
	      dataType:'html',
	      success:function(data) {
	        $(".ajax-container").html(data);
	      }
	   });
	   $('.settings-title').text('Send Feedback');
	   $('.settings-footer, .settings-menu-list, .settings-back').hide();
	   $('.settings-back-back').show();
	});	
	$('.help').on(click,function(){
	   $.ajax({
	      url:"../templates/settings/help.html",
	      dataType:'html',
	      success:function(data) {
	        $(".ajax-container").html(data);
	      }
	   });
	   $('.settings-title').text('Help');
	   $('.settings-footer, .settings-menu-list, .settings-back').hide();
	   $('.settings-back-back').show();
	});	
	$('.legal').on(click,function(){
	   $.ajax({
	      url:"../templates/settings/legal.html",
	      dataType:'html',
	      success:function(data) {
	        $(".ajax-container").html(data);
	      }
	   });
	   $('.settings-title').text('Legal');
	   $('.settings-footer, .settings-menu-list, .settings-back').hide();
	   $('.settings-back-back').show();
	});
  //END Settings MENU
  //Bookmark & Following buttons
    $('a.footer-btn').on(click, function(e){
        e.preventDefault();
        var position = $('#footer-container').position();
        if ($(this).hasClass('footer-bookmarks')){
        	var divActive = 'bookmarks';
        	var divInactive = 'following';
        } else {
        	var divActive = 'following';
        	var divInactive = 'bookmarks';
        }
        if ($('.footer-'+divInactive).hasClass('selected')){
        	$("#footer-container").html('');
			$.ajax({
				url:"../templates/footer/"+divActive+".html",
				dataType:'html',
				success:function(data) {
					$("#footer-container").html(data);
				}
			});	
			$(this).addClass('selected');
			$('.footer-'+divInactive).removeClass('selected');
        }else{
			
	        if(position.top == 1200){ 
				$("#footer-container").css('top', $(window).height() + "px");
				position.top = $(window).height();
				
	        	$(this).addClass('selected');
	        	$(".main-container").css('height',screenHeight);
	        	$("#footer-container").css('height',$(window).height() + "px");
				$.ajax({
					url:"../templates/footer/"+divActive+".html",
					dataType:'html',
					success:function(data) {
						$("#footer-container").html(data);
					}
				});	
				$('#footer-container').attr('class', '').addClass('move-up');
	        }else{
	        	$(".main-container").css('height','100%');
	            $('#footer-container').attr('class', '').addClass('move-down');
	            $(this).removeClass('selected');
	        }
    	}
    });
    $("#footer-container").bind("oanimationend animationend webkitAnimationEnd", function(){
        if($("#footer-container").hasClass('move-up')) $("#footer-container").addClass('move-up-final');
        if($("#footer-container").hasClass('move-down')) $("#footer-container").addClass('move-down-final');
    });   

//Artist Screen
	$(".follow-btn").on(click,function(){
	  $(this).toggleClass('selected');
	});

//Video Screen
	$(".video-poster iframe").css({
		width: '100%',
		height: 529
	});

//Product Screen
	$("#bookmark-item-btn").on(click,function(e){
		e.preventDefault();			
	  $(this).toggleClass('selected');
	});

    $(".maximize-btn").on(click, function(e){ 
		//e.stopImmediatePropagation();
    	//$(".clearing-featured-img img").click(); 

    }); 
	

//Retailer Button
    $(".retailer-btn").on(click, function(){ 
	    var retailerUrl = $(".retailer-btn").attr("data-src");

		if( 'ontouchstart' in window ){//touch device
			var win=window.open(retailerUrl, '_blank');
			win.focus();
		}else{//non-touch device
			$("#footer-container-iframe").attr("src",retailerUrl); 

	    	$(".main-container").css('height',screenHeight);
	    	$("#footer-container-iframe").css('height',screenHeight-88);
	    	$("#footer-container-iframe").attr("seamless","yes");        	
			$("#footer-container").css('overflow-y','hidden');    		
	    	$("#footer-container").css('padding-left','0');
	    	
	    	$(".back-btn").hide();

			$(".footer-btn, .footer-settings").fadeOut();
			$(".footer-retailer-back, .footer-retailer-fwd").fadeIn();    		
	    	$(".close-retailer-btn").show();
	    	var retailerName = retailerUrl.replace("http://go.redirectingat.com?id=35687X941090&xs=1&url=http%3A%2F%2F","").replace("http://", "").replace("https://", "").split(/([\%\/])/);
	    	$(".name").text(retailerName[0]).css("font-size","18px").attr('onclick', '');
	    	
			$('#footer-container').attr('class', '').addClass('move-up');
			//define variable to store iframe history state
			window.historyState = history.length;
			window.originalHistoryState = history.length;
			$(".footer-retailer-fwd").addClass('inactive');			
		}
    });

	$(".footer-retailer-back").on(click, function(e){ 
		e.preventDefault();
		if ($(".footer-retailer-fwd").hasClass('inactive')){
			window.historyState = history.length;
		}
		if (window.originalHistoryState == window.historyState){
			 $("a.close-retailer-btn").trigger(click);
		}else{
			window.historyState--;
			$(".footer-retailer-fwd").removeClass('inactive');
			history.back();
		}
	});

	$(".footer-retailer-fwd").on(click, function(e){ 
		e.preventDefault();
		if (history.length == window.historyState){
			$(this).addClass('inactive');
		}else{
			window.historyState++;
			if (history.length == window.historyState){
				$(this).addClass('inactive');
			}
			history.forward();			
		}
	});	

    $(".close-retailer-btn").on(click, function(e){
		e.stopImmediatePropagation();
		e.preventDefault();	
    	$(".main-container").css('height','100%');
    	$(".back-btn, .footer-btn, .footer-settings").fadeIn();
    	$(".footer").css('bottom','0');
    	$(".close-retailer-btn, .footer-retailer-back, .footer-retailer-fwd").hide();
    	$(".name").text("Inspired").css("font-size","32px").fadeIn();
    	$(".name").attr("onclick", "location.reload();location.href='../../../music.html'");  
    	$("#footer-container").css('overflow-y','scroll');    		  	
        $('#footer-container').attr('class', '').addClass('move-down');
        $("#footer-container-iframe").attr('src','');
        $(this).removeClass('selected');
    });   

	$('.medium-block-grid-4.large-block-grid-6 li').on({
		mouseenter: function (e) {
			$(this).addClass("hover");
			$(this).find( "img:nth-child(2)" ).addClass("img-border"); 
			$(this).find( "img:nth-child(2)" ).css("opacity", "0.5"); 
			$(this).find( "h5" ).css("color", "#fff");
		},
		mouseleave: function (e) {
			$(this).removeClass("hover");
			$(this).find( "img:nth-child(2)" ).removeClass("img-border");
			$(this).find( "img:nth-child(2)" ).css("opacity", "1"); 
			$(this).find( "h5" ).css("color", "#000");
		}
	});
	
	/* --Expand image for iOS, other mobile, and PC --- */
	var mobile = navigator.userAgent.match(/Android|Windows Phone|BlackBerry/i);
	var iOS = navigator.userAgent.match(/iPhone|iPad/i);
		
	if(iOS) {	
		$('.maximize-btn').bind( "touchstart",function(){ 
			$('.clearing-featured-img').toggleClass('expand-image');
			
			if($('.clearing-featured-img').hasClass('expand-image')){
				$('#product-page .product-image').css('border', 'none'); 
				$('#desc').css('display', 'none');
				$('.maximize-btn').attr('src', '../../../../static/img/minimize.svg');
				$('.maximize-btn').css('right', '-65px');
			} else {
				$('#product-page .product-image').css('border', '1px solid #c0c0c0');
				$('#desc').css('display', 'block');
				$('.maximize-btn').attr('src', '../../../../static/img/maximize.svg');
				$('.maximize-btn').css('right', '19px');
			} 
		});	
	} else if(mobile) {
		$('.maximize-btn').on(click,function(){ 
			$('.clearing-featured-img').toggleClass('expand-image');
			
			if($('.clearing-featured-img').hasClass('expand-image')){
				$('#product-page .product-image').css('border', 'none'); 
				$('#desc').css('display', 'none');
				$('.maximize-btn').attr('src', '../../../../static/img/minimize.svg');
				$('.maximize-btn').css('right', '-65px');
			} else {
				$('#product-page .product-image').css('border', '1px solid #c0c0c0');
				$('#desc').css('display', 'block');
				$('.maximize-btn').attr('src', '../../../../static/img/maximize.svg');
				$('.maximize-btn').css('right', '19px');
			} 
		});	
	}else {
		$('.maximize-btn').on(click,function(){ 
			$('.clearing-featured-img').toggleClass('expand-image');

			if($('.clearing-featured-img').hasClass('expand-image')){
				$('#product-page .product-image').css('border', 'none'); 
				$('#desc').css('display', 'none');
				$('.maximize-btn').attr('src', '../../../../static/img/minimize.svg');
				$('.maximize-btn').css('right', '-165px');
			} else {
				$('#product-page .product-image').css('border', '1px solid #c0c0c0');
				$('#desc').css('display', 'block');
				$('.maximize-btn').attr('src', '../../../../static/img/maximize.svg');
				$('.maximize-btn').css('right', '19px');
			} 
		});
	}
	
				
	
	/* ----- CSS Modification for IE browsers ------ */
	function detectIE() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		var trident = ua.indexOf('Trident/');

		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		if (trident > 0) {
			// IE 11 (or newer) => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		// other browser
		return false;
	}
	
	//Actual css addition here
	if(detectIE() != false) {
		$('.row.product-buttons').find('*').addClass('ie11');
	}
	
	var mobile = navigator.userAgent.match(/iPhone|iPad|Android|Windows Phone|BlackBerry/i);
	if(mobile){
		$('.row.product-buttons').find('*').removeClass('ie11');
	}

});