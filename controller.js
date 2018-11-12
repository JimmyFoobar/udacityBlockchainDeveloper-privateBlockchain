const Blockchain = require('./blockchain');
const Block = require('./block');

//TODO make DB name a config var
const bc = new Blockchain("./blockDB");

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

}