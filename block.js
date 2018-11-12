class Block {
    constructor(data) {

        if (data == "" || data == null) {
            throw new Error("Empty blocks are useless. Please provide some data");
        }
        this.hash = "",
        this.height = 0,
        this.body = data,
        this.time = 0,
        this.previousBlockHash = ""
    }
}

module.exports = Block;


