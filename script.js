$(function() {
	$('.blind-trigger').blindWorkaround();
	$('.header').header();

	$('.projects.rotate').data('carousel', {
		rotate: true
	});

	$('.programs').carousel({
		arrows: true,
		dots: false,
		frame: '.frame',
		item: 'a',
		itemsPerScreen: 4
	});
	$('.projects').carousel({
		arrows: true,
		dots: false,
		frame: '.frame',
		item: '.item',
		itemsPerScreen: 4
    });
	$('.ph-carousel_cnt').carousel({
		arrows: true,
		dots: false,
		frame: '.ph-carousel_frame',
		item: '.ph-carousel_item',
		itemsPerScreen: 5
	});

	$('.videoplay:not(.hidden)').videoplayer({
		width: "540px",
		height: "338px",
		cssClass: "jp-video-540p" // см. css
	});

	$('.mediagallery').syncLinks();
	$('.photos').photogallery();
	$('.mediagallery').photogallery();
	$('.news-gallery').newsGallery();
	$('.videos').photogallery();

	$('.structure').maplinks({
		title: '.structure_title',
		address: '.address_text',
		link: '.address_maplink'
	});

	$('.expanders_item').maplinks({
		title: '.expanders_title',
		address: '.address_text',
		link: '.address_maplink'
	});

	$('.expanders').expanders({
		link: 'a.expanders_link',
		block: '.expanders_block',
		closer: '.expanders_closer'
	});

	$('.agencies').agencies();

	$('.control-button.js-ajaxPopup').data('ajaxPopup', {
		dontTouchForm: true
	});
	$('.js-ajaxPopup').ajaxPopup();
	$('.videos_cnt').cleanWS();
	

	
});

$(window).load(function(){
});

$(document).ready(function(){
    $("div.media-item > a.title").bind("click", function(){
        $(this).parent().find("a:first").click();
        return false;
    })
});


(function($) {

	$.fn.cleanWS = function(options){
		this.each(function(){
			var container = this, nodes = container.childNodes;
			var i = nodes.length-1;
			while (i>-1) { if (nodes[i].nodeType == 3) container.removeChild(nodes[i]); 
				i--;
			}
		});
	};

})(jQuery);

(function($) {

	$.fn.header = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.header.defaults, options, cont.data('header'));
			
			init();
			function init() {
				search();
				if ($('html').hasClass('touch')) {
					navFix();
					orientationFix();
				}
				innerNavHelper();
			};

			function search() {
				var search = $('.search', cont),
					submit = $('.search-sbm', search),
					text = $('.search-txt', search),
					blurBlock = false;

				submit
					.off('click.search')
					.on('click.search', function() {
						if (!cont.hasClass('searchOpened') && !blurBlock) {
							cont.addClass('searchOpened');
							setTimeout(function() {
								text.trigger('focus');
							}, 100);
							return false;
						} else if (blurBlock) {
							return false;
						}
					});

				text
					.off('blur.search')
					.on('blur.search', function(e) {
						if (text.val() === '') {
							blurBlock = true;
							cont.removeClass('searchOpened');
							setTimeout(function() {
								blurBlock = false;
							}, 200);
						}
					});

			};

			function navFix() {
				var nav = $('.mainmenu'),
					ul = $('.menubar', nav),
					a1 = $('> li > a', ul),
					opened = false;

				a1
					.off('touchstart.navfix')
					.on('touchstart.navfix', function(e) {
						var inner = $(this).siblings('.mainmenu-inner');
						if (inner.length > 0 && inner.height() < 50) {
							opened = false;
						} else {
							opened = true;
						}
					})
					.off('click.navfix')
					.on('click.navfix', function(e) {
						if (!opened) {
							e.preventDefault();
						}
					});
			};

			function orientationFix() {
				$(window)
					.on('orientationchange', function() {
						setTimeout(function() {
							cont
								.hide()
								.height();
							cont
								.show();
						}, 500);
					});
			};

			// Checks if inner menu fills in window height
			// If not -- position header absolutely
			function innerNavHelper() {
				$( window ).scroll(function() {								
					if ($(document).scrollTop() > 40) { cont.css('top', '0');	} else { cont.css('top', '40px'); };

				});
				var nav = $('.mainmenu'),
					ul = $('.menubar', nav),
					li1 = $('> li', ul);

				li1
					.off('mouseover.navHelper')
					.on('mouseover.navHelper', nav, function(e) {
						var that = $(this),
							inner = that.find('.mainmenu-inner');

						setTimeout(function() {
							var winHeight = $(window).height();

							if (inner.length === 0 || $(e.target).attr('class') === 'mainmenu-inner' || $(e.target).closest('.mainmenu-inner').length > 0) {
								return false;
							}

							if ((inner.height() + cont.height()) < winHeight) {
								return false;
							} else {
								cont.css({
									//'position': 'absolute',
									//'top': $(window).scrollTop()
								});
							}

						}, 500);
					})
					.off('mouseleave.navHelper')
					.on('mouseleave.navHelper', nav, function(e) {
						//cont.removeAttr('style');
					});
			};

		});

	};

	$.fn.header.defaults = {

	};

})(jQuery);

