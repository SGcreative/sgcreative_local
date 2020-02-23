$('include').each(function() {
    var filePath = $(this).attr('src');
    fetch(filePath).then(file => {
        file.text().then(content => {
            $(content).insertAfter(this)
            $(this).remove();
        });
    });
});

$(document).ready(function() {

    $('.ajax-popup').magnificPopup({
        type: 'ajax',
        callbacks: {
            open: function() {
                setTimeout(function() {
                    $('.progress-bar span').addClass('active');
                }, 100);
                setTimeout(function() {
                    $('.ajax-popup').magnificPopup('close');
                }, 4000);
            }
        }
    });

    // Duplicate Cart Quantity --
    // $('.cart-qty').text($('.cartSummary_Quantity').text());

    // FIXED HEADER NAVIGATION --
    function fixedHeader() {
        var y = window.pageYOffset;
        var pxDown = ($('#top-header').height());
        var stickyNav = $('#sticky-header');
        var cssPxDown = pxDown + "px";

        $('#sticky-header').show();

        if (y > pxDown && $(window).width() >= 1440) {
            stickyNav.addClass('fixed');
        } else {
            stickyNav.removeClass('fixed');
            stickyNav.css('top', cssPxDown);
        }

        if (window.location.pathname !== '/') {
            var cssPagePxDown = (pxDown + ($('#sticky-header').height())) + 20 + "px";
            var refinePxDown = (pxDown - 10) + "px";
            var refineSearch = $('.ItemBrowserPageContainer .AttributeFilter');

            if (y > pxDown && $(window).width() >= 1440 && $('.ItemBrowserPageContainer .AttributeFilter').length) {
                if (refineSearch.css('position').toLowerCase() == 'fixed') {
                    refineSearch.css('margin-top', refinePxDown);
                } else {
                    refineSearch.css('margin-top', '0');
                }
            } else {
                refineSearch.css('margin-top', '0');
            }

            if ($(window).width() >= 768) {
                $('#divworkspacearea').css('padding-top', cssPagePxDown);
            } else {
                $('#divworkspacearea').css('padding-top', '25px');
            }
        } else {
            $('#divworkspacearea').css('padding-top', '0');
        }
    }

    fixedHeader();

    $(window).on('load', function() {
        fixedHeader();
    });

    $(window).on('scroll', function() {
        fixedHeader();
    });

    $(window).on("resize", function() {
        fixedHeader();
    });
});

