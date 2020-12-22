$(document).ready(function() {
    var input = document.getElementById('courseInput');
    input.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { // Enter Key
            event.preventDefault();
            document.getElementById('btn').click();
        }
    });
    $('img#tree').hide();
    $('button#btn').on('click', function() {
        var course = $('#courseInput').val();
        $.ajax({
            data: {
                name: course,
            },
            url: "/_get_tree/",
            type: "POST",
            beforeSend: function() {
                $('#btn').attr('disabled', true);
                $('span').addClass('spinner-border spinner-border-sm');
            },
        }).done(function(resp) {
            $('#btn').attr('disabled', false);
            var image = resp.data;
            if (!image.includes(' ') && image.length > 0) {
                var time = new Date();
                $('img#tree').attr('src', "../static/Prerequisite_Trees/" + image + '?none=' + time.getTime())
                $('img#tree').show();
            } else if (image.length > 0) {
                var text = image.split(' ')[1];
                if (image.startsWith('NA')) {
                    alert(text + " is not a course offered at UW");
                } else if (image.startsWith('NP')) {
                    alert(text + " has no Prerequisites");
                }
            }
            $('span').removeClass('spinner-border spinner-border-sm');
        });
    }); 
});