// function fixedHeader() {
//     var height = $(window).height() - $('nav').height();
//     var scroll = window.pageYOffset;

//     if (scroll >= height) {
//         $('nav').addClass('fixed');
//     } else {
//         $('nav').removeClass('fixed');
//     }
// }

// $(window).on('load, resize, scroll', function() {
//     fixedHeader();
// });

$(window).on('load, resize, scroll', function() {
    $('section').each(function() {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(this).offset().top;
        var elemBottom = elemTop + $(this).height();
        var id = $(this).attr('id');

        if ((docViewBottom > elemTop) && (docViewTop < elemBottom)) {
            //$(this).addClass('in-view')
            $('nav a[href*=' + id +']').addClass('active');
        } else {
            $('nav a[href*=' + id +']').removeClass('active');
            //$(this).removeClass('in-view')
        }
    })
});

$('nav a').each(function() {

})
$('nav a').click(function() {
    console.log($(this).attr('href'));
    var sectionId = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(sectionId).offset().top }, 800);
});