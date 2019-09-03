// =========================================================
//  Paper Dashboard 2 - v2.0.0
// =========================================================
//
//  Product Page: https://www.creative-tim.com/product/paper-dashboard-2
//  Copyright 2019 Creative Tim (https://www.creative-tim.com)
//  Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE)
//
//  Coded by Creative Tim
//
// =========================================================
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.


(function() {
  isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

    $('html').addClass('perfect-scrollbar-on');
  } else {
    $('html').addClass('perfect-scrollbar-off');
  }
})();

transparent = true;
transparentDemo = true;
fixedTop = false;

navbar_initialized = false;
backgroundOrange = false;
sidebar_mini_active = false;
toggle_initialized = false;

seq = 0, delays = 80, durations = 500;
seq2 = 0, delays2 = 80, durations2 = 500;

$(document).ready(function() {

	// redirect if not logged in
	if(!window.location.pathname.includes('login.html') && !sessionStorage.getItem('token')){
		window.location.replace("/_sinopac_root/_ALMS/ALMSWeb/views/login.html");
	}

  if ($('.full-screen-map').length == 0 && $('.bd-docs').length == 0) {
    // On click navbar-collapse the menu will be white not transparent
    $('.collapse').on('show.bs.collapse', function() {
      $(this).closest('.navbar').removeClass('navbar-transparent').addClass('bg-white');
    }).on('hide.bs.collapse', function() {
      $(this).closest('.navbar').addClass('navbar-transparent').removeClass('bg-white');
    });
  }

  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;

  // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.
 /*  if ($('.navbar[color-on-scroll]').length != 0) {
    paperDashboard.checkScrollForTransparentNavbar();
    $(window).on('scroll', paperDashboard.checkScrollForTransparentNavbar)
  } */

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });
});

$(document).on('click', '.navbar-toggle', function() {
  $toggle = $(this);

  if ($.alms.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    $.alms.misc.navbar_menu_visible = 0;
    setTimeout(function() {
      $toggle.removeClass('toggled');
      $('#bodyClick').remove();
    }, 550);

  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);

    div = '<div id="bodyClick"></div>';
    $(div).appendTo('body').click(function() {
      $('html').removeClass('nav-open');
      $.alms.misc.navbar_menu_visible = 0;
      setTimeout(function() {
        $toggle.removeClass('toggled');
        $('#bodyClick').remove();
      }, 550);
    });

    $('html').addClass('nav-open');
    $.alms.misc.navbar_menu_visible = 1;
  }
});

$(document).on('click', '.menu-toggle', function() {
  if ($.alms.misc.navbar_menu_shrink == 1) {
    $('html').removeClass('menu-shrink');
    $.alms.misc.navbar_menu_shrink = 0;
  } else {
    $('html').addClass('menu-shrink');
    $.alms.misc.navbar_menu_shrink = 1;
  }
});

$(window).resize(function() {
  // reset the seq for charts drawing animations
  seq = seq2 = 0;

  if ($('.full-screen-map').length == 0 && $('.bd-docs').length == 0) {
    $navbar = $('.navbar');
    isExpanded = $('.navbar').find('[data-toggle="collapse"]').attr("aria-expanded");
    if ($navbar.hasClass('bg-white') && $(window).width() > 991) {
      $navbar.removeClass('bg-white').addClass('navbar-transparent');
    } else if ($navbar.hasClass('navbar-transparent') && $(window).width() < 991 && isExpanded != "false") {
      $navbar.addClass('bg-white').removeClass('navbar-transparent');
    }
  }
});


