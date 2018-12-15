const RequestObject = require('../requestObject');
const ValidRequest = require('../validRequests');

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

test('ValidRequest.constructor', () => {
    let request = new RequestObject('walletAddress');
    let time = new Date().getTime().toString().slice(0,-3);
    let validRequest= new ValidRequest( request );

    expect(validRequest.registerStar).toBeTruthy();
    expect(validRequest.status.address).toBe('walletAddress');
    expect(validRequest.status.requestTimeStamp).toBe(time);
    expect(validRequest.status.message).toBe(request.message);
    expect(validRequest.status.validationWindow).toBe(1800);
    expect(validRequest.status.messageSignature).toBeTruthy();
});

test('ValidRequest.updateValidationWindow', async () =>{

    let request = new RequestObject( 'walletAddress' );
    let validRequest= new ValidRequest( request );
    await sleep(1000);
    validRequest.updateValidationWindow();
    expect(validRequest.status.validationWindow).toBe(1799);
});