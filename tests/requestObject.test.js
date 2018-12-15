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
    await sleep(1000);
   request.updateValidationWindow();
   expect(request.validationWindow).toBe(299);

});

test('requestObject.isValidateSignature_success', async () =>{

    let request = new RequestObject( '1GbMqNEhJQjZKEuGMij2k1JimrxBTTqKfB' );
    request.message = "1GbMqNEhJQjZKEuGMij2k1JimrxBTTqKfB:timeStamp:starRegistry";
    let signature = "Hz6xUHP5Pl9Ng8JdFenGaUG2AH9KDwFPKTN51H0YakZjLtHaCp+n6L9Na/G74FwSCzDSb8B5c5yC6s8WA34h+eI=";
    expect(request.isValidateSignature( signature )).toBeTruthy();

});

test('requestObject.isValidateSignature_fail', async () =>{

    let request = new RequestObject( '1GbMqNEhJQjZKEuGMij2k1JimrxBTTqKfB' );
    request.message = "1GbMqNEhJQjZKEuGMij2k1JimrxBTTqKfB:timeStamp:starRegistry";
    let signature = "Hz6xUHP5Pl9Ng8JdFenGaUG2AH9KDwFPKTN51H0YakZjLtHaCp+n6L9Na/G74FwSCzDSb8B5c5yC6s8WA34h123=";
    expect(request.isValidateSignature( signature )).toBeFalsy();

});
