# Unistate 

This repository is the code base for Unistate's solution to providing tokenized  real estate assets. Our technology is currently still in development so some items in this README may be out dated or downright incorrect. 

In this README you will find: 

- The Design and Development details of this project (private)
- A full list of notes taken by the original author of this technology (private)
-  Reproduction start-up steps to mimic the same system (private)
- Various links to resources used (private)
- An overview of the project
- An overview of the system
- Anything else that goes into a README 
# NOTES
- Now onto using ALGORAND as our API/Backend
- To do it yourself follow: https://developer.algorand.org/docs/build-apps/connect/
- Instillation Steps:
	- run npm install algosdk
	-  get code snippet from above link and obtain API key(token) and address (server) (NO PORT) from https://developer.purestake.io/home (sign up and you'll get access to your own or ask Paul for his)
	- Continue to follow the Do it yourself link
	- Pay attention to this tutorial, it tells you how to verify your node is up to date.
	- 


- We create a Node that connects to the blockchain either through, (basic to advanced), Remix IDE, ganache Emulator, AWS, create our own. We then create a smart contract that can interact with that node and place/get information from the blockchain (all above options should have a free way to do this). We can then connect to our node using Web3, load our smart contract using Truffle, and run a function to place/retrieve data onto the blockchain. At this point, the core of step 1 from our overall [**product design**](https://lucid.app/lucidchart/69bbb56d-b1e0-4373-be52-90b75fd1bcf1/edit?page=0_0#) is complete. 
- Solidity is required. The Smart Contracts are what connect Web3 to the blockchain. 
- ganache-cli is an emulator to deploy smart contracts onto the Ethereum blockchain. To actually deploy a smart contract onto the blockchain use (See link C). 
- We might not be developing completely on AWS. Their node's have a lot of Web3 API restrictions. Look into deploying your own node. 
- Web3 is our API. That's how we will send and receive data from the blockchain. Setting up often works in reverse of a typical data transfer diagram. We start by setting up a node to connect to the blockchain, the build the API on top of that connection. 
- 
- We might be developing on the etherium blockchain using an AWS Blockchain Management System. 
	- Select the public network when signed in
	- Select the testnet: Rospen for a test environment
		- [**Ropsten**](https://ropsten.etherscan.io/) because it most closely resembles the public blockchain, it only creates new blocks when minors have verified the transaction. The other option is [**Rinkeby**](https://rinkeby.etherscan.io/) which uses Proof of authority which is essentially a few sources given the power to approve transactions. (See Link B for pros and cons of each and Link A for the differences between proofs)
	- Keep everything else defaulted and create A node,
	- 

# Links
- [**A(comparingproofs)**](https://www.bissresearch.com/proof-of-stake-vs-proof-of-work-vs-proof-of-authority/)
- [**B(comparingtestnets)**](https://ethereum.stackexchange.com/questions/27048/comparison-of-the-different-testnets)
- [**C(Intro to deployment)**](https://ethereum.org/en/developers/docs/smart-contracts/deploying/)
- [**D(step by step guide)**](https://ethereum.org/en/developers/tutorials/deploying-your-first-smart-contract/)
- [**AWSManagedBlockChainAPI**](https://docs.aws.amazon.com/managed-blockchain/latest/ethereum-dev/ethereum-json-rpc.html)
- [**Serverlessoption**](https://aws.amazon.com/blogs/database/building-a-serverless-blockchain-application-with-amazon-managed-blockchain/)
- [**IntroToAWSManagedBlockChain**](https://www.youtube.com/watch?v=NgcTw9XTvfg&ab_channel=DJSTACKTRACE)
	- Good for set up of the node but not integration with NODE so not what we're looking for.
- [**AWSTutorialForAWSManagedBlockchainandNodeJS**](https://www.youtube.com/watch?v=1br20axMBxw&ab_channel=AWSOnlineTechTalks)
	- More in-depth version of above link but with Hyper Ledger Fabric instead of public Ethereum Network .
- [**Create a DeFi App**](https://www.youtube.com/watch?v=xWFba_9QYmc&ab_channel=DappUniversity)
- [**Remix (Smart Contract Testing)**](https://remix.ethereum.org/)
- [**Base Tutorial for Getting data onto blockchain and retrieving**](https://www.smashingmagazine.com/2021/01/nodejs-api-ethereum-blockchain/) 