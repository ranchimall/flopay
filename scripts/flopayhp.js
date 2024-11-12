// Import floEthereum if using modules
import ethAddressFromPrivateKey from './floEtherium.js'

// Generate the Ethereum address
const floPrivateKey = "<your_flo_private_key_here>";  // Replace with actual private key
const ethAddress = floEthereum.ethAddressFromPrivateKey(floPrivateKey);

// Display the generated Ethereum address on the homepage
document.addEventListener('DOMContentLoaded', () => {
    const ethAddressDisplay = document.getElementById('ethAddressDisplay'); // Make sure this element exists in your HTML
    ethAddressDisplay.textContent = `Ethereum USDT Address: ${ethAddress}`;
});
