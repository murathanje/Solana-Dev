// import * as web3 from '@solana/web3.js';
import { Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Connection, clusterApiUrl } from '@solana/web3.js';
import * as fs from 'fs';

async function main() {



    const secret = JSON.parse(fs.readFileSync("ephkey.json").toString()) as number[]
    const secretKey = Uint8Array.from(secret);
    const ownerKeypair = Keypair.fromSecretKey(secretKey);

    console.log(ownerKeypair.secretKey.length);

    const publicKey = ownerKeypair.publicKey;

    console.log(publicKey.toBase58());


    // const pk = new PublicKey("5T9U5g1cbzr2JzCzwTDiDZyT9kcFypQmwDiRH9R9x8y");
    // console.log(pk.toBase58());


    // const secretKey = ownerKeypair.secretKey;

    const transaction = new Transaction()

    const recipient = new PublicKey("5T9U5g1cbzr2JzCzwTDiDZyT9kcFypQmwDiRH9R9x8y")
    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: ownerKeypair.publicKey,
        toPubkey: recipient,
        lamports: LAMPORTS_PER_SOL * 0.1
    })

    transaction.add(sendSolInstruction)

    const connection = new Connection(clusterApiUrl("devnet"));
    // const airdropSignature = await connection.requestAirdrop(ownerKeypair.publicKey, 1*LAMPORTS_PER_SOL);
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [ownerKeypair]
    )

    console.log(signature);
}

main();