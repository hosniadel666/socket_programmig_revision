var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/app', function(req, res){
    res.sendFile('C:/Users/hosni/Desktop/socketIO_practice/index.html');});

users = [];
counter = 0;

io.on('connection', function(socket){
    
    console.log('A user connected');
    setInterval(function() {
        const birthday = new Date();
        var date = birthday.getHours() + ' : ' + birthday.getMinutes() + ' : '+ birthday.getSeconds(); 

        socket.emit('time_topic', 'Current Time : ' + date);

    }, 1000);

   socket.on('setUsername', function(data){   
      console.log(data);
      if(users.indexOf(data) > -1){
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });

   socket.on('msg', function(data){
      // Broadcasting message to other clients
      io.sockets.emit('newmsg', data);
   });

   socket.on('disconnect', function()
   {
        console.log('A user disconnected');
   });
});
http.listen(3000, function(){
   console.log('listening on localhost:3000');
});