$(document).ready(function(){
    $('div.projects.rotate div.frame a.item.active').removeClass('active');
    $('div.projects.rotate div.frame a.item').eq(0).addClass('active');
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


(function($) {

	$.fn.syncLinks = function(hoverClass) {

		var cont = $(this),
			hoverClass = hoverClass ? hoverClass : 'hover';

		if (cont.length === 0) {
			return false;
		}

		cont.find('a').each(function() {

			var elem = $(this),
				href = elem.attr('href'),
				brothers = cont.find('a[href="' + href + '"]');

			elem
				.on('mouseover', cont, function() {
					brothers.addClass(hoverClass);
				})
				.on('mouseleave', cont, function() {
					brothers.removeClass(hoverClass);
				});

		});

	}

})(jQuery);


(function($) {

	$.fn.photogallery = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.photogallery.defaults, options, cont.data('photogallery')),
				gallery = $('.photos_item', cont),
				popupMarkup = '' +
					'<div class="media-popup">' +
						'<div class="closer"></div>' +
						'<div class="media-popup_frame">' +
							'<div class="media-popup_cnt">' +
								'<div class="pic-wrapper">' +
									'<div class="prev"></div>' +
									'<div class="pic">' +
										'<img src="" alt="">' +
										'<div class="ico-prev"></div>' +
										'<div class="ico-next"></div>' +
										'<div class="ico-closer"></div>' +
									'</div>' +
									'<div class="next"></div>' +
								'</div>' +
								'<div class="info">' +
									'<div class="date"></div>' +
									'<div class="title"></div>' +
									'<div class="photographer"></div>' +
									'<div class="social">' +
										'<script type="text/javascript">(function() {' +
										  'if (window.pluso)if (typeof window.pluso.start == "function") return;' +
										  'if (window.ifpluso==undefined) { window.ifpluso = 1;' +
										    'var d = document, s = d.createElement("script"), g = "getElementsByTagName";' +
										    's.type = "text/javascript"; s.charset="UTF-8"; s.async = true;' +
										    's.src = ("https:" == window.location.protocol ? "https" : "http")  + "://share.pluso.ru/pluso-like.js";' +
										    'var h=d[g]("body")[0];' +
										    'h.appendChild(s);' +
										  '}})();</script>' +
										'<div class="pluso" data-background="transparent" data-options="medium,square,line,horizontal,nocounter,theme=06" data-services="vkontakte,odnoklassniki,facebook,twitter,google,moimir,email,print"></div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'',
				b = $('body'),
				link = $('.ph-carousel_item, .videos_item', cont),
				popup, pic, src, info, date, title, photographer, bDate, bTitle, bPhotographer, bPic, bPicWrp, bSocial, bPluso,
				iNext, iPrev, iCloser, next, img, prev, closer, scrtop;

			init();
			function init() {
				bindLinkClick();
				checkHash();
			};

			function preparePopup(lnk) {
				if ($('.media-popup').length === 0) {
					$('body').append($(popupMarkup));
				}
				
				popup = $('.media-popup').addClass('hidden');
				bDate = $('.date', popup);
				bTitle = $('.title', popup);
				bPhotographer = $('.photographer', popup);
				bPic = $('img', popup);
				bPicWrp = $('.pic-wrapper', popup);
				bInfo = $('.info', popup);
				bSocial = $('.social', popup);
				bPluso = $('.pluso', bSocial);
				bPluso.attr('data-url', lnk.attr('data-social-url'));
				bPluso.attr('data-title', lnk.attr('data-social-title'));
				iNext = $('.ico-next', popup);
				iPrev = $('.ico-prev', popup);
				iCloser = $('.ico-closer', popup);
				next = $('.next', popup).data('hover', iNext);
				img = $('img', popup).data('hover', iNext);
				prev = $('.prev', popup).data('hover', iPrev);
				closer = $('.closer', popup).data('hover', iCloser);

				bindPopupHandlers();
			};

			function bindLinkClick() {
				link
					.off('click.photogallery')
					.on('click.photogallery', cont, function(e) {
						e.preventDefault();
						showPopup($(this));
						if($(this).hasClass('video')){
							addVideoContent($(this));
							// img.wrap();
							// img.remove();
							// next.add(iNext).addClass('hidden');
							// prev.add(iPrev).addClass('hidden');
						} else {
							changePopupContent($(this).attr('id'));
						}
						
					});
			};

			function showPopup(lnk) {
				preparePopup(lnk);
				scrtop = window.scrollY;
				popup.removeClass('hidden');
			};

			function hidePopup() {
				popup.addClass('hidden');
				setTimeout(function() {
					popup.remove();
					delete window.pluso;
					delete window.ifpluso;
				}, 500)
				$('.ph-carousel_cnt').data('speed', 500);
				window.location.hash = '';
				$(window).scrollTo(scrtop);
			};

			function addVideoContent(el) {
				var video = el.find('.videoplay').length ? el.find('.videoplay').clone() : el.parent().find('.videoplay').clone(),
					hash = el.attr('id'),
					date = el.find('.date').length ? el.find('.date').text() : el.closest('.photos_item').children('.date').text();
					title = el.find('.title').length ? el.find('.title').text() : el.closest('.photos_item').children('.title').text();
					photographer = el.find('.photographer').text() === '' ? '' : 'Фото: ' + el.find('.photographer').text();
				img
					.hide()
					.after(video)
					.next().removeClass('hidden').videoplayer();
					
				if(history.pushState) {
					history.pushState(null, null, '#' + hash);
				} else {
					location.hash = '#' + hash;
				}
				$(window).scrollTo(0,0);
				bDate.text(date);
				bTitle.text(title);
				bPhotographer.text(photographer);

				setDefaultDimensions(780, 440, true);
				linkSocials();
				trackPluso();
				iNext.add(iPrev).add(next).add(prev).hide();
			};

			function changePopupContent(hash) {
				bPic = $('img', popup);
				pic = $('#' + hash);
				src = pic.attr('href');
				info = pic.find('.info');
				date = info.find('.date').text() !== '' ? info.find('.date').text() : pic.closest('.photos_item').children('.date').text();
				title = info.find('.title').text() !== '' ? info.find('.title').text() : pic.closest('.photos_item').children('.title').text();
				photographer = info.find('.photographer').text() === '' ? '' : 'Фото: ' + info.find('.photographer').text();
				// if(!pic.hasClass('video')){
				// 	bPic.after('<img src="" alt="">');
				// 	bPic.remove();
				// 	next.add(iNext).removeClass('hidden');
				// 	prev.add(iPrev).removeClass('hidden');
				// 	bPic = $('img', popup);
				// } 
					
				if(history.pushState) {
					history.pushState(null, null, '#' + hash);
				} else {
					location.hash = '#' + hash;
				}
				$(window).scrollTo(0,0);
				// window.location.hash = '#' + hash;

				bDate.text(date);
				bTitle.text(title);
				bPhotographer.text(photographer);

				b.addClass('wait');

				bPic
					.off('load.photo')
					.on('load.photo', function() {
						bPic.removeAttr('style');
						b.removeClass('wait');
						setPopupDimensuions(bPic.width(), bPic.height());
					});

				bPic.attr('src', src);

				// set default dimensions for preload
				setDefaultDimensions();
				checkDisabled();
				if (pic.closest('.ph-carousel').length > 0) {
					checkCarousel();
				}
				linkSocials();
				trackPluso();
			};

			function setDefaultDimensions(w, h, force) {
				if (!w && !h) {
					var w = 800,
						h = 530;
				}
				if (!force && bPic.width()) {
					return false;
				}
				bPic
					.width(w)
					.height(h);
				bPicWrp.height(h);
				bInfo.width(w);
			};

			function checkDisabled() {
				var hash = window.location.hash,
					link = $(hash);

				if (link.next('.ph-carousel_item').length === 0) {
					next.add(iNext).add(img).addClass('disabled')
				} else {
					next.add(iNext).add(img).removeClass('disabled');
				}

				if (link.prev('.ph-carousel_item').length === 0) {
					prev.add(iPrev).addClass('disabled')
				} else {
					prev.add(iPrev).removeClass('disabled');
				}
			};

			function checkCarousel() {
				var hash = window.location.hash,
					link = $(hash),
					p = link.closest('.ph-carousel_cnt'),
					items = p.find('.ph-carousel_item'),
					scr = Math.floor(link.index()/p.data('carousel').itemsPerScreen);

				p.data('speed', 0);
				p.scrollTo(0);
				p.prev().click();
				items.removeClass('active');
				items.first().addClass('active');

				for (var i = 0; i < scr; i++) {
					setTimeout(function() {
						p.next().trigger('click');
					}, 100);
				}

			};

			function linkSocials() {
				var href = window.location.href;
			};

			function setPopupDimensuions(w, h) {
				bPic
					.width(w)
					.height(h);
				bPicWrp.height(h);
				bInfo.width(w);
			};

			function bindPopupHandlers() {
				// Hovers emulation
				$()
				.add(next)
				.add(img)
				.add(prev)
				.add(closer)
					.off('mouseover.hover')
					.on('mouseover.hover', popup, function() {
						$(this).data('hover').addClass('hover');
					})
					.off('mouseleave.hover')
					.on('mouseleave.hover', popup, function() {
						$(this).data('hover').removeClass('hover');
					});
					 

				closer
				.add(iCloser)
					.off('click.close')
					.on('click.close', popup, function() {
						hidePopup();
					});

				// Escape press
				$(document).keyup(function(e) {
					if (e.keyCode == 27) {
						hidePopup();
					}
				});

				next.add(img)
					.off('click.next')
					.on('click.next', popup, function() {
						if (next.hasClass('disabled')) {
							return false;
						}
						var hash = window.location.hash,
							link = $(hash);
						hash = link.next().attr('id');
						changePopupContent(hash);
					});

				prev.add(iPrev)
					.off('click.prev')
					.on('click.prev', popup, function() {
						if (prev.hasClass('disabled')) {
							return false;
						}
						var hash = window.location.hash,
							link = $(hash);
						hash = link.prev().attr('id');
						changePopupContent(hash);
					});

			};

			function trackPluso() {
				if (bSocial.find('a').length > 0) {
					bSocial.find('a').attr('href', window.location.href);
				} else {
					setTimeout(trackPluso, 500);
				}
			};

			function checkHash() {
				var hash = window.location.hash.split('#')[1];
				if (hash) {
					if (hash != 'feedback') {
						showPopup($('#' + hash));
						if ($('#' + hash).hasClass('video')) {
							addVideoContent($('#' + hash));
						} else {
							changePopupContent(hash);
						}
					}  else {
						var feedbackPopupTop = $('div.popup').scrollTop;
						$(document).ready(function(){
							$(window).scrollTop(Math.floor($('div.question').offset().top) - 400);
							$('a.js-ajaxPopup').click();
						});
					}
				}
			};
		});

	};

	$.fn.photogallery.defaults = {

	};

})(jQuery);

