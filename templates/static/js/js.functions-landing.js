var screenWidth = $(window).width();
var screenHeight = $(window).height();

//Stackmob Auth
	StackMob.init({
		publicKey:        '9c425dc3-688f-420d-804c-9b27f3856353',
		apiVersion:       0
	});

$(document).ready(function(){
	$(".alert-box.radius").hide();
	$(".alert-box2.radius").hide();
	$('#cover').fadeOut(0);
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

	$(document).foundation(); 

    //force bookmark on iOS
    if (("standalone" in window.navigator) && !window.navigator.standalone && navigator.userAgent.match(/(iPod|iPhone)/i)){
        $('.landing-button-group, .landing-footer').hide();
        $('body').append('<div class="landing-footer-message">Tap "<b style="letter-spacing: -1px">Add to Home Screen</b>" to install</br><span>&#8595;</span></div>');
    } 
    if (("standalone" in window.navigator) && !window.navigator.standalone && navigator.userAgent.match(/(iPad)/i)){
        $('.landing-button-group, .landing-footer').hide();
        $('body').append('<div class="landing-footer-message ipad"><span>&#8593;</span></br>Tap <div class="safari-share-icon"></div> and then "<b style="letter-spacing: -1px">Add to Home Screen</b>" to install</div>');
    }
    if (navigator.userAgent.match(/(Android)/i)){
        $('body').append('<div class="landing-footer-message android"><span>&#8593;</span></br>Tap<div class="android-settings-icon"></div>and then "<b style="letter-spacing: -1px">Add to home screen</b>" to install</div>');
    }    
    //remove scroling: https://gist.github.com/amolk/1599412
	
	/* Commented out function b/c otherwise it auto-scrolls the textareas too far up on mobile */
    /*document.body.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, true);
    window.onresize = function() {
      //$(document.body).width(screenWidth).height(screenWidth);
    }
    $(function() {
      window.onresize();
    });*/   

    //fastclick: https://github.com/ftlabs/fastclick
	window.addEventListener('load', function() {
	    FastClick.attach(document.body);
	}, false);
	$(function() {
	    FastClick.attach(document.body);
	});    

	//Define Click Event for Mobile
	if( 'ontouchstart' in window ){ var click = 'touchstart'; }
		else { var click = 'click'; }	

    $(".landing-container, .landing-container-wrapper").css('height', screenHeight);

	window.onload = function(){
	  $(".landing-container-wrapper, .landing-button").fadeIn(100);
	  $(".footer").fadeIn(300);
	};

	var heightDiv = $("#intro-info p").height();
	$('#intro-info').addClass('animated fadeInDownBig').css('top',screenHeight-heightDiv-220);
	$("#intro-info").css('height',heightDiv+210);	    

	$("#invite-code-button").on(click, function(){ 
		if ($("#invite-code-form").val() == "demoday"){
			$("#intro-info").fadeOut("slow");
		}
	});	

	$("#facebook-connect-btn").on(click, function(){ 
		window.location = 'music.html';
	});    	

	$("#email-reg-btn").on(click, function(e){ 
		e.preventDefault();	
		$(".email-login-container").fadeIn(50);
		$("#facebook-connect-btn, #email-reg-btn").hide();
	});    

	$(".reset-passwd").on(click, function(e){ 
		e.preventDefault();	
		$(".email-login-container").hide();
		$(".email-reset-passwd-container").fadeIn(200);
	});	

	$("#back-login").on(click, function(e){ 
		e.preventDefault();	
		$(".email-login-container, #pass-confirm").hide();
		$("#emailAlert").hide();
		$("#facebook-connect-btn, #email-reg-btn").fadeIn(200);
		$("#user, #pass, #pass-confirm").val('');
		$(".reset-passwd").show();
	});

	$("#back-reset-passwd").on(click, function(e){ 
		e.preventDefault();	
		$(".email-reset-passwd-container").hide();
		$(".email-login-container").fadeIn(200);
	});	

	$("#terms").on(click, function(){ 
		alert("Terms");
	});

	$("#privacy").on(click, function(){ 
		alert("Privacy");
	});	

	$('#facebook-connect-btn').on(click, function() {
		fblogin();
	});
	
	$('#get-reset-passwd-button').on(click, function() {
		forgotpass();
		
		return false;
	});

	
	//User email login function.
	$(window).load(function(){
		function login() {
			var user = new StackMob.User({ username: $('#user').val(), password: $('#pass').val() });
			user.login(false, {
				success: function(model) {
					//Redirect if the user logged in
					Redirect();
				},
				error: function(model, response) {
					alert('username and password do not match');
				}
			});    
		} //Login function END
		
		$('#get-inspired-button').on(click, function() {
			var checkuser = $('#user').val();
			var pass = $('#pass').val();
			var passconf = $('#pass-confirm').val();
			$('emailAlert').hide();
			if( checkuser == '' ) {
				alert('username is empty');
			} else if(checkuser != '' && pass != '' && passconf != ''){
				if(pass == passconf) {
					//alert('creating new user');
				var user = new StackMob.User({ username: checkuser, password: pass});
				user.create({
  					success: function(model, result, options) {
  						$('#cover').fadeIn(0);
  						//alert('user created');
  						var userlogin = new StackMob.User({ username: $('#user').val(), password: $('#pass').val() });
						userlogin.login(false, {
							success: function(model) {
								//Redirect if the user logged in
								window.location.href = "../static/js/login.php?email=" + checkuser;
							},
							error: function(model, response) {
								//alert('username and password do not match');
							}
						});    
  					},
  					error: function(model, result, options) {
  						alert('could not create user');
  					}
				});

				} else {
					alert('passwords do not match');
				}
			} else {
				login();
			} 
			return false; //this is here to halt the default submit button event of submitting the form.  we just want to perform our custom login() action, not the native browser form submission.
		});
	}); // User email login function END
	
	
	
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '225887584246860', // FB App ID
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
		
		
		FB.getLoginStatus(function(response) {
			if (response.status == 'connected' || StackMob.isLoggedIn()) {
				Redirect();
			} else if (response.status == 'connected' && StackMob.isLoggedIn()) {
				Redirect();
			} else {
				console.log('not logged in')
			}
		});
		
	};
 
  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = '//connect.facebook.net/en_US/all.js';
     d.getElementsByTagName('head')[0].appendChild(js);
   }(document));

   

   //Login with Facebook
   function fblogin() {
		FB.login(function(response) {
			if (response.authResponse) {
				var accessToken = response.authResponse.accessToken;
				FB.api('/me', function(response) {
					var user = new StackMob.User({ username: response.email, name: response.name });
					user.loginWithFacebookAutoCreate(accessToken, true,{
						success: function(){
    					Redirect();
  						},
						error: function(){
						
						}

					});
				});
				//Redirect();
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'email'});
	}

	//Redirects after logging into facebook.
	function Redirect() {
		window.location.href = "music.html";
	}

}); // end of top code

