$(function() {
  $('.programs').carousel({
		arrows: true,
		dots: false,
		frame: '.frame',
		item: 'a',
		itemsPerScreen: 3
	});
  $('.projects').carousel({
		arrows: true,
		dots: false,
		frame: '.frame',
		item: '.item',
		itemsPerScreen: 7
    });
});

(function($) {

	$.fn.carousel = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.carousel.defaults, options, cont.data('carousel')),
				item = $(o.item, cont),
				frame = $(o.frame, cont),
				ips = o.itemsPerScreen,
				screens = Math.floor(item.length / ips),
				par = cont.parent();

			cont.data('carousel', o);
			init();

			function init() {
				checkWidth();

				if (item.length <= ips) {
					cont.addClass('nocarousel');
					return false;
				}
				if (o.rotate) {
					initRotate();
				}
				if (o.arrows) {
					initArrows();
				}
				if (o.dots) {
					initDots();
				}

			};

			function destroy() {
				cont.parent().find('.arl, .arr, .dots').remove();
				cont.addClass('nocarousel');
			};

			function checkWidth() {
				var itemsWidth = 0,
					counterOfLoaded = 0,
					l = item.length;
				item.each(function() {
					var that = $(this);
					that.find('img').load(function() {
						counterOfLoaded += 1;
						itemsWidth += parseInt(that.outerWidth());
						if (counterOfLoaded === l) {
							check();
						};
					});
				});

				function check() {
					if (itemsWidth < cont.outerWidth()) {
						destroy();
					}
				};
			};

			function initRotate() {
				var num = Math.floor(localStorage.getItem('rotation')),
					num = num ? num : 0;
				localStorage.setItem('rotation', num + 1);
				rotateBy(num);

				function rotateBy(num) {
					var l = item.length;
					if (num === 0 || num % l === 0) {
						return;
					} else {
						num = num % l;
						item.slice(0, num).appendTo(frame);
					}
				};

			};

			function initDots() {
				var wrpClass = 'dots',
					dotClass = 'dot',
					wrpStart = '<div class="' + wrpClass + '">',
					wrpStop = '</div>',
					dot = '<div class="' + dotClass + '"></div>',
					markup = '',
					jDots;					

				markup += wrpStart;
				for (i = 0; i < screens; i += 1) {
					markup += dot;
				}
				markup += wrpStop;

				markup = $(markup);

				cont.before(markup);

				jDots = $('.' + dotClass, par);
				jDots.first().addClass('active');

				jDots
					.off('click.dots')
					.on('click.dots', par, function() {
						var el = $(this);
						cont.scrollTo(item.eq(el.index()*ips) ,500);
						jDots.removeClass('active');
						el.addClass('active');
					});

			};

			function initArrows() {
				var arl = $('<div class="arl"></div>'),
					arr = $('<div class="arr"></div>');

				cont
					.after(arr)
					.before(arl);

				cont.data('speed', 500);

				arl = $('.arl', par);
				arr = $('.arr', par);

				item.first().addClass('active');

				checkDis();
        		        var lflag = true;
		                var rflag = false;

				arl
				  .off('click.arrow')
				  .on('click.arrow', par, function() {
				  		checkDis()
					    var cur;
                        var N;
                        var S;

                        cur = item.filter('.active').index();
                        N = item.length - 1;
                        S = ips;

                        rflag = false;
                        if (cur == 0 && lflag) {
                            cur = N - S;
                        } else {
                            if (cur - S > 0) {
                                cur -= S;
                            } else {
                                cur = 0;
                                lflag = true;
                            }
                        }
                        item.removeClass('active');
                        item.eq(cur).addClass('active');
                        cont.scrollTo(item.eq(cur), cont.data('speed'));
				  });
				arr
				  .off('click.arrow')
				  .on('click.arrow', par, function() {
				  		checkDis()
					    var cur;
                        var N;
                        var S;

                        cur = item.filter('.active').index();
                        N = item.length - 1;
                        S = ips;

                        lflag = false;
                        if (cur == N - S && rflag) {
                            cur = 0;
                        } else {
                            if (cur + 2 * S < N) {
                                cur += S;
                            } else {
                                cur = N - S;
                                rflag = true
                            }
                        }
                        item.removeClass('active');
                        item.eq(cur).addClass('active');
                        cont.scrollTo(item.eq(cur), cont.data('speed'));
				  });
				function checkDis() {

                    // Bugged function. TODO: Rewrite this.
                    
                    if (item.filter('.active').index() === 0) {
                        arl.addClass('disabled');
                        arr.removeClass('disabled');
                    } else if (item.filter('.active').index() >= item.length - ips) {
                        arl.removeClass('disabled');
                        arr.addClass('disabled');
                    } else {
                        arl.removeClass('disabled');
                        arr.removeClass('disabled');
                    }
                };

			};

		});

	};

	$.fn.carousel.defaults = {};

})(jQuery);