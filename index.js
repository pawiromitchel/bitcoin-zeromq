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
            console.log('tx', tx.getId());
            tx.outs.forEach(out => {
                const ASM = bitcoin.script.toASM(out.script);
                if(ASM.includes('OP_RETURN')) {
                    const text = ASM.split('OP_RETURN ')[1];
                    const output = Buffer.from(text, 'hex');
                    console.log(output.toString());
                }
            })
        })
    }
});