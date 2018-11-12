'use strict';

const Blockchain = require('./blockchain');
const Block = require('./block');

const Hapi=require('hapi');
const Boom= require('boom');

const routes = require('./routes.js');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

for (var index in routes){
    server.route(routes[index]);
}

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();