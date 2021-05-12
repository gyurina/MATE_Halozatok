
// Chat Szerver
// Nádházy György
// RKBXXM

var net = require('net');
var dateTime = require('node-datetime');

var szerver =  net.createServer (function(socket) {
	//Új kliens
	console.log('\x1b[31m%s\x1b[0m','kliens csatlakozott (' + socket.remoteAddress + ":" + socket.remotePort + ")");

	//kapcsolat bontásakor ezt jelezzük
	socket.on('end', function() {
		console.log('\x1b[31m%s\x1b[0m','kliens letcsatlakozott');
		});
	//értesítsük a klienst a sikeres kapcsolatról
	socket.write('Üdv a Chatszerveren\r\n');

	//Megjelenítjük, hogy mit küldött a kliens
	socket.on('data', function(data) {
		var dt = dateTime.create();
		var fdt = dt.format('Y-m-d H:M:S');
		data  = fdt + "->" + data;
		console.log('\x1b[32m%s\x1b[0m',data);
		});

	//elküldjük, amit beírt
	process.stdin.on('data', function (buffer) {
                var dt = dateTime.create();
                var fdt = dt.format('Y-m-d H:M:S');
                data  = fdt + " --> " + buffer.toString();
        	socket.write(data);
	        });

	});

szerver.listen(3000);