$(document).ready(function(){
    $('div.question > a.js-ajaxPopup').on('click', function(){
        document.location.hash ='feedback';
    });
});

(function($) {

	$.fn.newsGallery = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.newsGallery.defaults, options, cont.data('newsGallery')),
				frame = $('.frame', cont),
				pc = $('.photo-container', cont),
				pics = $('.pic', cont),
				active = $('.pic:nth-child(1)', cont), // by default the active pic is the first one
				prev = $('.prev', cont),
				next = $('.next', cont),
				w = o.frameWidth;
			
			init()
			function init() {
				// We don't need this if there's only one pic
				checkHash();
				if (pics.length <= 1) {
					destroyGallery();
				}
				prepare();
				bindHandlers();
			};

			function destroyGallery() {
				next.add(prev).hide();
				frame.css('margin', '0');
				pics.addClass('active');
			};

			// Preparations
			function prepare() {
				pics.cleanWS();
				pc.css({
					'width': '99999px',
					'padding-left': w + 'px'
				});
				changePic();
			};

			// Bind prev/next/pic click handlers
			function bindHandlers() {
				next.add(prev).on('click', cont, function() {
					if ($(this).hasClass('disabled')) {
						return false;
					}
					active = $(this).hasClass('next') ? active.next() : $(this).hasClass('prev') ? active.prev() : active;
					changePic();
				});
			};

			// Changes pic for the one, which is contained in active variable
			function changePic() {
				if (active[0].complete) {
					go();
				} else {
					active.load(go);
				}

				function go() {
					var l = active.offset().left - pc.offset().left - (w - active.width())/2;

					pics.removeClass('active');
					active.addClass('active');
					checkDisabled();
					frame
						.height(active.height())
						.scrollTo({top: 0, left: l}, 500);

					if(history.pushState) {
						history.pushState(null, null, '#' + active.attr('id'));
					}
				};
			};

			// Checks if prev/next are needed
			function checkDisabled() {
				if (active.is(':last-child')) {
					next.addClass('disabled');
				} else {
					next.removeClass('disabled');
				}

				if (active.is(':first-child')) {
					prev.addClass('disabled');
				} else {
					prev.removeClass('disabled');
				}
			};

			function checkHash() {
				var hash = window.location.hash;
				if (hash && $(hash).length > 0) {
					active = $(hash);
					changePic();
				}
			};

		});

	};

	$.fn.newsGallery.defaults = {
		frameWidth: 546
	};

})(jQuery);


