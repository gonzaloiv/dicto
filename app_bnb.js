var app = (function () {

    word = $('.word input');

    data = {
        responseText: ''
    };

    $('#btn').click(function () {
        data = $.ajax({
            type: "GET",
            url: "https://montanaflynn-dictionary.p.mashape.com/define?word=" + word.val(),
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Mashape-Key', 't0hpNRS5lFmshfF3Wv3tU0jgkGEep1x7N3CjsnCU6Cmgb2oFV2');
            },
            success: function () {
                console.log('Successful.');
                console.log(word.val());
            },
            error: function () {
                console.log('Error.');
                console.log(word);
            }
        });
    });

    $('#pr').click(function () {
        console.log(data.responseText)
    });

})();
