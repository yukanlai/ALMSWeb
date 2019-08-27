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

  if (alms.misc.navbar_menu_visible == 1) {
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
			baseZ: 1040,
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
    placement: {
      from: "bottom",
      align: "center"
    },
    offset: {
      x: 20,
      y: 500
		},
    animate: {
      enter: 'animated zoomIn',
      exit: 'animated fadeOut'
    }
  },
  success: function(message){
		var custom = {
			type: "success"
		};
		$.alms.popup.invoke(message, custom);
  },
  error: function(message){
		var custom = {
			type: "danger"
		};
		$.alms.popup.invoke(message, custom);
  },
  warn: function(message){
		var custom = {
			type: "warning"
		};
		$.alms.popup.invoke(message, custom);
  },
  info: function(message){
		var custom = {
			type: "info"
		};
		$.alms.popup.invoke(message, custom);
  },
  primary: function(message){
		var custom = {
			type: "primary"
		};
		$.alms.popup.invoke(message, custom);
  },
  invoke: function(message, customSetting){
	  var settings = $.extend({}, $.alms.popup.defaultSetting, customSetting);
	  $.notify({
			message: message
	  }, settings);
  }
};


/* $.sinopac.message = {
	defaultSetting: {
		inEffect: { opacity: 'show' },
		inEffectDuration: 600,
		stayTime: 5000,
		text: '',
		sticky: false,
		// notice, warn, error, success
		type: 'success',
		// showing time
		timeStamp: new Date(),
		// top-left, top-center, top-right, 
		// middle-left, middle-center, middle-right
		position: 'middle-center',
		// callback function
		close: null
	},

	boxes: new Array(),

	error: function (text, close) {
		if (text != 'abort' && typeof (text) != 'undefined') {
			return $.sinopac.message.invoke('error', text, true, close);
		}
	},

	notice: function (text, close) {
		return $.sinopac.message.invoke('notice', text, true, close);
	},

	warn: function (text, close) {
		return $.sinopac.message.invoke('warn', text, true, close);
	},

	success: function (text, close) {
		return $.sinopac.message.invoke('success', text, false, close);
	},

	confirm: function (text, clost) {
		return $.sinopac.message.invoke('confirm', text, true, close);
	},

	invoke: function (type, text, sticky, close) {
		var settings = {
			type: type,
			text: text,
			timeStamp: new Date(),
			sticky: sticky,
			close: close
		};

		return $.sinopac.message.show(settings);
	},

	show: function (options) {
		var settings = {};
		$.extend(settings, $.sinopac.message.defaultSetting, options);

		if (settings.type === 'notice' || settings.type === 'confirm') {
			settings.sticky = true;
		}

		var df = $.Deferred();

		try {
			if (settings.text.length == 0) {
				switch (settings.type) {
					case 'success':
						settings.text = '處理成功';
						break;
					case 'error':
					case 'notice':
					case 'confirm':
					case 'warn':
					default:
						settings.text = [
							'系統發生錯誤，請聯絡資訊處<br />',
							'ParentTid: ',
							sinopac.parentTid
						].join('');
						break;
				}
			}
		} catch (e) {
			settings.text = e.message;
		}

		$.sinopac.message.boxes.push(settings);

		var wrap = !$('.message-container').length
			? $('<div>')
				.addClass('message-container')
				.addClass('message-position-' + settings.position)
				.appendTo('body')
			: $('.message-container');
		var outer = $('<div>').addClass('message-item-wrapper');
		var inner = $('<div>')
			.hide()
			.addClass('message-item message-type-' + settings.type)
			.appendTo(wrap)
			.html($('<p>').append(settings.text))
			.animate(settings.inEffect, settings.inEffectDuration)
			.wrap(outer);

		if (settings.type === 'notice') {
			$('<p>')
				.html($('<button>')
					.prop('type', 'button')
					.addClass('btn btn-default')
					.html('確定')
					.on(sinopac.click, function () {
						$.sinopac.message.remove(inner, settings);
					})
				)
				.appendTo(inner);
		} else if (settings.type === 'confirm') {
			if (settings.close) {
				settings.close = null;
			}
			$.blockUI({ message: '' });
			var btnYes = $('<button>')
					.prop('type', 'button')
					.addClass('btn btn-default')
					.html('確定')
					.on(sinopac.click, function () {
						$.sinopac.message.remove(inner, settings);
						$.unblockUI('');
						df.resolve();
					});
			var btnNo = $('<button>')
					.prop('type', 'button')
					.addClass('btn btn-default')
					.html('取消')
					.on(sinopac.click, function () {
						$.sinopac.message.remove(inner, settings);
						$.unblockUI('');
						df.reject();
					});

			$('<p>')
				.append(btnYes)
				.append(' ')
				.append(btnNo)
				.appendTo(inner);
		} else {
			$('<div>')
				.addClass('message-item-close')
				.prependTo(inner)
				.on(sinopac.click, function () {
					$.sinopac.message.remove(inner, settings);
				});
		}
		if (settings.type === 'warn') {
			var timer;
			timer = setTimeout(
				function () {
					var handler = function (e) {
						$.sinopac.message.remove(inner, settings);
						$(document).unbind(sinopac.click, handler);
					};
					$(document).bind(sinopac.click, handler);
				},
				settings.stayTime
			)

			var mouseIn = function (e) {
				clearTimeout(timer);
			}

			var mouseOut = function (e) {
				timer = setTimeout(function () {
					var handler = function (e) {
						$.sinopac.message.remove(inner, settings);
						$(document).unbind(sinopac.click, handler);
					};
					$(document).bind(sinopac.click, handler);
				}, settings.stayTime)
			}

			$('.message-type-warn')
				.unbind('mouseenter', mouseIn)
				.unbind('mouseleave', mouseOut)
				.bind('mouseenter', mouseIn)
				.bind('mouseleave', mouseOut)
		}
		$('<div>')
			.addClass('message-item-image')
			.addClass('message-item-image-' + settings.type)
			.prependTo(inner);

		if (navigator.userAgent.match(/MSIE 6/i)) {
			wrap.css({ top: document.documentElement.scrollTop });
		}

		if (!settings.sticky) {
			setTimeout(
				function () {
					$.sinopac.message.remove(inner, settings);
				},
				settings.stayTime
			);
		}

		if (settings.type === 'confirm') {
			return df;
		} else {
			return inner;
		}
	},

	remove: function (obj, options) {
		obj.animate(
			{ opacity: '0' },
			600,
			function () {
				obj.parent().animate(
					{ height: '0px' },
					300,
					function () { obj.parent().remove(); }
				);

				switch (options.type) {
					case 'success':
						$.sinopac.log.info(options.text);
						break;
					case 'error':
					case 'notice':
					case 'confirm':
						$.sinopac.log.error(options.text);
						break;
					case 'warn':
						$.sinopac.log.warn(options.text);
						break;
					default:
						$.sinopac.log.debug(options.text);
						break;
				}

				if (options && options.close !== null) {
					options.close();
				}
			}
		);
	},

	removeAll: function () {
		var that = this;
		$('.message-item:not(.history-message)').each(function (index, element) {
			var msgClass = $(element).prop('class');
			var type = msgClass.replace('message-item message-type-', '');
			var text = $(element)
				.children('p')
				.first()
				.html();
			var options = {
				type: type,
				text: text,
				close: null
			}
			that.remove($(element), options);
		});
	}
} */
