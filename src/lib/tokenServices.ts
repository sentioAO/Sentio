import { createDataItemSigner, message } from "@permaweb/aoconnect";

// @ts-expect-error - window.arweaveWallet is not defined
export const handleAirDrop = async (walletAddress: string, wallet) => {
    // const response = await axios.post('http://localhost:3000/api/process/airdrop', {
    //     walletid: walletAddress
    // })
    // console.log(response.data);
    await window.arweaveWallet.connect(["SIGN_TRANSACTION"]);
    try {
        const messageid = await message({
            process: "XpkGwkMXPYdvCNZaw1xAF7BitrAPOQUStSqG6tL-NRQ",
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