const TimeoutRequestsWindowTime = 5*60;

class RequestObject {
    constructor( walletAddress) {

       this.walletAddress = walletAddress,
       this.requestTimeStamp = new Date().getTime().toString().slice(0,-3),
       this.message = this.walletAddress + ":" + this.requestTimeStamp + ":starRegistry",
       this.validationWindow = 300
    }

    updateValidationWindow(){

        let timeElapse = (new Date().getTime().toString().slice(0,-3)) - this.requestTimeStamp;
        let timeLeft = (TimeoutRequestsWindowTime) - timeElapse;
        this.validationWindow = timeLeft;
    }
}

module.exports = RequestObject;