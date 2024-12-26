
(function (EXPORTS) { //bscOperator v1.0.2
    /* ETH Crypto and API Operator */
    if (!window.ethers)
      return console.error('ethers.js not found')
    const bscOperator = EXPORTS;
    const isValidAddress = bscOperator.isValidAddress = (address) => {
      try {
        // Check if the address is a valid checksum address
        const isValidChecksum = ethers.utils.isAddress(address);
        // Check if the address is a valid non-checksum address
        const isValidNonChecksum = ethers.utils.getAddress(address) === address.toLowerCase();
        return isValidChecksum || isValidNonChecksum;
      } catch (error) {
        return false;
      }
    }
    const BEP20ABI = [
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_spender",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_from",
            "type": "address"
          },
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          },
          {
            "name": "_spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      }
    ]
    const CONTRACT_ADDRESSES = {
      usdc: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      usdt: "0x55d398326f99059ff775485246999027b3197955"
    }
    function getProvider() {
      // switches provider based on whether the user is using MetaMask or not
      const bscMainnet = {
        chainId: 56,
        name: 'binance',
        rpc: 'https://bsc-dataseed.binance.org/',
        explorer: 'https://bscscan.com'
      };
    
    
      if (window.ethereum) {
        return new ethers.providers.Web3Provider(window.ethereum);
      } else {
        return new ethers.providers.JsonRpcProvider(bscMainnet.rpc, bscMainnet)
      }
    }
    function connectToMetaMask() {
      return new Promise((resolve, reject) => {
        // if (typeof window.ethereum === "undefined")
        //   return reject("MetaMask not installed");
        return resolve(true)
        ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((accounts) => {
            console.log('Connected to MetaMask')
            return resolve(accounts)
          })
          .catch((err) => {
            console.log(err)
            return reject(err)
          })
      })
    }
    
    
    const getBalance = bscOperator.getBalance = async (address) => {
      try {
        if (!address || !isValidAddress(address))
          return new Error('Invalid address');
        // Get the balance
        const provider = getProvider();
        const balanceWei = await provider.getBalance(address);
        const balanceEth = parseFloat(ethers.utils.formatEther(balanceWei));
        return balanceEth;
      } catch (error) {
        console.error('Error:', error.message);
        return error;
      }
    }
  
  
   
  
    
    
     
  
     const getTokenBalance = bscOperator.getTokenBalance = async (address, token, { contractAddress } = {}) => {
      try {
        if (!address) {
          throw new Error("Address not specified");
        }
        if (!token) {
          throw new Error("Token not specified");
        }
        if (!CONTRACT_ADDRESSES[token] && !contractAddress) {
          throw new Error("Contract address of token not available");
        }
    
        const provider = getProvider(); // Ensure this returns a valid provider for BSC
        const contract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, BEP20ABI, provider);
        
        let balance = await contract.balanceOf(address);
        
        // Assuming 18 decimals for most tokens like USDT and USDC*****************************************************
        //  const decimals = 0.00;
        const decimals = 18;
        const formattedDecimals = decimals.toFixed(1); // This will convert 18 to "18.00"
        console.log(formattedDecimals); // Outputs: "18.0"
  
        balance = parseFloat(ethers.utils.formatUnits(balance, decimals)); 
    
        // Format the balance to 2 decimal places for display
        balance = balance.toFixed(2);
    
        return balance;
      } 
      catch (e) {
        //  console.error("Error getting token balance:", e.message);
        //  throw new Error("Failed to get token balance");
      }
    }
  
  
    //  Example usage:
    // Ensure MetaMask is connected and BSC network is selected in MetaMask
    const address = '0xYourAddressHere'; // Replace with your actual address
    (async () => {
      try {
        const usdtBalance = await getTokenBalance(address, 'USDT');
        const bnbBalance = await getTokenBalance(address, 'BNB');
        console.log('USDT Balance:', usdtBalance);
        console.log('BNB Balance:', bnbBalance);
      } catch (error) {
        console.error('Error fetching balances:', error.message);
      }
    })();
    
  
    
  
  
  
  
  
  
    const estimateGas = bscOperator.estimateGas = async ({ privateKey, receiver, amount }) => {
      try {
        const provider = getProvider();
        const signer = new ethers.Wallet(privateKey, provider);
        return provider.estimateGas({
          from: signer.address,
          to: receiver,
          value: ethers.utils.parseUnits(amount, "ether"),
        });
      } catch (e) {
        throw new Error(e)
      }
    }
  
    const sendTransaction = bscOperator.sendTransaction = async ({ privateKey, receiver, amount }) => {
      try {
        const provider = getProvider();
        const signer = new ethers.Wallet(privateKey, provider);
        const limit = await estimateGas({ privateKey, receiver, amount })
        // Creating and sending the transaction object
        return signer.sendTransaction({
          to: receiver,
          value: ethers.utils.parseUnits(amount, "ether"),
          gasLimit: limit,
          nonce: signer.getTransactionCount(),
          maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
        })
      } catch (e) {
        throw new Error(e)
      }
    };
    
  
    const sendToken = bscOperator.sendToken = async ({ token, privateKey, amount, receiver, contractAddress }) => {
      // Create a wallet using the private key
      const wallet = new ethers.Wallet(privateKey, getProvider());
  
      // Contract interface
      const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, BEP20ABI, wallet);
  
      // Fetch the correct number of decimals for the token
      const decimals = await tokenContract.decimals();
  
      // Convert the amount to the smallest unit of the token
      const amountWei = ethers.utils.parseUnits(amount.toString(), decimals);
  







      // // Estimate gas limit for the transaction
      // const gasLimit = await tokenContract.estimateGas.transfer(receiver, amountWei);
  
      // // Get the current gas price
      // const gasPrice = await wallet.provider.getGasPrice();
  
      // // Calculate the gas cost
      // const gasCost = gasPrice.mul(gasLimit);
  
      //  console.log(`Gas cost: ${ethers.utils.formatEther(gasCost)} BNB`);
        
      // // Check if wallet has enough balance to cover gas fees
      // const balance = await wallet.getBalance();
      // if (balance.lt(gasCost)) {
      //   throw new Error("Insufficient funds for gas fee");
      // }








      // ********************************I was changed code from top and use this code*************
      try {
        // Estimate gas limit for the transaction
        const gasLimit = await tokenContract.estimateGas.transfer(receiver, amountWei);
    
        // Get the current gas price
        const gasPrice = await wallet.provider.getGasPrice();
    
        // Calculate the gas cost
        const gasCost = gasPrice.mul(gasLimit);
        const formattedGasCost = ethers.utils.formatEther(gasCost);
    
        // Display the gas cost in the popup
        const gasCostDisplay = document.getElementById('gas_cost_display');
        const gasCostValue = document.getElementById('gas_cost_value');
    
        gasCostValue.textContent = formattedGasCost;
        gasCostDisplay.style.display = 'block'; // Show the gas cost section
    
        console.log(`Gas cost: ${formattedGasCost} BNB`);
    
        // Check if wallet has enough balance to cover gas fees
        const balance = await wallet.getBalance();
        if (balance.lt(gasCost)) {
            throw new Error("Insufficient funds for gas fee");
        }
    } catch (error) {
        console.error("Error estimating gas:", error);
        alert(error.message); // Optionally show an alert for errors
    }
    
      // */*************** */
      
    
      
 

    











































  
  
      // Call the transfer function on the USDC contract
      return tokenContract.transfer(receiver, amountWei, { gasLimit, gasPrice });
    }
  })('object' === typeof module ? module.exports : window.bscOperator = {});