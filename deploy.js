const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//HDWalletProvider...specifies which account we want to unlock and use as the source of ether for deployying contract and specify what outside API/node we are going to connect to
const provider = new HDWalletProvider(
  'color female cannon scout dish feature confirm buddy strong network beyond buddy', //mnemonic to unlock public key, private key and address of account
  'https://rinkeby.infura.io/v3/39d716c0b80b4e16bc1c09fd7aabaa32'                 //endpoint for rinkeby
);

const web3 = new Web3(provider);   //instance of web3

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
