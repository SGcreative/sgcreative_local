// $('include').each(function() {
//     var filePath = $(this).attr('src');
//     fetch(filePath).then(file => {
//         file.text().then(content => {
//             $(content).insertAfter(this)
//             $(this).remove();
//         });
//     });
// });

// Demo Popup
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

// Sticky Header
var scrollPosition = "";
var newScrollPosition = "";
var headerHeight = $('header').outerHeight();
var topSpace = 0;
var negTopSpace = 0;
var hasScrolled = false;
var scrolledUp = false;

$(window).on('scroll', function() {

    var scrollDown = this.oldScroll <= this.scrollY;
    this.oldScroll = this.scrollY;

    if (scrollDown) {

        if (scrolledUp === true) {
            scrolledUp = false;
            topSpace = 0;
            newScrollPosition = scrollY;
        }

        topSpace = scrollY - newScrollPosition;
        negTopSpace = -Math.abs(topSpace);
        var menuPadding = headerHeight + negTopSpace;

        $('header').removeClass('slide-down').css('top', negTopSpace);
        $('.slideout-menu').removeClass('slide-down').css('padding-top', menuPadding);

    } else if (hasScrolled) {
        scrolledUp = true;
        $('header').addClass('slide-down').css('top', '0');
        $('.slideout-menu').addClass('slide-down').css('padding-top', headerHeight);

    }
    hasScrolled = true;

});

$(window).on('load resize', function() {
    headerHeight = $('header').outerHeight();
    $('.slideout-menu, #item-info-container').css('padding-top', headerHeight);
    $('main').css('border-top-width', headerHeight);
});

$(document).ready(function() {

    // Menu Toggle Animation
    $('.slideout-menu-toggle').on('click', function() {
        $('#menu-toggle div').toggleClass('open');
    });

    // Maximum number of items on homepage tile and brand lists
    $('.tile-half-left ul, .tile-half-right ul').each(function() {
        // Set maximum single column items here
        categoryLimit($(this), 5);
    });

    $('.tile-full-left ul').each(function() {
        // Set maximum double column items here
        categoryLimit($(this), 14);
    });

    function categoryLimit(obj, limit) {
        // Append View All link but not for brands list
        if ($(obj).attr('class') != "no-limit") {
            var theUrl = $(obj).parent().siblings('a').attr('href');
            $(obj).append('<li><a href=\"' + theUrl + '\"><span>View All</span></a></li>');
        } if ($(obj).find('li').length > (limit + 1)) {
            $(obj).find('li').eq((limit - 1)).nextUntil('li:last-child').remove();
        }
    };

});

$(document).ready(function() {
    // SLIDEOUT MENU FUNCTION ---
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
    }
    else {
        $(slideoutMenu).css(menuSide, -menuWidth);
    }

    // Hide sub-menus
    $(slideIn).children('.slide-in-menu').hide();
    $(expandable).children('ul').hide();

    // Sub-menu icons/HTML
    $(expandable).children('a').append("<span>" + expandIcon + "</span>");

    // Determine if search box exists
    if (searchBox == null || searchBox == "" || searchToggle == null || searchToggle == "") {
        search = false;
    }
    else {
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
            }
            else if (menuSide === "top") {
                slideoutMenu.removeClass("open").animate({
                    scrollTop: 0,
                    top: -menuHeight,
                }, function() {
                    $(this).hide();
                });
            }
            else {
                slideoutMenu.removeClass("open").animate({
                    scrollTop: 0,
                    left: -menuWidth,
                }, function() {
                    $(this).hide();
                });
            }
            disableBodyScroll();
        }
        else {
            if (menuSide === "right") {
                slideoutMenu.show();
                slideoutMenu.animate({
                    right: "0px"
                }).addClass("open");
            }
            else if (menuSide === "top") {
                slideoutMenu.show();
                slideoutMenu.animate({
                    top: "0px"
                }).addClass("open");
            }
            else {
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
            $('#menu-toggle div').removeClass('open');
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
        }
        else if ($(slideIn).children('.slide-in-menu').hasClass("open")) {
            $(slideIn).children('.open').removeClass("open").animate({
                left: "100%"
            }, 250, function() {
                $(this).hide();
            });
        }
        else {
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
        if (slideoutMenu.hasClass("open") && $(window).width() <= 1024) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    };

    // Toggle expand/contract icon
    jQuery.fn.extend( {
        toggleText: function (a, b) {
            var TheIcon = this;
                if (TheIcon.html() != a && TheIcon.html() != b){
                    TheIcon.html(a);
                }
                else if (TheIcon.html() == a){
                    TheIcon.html(b);
                }
                else if (TheIcon.html() == b){
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
        }
        else {
            subMenuClose();
            $(slideoutMenu).animate({
                scrollTop: 0
            });
            $(el).addClass("open").show().animate({
                left: "0%"
            });
        }
    };

    // Open slide-in sub-menu
    $(slideIn).children('a').on('click', function() {
        var el = $(this).next('.slide-in-menu');
        slideInToggle(el);
    });

    // Close slide-in sub-menu
    $(slideIn).find('.slide-in-back').on('click', function() {
        //event.preventDefault();
        var el = $(this).parents('.slide-in-menu.open');
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
        });
    }

});