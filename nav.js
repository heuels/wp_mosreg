var touchdevice = false;
$(function() {
	$('.iblock').cleanWS(); // remove whitespace 
	$('.b-anav > li > a').openAnimate();
});


(function($) { //create closure
    $.fn.cleanWS = function(options) {
        this.each(function() {
            var iblock = this,
                par = iblock.parentNode,
                prev = iblock.previousSibling,
                next = iblock.nextSibling;
            while (prev) {
                var newprev = prev.previousSibling;
                if (prev.nodeType == 3 && prev.nodeValue) {
                    for (var i = prev.nodeValue.length - 1; i > -1; i--) {
                        var cc = prev.nodeValue.charCodeAt(i);
                        if (cc == 9 || cc == 10 || cc == 32) {
                            prev.nodeValue = prev.nodeValue.slice(0, i);
                        } else {
                            break;
                        }
                    }
                }
                if (prev.nodeType == 8) par.removeChild(prev); // remove comment
                prev = newprev;
            }
            while (next) {
                var newnext = next.nextSibling;
                if (next.nodeType == 3 && next.nodeValue) {
                    while (next.nodeValue.length) {
                        var cc = next.nodeValue.charCodeAt(0);
                        if (cc == 9 || cc == 10 || cc == 32) {
                            next.nodeValue = next.nodeValue.slice(1);
                        } else {
                            break;
                        }
                    }
                }
                if (next.nodeType == 8) par.removeChild(next); // remove comment
                next = newnext;
            }

        });
    }
    //end of closure
})(jQuery);

function sendHeight(height) {
	$.pm({
		target: window.parent,
		type: 'resize_nav_panel',
		data: {
			param: "height",
			value: height
		},
		success: function(data) {
		},
		url: document.referrer
	});
}

(function($) { //create closure
    $.fn.openAnimate = function(options) {
        this.each(function() {        
        	if ($(this).parent().hasClass('b-anav_submenu')) {
        		$(this).on('click', function(){
					var parent = $(this).parent();
					
					if (!parent.hasClass("current")) {
						if ($(".b-anav .current").length > 0) {
							var className = $(".b-anav .current a").attr("class");
							className = className.replace('_lnk', '');
							$("." + className).hide();
							var height = $(".b-anavw").height();
							sendHeight(height);
							$(".b-anav .current").removeClass("current");
						}
					}
	        		parent.toggleClass('current');
	        		var className = $(this).attr("class");
	        		className = className.replace('_lnk', '');
	        		
	        		$("." + className).slideToggle({
	        			step: function(x, y) {
	        				var height = $(".b-anavw").height() + $(this).height();
			        		sendHeight(height);
	        			}
	        		}); 
	        		return false;
        		});
        	}
        });
        
        $('.b-anav_level .b-anav_close').on('click', function(){
        	var parent = $(this).parents('.b-anav_level');
        	var className = parent.attr("class");
        	className = className.replace('b-anav_level ', '');
	        className = className.replace('popup_', 'popup_lnk_');
	        $("." + className).parent().removeClass("current");
        	parent.slideToggle({
				step: function(x, y) {
					var height = $(".b-anavw").height() + $(this).height();
					sendHeight(height);
				}
			}); 
        	return false;
        });
    }
    //end of closure
})(jQuery);

