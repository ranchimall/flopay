// Define USDT contract details (on Ethereum Mainnet)
const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDT_ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)"
];

/**
 * Gets the USDT balance of a specified Ethereum address.
 * @param {string} providerUrl - The Ethereum provider URL.
 * @param {string} walletAddress - The Ethereum address to check.
 * @returns {Promise<string>} - Returns the balance of USDT in the specified address.
 */
async function getUSDTBalance(providerUrl, walletAddress) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, provider);

    const balance = await usdtContract.balanceOf(walletAddress);
    return ethers.utils.formatUnits(balance, 6); // USDT uses 6 decimal places
}

/**
 * Transfers USDT from a sender's wallet to a specified recipient.
 * @param {string} providerUrl - The Ethereum provider URL.
 * @param {string} privateKey - The private key of the sender's wallet.
 * @param {string} recipient - The recipient's Ethereum address.
 * @param {string} amount - The amount of USDT to transfer (in whole units).
 * @returns {Promise<ethers.providers.TransactionResponse>} - Transaction response.
 */
async function transferUSDT(providerUrl, privateKey, recipient, amount) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, wallet);

    const amountInWei = ethers.utils.parseUnits(amount, 6); // Convert amount to USDT decimal
    const tx = await usdtContract.transfer(recipient, amountInWei);
    return tx.wait(); // Wait for the transaction to be confirmed
}

/**
 * Approves a spender to use a specified amount of USDT on behalf of the owner.
 * @param {string} providerUrl - The Ethereum provider URL.
 * @param {string} privateKey - The private key of the owner.
 * @param {string} spender - The address allowed to spend the USDT.
 * @param {string} amount - The amount of USDT to approve (in whole units).
 * @returns {Promise<ethers.providers.TransactionResponse>} - Transaction response.
 */
async function approveUSDT(providerUrl, privateKey, spender, amount) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, wallet);

    const amountInWei = ethers.utils.parseUnits(amount, 6); // Convert amount to USDT decimal
    const tx = await usdtContract.approve(spender, amountInWei);
    return tx.wait(); // Wait for the transaction to be confirmed
}

// Export functions for use in browser
window.getUSDTBalance = getUSDTBalance;
window.transferUSDT = transferUSDT;
window.approveUSDT = approveUSDT;