$.alms = {
  misc: {
    navbar_menu_visible: 0,
    navbar_menu_shrink: 0
	},

	block: function($ele, msg){
		message = "Processing..";
		if(msg){
			message = msg;
		}

		var options = {
			baseZ: 1080,
			overlayCss: {
				backgroundColor: '#b6b6b6',
				opacity: .6
			},
			css:{
				border: 'none',
				padding: '15px',
				backgroundColor: '#4d8181',
				'-webkit-border-radius': '3px',
				'-moz-border-radius': '3px',
				color: '#d3d3d3'
			}
		};

		if($ele && $ele instanceof jQuery){
			if($(window).width() <= 320 || $ele.width <= 320){
				message = "";
			}
			$.extend(options, {message: message});
			$ele.block(options);
		}else if(typeof $ele === 'string'){
			if($(window).width() <= 320 || $($ele).width() <= 320){
				message = "";
			}
			$.extend(options, {message: message});
			$($ele).block(options);
		}else{
			if($(window).width() <= 320){
				message = "";
			}
			$.extend(options, {message: message});
			$.blockUI(options);
		}

	},
	unblock: function($ele){
		if($ele && $ele instanceof jQuery){
			$ele.unblock();
		}else if(typeof $ele === 'string'){
			$($ele).unblock();
		}else{
			$.unblockUI();
		}
	}
};


$.alms.popup = {
  defaultSetting: {
		newest_on_top: true,
    placement: {
      from: "top",
      align: "center"
    },
		z_index: 1101,
		delay: 1000,
		timer: 5000,
    animate: {
      enter: 'animated zoomIn',
      exit: 'animated fadeOut'
		},
		template: '<div data-notify="container" class="col-xs-12 col-sm-10 col-md-6 col-lg-3 alert alert-{0}" role="alert">' + 
				'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button>' + 
				'<span data-notify="icon"></span>' + 
				'<span data-notify="title">{1}</span>' + 
				'<span data-notify="message">{2}</span>' + 
				'<a href="{3}" target="{4}" data-notify="url"></a>' +
			'</div>'
  },
  success: function(message, icon, maxLength){
		var theIcon = "icon-added fa fa-check-circle";
		if(typeof icon == 'string'){
			theIcon = icon;
			if(icon && !icon.includes('icon-added')){
				theIcon += ' icon-added';
			}
		}

		var custom = {
			type: "success"
		};
		$.alms.popup.invoke(message, theIcon, maxLength, custom);
  },
  error: function(message, icon, maxLength){
		var theIcon = "icon-added fa fa-exclamation-triangle";
		if(typeof icon == 'string'){
			theIcon = icon;
			if(icon && !icon.includes('icon-added')){
				theIcon += ' icon-added';
			}
		}

		var custom = {
			type: "danger"
		};
		$.alms.popup.invoke(message, theIcon, maxLength, custom);
  },
  warn: function(message, icon, maxLength){
		var theIcon = "icon-added fa fa-exclamation-circle";
		if(typeof icon == 'string'){
			theIcon = icon;
			if(icon && !icon.includes('icon-added')){
				theIcon += ' icon-added';
			}
		}
		
		var custom = {
			type: "warning"
		};
		$.alms.popup.invoke(message, theIcon, maxLength, custom);
  },
  info: function(message, icon, maxLength){
		var theIcon = "icon-added fa fa-info-circle";
		if(typeof icon == 'string'){
			theIcon = icon;
			if(icon && !icon.includes('icon-added')){
				theIcon += ' icon-added';
			}
		}

		var custom = {
			type: "info"
		};
		$.alms.popup.invoke(message, theIcon, maxLength, custom);
  },
  primary: function(message, icon, maxLength){
		var theIcon = "";
		if(typeof icon == 'string'){
			theIcon = icon;
			if(icon && !icon.includes('icon-added')){
				theIcon += ' icon-added';
			}
		}

		var custom = {
			type: "primary"
		};
		$.alms.popup.invoke(message, theIcon, maxLength, custom);
  },
  invoke: function(message, icon, maxLength, customSetting){

		function _repose(){
			var position = {
				offset: {
					x: 20,
					y: 300
				}
			};
			
			if(screen.height < 900  && screen.height >= 768){
				position = {
					offset: {
						x: 20,
						y: 360
					}
				};
			}else if(screen.width < 768){
				position = {
					offset: {
						x: 20,
						y: 20
					}
				};
			}

			return position;
		}

		var position = _repose(); 
	  var settings = $.extend({}, $.alms.popup.defaultSetting, position, customSetting);
	  $.notify({
			icon: icon,
			message: message
	  }, settings);
  }
};