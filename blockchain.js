/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const Block= require('./block');

const SHA256 = require('crypto-js/sha256');
const level = require('level');
//const chainDB = './chaindata';


/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{
    constructor(chainDB){
        this.db = level(chainDB);
        let self = this;
        //create genesis block only if an empty level DB was created

        this.getBlockHeight()
            .then(function(height){

                if(height==0){
                    return self.addBlock(new Block("First block in the chain - Genesis block"));
                }
            });
    }

    // Get block height
    getBlockHeight(){
        var self = this;
        return new Promise(function(resolve, reject){
            let key = 0;
            self.db.createKeyStream()
                .on('data', function (data) {
                    key++;
                })
                .on('error', function (err) {
                    reject(err)
                })
                .on('close', function () {
                    console.log("current height: " + key);
                    resolve(key);
                });
        });
    }

    //override a block in a specific position
    putBlockToSpecificKey(key,value){
        return this.db.put(key, JSON.stringify(value))
            .catch(function(err) {
                return console.log('Block ' + key + ' submission failed', err);
            })
    }

    // Add new block to the end of the chain
    async addBlock(newBlock){

        //get height of next block in the chain
        let blockHeight = await this.getBlockHeight();

        // set block attributes
        newBlock.height = blockHeight;
        // UTC timestamp
        newBlock.time = new Date().getTime().toString().slice(0,-3);
        // previous block hash
        if(newBlock.height>0){
            let prevBlock = await this.getBlockByHeight(newBlock.height -1);
            newBlock.previousBlockHash = prevBlock.hash;
        }
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        //add new block to chain
        await this.putBlockToSpecificKey(newBlock.height, newBlock);

        console.log("Block# "+ newBlock.height +" added");
        return newBlock;
    }

    // get block
    async getBlockByHeight(blockHeight){
        // return object as a single string
        try{
            let block = await this.db.get(blockHeight);
            return JSON.parse(block);
        }catch(err) {
            throw new Error('Block #'+blockHeight +' could not be found in DB');
        }
    }

    async getBlockByHash(hash) {
        let self = this;
        let block = null;
        let search = new Promise(function(resolve, reject){
            self.db.createReadStream()
                .on('data', function (data) {
                    let tempBlock = JSON.parse(data.value);
                    if(tempBlock.hash === hash){
                        block = tempBlock;
                    }
                })
                .on('error', function (err) {
                    reject(err)
                })
                .on('close', function () {
                    resolve(block);
                });
        });

        try{
            block = await search;
        }catch(err){
            console.log(err);
        }
        return  block;
    }

    async getBlockByWalletAddress(address) {
        let self = this;
        let block = null;
        let search = new Promise(function(resolve, reject){
            self.db.createReadStream()
                .on('data', function (data) {
                    let tempBlock = JSON.parse(data.value);
                    if(tempBlock.body.address === address){
                        block = tempBlock;
                    }
                })
                .on('error', function (err) {
                    reject(err)
                })
                .on('close', function () {
                    resolve(block);
                });
        });

        try{
            block = await search;
        }catch(err){
            console.log(err);
        }
        return  block;
    }

    //validate single block
    validateBlock(block){
        // get block hash
        let blockHash = block.hash;
        // remove block hash to test block integrity
        block.hash = '';
        // generate block hash
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
        // Compare
        if (blockHash===validBlockHash) {
            return true;
        } else {
            return false;
        }
    }

    //validates if a block is correctly chained to the predecessor
    async validateBlockInChain(blockHeight){
        try{
            let block = await this.getBlockByHeight(blockHeight);
            let isValid = this.validateBlock(block);

            if (isValid){
                let prevBlock = await this.getBlockByHeight(blockHeight - 1);
                if (prevBlock.hash===block.previousBlockHash) {
                    return true;
                } else {
                    throw new Error('Block #'+block.height+' previousBlockHash does not match with hash of previous block');
                }
            }else{
                throw new Error('Block #'+block.height+' is invalid');
            }
        }catch(err){
            throw err;
        }

    }

    // Validate blockchain
    validateChain(){
        let errorLog = [];
        let keys =[];
        let blocks = [];
        let promises = [];
        let self = this;
        self.db.createReadStream()
            .on('data', function (data) {
                let key = data.key;
                let block = JSON.parse(data.value);
                keys.push(key);
                //blocks.push(block);
            })
            .on('error', function (err) {
                console.log('Oh my!', err);
                reject();
            })
            .on('close', function () {
                console.log('Stream closed');
            })
            .on('end', function () {
                console.log('Stream ended');

                //collect validation tasks
                promises = keys.map(async function(key){
                    try{
                       return await self.validateBlockInChain(key);
                    }catch(err) {
                        errorLog.push(key);
                        throw err;
                    }
                });

                //wait until all validation tasks are done
                Promise.all(promises)
                    .then(function(){
                        if (errorLog.length>0) {
                            console.log('Block errors = ' + errorLog.length);
                            console.log('Blocks: '+errorLog);
                        } else {
                            console.log('No errors detected');
                        }
                    });
            });
    }
}

module.exports = Blockchain;