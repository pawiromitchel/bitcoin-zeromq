const zmq = require('zeromq')
const sock = zmq.socket('sub')
const RpcClient = require('bitcoind-rpc');
const bitcoin = require('bitcoinjs-lib');

const config = {
  protocol: 'http',
  user: 'bitcoin',
  pass: 'bitcoin',
  host: '127.0.0.1',
  port: '8332',
};

const RPC = new RpcClient(config);
sock.connect('tcp://127.0.0.1:3000');
sock.subscribe('raw')
sock.on('message', function(topic, message) {
  if (topic == 'rawtx') {
    const rawTx = message.toString('hex');
    const tx = bitcoin.Transaction.fromHex(rawTx);
    const txid = tx.getId();
    console.log('received transaction', txid, tx);
  }

  if (topic == 'rawblock') {
    const rawTx = message.toString('hex');
    const tx = bitcoin.Block.fromHex(rawTx);
    const txid = tx.getId();
    console.log('received block', txid, tx);
  }
});