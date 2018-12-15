# privateBlockchain
Udacity -  Blockchain Nanodegree Program

Simple blockchain that helps the learn the basics concepts of this technologie written in JS.

This blockchain allows to register stars for a given wallet address.
In order to register a star the user must proof the owner ship of her wallet via a verification process.

### Installing

Simply clone or download the repository.

```
npm install
```

#### Start server
```
npm start
```


### Usage
The easiest way to use this blockchain is via its REST API

API resources:

#### Lookup options
* GET /block/{height}
* GET /stars/address:{address}
* GET /stars/hash:{hash}

#### Store your own star

1. request a validation

```
POST /requestValidation
body:`
{
    "address":"{walletAddress}"
}
```
2. validate your signature

```
POST /valide
body:`
{
 "address" : "{walletAddress}",
  "signature" : "{signature}"
 }
```
1. register star

```
POST /block
body:`
{
"address": "{walletAddress}",
    "star": {
            "dec": "{dec}",
            "ra": "{ra}",
            "mag": {mag},
            "cen": {cen},
            "story": "{story}"
        }
}
```

A postman collection with all API calls can be found [here](postman/simpleBlockchain.postman_collection.json). 