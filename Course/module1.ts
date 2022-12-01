import {PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL} from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}

const publicKey = new PublicKey('7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp')
getBalanceUsingWeb3(publicKey).then(balance => {
    console.log(balance)
})

console.log(LAMPORTS_PER_SOL);