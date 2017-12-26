import SHA256 = require('node_modules/crypto-js/sha256');

// Defining blocks. Data is TBD 
// transactionsInfo fromAddress toAddress amount timestamp
class Block {
  constructor (index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  // SHA-256 algorithm generates an almost-unique, 
  // fixed size 256-bit (32-byte) hash. 
  // Hash is a one way function – it cannot be decrypted back. 
  // This makes it suitable for password validation, 
  // challenge hash authentication, anti-tamper, digital signatures.
  calculateHash () {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}


// “The blockchain is an incorruptible digital ledger of 
// economic transactions that can be programmed to record 
// not just financial transactions but virtually everything 
// of value.”
// Don & Alex Tapscott, authors Blockchain Revolution (2016)

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock];
  }

  createGenesisBlock() {
    return new Block(0, '1514261848602', { amount: 1 }, '0');
  }

  getLatestBlock () {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}


let fujiwaraCoin = new Blockchain();

//adding transactions 
fujiwaraCoin.addBlock(new Block(1, '1514261991325', { amount: 2 }));
fujiwaraCoin.addBlock(new Block(2, Date.now(), { amount: 10 }));

console.log(JSON.Stringify(fujiwaraCoin, null, 4));

