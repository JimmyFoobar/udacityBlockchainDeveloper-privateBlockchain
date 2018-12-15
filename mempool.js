const RequestObject = require('./requestObject');
const ValidRequest = require('./validRequests');

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

    //
    addRequestToPool( walletAddress ){
        let request = this.getRequestByWalletAddress( walletAddress );
        if( request == null ){
            request = new RequestObject( walletAddress );
            this.requestPool.push( request );
            this.setRequestTimeout( request );
        }else{
            request.updateValidationWindow();
        }

        return request;
    }

    setRequestTimeout( request ){
        let self = this;
        this.requestTimeoutPool[ request.walletAddress ] = setTimeout(
            function(){
                self.removeRequestFromPool( request.walletAddress )
            },
            request.validationWindow * 1000 );
    }

    removeRequestFromPool( walletAddress ){
        let requestIndex = this.requestPool.findIndex(request => request.walletAddress == walletAddress)
        this.requestPool.splice( requestIndex, 1);
        this.clearRequestTimeout( walletAddress );
    }

    //TODO write test
    clearRequestTimeout( walletAddress ){
        clearTimeout(this.requestTimeoutPool[ walletAddress ]);
    }

    getRequestByWalletAddress( walletAddress ){
        let request = this.requestPool.find(request => request.walletAddress == walletAddress);
        if( !request ){
            request = null;
        }
        return request;
    }

    //functions for valid requests
    addValidRequestToPool( request ){
        let validRequest = this.getValidRequestByWalletAddress( request.walletAddress );
        if( validRequest == null){
            //validRequest is not in the pool jet

            validRequest = new ValidRequest( request );
            this.validRequestPool.push( validRequest );
            this.setValidRequestTimeout( validRequest );
        }else{
            validRequest.updateValidationWindow();
        }

        return validRequest;
    }

    setValidRequestTimeout( validRequest ){
        let self = this;
        this.validRequestTimeoutPool[ validRequest.status.address ] = setTimeout(
            function(){
                self.removeValidRequestFromPool( validRequest.status.address )
            },
            validRequest.status.validationWindow * 1000  );
    }

    removeValidRequestFromPool( walletAddress ){
        let requestIndex = this.validRequestPool.findIndex(validRequest => validRequest.status.address == walletAddress)
        this.validRequestPool.splice( requestIndex, 1);
        this.clearValidRequestTimeout( walletAddress );
    }

    //TODO write test
    clearValidRequestTimeout( walletAddress ){
        clearTimeout(this.validRequestTimeoutPool[ walletAddress ]);
    }

    getValidRequestByWalletAddress( walletAddress ){
        let validRequest = this.validRequestPool.find(validRequest => validRequest.status.address == walletAddress);

        if(!validRequest){
            validRequest = null;
        }

        return validRequest;
    }
}

module.exports = Mempool;