(function($) {

	var gettingMap = false,
		mapUrl = 'http://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU',
		map, pm;

	$.fn.maplinks = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.maplinks.defaults, options, cont.data('maplinks')),
				title = $(o.title, cont).text(),
				address = $(o.address, cont).html(),
				link = $(o.link, cont),
				b = $('body'),
				popup = $('.popup._map-popup'),
				popupCnt = $('.popup_cnt'),
				popupTitle = $('.popup_title', popup),
				popupAddress = $('.popup_address', popup),
				popupCloser = $('.popup_closer', popup),
				overlay = $('.overlay'),
				popupMarkup = '<div class="overlay"></div>' +
				'<div class="popup _map-popup">' +
					'<div class="popup_cnt">' +
						'<div class="popup_closer"></div>' +
						'<div class="popup_title"></div>' +
						'<div class="popup_address"></div>' +
						'<div class="popup_ymap" id="popup_ymap"></div>' +
					'</div>' +
				'</div>';
			
			init();
			function init() {
				prepare();
			};

			function prepare() {
				preparePopup();
				prepareMap();
				bindClicks();
			};

			function preparePopup() {
				if (popup.length === 0) {
					b.append($(popupMarkup));

					popup = $('.popup._map-popup');
					popupCnt = $('.popup_cnt');
					popupTitle = $('.popup_title', popup);
					popupAddress = $('.popup_address', popup);
					popupCloser = $('.popup_closer', popup);
					overlay = $('.overlay');

					hidePopup();
				}
			};

			function prepareMap() {
				if (!window.ymaps && !gettingMap) {
					gettingMap = true;
					$.getScript(mapUrl, function() {
						ymaps.ready(function() {
							map = new ymaps.Map('popup_ymap', {
								center: [55.76, 37.64], 
								zoom: 14
							});
							map.controls.add('zoomControl', {
								left: 5,
								top: 5
							});
							map.geoObjects.options.set({
								iconImageHref: o.placemark,
								iconImageSize: [71, 64],
								iconImageOffset: [-21, -48]
							});
						});
					});
				}
			};

			function bindClicks() {
				link
					.off('click.map')
					.on('click.map', cont, function(e) {
						e.preventDefault();
						var place = $(this).data('coords');
						showPopup();
						popupTitle.text(title);
						popupAddress.html(address);

						map.setCenter(place);
						if (pm) {
							map.geoObjects.remove(pm);
						}
						pm = new ymaps.Placemark(place, {
							balloonContentHeader: title
						});
						map.geoObjects.add(pm);

                        return false;
					});
			};

			function showPopup() {

				popup.removeClass('hidden');
				overlay.show();
				popup.css({
					'margin-top': $(document).scrollTop() + $(window).height() / 2 - (popup.height() / 2),
					'margin-left': -(popup.width() / 2)
				});

				popupCloser.add(overlay)
					.off('click.close')
					.on('click.close', popup, function(){
						hidePopup();
					});

				// Escape press
				$(document).keyup(function(e) {
					if (e.keyCode == 27) {
						hidePopup();
					}
				});
			};

			function hidePopup() {
				popup.addClass('hidden');
				overlay.hide();
			};

		});

	};

	$.fn.maplinks.defaults = {
		placemark: '/bitrix/templates/.default/markup/html/i/placemark.png'
	};

})(jQuery);


(function($) {

	$.fn.expanders = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.expanders.defaults, options, cont.data('expanders')),
				link = $(o.link, cont),
				block = $(o.block, cont),
				closer = $(o.closer, cont);
			
			init();
			function init() {
				prepareHideableBlocks();
				bindLinkClick();
				bindCloserClick();
			};

			function prepareHideableBlocks() {
				block.addClass('hidden');
			};

			function bindLinkClick() {
				link
					.off('click.expander')
					.on('click.expander', cont, function(e) {
						e.preventDefault();
						block.addClass('hidden'); // hide other blocks
						link.show(); // show other links
						var el = $(this),
							bl = el.next();
						el.hide() // hide this link
						bl.removeClass('hidden');
                        return false;
					});
			};

			function bindCloserClick() {
				closer
					.off('click.expander')
					.on('click.expander', cont, function() {
						$(this)
							.parent().addClass('hidden') // hide our block
							.prev().show() // show our link
                        return false;
					});
			};

		});

	};

	$.fn.expanders.defaults = {

	};

})(jQuery);

