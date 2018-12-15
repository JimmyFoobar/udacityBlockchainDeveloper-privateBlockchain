const bitcoinMessage = require('bitcoinjs-message');
const TimeoutRequestsWindowTime = 5*60;

class RequestObject {
    constructor( walletAddress) {

       this.walletAddress = walletAddress,
       this.requestTimeStamp = new Date().getTime().toString().slice(0,-3),
       this.message = this.walletAddress + ":" + this.requestTimeStamp + ":starRegistry",
       this.validationWindow = TimeoutRequestsWindowTime
    }

    updateValidationWindow(){

        let timeElapse = (new Date().getTime().toString().slice(0,-3)) - this.requestTimeStamp;
        let timeLeft = (TimeoutRequestsWindowTime) - timeElapse;
        this.validationWindow = timeLeft;
    }

    isValidateSignature( signature ){
        return bitcoinMessage.verify(this.message, this.walletAddress, signature);
    }
}

module.exports = RequestObject;