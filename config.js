const algosdk = require('algosdk');
require('dotenv').config()
const port = process.env.algorandport || ""
module.exports = {
    algodClient: new algosdk.Algodv2({'X-API-key': process.env.algorandapikey}, process.env.algorandbaseServer, port)
}