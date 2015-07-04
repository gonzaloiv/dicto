var app = {
    
    // Text introduced
    $word: $('.word input'),

    // Actions to be handled of the App
    actions: function () {
        // Action for de button
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
    
    // Just call the server for the definition
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
                app.errorData();
            }
        });
    },

    // Function to handle data
    handleData: function (data) {

        // Out the spinner...
        var $spinner = $('.loading');
        $spinner.fadeOut(1000);

        // Some information on the console
        console.log('Successful.');
        console.log(app.$word.val());

        // Adding the data to the view
        app.displaying(data);

    },
    
    // Handles AJAX errors...
    errorData: function () {
        
        // Out the spinner...
        var $spinner = $('.loading');
        $spinner.fadeOut(1000);
        
        // Shows the user the problem...
        var $def = $('.definition');
        $def.empty();
        $def.append('<div>Nothing found...</div>');
    },
    
    // Format the JSON into HTML
    displaying: function (data) {
        var $definition = $('.definition');
        $definition.empty();
        $definition.fadeOut(300, function () {
            var html = '';
            
            // Iterate on the JSON definitions...
            for (var i = 0; i < data.definitions.length; i++) {
                html += '<li>' + i + '. ' + data.definitions[i].text + '</li>';
            };
            
            // Exception for not found words...
            if(html===''){
                html='<div>Nothing found...</div>';
            };
                
            $definition.append(html);
        });
        $definition.fadeIn(300);
    }
};

//Initialize the App
(function start() {
    app.actions();
})();
