const Boom = require('boom')

const Blockchain = require('./blockchain');
const Block = require('./block');
const Mempool = require('./mempool')

//TODO make DB name a config var
const bc = new Blockchain("./blockDB");
const mem = new Mempool();

module.exports.getBlock =  async function(request, reply) {
    try {

        let block =  await bc.getBlockByHeight(request.params.height);
        Object.setPrototypeOf(block, Block.prototype);
        return block.decode();
    }
    catch (err) {
        console.log(err);
        throw Boom.boomify(err);
    }
}

module.exports.getBlockByHash =  async function(request, reply) {
    try {

        let block = await bc.getBlockByHash(request.params.hash);
        if( block== null){
            throw Boom.badData("No block found for hash: " + request.params.hash);
        }
        Object.setPrototypeOf(block, Block.prototype);
        return block.decode();
    }
    catch (err) {
        console.log(err);
        throw Boom.boomify(err);
    }
}

module.exports.getBlockByWalletAddress =  async function(request, reply) {
    try {

        let blockArray =  await bc.getBlockByWalletAddress(request.params.address);
        if( blockArray.length == 0){
            throw Boom.badData("No block found for wallet address: " + request.params.address);
        }

        let newBlockArray = blockArray.map((block)=>{
            Object.setPrototypeOf(block, Block.prototype);
            return block.decode();
        })

        return newBlockArray;
    }
    catch (err) {
        console.log(err);
        throw Boom.boomify(err);
    }
}

module.exports.createBlock = async function(request,reply) {
    let requestData = request.payload;
    if (requestData == "" || requestData == null) {
        throw Boom.badData("Empty blocks are useless. Please provide some data");
    }

    let walletAddress = requestData.address;
    let star = requestData.star;
    let validRequest = mem.getValidRequestByWalletAddress( walletAddress );
    if( validRequest == null){
        throw Boom.badData("No valid Request found for walletAddress: " + walletAddress);
    }

    try {
        let blockCandidate = new Block(walletAddress, star);
        let newBlock = await bc.addBlock(blockCandidate);
        Object.setPrototypeOf(newBlock, Block.prototype);
        return newBlock.decode();
    }
    catch (err) {
        console.log(err);
        throw Boom.boomify(err)

    }
}

module.exports.addRequest = async function(request, reply) {
    let requestData = request.payload;
    if (requestData == "" || requestData == null) {
        throw Boom.badData("Please provide your wallet address ");
    }
    //TODO check if wallet address is valid
    let walletAddress = requestData.address;

    try{
        return mem.addRequestToPool( walletAddress );
    }
    catch (err) {
        console.log(err);
        throw Boom.boomify(err)

    }
}

module.exports.validate = async function(request, reply) {
    let requestData = request.payload;
    if (requestData == "" || requestData == null) {
        throw Boom.badData("Please provide your wallet address and signature");
    }
    //TODO check if wallet address is valid
    let walletAddress = requestData.address;
    let signature = requestData.signature;

    let requestObject = mem.getRequestByWalletAddress( walletAddress );
    if (requestObject == null) {
        throw Boom.badData("No request found for wallet address:" + walletAddress);
    }
    if( !requestObject.isValidateSignature( signature ) ){
        throw Boom.badData("The provided signature is not valid" );
    }

    let validRequest = mem.addValidRequestToPool( requestObject );
    mem.removeRequestFromPool( requestObject.walletAddress );

    return validRequest;
}