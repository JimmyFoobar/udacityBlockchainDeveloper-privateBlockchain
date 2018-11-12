
const controller = require('./controller.js');

module.exports = function() {
    return [
        {
            method:'GET',
            path:'/block/{height}',
            handler:controller.getBlock
        },
        {
            method:'POST',
            path:'/block',
            handler:controller.createBlock
        },
    ];
}();