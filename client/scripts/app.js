var app = {};

app.init = function() {
  app.server = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';
  app.room = 'lobby';
  app.fetch();
  app.friends = [];
};

app.send = function(message)  {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
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
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: { order: '-createdAt' },
    contentType: 'application/json',
    success: function(messages) {
      console.log('messages came in');
      var messages = messages.results;
      messages.forEach(function(message) {
        app.renderMessage(message);
      });
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive messages', data);
    }
  });
};

$(document).ready(function() {
  $( ".submit" ).click(function(event) {
    var visitorMessage = $( ".entry" ).val();
    console.log(visitorMessage);
    var user = window.location.href.split('username=')[1];
    var message = {};
    message.username = user;
    message.text = visitorMessage;
    message.roomname = app.room;
    app.send(message);
  });

  $( ".clear" ).click(function(event) {
    app.clearMessages();
  });

  $("#roomSelect").change(function(event) {
    if(this.value === 'add-room') {
      var roomAdd = prompt('What is your room name?');
      app.renderRoom(roomAdd);
    } else {
      app.clearMessages();
      app.room = this.value;
      app.fetch();
    }
  });
});

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  if(app.room === message.roomname) {
    var messageContainer = $('<div class="chat"></div>');
    messageContainer.append('<a class="username">@' + message.username + '</a>');
    messageContainer.append('<div class="message-text">' + message.text + '</div');
    $('#chats').append(messageContainer);
  }
};

app.renderRoom = function(roomName) {
  if(roomName) {
    var newRoomMod = roomName.replace(' ', '-');
    $("#roomSelect").prepend($('<option value="' + newRoomMod + '">' + roomName + '</option>'));
    $("#roomSelect").val(newRoomMod);
    app.room = newRoomMod;
    app.clearMessages();
    app.fetch();
  }
};

app.init();

//app.fetch();
