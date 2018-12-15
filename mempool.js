const RequestObject = require('./requestObject');

const TimeoutRequestsWindowTime = 5*60*1000;
const TimeoutMempoolValidWindowTime = 30*60*1000;

class Mempool {

    constructor() {
        this.requestPool = [],
        this.requestTimeoutPool = [],
        this.validRequestPool = [],
        this.validRequestTimeoutPool = []
    }

    //functions for simple requests
    addRequestToPool( walletAddress ){
        let request = new RequestObject( walletAddress );
        this.requestPool.push( request );
        this.setRequestTimeout( request );

        return request;
    }

    setRequestTimeout( request ){
        let self = this;
        this.requestTimeoutPool[ request.walletAddress ] = setTimeout(
            function(){
                self.removeRequestFromPool( request )
            },
            request.validationWindow );
    }

    removeRequestFromPool( walletAddress ){
        let requestIndex = this.requestPool.findIndex(request => request.walletAddress == walletAddress)
        this.requestPool.splice( requestIndex, 1);
    }

    clearRequestTimeout( walletAddress ){
        clearTimeout(requestTimeoutPool[ walletAddress ]);
    }

    getRequestByWalletAddress( walletAddress ){
        return this.requestPool.find(request => request.walletAddress == walletAddress);
    }

    //functions for valid requests
}

module.exports = Mempool;