const Mempool = require('../mempool');
const RequestObject = require('../requestObject');

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

test('Mempool.constructor', ()=>{
    let mempool = new Mempool();
    let emptyList = []
    expect( mempool.requestPool.length).toBe(0);
    expect( mempool.requestTimeoutPool.length).toBe(0);
    expect( mempool.validRequestPool.length).toBe(0);
    expect( mempool.validRequestTimeoutPool.length).toBe(0);
});

test('Mempool.addRequestToPool_new', () =>{
    let mempool = new Mempool();

    let request = mempool.addRequestToPool('walletAddress');
    expect( mempool.requestPool[0].walletAddress).toBe('walletAddress');

    //TODO setup test for time out;
});

test('Mempool.addRequestToPool_existing', async() =>{
    let mempool = new Mempool();

    mempool.addRequestToPool('walletAddress2');

    await sleep(1000);
    let request2 = mempool.addRequestToPool('walletAddress2');
    expect(request2.validationWindow).toBe(299);

    //TODO setup test for time out;
});

test('Mempool.getRequestByWalletAddress_success', () =>{
    let mempool = new Mempool();

    let request = mempool.addRequestToPool('walletAddress');
    let foundRequest = mempool.getRequestByWalletAddress('walletAddress');

    expect(foundRequest).toBe(request);

});

test('Mempool.getRequestByWalletAddress_fail', () =>{
    let mempool = new Mempool();

    let foundRequest = mempool.getRequestByWalletAddress('walletAddress');

    expect(foundRequest).toBeNull();

});

test('Mempool.removeRequestFromPool', () =>{
    let mempool = new Mempool();

    mempool.addRequestToPool('walletAddress');
    mempool.removeRequestFromPool('walletAddress');

    expect(mempool.requestPool[0]).toBeUndefined();

});

test('Mempool.addValidRequestToPool_new', () =>{
    let mempool = new Mempool();

    let request = new RequestObject('walletAddress');
    let validRequest = mempool.addValidRequestToPool( request );
    expect( mempool.validRequestPool[0].status.address).toBe(request.walletAddress);

    //TODO setup test for time out;
});

test('Mempool.addValidRequestToPool_existing', async() =>{
    let mempool = new Mempool();

    let request = new RequestObject('walletAddress');
    mempool.addValidRequestToPool( request );

    await sleep(1000);
    let validRequest2 = mempool.addValidRequestToPool(request);
    expect(validRequest2.status.validationWindow).toBe(1799);

    //TODO setup test for time out;
});

test('Mempool.getValidRequestByWalletAddress_success', () =>{
    let mempool = new Mempool();

    let request = new RequestObject('walletAddress');
    let validRequest = mempool.addValidRequestToPool( request );
    let foundRequest = mempool.getValidRequestByWalletAddress('walletAddress');

    expect(foundRequest).toBe(validRequest);

});

test('Mempool.getValidRequestByWalletAddress_fail', () =>{
    let mempool = new Mempool();

    let foundRequest = mempool.getValidRequestByWalletAddress('walletAddress');

    expect(foundRequest).toBeNull();

});

test('Mempool.removeValidRequestFromPool', () =>{
    let mempool = new Mempool();

    let request = new RequestObject('walletAddress');
    mempool.addValidRequestToPool( request );
    mempool.removeValidRequestFromPool('walletAddress');

    expect(mempool.validRequestPool[0]).toBeUndefined();

});