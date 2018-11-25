// Make connection
var socket = io.connect();

$(function(){
    var socket = io.connect();
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chat');
    var $messageArea = $('#messageArea');
    var $userFromArea = $('#userFromArea');
    var $userForm = $('#userForm');
    var $users = $('#users');
    var $username = $('#username');
    

    $messageForm.submit(function(e){
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    socket.on('new message', function(data){
        var date = formatAMPM(new Date());
        $chat.append('<div class="well"><strong>'+data.user+" : "+'</strong>'+ data.msg + " " + "<span class='time' >" + date + "</span>" + '</div>')
    });

    $userForm.submit(function(e){
        e.preventDefault();
        socket.emit('new user', $username.val(), function(data){
            if (data){
                    $userFromArea.hide();
                    $messageArea.show();
            }
        });
        $username.val('');
    });

    socket.on('get users', function(data){
          var html = '';
          for( i = 0; i < data.length; i++){
               html += '<li class="list-group-item">'+data[i]+'</li>';

          }
          $users.html(html);
    });
    
    //time function
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    }

});
