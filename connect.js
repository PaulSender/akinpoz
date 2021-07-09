const algosdk = require('algosdk');
require('dotenv').config()
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";

const token = {
    'X-API-key': 'GGlYO9xaT48yOVUyXKExp3u3PNe4XigI9N85FxGa',
}
const indexerClient = new algosdk.Indexer(token, baseServer, port);
const algodClient = new algosdk.Algodv2(token, baseServer, port);
console.log(process.env)
(async () => {
    let blockInfo = await indexerClient.lookupBlock(5).do()
    // console.log(blockInfo)
    let status = (await algodClient.status().do());
    console.log("Algorand network status: %o", (status['catchup-time'] === 0 ? "Connected and running" : "Catching up or failed..."))
    var account = algosdk.mnemonicToSecretKey(process.env.passphrase);
    console.log("My address: " + account.addr);
    accountInfo = await algodClient.accountInformation(account.addr).do();
    console.log("Account balance: %d microAlgos", accountInfo.amount);
    var message = "Hello World"
    const { signedTxn, txId } = await makeTransaction(account, message)
    await submitTransaction(signedTxn)
    const {note, amt, fee, gen, type} = await readTransaction(algodClient, txId, 4)
    var parsedNote = note.split(',')
    const snd = parsedNote[0].substring(parsedNote.indexOf(":")+1)
    const rcv = parsedNote[1]
    const info = parsedNote[2]
    var transactionInformation = `${snd} ${type} ${amt} algos to ${rcv} on ${gen}. It cost ${fee} algos and included the note: ${info}`
    console.log(transactionInformation)
    
})().catch(e => {
    console.log(e);
});

async function makeTransaction(myAccount, message) {
    let params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;
    const receiver = "GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A";
    message = `:${myAccount.addr},${receiver},${message}`
    let note = algosdk.encodeObj(message);
    let txn = algosdk.makePaymentTxnWithSuggestedParams(myAccount.addr, receiver, 1000000, undefined, note, params);
    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);
    return { signedTxn: signedTxn, txId: txId }
}
async function submitTransaction(signedTxn) {
    await algodClient.sendRawTransaction(signedTxn).do();
}
async function readTransaction(algodClient, txId, timeout) {
    const confirmedTxn = await waitForConfirmation(algodClient, txId, timeout)
    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    var note = new TextDecoder().decode(confirmedTxn.txn.txn.note)
    var {amt, fee, gen, type} = confirmedTxn.txn.txn
    // note, receiver, sender, genesis hash, amount, fee, generated on (MAIN/BETA/TEST), type of transaction 
    return {note, amt, fee, gen, type};
}
async function waitForConfirmation(algodClient, txId, timeout) {
    if (algodClient == null || txId == null || timeout < 0) {
        throw new Error("Bad arguments");
    }
    const status = (await algodClient.status().do());
    if (status === undefined) {
        throw new Error("Unable to get node status");
    }
    const startround = status["last-round"] + 1;
    let currentround = startround;
    while (currentround < (startround + timeout)) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo !== undefined) {
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                return pendingInfo;
            } else {
                if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0) {
                    // If there was a pool error, then the transaction has been rejected!
                    throw new Error("Transaction " + txId + " rejected - pool error: " + pendingInfo["pool-error"]);
                }
            }
        }
        await algodClient.statusAfterBlock(currentround).do();
        currentround++;
    }
    throw new Error("Transaction " + txId + " not confirmed after " + timeout + " rounds!");
}

