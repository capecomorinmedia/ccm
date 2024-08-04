jQuery(document).ready(function($) {
    "use strict"
    // Header scroll class
    if ($('#main-header').length) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#main-header').addClass('header-scrolled');
            } else {
                $('#main-header').removeClass('header-scrolled');
            }
        });
        if ($(window).scrollTop() > 100) {
            $('#main-header').addClass('header-scrolled');
        }
    }
    // Smooth scroll for the navigation and links with .scrollto classes
    if ($('.main-nav a').length) {
        $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                if (target.length) {
                    var top_space = 0;
                    if ($('#main-header').length) {
                        top_space = $('#main-header').outerHeight();
                        if (!$('#main-header').hasClass('header-scrolled')) {
                            top_space = top_space - 40;
                        }
                    }
                    $('html, body').animate({
                        scrollTop: target.offset().top - top_space
                    }, 1500, 'easeInOutExpo');
                    if ($(this).parents('.main-nav, .mobile-nav').length) {
                        $('.main-nav .active, .mobile-nav .active').removeClass('active');
                        $(this).closest('li').addClass('active');
                    }
                    if ($('body').hasClass('mobile-nav-active')) {
                        $('body').removeClass('mobile-nav-active');
                        $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                        $('.mobile-nav-overly').fadeOut();
                    }
                    return false;
                }
            }
        });
    }
    // ------- Pretty Photo Start ------- // 
    if ($('.gallery').length) {
        $("area[data-rel^='prettyPhoto']").prettyPhoto();
        $(".gallery:first a[data-rel^='prettyPhoto']").prettyPhoto({
            animation_speed: 'normal',
            theme: 'light_square',
            slideshow: 3000,
            autoplay_slideshow: false
        });
    }
    // ------- Pretty Photo End ------- // 
    // ------- Home Slider Start ------- //
    if ($('#home-slider').length) {
        $('#home-slider').owlCarousel({
            margin: 0,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            responsiveClass: true,
        })
    }
    // ------- Home Slider End ------- //
    // ------- Home Slider Start ------- //
    if ($('#awards-slider').length) {
        $('#awards-slider').owlCarousel({
            margin: 0,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            responsiveClass: true,
        })
    }
    // ------- Home Slider End ------- //
    // ------- Home Slider Start ------- //
    if ($('#post-slider').length) {
        $('#post-slider').owlCarousel({
            margin: 0,
            nav: true,
            dots: false,
            items: 1,
            autoplay: false,
            responsiveClass: true,
        })
    }
    // ------- Home Slider End ------- //
    // ------- Side Products Start ------- //
    if ($('#side-products').length) {
        $('#side-products').owlCarousel({
            margin: 0,
            nav: true,
            dots: false,
            items: 1,
            autoplay: true,
            responsiveClass: true,
        })
    }
    // ------- Side Products End ------- //
    // ------- Home Slider Start ------- //
    if ($('#pro-slider').length) {
        $('#pro-slider').owlCarousel({
            loop: true,
            margin: 30,
            dots: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 2,
                    nav: false
                },
                1000: {
                    items: 3,
                    nav: true,
                    loop: false
                }
            }
        })
    }
    // ------- Home Slider End ------- //
    // ------- News Slider Start ------- //
    if ($('#newsupdate-slider').length) {
        $('#newsupdate-slider').owlCarousel({
            loop: true,
            margin: 30,
            dots: true,
            responsiveClass: true,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                    loop: false
                }
            }
        })
    }
    // ------- News Slider End ------- //
    // ------- News Slider Start ------- //
    if ($('#videonews-slider').length) {
        $('#videonews-slider').owlCarousel({
            loop: true,
            margin: 30,
            dots: true,
            responsiveClass: true,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                    loop: false
                }
            }
        })
    }
    // ------- News Slider End ------- //
    // ------- Product Slider Start ------- //
    if ($('#top-stories').length) {
        $('#top-stories').owlCarousel({
            margin: 0,
            nav: true,
            dots: true,
            items: 1,
            responsiveClass: true,
        })
    }
    // ------- Product Slider End ------- //
    if ($('audio').length) {
        $(function() {
            $('audio').audioPlayer();
        });
    }
    // ------- countdown ------- //
    if ($('.defaultCountdown').length) {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('.defaultCountdown').countdown({
            until: austDay
        });
        $('#year').text(austDay.getFullYear());
    }
    // ------- countdown End ------- // 

    // ------- News Grid ------- //
    if ($('.news-gallery .isotope').length) {
        if ($('.news-gallery .isotope').length) {
            var $container = $('.news-gallery .isotope');
            $container.isotope({
                itemSelector: '.item',
                transitionDuration: '0.6s',
                masonry: {
                    columnWidth: $container.width() / 12
                },
                layoutMode: 'masonry'
            });
            $(window).on('click', function() {
                $container.isotope({
                    masonry: {
                        columnWidth: $container.width() / 12
                    }
                });
            });
        }
    }
    // ------- News Grid ------- //
    if ($('.classic-gallery .isotope').length) {
        if ($('.classic-gallery .isotope').length) {
            var $container = $('.classic-gallery .isotope');
            $container.isotope({
                itemSelector: '.item',
                transitionDuration: '0.6s',
                masonry: {
                    columnWidth: $container.width() / 12
                },
                layoutMode: 'masonry'
            });
            $(window).on('click', function() {
                $container.isotope({
                    masonry: {
                        columnWidth: $container.width() / 12
                    }
                });
            });
        }
    }
    // ------- News Grid ------- //
    if ($('.massonry-gallery .isotope').length) {
        if ($('.massonry-gallery .isotope').length) {
            var $container = $('.massonry-gallery .isotope');
            $container.isotope({
                itemSelector: '.item',
                transitionDuration: '0.6s',
                masonry: {
                    columnWidth: $container.width() / 12
                },
                layoutMode: 'masonry'
            });
            $(window).on("click", function() {
                $container.isotope({
                    masonry: {
                        columnWidth: $container.width() / 12
                    }
                });
            });
        }
    }
    // ------- Home Slider Start ------- //
    if ($('#h3-twitter-slider').length) {
        $('#h3-twitter-slider').owlCarousel({
            margin: 0,
            dots: true,
            items: 1,
            autoplay: true,
            responsiveClass: true,
        })
    }
    // ------- Home Slider End ------- //
    if ($('.h3-match-counter .hide').length) {
        $(".h3-match-counter .hide").on('click', function() {
            $(this).parents(".h3-match-counter").hide("slow");
        });
    }
    // ------- Home Slider Start ------- //
    if ($('#player-slider').length) {
        $('#player-slider').owlCarousel({
            loop: true,
            margin: 30,
            dots: true,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 4,
                }
            }
        })
    }
    // ------- Home Slider End ------- //



    // ------- Search Overlay Start ------- //
    if ($('a[href="#search"]').length) {
        $(function() {
            $('a[href="#search"]').on('click', function(event) {
                event.preventDefault();
                $('#search').addClass('open');
                $('#search > form > input[type="search"]').focus();
            });
            $('#search, #search button.close').on('click keyup', function(event) {
                if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                    $(this).removeClass('open');
                }
            });
            $('form').submit(function(event) {
                event.preventDefault();
                return false;
            })
        });
    }

    // ------- Search Overlay End ------- //




    // ------- Filter Gallery Start ------- //
    if ($('.filter-gallery').length) {
        if ($('.filter-gallery .isotope').length) {
            var $container = $('.filter-gallery .isotope');
            $container.isotope({
                itemSelector: '.item',
                transitionDuration: '0.6s',
                masonry: {
                    columnWidth: $container.width() / 12
                },
                layoutMode: 'masonry'
            });
            $(window).on("resize", function() {
                $container.isotope({
                    masonry: {
                        columnWidth: $container.width() / 12
                    }
                });
            });
        }
        if ($('.filter-gallery #filters').length) {
            $('.filter-gallery #filters').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $container.isotope({
                    filter: filterValue
                });
            });
            // change is-checked class on buttons
            $('.filter-gallery .button-group').each(function(i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'button', function() {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                });
            });
        }
    }
}); //End