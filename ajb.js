define(['require', 'jquery', 'modernizr', 'liteaccordion'], function(req, jq, mod, la) {

        $(document).on('ready', function() {

                if (Modernizr.mq('screen and (max-width: 480px)')) {

                    require(['hammer'], function(h) {

                            var c = 0;

                            h('.mini-nav-toggler').on('tap', function() {

                                    c += 1;

                                    if (c % 2 == 0) {

                                        $('.mini-nav').removeClass('open');

                                    } else {

                                        $('.mini-nav').addClass('open');

                                    }

                                }

                            };

                        );

                    }

                    function navHelper() {

                        if ($(window).width() > 780) {

                            var LI = $('nav.main ul').children('li');

                            $(LI).each(function() {

                                if ($(this).children('.sub-menu:not(.sub-menu .sub-menu)').length > 0) {

                                    $(this).children('.sub-menu:not(.sub-menu .sub-menu)').css('left', $(this).children('a').position().left + 'px');

                                    $(this).children('.sub-menu:not(.sub-menu .sub-menu)').each(function() {

                                        var h = 0;

                                        $(this).children('li').children('a').each(function() {

                                            h += $(this).outerHeight()

                                        });

                                        $(this).parent().on('mouseenter', function() {

                                            $(this).children('.sub-menu:not(.sub-menu .sub-menu)').css('height', h + 'px');

                                            $(this).children('.sub-menu:not(.sub-menu .sub-menu)').css('bottom', '-' + h + 'px');

                                            $(this).children('a').addClass('drop')

                                        });

                                        $(this).parent().on('mouseleave', function(event) {

                                            if (event.relatedTarget != ($('ul') || $('li') || $('a'))) {

                                                $(this).children('.sub-menu:not(.sub-menu .sub-menu)').css('height', '0');

                                                $(this).children('.sub-menu:not(.sub-menu .sub-menu)').css('bottom', '0');

                                                $(this).children('a').removeClass('drop')

                                            }

                                        })

                                    })

                                }

                            })

                        }

                    }

                    navHelper();

                    $(window).on('resize', navHelper);

                    $(window).on('load', navHelper);

                    $('.i-plate:first, .block-info:first').addClass('act');

                    var tab = '#tabs ul li a';

                    $(tab + ':first').addClass('act');

                    var tabCheck = function(el) {

                        $(tab).each(function() {

                            $(this).removeClass('act');

                            if ($(this).hasClass($(el).data('title'))) {

                                $(this).addClass('act')

                            }

                        })

                    };

                    var infoCheck = function(dir) {

                        var n;

                        if (dir == 'R') {

                            if ($('.i-plate.act').is('.i-plate:last')) {

                                n = $('.i-plate:first')

                            } else {

                                n = $('.i-plate.act').next('.i-plate')

                            }

                        } else if (dir == 'L') {

                            if ($('.i-plate.act').is('.i-plate:first')) {

                                n = $('.i-plate:last')

                            } else {

                                n = $('.i-plate.act').prev('.i-plate')
                            }

                        } else {

                            n = $('.i-plate[data-title="' + dir + '"]')

                        }

                        $('.i-plate.act').removeClass('act');

                        $(n).addClass('act');

                        tabCheck(n);

                        $('section.info h3').text($(n).data('title'));

                        $('.block-info.act').removeClass('act');

                        $('.block-info:eq(' + ($(tab + ".act").parent().index()) + ')').addClass('act');

                        $('#ilm-link').attr('href', (function() {

                            var x = $(tab + '.act span').text().toLowerCase();

                            console.log(x);

                            return x;

                        })());

                    };

                    $('#L,#R').on('click', function(event) {

                        event.preventDefault();

                        infoCheck($(this).attr('id'))

                    });

                    $(tab).on('click', function(event) {

                        event.preventDefault()

                    });

                    $(tab).on('mouseenter', function() {

                        if (!$(this).hasClass('act')) {

                            infoCheck($(this)[0].className)

                        }

                    });

                    $('input, textarea').each(function() {

                        if ($(this).attr('type') != 'submit') {

                            var initVal = $(this).val();

                            $(this).attr('placeholder', initVal);

                            $(this).val('')

                        }

                    });

                    $('#lac').liteAccordion({

                        containerHeight: $('.lac-wrap').outerHeight() - 20,

                        containerWidth: $('.lac-wrap').outerWidth(),

                        enumerateSlides: true,

                        firstSlide: 4

                    });

                    $('.acc-ctrl').on('click', function() {

                        if (!$('.lac-wrap').hasClass('open')) {

                            $(this).addClass('open');

                            $('.lac-wrap').addClass('open')

                        } else {

                            $('li.slide h2:last').click();

                            $(this).removeClass('open');

                            $('.lac-wrap').removeClass('open')

                        }

                    });

                    $('li.slide').on('click', function() {

                        if (!$('.lac-wrap').hasClass('open')) {

                            $('.lac-wrap').addClass('open');

                            $('.acc-ctrl').addClass('open')

                        }

                    });

                    var numBans = $('.b-plate').toArray();

                    for (var i = 0; i < numBans.length; i++) {

                        $('.banner-nav ul').append('<li><a href="#" class="bnav"></a></li>')

                    };

                    $('.bnav').on('click', function(event) {

                        event.preventDefault();

                        $('.bnav.selected').removeClass('selected');

                        $(this).addClass('selected')

                        $('.b-plate.act').removeClass('act');

                        var CBG = $('.b-plate:eq(' + $(this).parent().index() + ')');

                        $(CBG).addClass('act');

                        $('#slidechange').html($(CBG).data('desc'));

                    });

                    $('.bnav:first').click();

                    setInterval(function() {

                        if ($('.bnav.selected').parent().is($('.banner-nav ul li:last'))) {

                            $('.bnav:first').trigger('click');

                        } else {

                            $('.bnav.selected').parent().next().children('.bnav').trigger('click');

                        }

                    }, 5200);

                })

        });