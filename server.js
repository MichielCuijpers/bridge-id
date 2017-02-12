const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const Web3 = require('web3');
const abi = [{"constant":false,"inputs":[{"name":"ownerAddr","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getOfAge","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"remove","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"truth","type":"bool"}],"name":"setOfAge","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];
// function setStatus(message) {
//   var status = document.getElementById("status");
//   status.innerHTML = message;
// };

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.listen(3000, '10.20.101.148', function() {
    console.log('listening on 3000');

});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/iDIN', (req, res) => {
    console.log(req.body);
    console.log(req.body.ofAge);
    console.log(req.body.publicKey);

    const ofAge = req.body.ofAge;
    const publicKey = req.body.publicKey;

    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3.eth.defaultAccount = web3.eth.accounts[0];

    const bridgeIDRegistry = web3.eth.contract(abi);
    const myBridgeIDRegistry = bridgeIDRegistry.at('0xBEDF6A53eFdc80fb67220139d3EF2961C6270c71');
    const trueAge = myBridgeIDRegistry.setOfAge(publicKey, ofAge);
    myBridgeIDRegistry.setOfAge.sendTransaction(publicKey, ofAge, {from: web3.eth.accounts[0], gas: 2000000});

    res.send();
    //setStatus('We did stuff');
})

app.post('/request', (req, res) => {

    const publicKey = req.body.publicKey;

    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3.eth.defaultAccount = web3.eth.accounts[0];

    console.log(web3.eth.accounts[0]);

    const bridgeIDRegistry = web3.eth.contract(abi);
    const myBridgeIDRegistry = bridgeIDRegistry.at('0xBEDF6A53eFdc80fb67220139d3EF2961C6270c71');
    const trueAge = myBridgeIDRegistry.getOfAge.call(publicKey, {from: web3.eth.accounts[0]});

    res.send(trueAge);
    //setStatus(trueAge);

})
