
// var message = {
//   username: 'username',
//   text: 'Hello World!!!',
//   roomname: 'hrr22 4life'
// };

var app = {};

app.init = function() {};
app.send = function(message)  {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.get('http://parse.hrr.hackreactor.com/chatterbox/classes/messages',function(messages) {
    console.log('messages came in');
    console.log(messages);
    var messages = messages.results;
    messages.forEach(function(message) {
      // var text = jsesc(message.text);
      $('#chats').append('<div>' + message.text + '</div>');
    });
  });

  // $.ajax({
  // // This is the url you should use to communicate with the parse API server.
  //   url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  //   type: 'GET',
  //   // contentType: 'application/json',
  //   success: function (data) {
  //     console.log('chatterbox: Messages received');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to receive messages', data);
  //   }
  // })
};

$(document).ready(function() {
  $( ".btn" ).click(function(event) {
    var visitorMessage = $( ".entry" ).val();
    console.log(visitorMessage);
    var user = window.location.href.split('username=')[1];
    var message = {};
    message.username = user;
    message.text = visitorMessage;
    message.roomname = 'test';
    app.send(message);
  });
});

// app.fetch();