(function($) {

	$.fn.agencies = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.agencies.defaults, options, cont.data('agencies')),
				boxes = $('.agencies_box'),
				boxesCnt = $('.agencies_box-cnt');
			
			init();
			function init() {
				if ($('html').hasClass('touch')) {
					$('.agencies_boxes-wrp').masonry({
						itemSelector: '.agencies_boxes',
					});
				} else {
					boxesHoverPrepare();
				}

				boxesZindexWorkaround();
				cont._tabs({
					links: '.agencies_tablink',
					boxes: '.agencies_boxes',
					boxesCnt: '.agencies_boxes-wrp'
				});
			};

			function boxesZindexWorkaround() {
				var zi = boxes.length + 5;
				boxes.each(function() {
					zi -= 1;
					$(this).css('z-index', zi);
				});
			};

			function boxesHoverPrepare() {
				boxesCnt
					.addClass('transition')
					.hover(function(){
						var el = $(this),
							h = el.css('height', 'auto').outerHeight();
						el.removeAttr('style');

						el.animate({
							'height': h
						}, 250);
					}, function() {
						$(this).stop().removeAttr('style');
					});
			};

		});

	};

	$.fn.agencies.defaults = {

	};

})(jQuery);


(function($) {

	$.fn._tabs = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn._tabs.defaults, options, cont.data('_tabs')),
				links = $(o.links, cont),
				boxes = $(o.boxes, cont),
				boxesCnt = $(o.boxesCnt, cont),
				hash;
			
			init();
			function init() {
				prepare();
				bindHandler();
				checkHash();
			};

			function prepare() {
				boxes.addClass('hidden');
			};

			function bindHandler() {
				links
					.off('click.tabs')
					.on('click.tabs', cont, function(e) {
						var el = $(this),
							hash = el.attr('href'),
							box = boxes.filter(hash);

						if (el.hasClass('active')) {
							return false;
						}

						// if(history.pushState) {
						// 	history.pushState(null, null, hash);
						// } else {
						// 	location.hash = hash;
						// }

						boxes.addClass('hidden');
						box.removeClass('hidden');

						boxesCnt.height(box.height());

						links.removeClass('active');
						el.addClass('active');

						return false;
					});
			};

			function checkHash() {
				hash = window.location.hash;
				var l = links.filter('[href=' + hash + ']');
				if (l.length > 0) {
					l.trigger('click.tabs');
				} else {
					links.first().trigger('click.tabs');

					// if(history.pushState) {
					// 	history.pushState(null, null, '#');
					// } else {
					// 	location.hash = '';
					// }
				}
			};

		});

	};

	$.fn._tabs.defaults = {
		links: '.tablink',
		boxes: '.box'
	};

})(jQuery);


(function($) {

	$.fn.ajaxPopup = function(options) {

		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.ajaxPopup.defaults, options, cont.data('ajaxPopup')),
				b = $('body'),
				url = cont.attr('href'),
				popupMarkup = '' +
					'<div class="overlay"></div>' +
					'<div class="popup _standart-popup">' +
						'<div class="popup_cnt">' +
							'<div class="popup_closer"></div>' +
							'<div class="popup_ajaxData"></div>' +
						'</div>' +
					'</div>',
				overlay = $('.overlay'),
				popup = $('.popup._standart-popup'),
				popupCnt = $('.popup_cnt'),
				popupCloser = $('.popup_closer'),
				popupAjax = $('.popup_ajaxData');

			init();
			function init() {
				preparePopup();
				bindHandlers();
			};

			function preparePopup() {
				if ($('.popup._standart-popup').length === 0) {
					b.append($(popupMarkup));
					overlay = $('.overlay');
					popup = $('.popup._standart-popup');
					popupCnt = $('.popup_cnt');
					popupCloser = $('.popup_closer');
					popupAjax = $('.popup_ajaxData');
				}
				hidePopup();
			};

			function bindHandlers() {
				cont
					.off('click.ajaxPopup')
					.on('click.ajaxPopup', function(e) {
						e.preventDefault();

						b.addClass('wait');
						$.ajax(url)
							.always(function(data) {
								b.removeClass('wait');
							})
							.success(function(data) {
								popupAjax.html(data);
								if($.isFunction(o.onOpen)){
									o.onOpen.apply(cont, arguments);
								}
								popupScripts();
								showPopup();
							})
							.fail(function(data) {
								alert('Что-то пошло не так.')
							});
						return false;
					});
			};

			function showPopup() {

				if (!$('.overlay').parent().is('body')) {
					$('.overlay').appendTo('body');
				}

				if (!$('.popup').parent().is('body')) {
					$('.popup').appendTo('body');
				}
				popup.removeClass('hidden');
				overlay.show();
				popup.css({
					'margin-top': $(document).scrollTop() + $(window).height() / 2 - (popup.height() / 2),
					'margin-left': -(popup.width() / 2)
				});

				popupCloser.add(overlay)
					.off('click.close')
					.on('click.close', popup, function(){
						hidePopup();
					});

				// Escape press
				$(document).keyup(function(e) {
					if (e.keyCode == 27) {
						hidePopup();
					}
				});
			};

			$.fn.ajaxPopup.showPopup = showPopup;

			function hidePopup() {
				popup.addClass('hidden');
				overlay.hide();
				overlay.css("background","transparent");
				popup.removeClass('pop2')
			};

			// Scripts, that should run, after popup is opened.
			// Custom scrollbars, javascripty form controls, etc.
			function popupScripts() {
				if (!o.dontTouchForm) {
					formCheck();
				}
			};

			// If there is form inside popup,
			// it will give us the result of submit
			// appended into popup
			function formCheck() {
				var form = popup.find('form');
				if (form.length > 0) {
					form
						.off('submit')
						.on('submit', function(e) {
							e.preventDefault();
							$.post(url, form.serialize(), function(data) {
								popupAjax.html(data);
								formCheck();
							});
						});
				}
			};
			
		});

	};

	$.fn.ajaxPopup.defaults = {
		onOpen: null
	};

})(jQuery);


