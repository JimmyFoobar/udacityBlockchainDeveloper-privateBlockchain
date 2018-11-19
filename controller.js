const Blockchain = require('./blockchain');
const Block = require('./block');
const Mempool = require('./mempool')

//TODO make DB name a config var
const bc = new Blockchain("./blockDB");
const mem = new Mempool();

module.exports.getBlock =  async function(request, reply) {
    try {

        let block =  await bc.getBlock(request.params.height);
        return block;
    }
    catch (err) {
        console.log(err);
        throw Boom.boomify(err);
    }
}


module.exports.createBlock = async function(request,h) {
    let blockData = request.payload;
    if (blockData == "" || blockData == null) {
        throw Boom.badData("Empty blocks are useless. Please provide some data");
    }

    try{
        let blockCandidate = new Block(blockData);
        let newBlock = await bc.addBlock(blockCandidate);
        return newBlock;
    }
    catch (err) {
        console.log(err);
        throw Boom.boomify(err)

    }


module.exports.requestValidation = async function(request,response) {
    let requestData = request.payload;
    if (requestData == "" || requestData == null) {
        throw Boom.badData("Please provide your wallet address ");
    }
    //TODO check if wallet address is valid
    let walletAddress = JSON.parse(requestData).address;

    console.log(address);
    try{
        return mem.addARequestValidation( walletAddress );
    }
    catch (err) {
        console.log(err);
        throw Boom.boomify(err)

    }
}