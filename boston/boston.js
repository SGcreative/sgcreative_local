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
            closeMenu();
            setTimeout(function() {
                $('.progress-bar span').addClass('active');
            }, 100);
            setTimeout(function() {
                $('.ajax-popup').magnificPopup('close');
            }, 4000);
        }
    }
});

// MOBILE MENU FUNCTION ---

// Variables
var slideoutMenu = $('#slideout-menu'); // Slideout menu container
var menuToggle = $('.slideout-menu-toggle'); // Menu open/close link
var menuSide = "right"; // Side that the menu slides out from
var expandable = $('.expandable'); // Expandable sub-menu parent li
var slideIn = $('.slide-in'); // Slide-in sub-menu parent li
var expandIcon = "<span class=\"menu-indicator\">+</span>"; // Expandable sub-menu indicator (click to open)
var contractIcon = "<span class=\"menu-indicator\" style=\"color:#FF3357;\">-</span>"; // Expandable sub-menu indicator (click to close)
var slideCloseText = "<i class=\"fa fa-arrow-left\" style=\"position:static;color:#FF3357;\"></i> Back"; // Slide-in sub-menu close link
var searchBox = "" // Search box container
var searchToggle = "" // Search box open/close link

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
$(slideIn).children('ul').hide();
$(expandable).children('ul').hide();

// Sub-menu icons/HTML
$(expandable).children('a').append("<span>" + expandIcon + "</span>");
$(slideIn).children('ul').prepend("<li><a href=\"javascript:void(0)\">" + slideCloseText + "</a></li>");

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
    }
};

// Menu toggle
$(menuToggle).on('click', function(event) {
    $('.dropdown-open').removeClass('dropdown-open');
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

// Except on the menu or toggle button
$(menuToggle).add(slideoutMenu).click(function(event) {
    event.stopPropagation();
});

// Close menu when navigating to anchor on current page
$('#slideout-menu a[href*="#"]').on('click', function() {
    var newUrl = $(this).attr('href').split("#")[0];
        if(window.location.href.toLowerCase().indexOf(newUrl.toLowerCase()) > -1) {
        slideoutMenuAction();
    }
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
    else if ($(slideIn).children('ul').hasClass("open")) {
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
    });
}

// Duplicate Cart Quantity --
// $('.cart-qty').text($('.cartSummary_Quantity').text());

// Fixed Header --
function headerSpace() {
    var headerHeight = $('header').height() + 'px';

    if ($(window).width() > 767) {
        $('main').css('margin-top', headerHeight)
    }
    else {
        $('main').css('margin-top', 'inherit')
    }
};

$(window).on('load', function() {
    headerSpace();
});

$(window).on('scroll', function() {
    headerSpace();
});

$(window).on("resize", function() {
    headerSpace();
});

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

//SCROLL TO TOP --
//Check to see if the window is top if not then display button
$(window).scroll(function() {
    if ($(this).scrollTop() > 60) {
        $('.scrolltotop').fadeIn();
    } else {
        $('.scrolltotop').fadeOut();
    }
});

//Click event to scroll to top
$('.scrolltotop').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
});

// Dropdown Menus Toggle
$('.dropdown-toggle').on('click', function() {
    if ($(this).parent('li').hasClass('dropdown-open')) {
        $(this).parent('li').removeClass('dropdown-open');
    } else {
        $('.dropdown-open').removeClass('dropdown-open');
        $(this).parent('li').addClass('dropdown-open');
        if ($(this).hasClass('search-toggle')) {
            setTimeout(function() {
                $('#search-bar input[type="text"]').focus();
            }, 100);
        }
    }
});

if ($('.dropdown-open')) {
    $('main').on('click', function() {
        $('.dropdown-open').removeClass('dropdown-open');
    });
}