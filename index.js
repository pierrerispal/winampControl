var $ = require('jQuery');
var sys = require('util')
var exec = require('child_process').exec;
var child;
//Setup basic express server
var express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  io = require('socket.io')(server),
  port = process.env.PORT || 3000;

//to know where we are
//executeCommand("chdir");
//to see what programs are launched
//executeCommand("tasklist");
//i can launch app witch command lines like that
//executeCommand('start C:/"Program Files (x86)"/Winamp/winamp.exe');
//i can open a google chrome tab
//executeCommand('C:/"Program Files (x86)"/Google/Chrome/Application/chrome.exe http://google.fr');


//to know winamp command winamp.exe /?
$('#pause').click(function(){
  executeCommand('C:/"Program Files (x86)"/Winamp/winamp.exe /PAUSE')
})

$('#play').click(function(){
  executeCommand('C:/"Program Files (x86)"/Winamp/winamp.exe /PLAY')
})


function executeCommand(command){
  child = exec(command, function (error, stdout, stderr) {
    $('#log').append(stdout);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}


server.listen(port, function () {
    console.log('Server listening at port %d', port);
});
//app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log("new connection");
    socket.on('connect user', function(user){
    });
    socket.on('command',function(action){
      executeCommand('C:/"Program Files (x86)"/Winamp/winamp.exe /'+action.command);
    })
    socket.on('disconnect', function () {
        console.log("someone just left");
        //if user is connected
        if(socket.user!=null){
            var i = userList.indexOf(socket);
            userList.splice(i,1);
            updateUserList('disconnect',socket.user);
        }
    });
});