// MOBILE MENU FUNCTION ---
$(document).ready(function() {

    // Variables
    var slideoutMenu = $('.slideout-menu'); // Slideout menu container
    var menuToggle = $('.slideout-menu-toggle'); // Menu open/close link
    var menuSide = "left"; // Side that the menu slides out from
    var expandable = $('.expandable'); // Expandable sub-menu parent li
    var slideIn = $('.slide-in'); // Slide-in sub-menu parent li
    var expandIcon = "<span class=\"menu-indicator\">+</span>"; // Expandable sub-menu indicator (click to open)
    var contractIcon = "<span class=\"menu-indicator\">-</span>"; // Expandable sub-menu indicator (click to close)
    var slideCloseText = "<i class=\"fa fa-angle-left\" style=\"position:static;\"></i>&ensp;Back"; // Slide-in sub-menu close link
    var searchBox = $('#search-bar'); // Search box container
    var searchToggle = $('.opensearch'); // Search box open/close link

    // Determine the menu width & height
    var menuWidth = $(slideoutMenu).width();
    $(window).on('resize', function() {
        menuWidth = $(slideoutMenu).width();
    });

    var menuHeight = $(slideoutMenu).height();

    // Position the menu
    if (menuSide === "top") {
        $(slideoutMenu).css(menuSide, -menuHeight);
    } else {
        $(slideoutMenu).css(menuSide, -menuWidth);
    }

    // Hide sub-menus
    $(slideIn).children('ul').hide();
    $(expandable).children('ul').hide();

    // Sub-menu icons/HTML
    $(expandable).children('a').append("<span>" + expandIcon + "</span>");
    $(slideIn).children('ul').prepend("<li><a href=\"javascript:void(0)\">" + slideCloseText + "</a></li>");

    // Determine if search box exists
    if (searchBox == null || searchBox == "" || searchToggle == null || searchToggle == "") {
        search = false;
    } else {
        search = true;
    }

    // SLIDE-OUT MENU ---
    function slideoutMenuAction() {
        if (slideoutMenu.hasClass("open")) {
            subMenuClose();
            if (menuSide === "right") {
                slideoutMenu.removeClass("open").animate({
                    scrollTop: 0,
                    right: -menuWidth,
                }, function() {
                    $(this).hide();
                });
            } else if (menuSide === "top") {
                slideoutMenu.removeClass("open").animate({
                    scrollTop: 0,
                    top: -menuHeight,
                }, function() {
                    $(this).hide();
                });
            } else {
                slideoutMenu.removeClass("open").animate({
                    scrollTop: 0,
                    left: -menuWidth,
                }, function() {
                    $(this).hide();
                });
            }
            disableBodyScroll();
        } else {
            if (menuSide === "right") {
                slideoutMenu.show();
                slideoutMenu.animate({
                    right: "0px"
                }).addClass("open");
            } else if (menuSide === "top") {
                slideoutMenu.show();
                slideoutMenu.animate({
                    top: "0px"
                }).addClass("open");
            } else {
                slideoutMenu.show();
                slideoutMenu.animate({
                    left: "0px"
                }).addClass("open");
            }
            disableBodyScroll();
        }
    };

    // Menu toggle
    $(menuToggle).on('click', function(event) {
        if (search === true) {
            if (searchBox.hasClass("open")) {
                searchBox.toggleClass("open");
                searchBox.slideToggle();
            }
        }
        event.preventDefault();
        slideoutMenuAction();
    });

    // Click outside to close menus
    function closeMenu() {
        if (slideoutMenu.hasClass("open")) {
            event.preventDefault();
            slideoutMenuAction();
        }
        if (search === true) {
            if (searchBox.hasClass("open")) {
                searchBox.toggleClass("open");
                searchBox.slideToggle();
            }
        }
    };

    // Click anywhere
    $('html').click(function() {
        closeMenu();
    });

    // Except on the menu container, menu toggle, search container, search toggle
    $(menuToggle).add(slideoutMenu).add(searchToggle).add(searchBox).click(function(event) {
        event.stopPropagation();
    });

    // EXPANDABLE SUB MENUS ---
    function subMenuToggle(el) {
        subMenuClose(el);
        $(el).next('ul').slideToggle();
        $(el).toggleClass("open");
        $(el).children('span').toggleText(expandIcon, contractIcon);
        if ($(el).hasClass("open") && $(el).parent().is(':last-child')) {
            $(slideoutMenu).animate({ scrollTop: menuHeight });
        }
    };

    function subMenuClose(el) {
        if ($(el).hasClass("open")) {
            return;
        } else if ($(slideIn).children('ul').hasClass("open")) {
            $(slideIn).children('.open').removeClass("open").animate({
                left: "100%"
            }, 250, function() {
                $(this).hide();
            });
        } else {
            var openMenu = $(expandable).children('.open');
            $(openMenu).next('ul').slideToggle();
            $(openMenu).removeClass("open");
            $(openMenu).children('span').toggleText(expandIcon, contractIcon);
        }
    };

    $(window).on('resize', function() {
        disableBodyScroll();
    });

    function disableBodyScroll() {
        if (slideoutMenu.hasClass("open")) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    };

    // Toggle expand/contract icon
    jQuery.fn.extend({
        toggleText: function(a, b) {
            var TheIcon = this;
            if (TheIcon.html() != a && TheIcon.html() != b) {
                TheIcon.html(a);
            } else if (TheIcon.html() == a) {
                TheIcon.html(b);
            } else if (TheIcon.html() == b) {
                TheIcon.html(a);
            }
            return this;
        }
    });

    // Expandable sub-menu toggle
    $(expandable).children('a').on('click', function() {
        var el = this;
        subMenuToggle(el);
    });

    // SLIDE-IN SUB MENUS ---
    function slideInToggle(el) {
        if ($(el).hasClass("open")) {
            $(el).removeClass("open").animate({
                left: "100%"
            }, function() {
                $(this).hide();
            });
        } else {
            subMenuClose();
            $(slideoutMenu).animate({
                scrollTop: 0
            })
            $(el).addClass("open").show().animate({
                left: "0%"
            })
        }
    };

    // Open slide-in sub-menu
    $(slideIn).children('a').on('click', function() {
        var el = $(this).next('ul');
        slideInToggle(el);
    });

    // Close slide-in sub-menu
    $(slideIn).find('li:first-child a').on('click', function() {
        var el = $(this).parents('ul.open');
        slideInToggle(el);
    });

    // Search-menu Toggle
    if (search === true) {
        $(searchToggle).click(function() {
            if (slideoutMenu.hasClass("open")) {
                slideoutMenuAction();
            }
            searchBox.toggleClass("open");
            searchBox.slideToggle();
            if (searchBox.hasClass("open")) {
                $('#search-bar input[type="text"]').focus();
            }
        });
    }
});

$(document).ready(function() {

    // START SHOPPING SCROLL DOWN --
    $('#scroll-down a').click(function() {
        $('html, body').animate({ scrollTop: $('#browse-rooms').offset().top }, 800);
    });

    // FOOTER SOCIAL ICONS BACKGROUND (not homepage) --
    // if (window.location.pathname != '/') {
    //     $('.footer-social').css('background-color', '#fff');
    // }

    // BRANDS LIST EXPANSION BASED ON COUNT --
    var totalItems = $('.footer-column ul li').length;
    var brandItems = $('#FooterBrands li').length;

    var actualItems = totalItems - brandItems;
    var average = Math.round(actualItems / 2);
    var brandsShown = average - 2;

    if (brandItems > average) {
        $('#FooterBrands li:eq(' + brandsShown + ')').nextAll().wrapAll('<div class="additional-brands" style="display:none;"></div>');
        $('#FooterBrands').append('<li><a href="javascript:void(0);" onclick="$(\'.additional-brands\').slideToggle(); $(\'.more-brands\').toggle(); $(\'html, body\').animate({ scrollTop: $(document).height() }, \'slow\');"><span class="more-brands">VIEW MORE +</span><span class="more-brands" style="display:none;">VIEW LESS -</span></a></li>');
    };

    // SCROLL TO TOP --
    // Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrolltotop').fadeIn();
        } else {
            $('.scrolltotop').fadeOut();
        }
    });

    // Click event to scroll to top
    $('.scrolltotop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

});