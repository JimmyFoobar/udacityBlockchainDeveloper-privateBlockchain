const Mempool = require('../mempool');
const RequestObject = require('../requestObject');

test('Mempool.constructor', ()=>{
    let mempool = new Mempool();
    let emptyList = []
    expect( mempool.requestPool.length).toBe(0);
    expect( mempool.requestTimeoutPool.length).toBe(0);
    expect( mempool.validRequestPool.length).toBe(0);
    expect( mempool.validRequestTimeoutPool.length).toBe(0);
});

test('Mempool.addRequestToPool', () =>{
   let mempool = new Mempool();

   let request = mempool.addRequestToPool('walletAddress');
   expect( mempool.requestPool[0].walletAddress).toBe(request.walletAddress);

   //TODO setup test for time out;
});

test('Mempool.getRequestByWalletAddress', () =>{
    let mempool = new Mempool();

    let request = mempool.addRequestToPool('walletAddress');
    let foundRequest = mempool.getRequestByWalletAddress('walletAddress');

    expect(foundRequest).toBe(request);

});

test('Mempool.removeRequestFromPool', () =>{
    let mempool = new Mempool();

    mempool.addRequestToPool('walletAddress');
    mempool.removeRequestFromPool('walletAddress');

    expect(mempool.requestPool['walletAddress']).toBeUndefined();

});