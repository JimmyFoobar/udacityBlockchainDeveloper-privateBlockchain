const hex2ascii = require('hex2ascii');

class Block {
    constructor( walletAddress, star) {

        star.story = Buffer(star.story).toString('hex');
        this.hash = "";
        this.height = 0;
        this.body = {};
        this.body.address = walletAddress;
        this.body.star = star;
        this.time = 0;
        this.previousBlockHash = "";
    }

    decode(){
        let tempBlock = this;
        tempBlock.body.star.storyDecoded = hex2ascii(tempBlock.body.star.story);
        return tempBlock;
    }
}

module.exports = Block;


