var app = {

  // VARIABLES
  $word: $('#word-input'),

  // BEHAVIOUR
  listen: function() {
    $('#btn').click(function() {
      app.getDefinition(app.$word);
    });
    app.$word.keypress(function(e) {
      var code = e.keyCode || e.which;
      if (code === 13) {
        app.getDefinition(app.$word);
      }
    });
  },

  // Handles data
  handleData: function(data) {

    var $spinner = $('.loading');
    $spinner.fadeOut(1000);

    console.log('Successful.');
    console.log(app.$word.val());

    app.display(data);

  },

  // Handles AJAX errors
  errorData: function() {

    var $spinner = $('.loading');
    $spinner.fadeOut(1000);

    var $def = $('.definition');
    $def.empty();
    $def.append('<li>Nothing found...</li>');
  },

  // Formats JSON to HTML
  display: function(data) {
    var $definition = $('.definition');
    $definition.empty();
    $definition.fadeOut(300, function() {
      var html = '';

      for (var i = 0; i < data.definitions.length; i++) {
        html += '<li>' + i + '. ' + data.definitions[i].text + '</li>';
      };

      if (html === '') {
        html = '<li>Nothing found...</li>';
      };

      $definition.append(html);
    });
    $definition.fadeIn(300);
  },

  // SERVICES
  getDefinition: function(word) {
    $('.loading').css('display', 'inline-block');
    return $.ajax({
      type: 'GET',
      url: 'https://montanaflynn-dictionary.p.mashape.com/define?word=' + word.val(),
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-Mashape-Key', 't0hpNRS5lFmshfF3Wv3tU0jgkGEep1x7N3CjsnCU6Cmgb2oFV2');
      },
      success: function(data) {
        app.handleData(data);
      },
      error: function() {
        app.errorData();
      }
    });
  }

};

app.listen();