const RequestObject = require('../requestObject');

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

test('requestObject.constructor',() => {
    let time = new Date().getTime().toString().slice(0,-3);
    let request = new RequestObject( 'walletAddress' );

    expect(request.walletAddress).toBe('walletAddress');
    expect(request.requestTimeStamp).toBe(time);
    expect(request.message).toBe('walletAddress:'+ time + ':starRegistry');
    expect(request.validationWindow).toBe(300);
});

test('requestObject.updateValidationWindow', async () =>{

    let request = new RequestObject( 'walletAddress' );
    await sleep(2000);
   request.updateValidationWindow();
   expect(request.validationWindow).toBe(298);

});
