const RequestObject = require('./requestObject');

const TimeoutRequestsWindowTime = 5*60*1000;
const TimeoutMempoolValidWindowTime = 30*60*1000;

class Mempool {

    constructor() {
        this.mempool = [],
        this.timeoutRequests = [],
        this.mempoolValid = [],
        this.timeoutMempoolValid = []
    }

    addARequestValidation( walletAddress ){
        this.mempool[ walletAddress ] = new RequestObject( walletAddress );
        this.setTimeOut( walletAddress );

        return this.mempool[ walletAddress ];
    }

    setTimeOut( walletAddress ){
        let self = this;
        this.timeoutRequests[ request.walletAddress ] = setTimeout(
            function(){
                self.removeValidationRequest( walletAddress )
            },
            TimeoutRequestsWindowTime );
    }

    removeValidationRequest( walletAddess ){
        this.mempool.splice( walletAddess, 1);
    }

    verifyTimeLeft(){

    }

    removeTimeout(){

    }
}

module.exports = Mempool;