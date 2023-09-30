const solanaWeb3 = require("@solana/web3.js")
const splToken = require("@solana/spl-token")
const bs58 = require("bs58")

async function main() {
    const connection = new solanaWeb3.Connection("https://nd-604-403-158.p2pify.com/aa738dc9eb3bb2ea9838409597fd4b6d", {wsEndpoint: "wss://ws-nd-604-403-158.p2pify.com/aa738dc9eb3bb2ea9838409597fd4b6d"});

    const waletKeyPair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(bs58.decode("493xUX6QZ9mNFmMTDqRWjZ71At5WuAjy2e5gd1b7JFMAUVz1BjMMGA2Di4rLsiGUCvKTQSr8iVTdn4kuaRa7ZnvW")))

    let balance = await connection.getBalance(waletKeyPair.publicKey);
    console.log(balance / solanaWeb3.LAMPORTS_PER_SOL);

    const secondWalletKeypair = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(bs58.decode("493xUX6QZ9mNFmMTDqRWjZ71At5WuAjy2e5gd1b7JFMAUVz1BjMMGA2Di4rLsiGUCvKTQSr8iVTdn4kuaRa7ZnvW")))

    console.log(waletKeyPair.publicKey)
    // const targetAddressKey = solanaWeb3.PublicKey.fromBase58('HuD3iFBW5xKKazt9nyzQFMQWPCHQ4qedqn496BchDqvw')
    // console.log(targetAddressKey)
    console.log(secondWalletKeypair.publicKey)

    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: waletKeyPair.publicKey,
            toPubkey: secondWalletKeypair.publicKey,
            lamports: solanaWeb3.LAMPORTS_PER_SOL * 0.01
        }),
    );

    const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [waletKeyPair]
    );
}

main()
  