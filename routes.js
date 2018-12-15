
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
        {
            method: 'POST',
            path: '/requestValidation',
            handler:controller.addRequest
        },
        {
            method: 'POST',
            path: '/validate',
            handler:controller.validate
        },
        {
            method: 'GET',
            path: '/stars/hash:{hash}',
            handler:controller.getBlockByHash
        },
        {
            method: 'GET',
            path: '/stars/address:{address}',
            handler:controller.getBlockByWalletAddress
        },
    ];
}();