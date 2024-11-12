
// Constants for the USDT contract on Ethereum
const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDT_ABI = [
    "function balanceOf(address owner) view returns (uint256)"
];

// Function to derive Ethereum address from FLO private key using floEthereum library
function deriveEthereumAddressFromFLOPrivateKey(floPrivateKey) {
    // Ensure floEthereum is loaded and available
    if (typeof floEthereum !== 'undefined' && typeof floEthereum.ethAddressFromPrivateKey === 'function') {
        return floEthereum.ethAddressFromPrivateKey(floPrivateKey);
    } else {
        console.error("floEthereum library not loaded");
        return null;
    }
}

// Function to fetch USDT balance using ethers.js with a public RPC provider
async function fetchUSDTBalance(ethAddress) {
    try {
        
        const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth");

       
        const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, provider);

       
        const balance = await usdtContract.balanceOf(ethAddress);

        
        const usdtBalance = ethers.utils.formatUnits(balance, 6);
        return usdtBalance;
    } catch (error) {
        console.error("Error fetching USDT balance:", error);
        return "Error";
    }
}

// Main function to update USDT balance on the homepage
async function updateUSDTBalance(floPrivateKey) {
    try {
        // Derive Ethereum address from FLO private key
        const ethAddress = deriveEthereumAddressFromFLOPrivateKey(floPrivateKey);

        if (!ethAddress) {
            console.error("Failed to derive Ethereum address.");
            document.getElementById('usdt_balance').innerText = "Error deriving Ethereum address.";
            return;
        }
        
        console.log("Ethereum Address Derived:", ethAddress);

        // Fetch and display USDT balance
        const usdtBalance = await fetchUSDTBalance(ethAddress);

        if (usdtBalance === null) {
            console.error("Failed to fetch USDT balance.");
            document.getElementById('usdt_balance').innerText = "Error fetching USDT balance.";
            return;
        }
        console.log("USDT Balance:", usdtBalance);
        document.getElementById('usdt_balance').innerText = usdtBalance + " USDT";
    } catch (error) {
        console.error("Unexpected error in updateUSDTBalance:", error);
        document.getElementById('usdt_balance').innerText = "Error fetching balance";
    }
}


const floPrivateKey = 'RBoUxjNhZZfQW2KSraHYo16XNY163Bnopb84aWnYebGsXPMBRg3M';
updateUSDTBalance(floPrivateKey);
