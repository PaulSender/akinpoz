const { getAccountDetails } = require('./utils');
const algosdk = require('algosdk');
const {algodClient} = require('../config')

require('dotenv').config({path: '../.env'})

/**
 * 
 * @param {Object} account 
 * @param {String} message 
 * @returns {Object} contains signed transaction information and the transaction ID
 */
async function makeTransaction(sending_account, receiving_address, message) {
    var params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;
    message = `:${sending_account.addr},${receiving_address},${message}`
    var note = algosdk.encodeObj(message);
    var txn = algosdk.makePaymentTxnWithSuggestedParams(sending_account.addr, receiving_address, 1000000, undefined, note, params);
    var signedTxn = txn.signTxn(sending_account.sk);
    var txId = txn.txID().toString();
    return { signedTxn, txId }
}
/**
 * 
 * @param {*} signedTxn 
 */
async function submitTransaction(signedTxn) {
    await algodClient.sendRawTransaction(signedTxn).do();
}

async function run() { 
    const {account} = await getAccountDetails(process.env.myalgorandpassphrase)
    const receiver = "GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A";
    const message = "Hello World"
    const { signedTxn, txId } = await makeTransaction(account, receiver, message)
    await submitTransaction(signedTxn)
}
run()