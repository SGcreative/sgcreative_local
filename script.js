$(document).ready(function() {
    $('.percent-bars p').addClass('before-animate');
});

$(window).on('load, resize, scroll', function() {
    var scrollMid = $(window).scrollTop() + ($(window).innerHeight() / 2);
    var scrollLow = $(window).scrollTop() + ($(window).innerHeight() / 1.3);

    $('section').each(function() {
        var id = $(this).attr('id');
        if (scrollMid > $(this).offset().top) {
            $('nav a').removeClass('active');
            $('nav a[href*=' + id +']').addClass('active');
        }
    });

    if (scrollLow > $('.percent-bars').offset().top) {
        $('.percent-bars p').removeClass('before-animate');
    }

});

$('nav a, .hero a').click(function() {
    console.log($(this).attr('href'));
    var sectionId = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(sectionId).offset().top }, 800);
});