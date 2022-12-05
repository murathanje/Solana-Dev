import {PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL} from '@solana/web3.js';


//Ugly hacking to get fetch to work 

const importDynamic = new Function('modulePath', 'return import(modulePath)');

const fetch = async (...args:any[]) => {
    const module  = await importDynamic('node-fetch');
    return module.default(...args);
}



async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}

const publicKey = new PublicKey('Mykhu1HxsGjtHdNHzDSpkspR3mYuWkiStKqmfNXMp3e')
// getBalanceUsingWeb3(publicKey).then(balance => {
//     console.log(balance / LAMPORTS_PER_SOL + " SOL")
// })


getBalanceUsingJSONRPC(publicKey.toBase58()).then(balance => {
    console.log(balance / LAMPORTS_PER_SOL + " SOL")
})


async function getBalanceUsingJSONRPC(address: string): Promise<number> {
    const url = clusterApiUrl('devnet')
    console.log(url);
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [
                address
            ]
        })
    }).then(response => response.json())
    .then(json => {
        if (json.error) {
            throw json.error
        }

        console.log(json);
        return json['result']['value'] as number;
    })
    .catch(error => {
        throw error
    })
}