(function($) { //create closure
$.fn.videoplayer = function(options){
	this.each(function(){
	var defaults = {
		width: "780px", // ширина
		height: "440px", // высота
		cssClass: "jp-video-780p", // см. css 
		autoplay: false, // true = автовоспроизведение после инициализации
		loop: false, // повтор с начала (с первого ролика в группе: $(this).find('.src:eq(0)'))
		current: 0 // с какого из группы роликов начинать воспроизведение [0..$(this).find('.src').length-1]
	};
	var errors = 0; var msg='';
	var o = $.extend(defaults, options);
		var vp = $(this), items = vp.children('.src'), cnt = items.length;
		vp.css({position: 'relative',width:o.width,height:o.height});
		function videoPrepare(vp) { // vp = .videoplay, prv = .preview
                        items.each(function(k){
                        		var player = $(this);
					var ifr = $('<div class="videoplayer"></div>').prependTo(player);
					var setMedia = {}, supplied = '';
					player.children('a').each(function(i){
						var a = $(this); supplied += (i>0) ? ','+a.attr('rel'):a.attr('rel');
						setMedia[a.attr('rel')] = a.attr('href');
					});
					if (k==o.current) {
						var prv = vp.find('.preview');
						if (prv) {
							var poster = prv.find('img');
							if (poster.length && poster.attr('src')) setMedia.poster = poster.attr('src');
						}
						prv.hide();
					}
					var id = vp.attr('id')+'_'+k;
					var tpl = createVideoPlayer(id, '');
					$(tpl).appendTo(ifr);
	
					player.css({position: 'absolute',width:o.width,height:o.height,zIndex:(cnt-k)});
					$('#jplayer_'+id).data('k',k).data('z',cnt).jPlayer({
						ready: function () {
							$(this).jPlayer("setMedia", setMedia);
							if (k==o.current) {
								player.css({'z-index': cnt+1});
							} else {
							}
							if (o.autoplay && k==o.current) $(this).jPlayer("play");
							player.children('a').hide();
						},
						cssSelectorAncestor: '#container_'+id,
						swfPath: "/bitrix/templates/.default/markup/html/swf",
						// swfPath: "swf",
						preload: 'metadata',
						autohide: {restored: true, full: true, fadeIn: 150, fadeOut: 400, hold: 1500},
						volume: 0.6,
						muted: false,
						supplied: supplied,
						play: function() { // To avoid both jPlayers playing together.
							var pl = $(this);
							pl.jPlayer("pauseOthers");
							o.current = k;
							pl.parents('.src').css('z-index', cnt+1);
						},
						ended: function() { // To avoid both jPlayers playing together.
							var pl = $(this);
							pl.jPlayer('pause',0);
							var vol = pl.jPlayer("option","volume"), 
								mute = pl.jPlayer("option","muted")//,
//								fullScreen = pl.jPlayer("option","fullScreen");
							o.current = ((k+1) < (cnt))? k+1 : 0;
							var next = $('#jplayer_'+vp.attr('id')+'_'+o.current);
							next.parents('.src').css({'z-index': cnt});
							pl.parents('.src').css({'z-index': (cnt - pl.data('k'))});

							next.jPlayer("volume",vol); // если менялась громкость
							next.jPlayer("mute",mute); // если менялся mute
//							pl.jPlayer("fullWindow",false); // если менялся fullScreen
//							next.jPlayer("fullScreen",fullScreen); // если менялся fullScreen
//							next.jPlayer("fullWindow",fullScreen); // если менялся fullScreen

							if (o.current==0 && o.loop==true || o.current>0) { // если следующий не первый или первый и зациклено
								next.jPlayer('play',0);
							} else { // если следующий не первый или первый и зациклено
								next.jPlayer('pause',0);
							}
						},

						size: {
							width: o.width,
							height: o.height,
							cssClass: o.cssClass
						},
						smoothPlayBar: true,
						keyEnabled: true
					});
				});
		}
		videoPrepare(vp);
	});
}
//end of closure
})(jQuery);

