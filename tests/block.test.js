const Block = require('../block');

test('Block.constructor', ()=>{
    let star = {};
    star.ra = "RA";
    star.dec = "DEC";
    star.mag = "MAG";
    star.cen = "CEN";
    star.story = "story";

    let block = new Block('address', star);

    //TODO extent test
    expect(block.body.star.story).toBe("73746f7279");
});

test('Block.decode', () =>{
    let star = {};
    star.ra = "RA";
    star.dec = "DEC";
    star.mag = "MAG";
    star.cen = "CEN";
    star.story = "story";

    let block = new Block('address', star);

    let decodeBlock = block.decode();
    expect(decodeBlock.body.star.storyDecoded).toBe("story");
});