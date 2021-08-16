var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/app', function(req, res){
    res.sendFile('C:/Users/hosni/Desktop/node js revision/index.html');});
users = [];
counter = 0;

io.on('connection', function(socket){
   console.log('A user connected');
    counter = 0;

    setInterval(function() {
        socket.emit('test_topic', 'it is' + counter );
        counter++;
    }, 5);

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
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   });

   socket.on('disconnect', function()
   {
       counter = 0;
   }
   );
});
http.listen(3000, function(){
   console.log('listening on localhost:3000');
});