function isEmailFormat(inputValue){
            var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(inputValue))
                return false;
            else
                return true;
} 
function checkEmailInDB(){
	var inputValue = document.getElementsByName("user")[0].value;
	if (isEmailFormat(inputValue)){
		$(".alert-box.radius").hide();
		var checkuser = $('#user').val();
		var user = new StackMob.User({ username: checkuser });
		user.fetch({
			success: function(model) {
				//alert('Username exists: ' + model.get('username'));
				$("#pass-confirm").hide();
			}, error: function() {
				//alert('username does not exist');
				$("#pass-confirm").fadeIn();
				$(".reset-passwd").hide();
			}
		});
	} else{
		$("#emailAlert").html("Email address is incorrect.");
		$(".alert-box.radius").fadeIn();
		if (document.getElementsByName("user")[0].placeholder != 'Type Your Email'){
			document.getElementsByName("user")[0].value='';
			document.getElementsByName("user")[0].placeholder='Invalid Email Address';
		}else{
			document.getElementsByName("user")[0].placeholder='Input Your Email';
		}
	}	
}

function checkPass(){
	var passValue = document.getElementsByName("pass")[0].value;
	if ($('#pass').val().length >= 6 || ($('#pass').val() == '')){
		$(".alert-box.radius").hide();
	} else{
		$("#emailAlert").html("Password must be at least 6 characters.");
		$(".alert-box.radius").fadeIn();
		if (document.getElementsByName("pass")[0].placeholder != 'Password'){
			document.getElementsByName("pass")[0].value='';
			document.getElementsByName("pass")[0].placeholder='Invalid Password';
		}else{
			document.getElementsByName("pass")[0].placeholder='Password';
		}
	}
} 

function forgotpass() {
	var inputValue = document.getElementsByName("emailreset")[0].value;
	if (isEmailFormat(inputValue)){
		$(".alert-box.radius").hide();
		var user = new StackMob.User({ username: $('#emailreset').val() });
		alert("An email to reset your password has been sent to you.");
		user.forgotPassword({ 
			success: function(model) {
				window.location.href = "landing.html";
			},
			error: function(model, response) {
			}
		});
	} else {
		$(".alert-box.radius").fadeIn();
		if (document.getElementsByName("emailreset")[0].placeholder != 'Account Email Address'){
			document.getElementsByName("emailreset")[0].value='';
			document.getElementsByName("emailreset")[0].placeholder='Invalid Email Address';
		}else{
			document.getElementsByName("emailreset")[0].placeholder='Account Email Address';
		}
	}	
}
