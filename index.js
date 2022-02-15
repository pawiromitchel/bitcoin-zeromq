const zmq = require('zeromq')
const sock = zmq.socket('sub')
const bitcoin = require('bitcoinjs-lib');

sock.connect('tcp://127.0.0.1:3000');
sock.subscribe('rawblock')
sock.on('message', function (topic, message) {
    // 1. read incoming transactions
    if (topic == 'rawtx') {
        const rawTx = message.toString('hex');
        const tx = bitcoin.Transaction.fromHex(rawTx);
        const txid = tx.getId();
        console.log('received transaction', txid, tx);
    }

    // 1. read incoming blocks
    if (topic == 'rawblock') {
        // 2. decode block
        const rawBlock = message.toString('hex');
        const decodedBlock = bitcoin.Block.fromHex(rawBlock);
        const blockID = decodedBlock.getId();
        console.log('received block', blockID);

        // 3. get the transactions from the block
        const txs = decodedBlock.transactions;
        txs.forEach(tx => {
            // check if it's a coinbase transaction
            if (tx.isCoinbase()) {
                console.log('found coinbase transaction', tx.getId());
            } else {
                // get the output of the transaction
                console.log(tx.outs);

                // check if it has OP_RETURN
            }
        });
    }
});