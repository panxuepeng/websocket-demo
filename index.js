var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/editor', function(req, res){
    res.sendFile(__dirname + '/editor.html');
});


app.get('/editor2', function(req, res){
    res.sendFile(__dirname + '/editor-readonly.html');
});

io.on('connection', function(socket) {

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });

    socket.on('editor', function(msg) {
        var data = JSON.parse(msg)

        io.emit(data.sessionId+':editor', JSON.stringify(data.msg));
    });

    socket.on('scroll', function(msg) {
        var data = JSON.parse(msg)

        io.emit(data.sessionId+':scroll', JSON.stringify(data.msg));
    });
    
    socket.on('cursor', function(msg) {
        var data = JSON.parse(msg)
        //console.log(data)
        io.emit(data.sessionId+':cursor', JSON.stringify(data.msg));
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
