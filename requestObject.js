class RequestObject {
    constructor( walletAddress) {

       this.walletAddress = walletAddress,
       this.requestTimestamp = new Date().getTime().toString().slice(0,-3),
       this.message = this.walletAddress + ":" + this.requestTimestamp + ":starRegistry",
       this.validationWindow = 300
    }
}

module.exports = RequestObject;