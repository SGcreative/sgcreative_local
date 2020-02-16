$(window).on('load, resize, scroll', function() {
    $('section').each(function() {
        var scrollMid = $(window).scrollTop() + ($(window).innerHeight() / 2);
        var id = $(this).attr('id');

        if (scrollMid > $(this).offset().top) {
            $('nav a').removeClass('active');
            $('nav a[href*=' + id +']').addClass('active');
        }
    });
});

$('nav a, .hero a').click(function() {
    console.log($(this).attr('href'));
    var sectionId = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(sectionId).offset().top }, 800);
});