function createVideoPlayer(id, title) {
  var tpl = '<div id="container_'+id+'" class="jp-video ">'+
    '<div class="jp-type-single">'+
      '<div id="jplayer_'+id+'" class="jp-jplayer"></div>'+
      '<div class="jp-gui">'+
        '<div class="jp-video-play">'+
          '<a href="javascript:;" class="jp-video-play-icon" tabindex="1">воспр.</a>'+
        '</div>'+
        '<div class="jp-interface">'+
          '<div class="jp-progress">'+
            '<div class="jp-seek-bar">'+
              '<div class="jp-play-bar"></div>'+
            '</div>'+
          '</div>'+
          '<div class="jp-current-time"></div>'+
          '<div class="jp-duration"></div>'+
          '<div class="jp-controls-holder">'+
            '<ul class="jp-controls">'+
              '<li><a href="javascript:;" class="jp-play" tabindex="1">воспр.</a></li>'+
              '<li><a href="javascript:;" class="jp-pause" tabindex="1">пауза</a></li>'+
              '<li><a href="javascript:;" class="jp-stop" tabindex="1">стоп</a></li>'+
              '<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">выкл.</a></li>'+
              '<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">вкл.</a></li>'+
//            '<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>'+
            '</ul>'+
            '<div class="jp-volume-bar">'+
              '<div class="jp-volume-bar-value"></div>'+
            '</div>'+
//            '<ul class="jp-toggles">'+
//              '<li><a href="javascript:;" class="jp-full-screen" tabindex="1" title="full screen">весь экран</a></li>'+
//              '<li><a href="javascript:;" class="jp-restore-screen" tabindex="1" title="restore screen">обычный размер</a></li>'+
//              '<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>'+
//              '<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>'+
//            '</ul>'+
          '</div>'+
          '<div class="jp-title">'+
            '<ul>'+
              '<li>'+title+'</li>'+
            '</ul>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="jp-no-solution">'+
        '<span>Нужен плагин</span>'+
        'Для воспроизведения видео вам нужно обновить браузер или <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.'+
      '</div>'+
    '</div>'+
  '</div>';

	
	
	
	return tpl;
}


(function($) {

	$.fn.blindWorkaround = function(options) {
        var siteTitle = $('.site-title');
		return this.each(function() {
			var cont = $(this),
				o = $.extend({}, $.fn.blindWorkaround.defaults, options, cont.data('blindWorkaround')),
				b = $('body'),
				header = siteTitle.length > 0 ? siteTitle : $('.header'),
				blindLine = '<div class="blind-line hidden">' +
								'<div class="wrapper">' +
									'<div class="contrast-control">' +
										'<a href="#" class="black-and-white">А</a>' +
										'<a href="#" class="white-and-black">А</a>' +
									'</div>' +
									'<div class="size-control">' +
										'<a href="#" class="font_s">А</a>' +
										'<a href="#" class="font_m">А</a>' +
										'<a href="#" class="font_l">А</a>' +
									'</div>' +
									'<div class="get-back">' +
										'<a href="#">Обычная версия</a>' +
									'</div>' +
								'</div>' +
							'</div>',
				blindLinks, getBack,
				defaultClasses = 'black-and-white font_l';
			
			init();
			function init() {
				prepareBlindLine();
				bindTriggers();
				checkLocal();
			};

			function prepareBlindLine() {
				header.prepend($(blindLine));
				blindLine = $('.blind-line');
				getBack = $('.get-back a', blindLine);
				blindLinks = $('a', blindLine).not(getBack);
			};

			function bindTriggers() {
				cont
					.off('click.turnonblind')
					.on('click.turnonblind', function(e) {
						e.preventDefault();
						if (b.hasClass('blindOn')) {
							hideBlindLine();
							saveLocal();
						} else {
							showBlindLine(true);
							saveLocal();	
						}
					});

				getBack
					.off('click.turnoffblind')
					.on('click.turnoffblind', function(e) {
						e.preventDefault();
						if (b.hasClass('blindOn')) {
							hideBlindLine();
							saveLocal();
						}
					});

				blindLinks
					.off('click.triggerClass')
					.on('click.triggerClass', function(e) {
						e.preventDefault();
						el = $(this);
						el.siblings().removeClass('active').each(function() {
							b.removeClass($(this).attr('class'));
						});
						b.addClass(el.attr('class'));
						el.addClass('active');
						saveLocal();
					});
			};

			function showBlindLine(defaultRun) {
				b.addClass('blindOn');
				if (defaultRun) {
					b.addClass(defaultClasses);
				}
				blindLine.removeClass('hidden');
			};

			function hideBlindLine() {
				var classes = '';
				blindLinks.each(function() {
					classes += $(this).attr('class') + ' ';
				});
				b.removeClass('blindOn');
				b.removeClass(classes);
				blindLine.addClass('hidden');
			};

			function saveLocal() {
				localStorage.setItem('bodyClasses', b.attr('class'));
			};

			function checkLocal() {
				var classes = localStorage.getItem('bodyClasses');
				if (classes) {
					b.addClass(classes);
					if (classes.indexOf('blindOn') > -1) {
						showBlindLine();
					}
					for (var i = 0; i < classes.split(' ').length; i++) {
						$('.' + classes.split(' ')[i]).addClass('active');
					}
				}
			};

		});

	};

	$.fn.blindWorkaround.defaults = {

	};

})(jQuery);


