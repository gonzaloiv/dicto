var app = {

    $word: $('.word input'),

    data: {
        responseText: ''
    },

    buttons: function () {

        $('#btn').click(function () {
            app.data = $.ajax({
                type: "GET",
                url: "https://montanaflynn-dictionary.p.mashape.com/define?word=" + app.$word.val(),
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-Mashape-Key', 't0hpNRS5lFmshfF3Wv3tU0jgkGEep1x7N3CjsnCU6Cmgb2oFV2');
                },
                success: function () {
                    console.log('Successful.');
                    console.log(app.$word.val());
                },
                error: function () {
                    console.log('Error.');
                    console.log(app.$word.val());
                }
            });
        });

        $('#pr').click(function () {
            console.log(app.data.responseText)
        });

    }

};
app.buttons();
