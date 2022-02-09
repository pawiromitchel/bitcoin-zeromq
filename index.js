var bitcoin = require('bitcoinjs-lib');
var zmq = require('zeromq');

// create the socket connection
var sock = zmq.socket('sub');
var addr = 'tcp://127.0.0.1:3000';

sock.connect(addr);
sock.subscribe('rawtx');

sock.on('message', function(topic, message) {
    if (topic.toString() === 'rawtx') {
        var rawTx = message.toString('hex');
        console.log('received transaction hex', rawTx);
    } else {
        console.log('received unknown topic', topic.toString());
    }
});