# privateBlockchain
Udacity -  Blockchain Nanodegree Program

Simple blockchain that helps the learn the basics concepts of this technologie written in JS.



### used tools
* levelDB: persist blockchain
* hapi: provide simple HTTP server/routing 

### Installing

Simply clone or download the repository.

```
npm install
```

### Usage
The easiest way to use this blockchain is via its REST API

API resource:
* GET /block/{height}
* POST /block (the payload of the request will be the data in the new block)


### Testing

#### start server
```
npm start
```

#### call genesis block

GET [http://localhost:8000/block/0](localhost:8000/block/0)

#### add new block

POST [http://localhost:8000/block](localhost:8000/block)
* payload: "testdata"
