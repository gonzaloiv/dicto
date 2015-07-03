var app = {
    // Text introduced
    $word: $('.word input'),

    // Actions to be handled of the App
    actions: function () {
        $('#btn').click(function () {
            app.ajaxCall(app.$word);
        });
        // Action pressing enter
        app.$word.keypress(function (e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
                app.ajaxCall(app.$word);
            }
        });
    },
    // Just call the server for the 
    ajaxCall: function (word) {
        $('.loading').css("display", "inline-block");
        return $.ajax({
            type: "GET",
            // Append the word to the url for the API call
            url: "https://montanaflynn-dictionary.p.mashape.com/define?word=" + word.val(),
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Mashape-Key', 't0hpNRS5lFmshfF3Wv3tU0jgkGEep1x7N3CjsnCU6Cmgb2oFV2');
            },
            success: function (data) {
                app.handleData(data);
            },
            error: function () {
                console.log('Error.');
                $('.loading').css('display', 'none');
            }
        });
    },

    // JSON, definitions...
    handleData: function (data) {

        // Showing the spinner...
        $('.loading').css('display', 'none');

        // Some information on the console
        console.log('Successful.');
        console.log(app.$word.val());

        // Adding the data to the view
        app.displaying(data);

    },

    // Format the JSON into HTML
    displaying: function (data) {
        var $definition = $('.definition');
        $definition.empty();
        $definition.fadeOut(300, function () {;
            var html = '';
            for (var i = 0; i < data.definitions.length; i++) {
                html += '<li>' + i + '- ' + data.definitions[i].text + '</li>';
            };
            $definition.append(html);
        });
        $definition.fadeIn(300);
    }
};

//Initialize the APP
(function start() {
    app.actions();
})();
