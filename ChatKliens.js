// Chat Kliens
// Nádházy György
// RKBXXM

var net = require('net');
var dateTime = require('node-datetime');

var socket = net.Socket();

socket.connect(3000, 'localhost');

socket.on('connect', function() {
       console.log('\x1b[31m%s\x1b[0m','Catlakoztál a szerverhez (' + socket.remoteAddress + ":" + socket.remotePort + ")");

	process.stdin.on('data', function (buffer) {
		socket.write(buffer);

		});
	socket.on('data', function(data) {
                console.log('\x1b[32m%s\x1b[0m',data);
                });

});

