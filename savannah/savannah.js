$('include').each(function() {
    var filePath = $(this).attr('src');
    fetch(filePath).then(file => {
        file.text().then(content => {
            $(content).insertAfter(this)
            $(this).remove();
        });
    });
});

