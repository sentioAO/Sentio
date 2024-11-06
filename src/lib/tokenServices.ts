import { createDataItemSigner, message } from "@permaweb/aoconnect";
import { RECIEPIENT_WALLET, TOKEN_PROCESS } from "./var";


// @ts-expect-error - window.arweaveWallet is not defined
export const handleAirDrop = async (walletAddress: string, wallet) => {
 
    await window.arweaveWallet.connect(["SIGN_TRANSACTION"]);
    try {
        const messageid = await message({
            process: TOKEN_PROCESS,
            tags: [
                { name: "Action", value: "tSENTI-drop" },
                { name: "Recipient", value: `${walletAddress}` }
            ],
            signer: createDataItemSigner(wallet),
            data: `Airdrop to ${walletAddress}`
        });
        return messageid;
    } catch (error) {
        console.error("Airdrop failed:", error);
        throw error;
    }   
}
// @ts-expect-error - window.arweaveWallet is not defined
export const handleTokenTransfer = async (wallet, amount: number) => {
    await window.arweaveWallet.connect(["SIGN_TRANSACTION"]);
    try {
        console.log("Started token transfer");
        const messageid = await message({
            process: TOKEN_PROCESS,
            tags: [
                { name: "Action", value: "Transfer" },
                { name: "Quantity", value: `${amount.toString()}000000000000` },
                { name: "Recipient", value: RECIEPIENT_WALLET }
            ],
            signer: createDataItemSigner(wallet),
            data: `Transfer from ${wallet} to ${RECIEPIENT_WALLET}`
        });
        return messageid;
    } catch (error) {
        console.error("Token transfer failed:", error);
        throw error;
    }
}
