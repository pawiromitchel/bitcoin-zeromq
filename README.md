# bitcoin-core with zeromq
Source: https://degreesofzero.com/article/streaming-transactions-from-bitcoind-via-zeromq.html

Add this line to your `bitcoin.conf`
```
# ZeroMQ
zmqpubrawtx=tcp://127.0.0.1:3000
zmqpubrawtx=tcp://127.0.0.1:3000
zmqpubhashtx=tcp://127.0.0.1:3000
zmqpubhashblock=tcp://127.0.0.1:3000
```