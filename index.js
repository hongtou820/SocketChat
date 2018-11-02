var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {

    var userid = Math.floor(Math.random() * 90000) + 10000;
    console.log('userid: ' + userid);
    io.emit('chat connect', userid);

    socket.on('disconnect', function() {
        io.emit('chat disconnected', userid);
    });

    socket.on('chat send', function(msg) {
        io.emit('chat receive', userid + "_" + msg);
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});