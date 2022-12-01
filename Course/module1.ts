import {PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL} from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}

const publicKey = new PublicKey('Mykhu1HxsGjtHdNHzDSpkspR3mYuWkiStKqmfNXMp3e')
getBalanceUsingWeb3(publicKey).then(balance => {
    console.log(balance / LAMPORTS_PER_SOL + " SOL")
})
