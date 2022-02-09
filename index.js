// Library for working with the bitcoin protocol.
// For working with transactions, hd wallets, etc.
var bitcoin = require('bitcoinjs-lib');

// Implementation of ZeroMQ in node.js.
// From the maintainers of the ZeroMQ protocol.
var zmq = require('zeromq');

// Create a subscriber socket.
var sock = zmq.socket('sub');
var addr = 'tcp://127.0.0.1:3000';

// Initiate connection to TCP socket.
sock.connect(addr);

// Subscribe to receive messages for a specific topic.
// This can be "rawblock", "hashblock", "rawtx", or "hashtx".
sock.subscribe('rawtx');

sock.on('message', function(topic, message) {
    if (topic.toString() === 'rawtx') {

        // Message is a buffer. But we want it as a hex string.
        var rawTx = message.toString('hex');

        // Use bitcoinjs-lib to decode the raw transaction.
        var tx = bitcoin.Transaction.fromHex(rawTx);

        // Get the txid as a reference.
        var txid = tx.getId();

        console.log('received transaction', txid);
    }
});