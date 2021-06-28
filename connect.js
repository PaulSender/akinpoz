const algosdk = require('algosdk');
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";

const token = {
    'X-API-key': 'GGlYO9xaT48yOVUyXKExp3u3PNe4XigI9N85FxGa',
}

let indexerClient = new algosdk.Indexer(token, baseServer, port);
const algodClient = new algosdk.Algodv2(token, baseServer, port);

(async () => {
    let blockInfo = await indexerClient.lookupBlock(5).do()
    // console.log(blockInfo)
    let status = (await algodClient.status().do());
    console.log("Algorand network status: %o", status)
})().catch(e => {
    console.log(e);
});