(function($) { //create closure
$.fn.notacarousel = function(options){
    this.each(function(){ // 
        var defaults = {
            scroll: 1,
            start: 1,
            offset: 1,
            easing: 'linear',
            animation: 400,
            visible: 1,
            wrap: 'circular',
            asT: 0, // таймаут автоскролла integer: 0 - нет автоскролла, либо в ms: 3500 = 3.5 секунды
            buttonNextHTML: '<a href="javascript:void(0);"><span></span></a>',
            buttonPrevHTML: '<a href="javascript:void(0);"><span></span></a>',
            preview: false,
            initcallback: null
        };
        var errors = 0; var msg='';
        var o = $.extend(defaults, options);
        o.me = $(this);
        var ul = o.me.children('ul'), id = ul.attr('id'), li = ul.children('li');
        o.L = li.length;
        var W = 0; li.each(function(){ W = Math.max(W, li.width())});
        ul.jcarousel({
            buttonNextHTML: o.buttonNextHTML,
            buttonPrevHTML: o.buttonPrevHTML,
            navMarker: null, // кружок для навигации
            navCurrent: null, // кружок выбранного слайда в навигации
            wrap: o.wrap,
            start: o.start,
            offset: o.offset,
            scroll: o.scroll,
            easing: o.easing,
            animation: o.animation,
            itemFallbackDimension: 1280,
            visible: o.visible,
            initCallback: carouselNav,
            animationStepCallback: carouselNextStep,
            itemVisibleInCallback: {
                onBeforeAnimation: onBeforeAnimationStep,
                onAfterAnimation: onAfterAnimationStep
            }
        });
        $(window).load(function(){
            var H = 0;
            li.each(function(){
                H = Math.max(H, $(this).height());
            });
            li.height(H);
        });

        var tmr;
        function carouselNav(carousel, status) {
            if (status == 'init') {
                var id = carousel.container.context.id, txt = '';
                $(carousel.container.context).children('li').each(function(i){
                    if (!(i%o.scroll)) {
                        if (o.navMarker) {
                            txt += '<td class="carouselcontrol_'+(i+1)+' dot"><a href="#" rel="'+(i+1)+'"><img src="'+((i==0)? o.navCurrent : o.navMarker)+'" alt="" /></a></td>';
                        } else {
                            txt += '<td class="carouselcontrol_'+(i+1)+' dot"><a href="#" rel="'+(i+1)+'">'+(i+1)+'<br /><span>&#8226;</span></a></td>';
                        }
                    }
                });
                if(o.preview == true){
                    var img = '';
                    $(carousel.container.context).children('li').each(function(i){
                        img += '<a href="#"><img src="'+$(this).find('img').data('src')+'" width="117" height="80" alt="" /></a>';
                    });
                    o.previews = $('<div class="preview">'+img+ '</div>').appendTo(carousel.container);

                    $('.preview a').unbind('click').bind('click', function() {
                        var ind = $(this).index();
                        carousel.scroll(ind+1);
                        return false;
                    });

                }

                o.table = $('<table id="'+id+'control" class="carouselcontrol"><tbody><tr>'+txt+
                    ((o.asT > 0) ? '<td class="playtrigger"><a href="#" rel="slidestop" class="slidestop"></a></td>' : '')+
                    '</tr></tbody></table>').appendTo(carousel.container);

                carousel.container.children('.carouselcontrol').wrapAll('<div class="carouselnav" />');
                carousel.container.children('.carouselnav').append('<div class="stat"><strong>0</strong> ('+carousel.size()+')</div>');

    
                $('#'+id+'control td.dot a, #'+id+'control td.playtrigger a').unbind('click').bind('click', function() {
                        var a = $(this), td = a.parent('td.dot');
                    if (a.hasClass('slidestop')) {
                        if (td.hasClass('stopped')) td.removeClass('stopped'); else td.addClass('stopped');
                    } else {
                        $('#'+id+'control td.playtrigger').addClass('stopped');
                        $('#'+id+'control .current').removeClass('current');
                        carousel.scroll(a.attr('rel')*1);
                                td.addClass('current');
                                if (a.children('img').length > 0 && o.navCurrent) {
                                    $('#'+id+'control td.dot a > img').attr('src', o.navMarker);
                                    a.children('img').attr('src', o.navCurrent);
                                }
                            }
                    return false;
                });
                        if (o.asT > 0) o.tm = window.setTimeout(function(){autoClicker(carousel);}, o.asT);

                
                $(window).bind('resize.notacarousel',function(){
                    window.clearTimeout(tmr);
                    tmr = window.setTimeout(function(){
                        window.clearTimeout(tmr);
                        if (carousel.container.context.id == 'guberprogs' || carousel.container.context.id == 'eventscarousel') {
                            var ww = $(window).width(), vis = 2, par = $('#'+carousel.container.context.id).parent(), 
                                w = (carousel.container.context.id == 'guberprogs') ? 245 : 200;
                            if (carousel.container.context.id == 'guberprogs' && ww > 630) vis = 3;
                            if (carousel.container.context.id == 'guberprogs' && ww > 995) vis = 4;
                            if (carousel.container.context.id != 'guberprogs' && ww > 630) vis = 3;
                            carousel.scroll(1,false);
                            carousel.options.visible = vis;
                            par.width(w*vis);
                            carousel.reload();
                        } else {
                            carousel.scroll(1,false);
                            carousel.reload();
                        }
                    }, 100);
                });

                                $(window).trigger('resize.notacarousel');
            }

            if (o.initcallback) o.initcallback();
        }

        function autoClicker(carousel) {
            window.clearTimeout(o.tm);
            var id = carousel.container.context.id, currtd = $('#'+id+'control td.dot.current');
            if (!$('#'+id+'control td.playtrigger').hasClass('stopped')) {
                nexttd = (currtd.next('td.dot').length > 0) ? currtd.next('td.dot') : $('#'+id+'control td.dot:eq(0)');
                currtd.removeClass('current');
                carousel.scroll(nexttd.find('a').attr('rel')*1);
                        nexttd.addClass('current');
            }
                    o.tm = window.setTimeout(function(){autoClicker(carousel);}, o.asT);
        }

        function carouselNextStep() {
        
        }

        function onBeforeAnimationStep(){

        }
        function onAfterAnimationStep(carousel){
            var newNum = carousel.first, id = carousel.container.context.id, l = $('#'+id+'control').find('td.dot').length;
            var n = carousel.first % (o.scroll * l);
            n = (n < 1)? n+o.scroll * l : n;
            $('#'+id+'control').find('.current').removeClass('current');
            $('.preview').find('.current').removeClass('current');
            $('#'+id+'control').find('td.carouselcontrol_'+n).addClass('current');
            $('.preview').find('a:eq('+(n-1)+')').addClass('current');
            carousel.container.find('.stat strong').text(n);
            $(carousel.container.context).trigger('currentitem',n-1);
        }

    
        });
        
    }
//end of closure
})(jQuery); // notacarousel
