const {algodClient} = require('../config')
const algosdk = require('algosdk');
require('dotenv').config({path: '../.env'})

/**
 * 
 * @returns {Object} status. Contains info about the current node/block status
 */
async function getStatus() {
    var status = await algodClient.status().do()
    console.log("Algorand network status: %o", (status['catchup-time'] === 0 ? "Connected and running" : "Catching up or failed..."))
    return status
}
/**
 * 
 * @param {String} passphrase created when account is created
 * @returns {Object} accountInfo 
 */
async function getAccountDetails(passphrase) {
    var account = algosdk.mnemonicToSecretKey(passphrase);
    accountInfo = await algodClient.accountInformation(account.addr).do();
    return {account, accountInfo}
}


module.exports = {
    getStatus, 
    getAccountDetails,
}