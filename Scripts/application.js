	// DETECT DEVICE
	$(window).bind('load resize', function() {

	    // IOS BROWSER CLASS
	    if (navigator.userAgent.match(/iP(hone|od|ad)/i)) {
	        jQuery('body').addClass('browser-ios');
	    }

	});

	// FIX PARALLAX 
	// IE 11 background-attachment:fixed will jitter on scroll if this is missing
	jQuery(function() {
	    if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
	        $('body').on("mousewheel", function() {
	            event.preventDefault();
	            var wd = event.wheelDelta;
	            var csp = window.pageYOffset;
	            window.scrollTo(0, csp - wd);
	        });
	    }
	});

	// ADD CLASS TO HTML ELEMENT WHEN THE MOBILE/BURGER NAVIGATION IS PRESENT
	(function($) {
	    var $window = $(window),
	        $html = $('html');

	    function resize() {
	        if ($window.width() < 768) {
	            return $html.addClass('mobile-width');
	        }
	        $html.removeClass('mobile-width');
	    }
	    $window
	        .resize(resize)
	        .trigger('load resize');
	})(jQuery);

	// IMPROVE SCROLL PERFORMANCE FOR
	// ANIMATION &
	// HEADER HIDE/REVEAL
	function debounce(func, wait, immediate) {
	    var timeout;
	    return function() {
	        var context = this,
	            args = arguments;
	        var later = function() {
	            timeout = null;
	            if (!immediate) func.apply(context, args);
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};
	var myEfficientScroll = debounce(function() {
	    // TRIGGER ANIMATIONS
	    // http://www.oxygenna.com/tutorials/scroll-animations-using-waypoints-js-animate-css
	    function onScrollInit(items, trigger) {

	        items.each(function() {
	            var osElement = $(this),
	                osAnimationClass = osElement.attr('data-os-animation'),
	                osAnimationDelay = osElement.attr('data-os-animation-delay');

	            osElement.css({
	                '-webkit-animation-delay': osAnimationDelay,
	                '-moz-animation-delay': osAnimationDelay,
	                '-ms-animation-delay': osAnimationDelay,
	                'animation-delay': osAnimationDelay
	            });

	            var osTrigger = (trigger) ? trigger : osElement;

	            osTrigger.waypoint(function() {
	                osElement.addClass('animated').addClass(osAnimationClass);
	                $('.slick-slide .os-animation').removeClass('fadeInUp animated');
	                $('.slick-active .os-animation').addClass('fadeInUp animated');
	            }, {
	                //triggerOnce: true,
	                offset: '95%'
	            });
	        });

	    }
	    onScrollInit($('.os-animation'));

	}, 250);
	window.addEventListener('load', myEfficientScroll);

	$(document).ready(function() {

	    cookiePolicy();

	    $(".umbraco-ajax-form form").preventDoubleSubmission();

	    // LAZYSIZES PRELOAD
	    $('img.lazyload').addClass('lazypreload');

	    // DROP DOWN - CLICK & HOVER - MAIN NAV
	    $(".navigation nav.main ul li.has-child").hover(function() {
	        $(this).toggleClass("hover");
	        $(this).toggleClass("hover");
	    });
	    $(".navigation nav.main ul li span i").click(function() {
	        if ($(".navigation nav.main ul li span i").length) {
	            $(this).parent().parent().toggleClass("open").toggleClass("open-mobile");
	            $(this).parent().parent().siblings().removeClass("open").removeClass("open-mobile");
	        } else {
	            $(this).parent().parent().toggleClass("open").toggleClass("open-mobile");
	        }
	    });
	    $(".navigation nav.main ul li span.active").parent("li").addClass("open-mobile");
	    $("html").click(function() {
	        $(".navigation nav.main ul li.open").removeClass("open");
	    });
	    $(".navigation nav.main ul li span i, header a.expand").click(function(e) {
	        e.stopPropagation();
	    });

	    // EXPAND MOBILE NAVIVAGTION  
	    $("header a.expand").click(function() {
	        if ($(".navigation .reveal").length) {
	            $("header a.expand").toggleClass('active');
	            $("html").toggleClass('reveal-out');
	        } else {
	            $("header a.expand").toggleClass('active');
	            $("html").toggleClass('reveal-out');
	        }
	    });

	    // BANNER
	    // PLAYS VIDEO IN BANNER
	    $('.banner .slides').on('init', function(ev, el) {
	        $('video').each(function() {
	            this.play();
	        });
	    });
	    // BANNER ITSELF
	    $(".banner .slides").slick({
	        infinite: true,
	        speed: 600,
	        fade: true,
	        adaptiveHeight: true,
	        prevArrow: '<div class="slick-prev"><i class="ion-chevron-left"></i>',
	        nextArrow: '<div class="slick-next"><i class="ion-chevron-right"></i>'
	    });
	    // BANNER INFO IS ANIMATED FOR EACH SLIDE
	    $('.banner .slides').on('afterChange', function(event, slick, currentSlide) {
	        slick.$slider.find('.slick-active .os-animation').removeClass('fadeInUp animated');
	        slick.$slider.find('.slick-active .os-animation').addClass('fadeInUp animated');
	    });
	    $('.banner .slides').on('beforeChange', function(event, slick, currentSlide) {
	        slick.$slider.find('.slick-active .os-animation').removeClass('fadeInUp animated');
	    });

	    // GALLERY WITH CAROUSEL
	    $(".spc.gallery .slides").slick({
	        prevArrow: '<div class="slick-prev"><i class="ion-chevron-left"></i>',
	        nextArrow: '<div class="slick-next"><i class="ion-chevron-right"></i>',
	        infinite: true,
	        speed: 600,
	        easing: 'linear',
	        adaptiveHeight: true,
	        slidesToScroll: 1
	    });

	    // FEATURED WITH CAROUSEL
	    $(".related-content .slides").slick({
	        prevArrow: '<div class="slick-prev"><i class="ion-chevron-left"></i>',
	        nextArrow: '<div class="slick-next"><i class="ion-chevron-right"></i>',
	        infinite: true,
	        speed: 600,
	        easing: 'linear',
	        adaptiveHeight: true,
	        slidesToScroll: 1
	    });

	    // BOCKQUOTE WITH CAROUSEL
	    $(".spc.blockquotes .slides").slick({
	        prevArrow: '<div class="slick-prev"><i class="ion-chevron-left"></i>',
	        nextArrow: '<div class="slick-next"><i class="ion-chevron-right"></i>',
	        infinite: true,
	        speed: 600,
	        easing: 'linear',
	        adaptiveHeight: true,
	        slidesToScroll: 1
	    });

	    // TEXT WITH SLIDESHOW
	    $(".apc.text-with-slideshow .slides").slick({
	        prevArrow: '<div class="slick-prev"><i class="ion-chevron-left"></i>',
	        nextArrow: '<div class="slick-next"><i class="ion-chevron-right"></i>',
	        infinite: true,
	        speed: 600,
	        easing: 'linear',
	        adaptiveHeight: true,
	        slidesToScroll: 1
	    });

	    // SCROLL PROMPT
	    $('.scroll-prompt').click(function() {
	        var target;
	        $("section, footer").next().each(function(i, element) {
	            target = ($(element).offset().top - 0);
	            if (target - 10 > $(document).scrollTop()) {
	                return false; // break
	            }
	        });
	        $("html, body").animate({
	            scrollTop: target
	        }, 600);
	    });

	    // BACK TO TOP
	    if (($(window).height() + 100) < $(document).height()) {

	        $('#top-link-block').addClass('show').affix({
	            // how far to scroll down before link "slides" into view
	            offset: { top: 160 }
	        });

	    }

	    // MATCH HEIGHTS
	    // TEXT WITH SLIDESHOW
	    $(".apc.text-with-slideshow .slides .item, .apc.text-with-slideshow .text-side").matchHeight({
	        byRow: true
	    });

	});

	// LIGHTBOX
	$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	    event.preventDefault();
	    $(this).ekkoLightbox();
	});

	// HEADER SCROLLING
	var didScroll;
	var lastScrollTop = 0;
	var delta = 160;
	var navbarHeight = $('header').outerHeight();

	// FIXED HEADER
	$(window).scroll(function(event) {
	    didScroll = true;
	    var scroll = $(window).scrollTop();
	    if (scroll >= 100) {
	        $("html").removeClass("reached-top");
	    } else {
	        $("html").addClass("reached-top").removeClass("nav-down").removeClass("nav-up");
	    }
	});
	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 5);

	function hasScrolled() {
	    var st = $(this).scrollTop();
	    // Make sure they scroll more than delta
	    if (Math.abs(lastScrollTop - st) <= delta)
	        return;
	    if (st > lastScrollTop && st > navbarHeight) {
	        // Scroll Down
	        $('html').removeClass('nav-down').addClass('nav-up');
	    } else {
	        // Scroll Up
	        $('html').addClass('nav-down').removeClass('nav-up');
	    }
	    lastScrollTop = st;
	}

	// COOKIE NOTICE FUNCTION
	function cookiePolicy() {
	    var cookiePanel = $('.cookie-notice'),
	        cookieName = "cookieNotice";

	    checkCookie();

	    $('.accept-cookies').on('click', function(e) {
	        e.preventDefault();
	        setCookie();
	    });

	    // Get cookie
	    function getCookie(c_name) {

	        var i, x, y, ARRcookies = document.cookie.split(";");
	        for (i = 0; i < ARRcookies.length; i++) {
	            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
	            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
	            x = x.replace(/^\s+|\s+$/g, "");
	            if (x == c_name) {
	                return unescape(y);
	            }
	        }

	    }

	    // Set cookie
	    function setCookie() {

	        var exdate = new Date();
	        exdate.setDate(exdate.getDate() + exdays);
	        var c_value = "accepted" + ((exdays == null) ? "" : "; path=/; expires=" + exdate.toUTCString());
	        document.cookie = cookieName + " =" + c_value;
	        cookiePanel.addClass("closed");
	        cookiePanel.removeClass("open");
	    }

	    // Check cookie
	    function checkCookie() {

	        var username = getCookie(cookieName);
	        if (username != null && username != "") {
	            cookiePanel.addClass("closed");
	            cookiePanel.removeClass("open");
	        } else {
	            cookiePanel.addClass("open");
	            cookiePanel.removeClass("closed");
	        }

	    }

	};

	// jQuery plugin to prevent double submission of forms
	jQuery.fn.preventDoubleSubmission = function() {

	    $(this).on('submit', function(e) {

	        e.preventDefault();

	        var $form = $(this);

	        if ($form.data('submitted') === true) {
	            // Previously submitted - don't submit again
	        } else {
	            if ($form.valid()) {
	                // Mark it so that the next submit can be ignored
	                $form.data('submitted', true);

	                /*show loader*/
	                $form.find(".ajax-loading").show();

	                // Make ajax call form submission
	                $.ajax({
	                    url: $form.attr('action'),
	                    type: 'POST',
	                    cache: false,
	                    data: $form.serialize(),
	                    success: function(result) {

	                        var thankYouMessage = $form.find('input[name="umbraco_submit_message"]').val();

	                        $form.find('.form-container').html("<div class='umbraco-forms-submitmessage alert alert-success' role='alert'>" + thankYouMessage + "</div>");
	                        $form.find(".ajax-loading").hide();
	                    },
	                    error: function() {
	                        /*hide loader*/
	                        $form.find(".ajax-loading").hide();
	                        $form.find('.UmbracoFormMessage').html("<div class='alert alert-danger alert-dismissible text-center'>An error occured. Please try again.</div>");
	                    }
	                });
	            }
	        }

	    });

	    // Keep chainability
	    return this;
	};