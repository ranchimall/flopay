(function (EXPORTS) { //ethOperator v1.0.2
    /* ETH Crypto and API Operator */
    if (!window.ethers)
      return console.error('ethers.js not found')
    const ethOperator = EXPORTS;
    const isValidAddress = ethOperator.isValidAddress = (address) => {
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
    const ERC20ABI = [
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
      usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      usdt: "0xdac17f958d2ee523a2206206994597c13d831ec7"
    }
    function getProvider() {
      console.log("insidee getProvider")
      if (window.ethereum) {
      
        return new ethers.providers.Web3Provider(window.ethereum);
      } else {
      
        return new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/6e12fee52bdd48208f0d82fb345bcb3c`)
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
    connectToMetaMask();
    const getBalance = ethOperator.getBalance = async (address) => {
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
    const getTokenBalance = ethOperator.getTokenBalance = async (address, token, { contractAddress } = {}) => {
      try {
        // if (!window.ethereum.isConnected()) {
        //   await connectToMetaMask();
        // }
        if (!token)
          return new Error("Token not specified");
        if (!CONTRACT_ADDRESSES[token] && contractAddress)
          return new Error('Contract address of token not available')
        const usdcContract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, ERC20ABI, getProvider());
        let balance = await usdcContract.balanceOf(address);
        balance = parseFloat(ethers.utils.formatUnits(balance, 6)); // Assuming 6 decimals
        return balance;
      } catch (e) {
        console.error(e);
      }
    }
  
    const estimateGas = ethOperator.estimateGas = async ({ privateKey, receiver, amount }) => {
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
  
    const sendTransaction = ethOperator.sendTransaction = async ({ privateKey, receiver, amount }) => {
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
    }
    function notify(message, mode, options = {}) {
      let icon
      switch (mode) {
          case 'success':
              icon = `<svg class="icon icon--success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>`
              break;
          case 'error':
              icon = `<svg class="icon icon--error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/></svg>`
              options.pinned = true
              break;
      }
      getRef("notification_drawer").push(message, { icon, ...options });
      console.log("the mose is ",mode)
      if (mode === 'error') {
          console.error(message)
      }
  }
  //   const sendToken = ethOperator.sendToken = async ({ token, privateKey, amount, receiver, contractAddress }) => {
  //     console.log("Inside sendToken");
  //     console.log("Inside gasslimit", gasLimit);

  
  //     const wallet = new ethers.Wallet(privateKey, getProvider());
  //     console.log("Wallet Address:", wallet.address);
  
  //     const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, ERC20ABI, wallet);
  //     console.log("Token Contract Address:", tokenContract.address);
  
  //     const amountWei = ethers.utils.parseUnits(amount.toString(), 6);
  //     console.log("Amount in Wei:", amountWei.toString());
  
  //     //Check balances
  //     const ethBalance = await wallet.getBalance();
  //     const usdtBalance = await tokenContract.balanceOf(wallet.address);
  
  //     console.log("ETH Balance:", ethers.utils.formatEther(ethBalance));
  //     console.log("USDT Balance:", ethers.utils.formatUnits(usdtBalance, 6));
  
  //     if (usdtBalance.lt(amountWei)) {
  //         throw new Error("Insufficient USDT balance.");
          
  //     }
  
  //     if (ethBalance.lt(ethers.utils.parseEther("0.01"))) {
  //         throw new Error("Insufficient ETH balance for gas fees.");
  //     }
  
  //     // Perform transfer
  //     try {
  //         const tx = await tokenContract.transfer(receiver, amountWei,{gasLimit: 100000});
  //         console.log("Raw Transaction:", tx);
  
  //         if (!tx.hash) {
  //             throw new Error("Transaction failed or tx.hash is undefined");
  //         }
  
  //         console.log("Transaction Hash:", tx.hash);
  //         await tx.wait();
  //         return tx;
  //     } catch (error) {
  //         console.error("Error during transaction:", error);
  //         throw error; // Re-throw error for upstream handling
  //     }
  // };
    const sendToken = ethOperator.sendToken = async ({ token, privateKey, amount, receiver, contractAddress }) => {
      console.log("Inside sendToken");
      console.log( receiver, " receiver")
      const wallet = new ethers.Wallet(privateKey, getProvider());
      console.log("Wallet Address:", wallet.address);
  
      const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, ERC20ABI, wallet);
      console.log("Token Contract Address:", tokenContract.address);
  
      const amountWei = ethers.utils.parseUnits(amount.toString(), 6);
      console.log("Amount in Wei:", amountWei.toString());
  
      //Check balances
      const ethBalance = await wallet.getBalance();
      const usdtBalance = await tokenContract.balanceOf(wallet.address);
  
      console.log("ETH Balance:", ethers.utils.formatEther(ethBalance));
      console.log("USDT Balance:", ethers.utils.formatUnits(usdtBalance, 6));
  
      // if (usdtBalance.lt(amountWei)) {
      //     throw new Error("Insufficient USDT balance.");
          
      // }
  
      // if (ethBalance.lt(ethers.utils.parseEther("0.01"))) {
      //     throw new Error("Insufficient ETH balance for gas fees.");
      // }
  
      // Perform transfer
      try {
        console.log("inside try")
          const tx = await tokenContract.transfer(receiver, amountWei, { gasLimit: 100000 });
          console.log("Raw Transaction:", tx);
  
          if (!tx.hash) {
              throw new Error("Transaction failed or tx.hash is undefined");
          }
  
          console.log("Transaction Hash:", tx.hash);
          await tx.wait();
          return tx;
      } catch (error) {
          console.error("Error during transaction:", error);
          throw error; // Re-throw error for upstream handling
      }
  };


  
  })('object' === typeof module ? module.exports : window.ethOperator = {});