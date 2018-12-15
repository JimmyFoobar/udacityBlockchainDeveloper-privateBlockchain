

const TimeoutValidRequestsWindowTime = 30*60;

class RequestObject {
    constructor( request ) {

       this.registerStar = true;
       this.status = new Object();
        this.status.address = request.walletAddress,
       this.status.requestTimeStamp = new Date().getTime().toString().slice(0,-3),
       this.status.message = request.message,
       this.status.validationWindow = TimeoutValidRequestsWindowTime,
        this.status.messageSignature = true
    }

    updateValidationWindow(){

        let timeElapse = (new Date().getTime().toString().slice(0,-3)) - this.status.requestTimeStamp;
        let timeLeft = (TimeoutValidRequestsWindowTime) - timeElapse;
        this.status.validationWindow = timeLeft;
    }

}

module.exports = RequestObject;