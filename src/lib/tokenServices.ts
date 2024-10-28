import axios from 'axios';
import { createDataItemSigner, message } from "@permaweb/aoconnect";

export const handleAirDrop = async (walletAddress: string) => {
    const response = await axios.post('http://localhost:3000/api/process/airdrop', {
        walletid: walletAddress
    })
    console.log(response.data);
}
// @ts-expect-error - window.arweaveWallet is not defined
export const handleTokenTransfer = async (wallet, amount: number, recipient: string) => {
    await window.arweaveWallet.connect(["SIGN_TRANSACTION"]);
    try {
        console.log("Started token transfer");
        const messageid = await message({
            process: "XpkGwkMXPYdvCNZaw1xAF7BitrAPOQUStSqG6tL-NRQ",
            tags: [
                { name: "Action", value: "Transfer" },
                { name: "Quantity", value: amount.toString() },
                { name: "Recipient", value: `${recipient}` }
            ],
            signer: createDataItemSigner(wallet),
            data: `Transfer from ${wallet} to ${recipient}`
        });
        return messageid;
    } catch (error) {
        console.error("Token transfer failed:", error);
        throw error;
    }
}