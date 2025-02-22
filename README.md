# DaanSetu - Blockchain-Based Donation Platform

📌 Project Overview

DaanSetu is a decentralized crowdfunding platform built using React, TypeScript, Ethers.js, and WalletConnect to facilitate transparent donations on the blockchain.

🚀 Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS

Backend: Node.js, Express, MongoDB

Blockchain: Ethers.js, WalletConnect, Polygon Amoy Testnet

Storage: Alchemy, IPFS

📦 Features Implemented

Wallet connection via WalletConnect

Campaign creation with smart contract deployment

Beneficiary registration and tracking

Donation processing in cryptocurrency

Geolocation tracking for targeted aid

📍 Setup & Installation

Clone the repository:

git clone https://github.com/kshaan-ali/daan-setu.git
cd daan-setu

Install dependencies:

npm install  # or yarn install

Set up environment variables:
Create a .env file in the root directory and add:

REACT_APP_ALCHEMY_URL=your-alchemy-url
REACT_APP_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id

Run the project:

npm start  # or yarn start

🌐 WalletConnect & Ethers.js Integration

To configure WalletConnect, update the App.tsx file:

import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { createAppKit } from '@reown/appkit/react';
import { polygonAmoy } from '@reown/appkit/networks';

const projectId = 'your-walletconnect-project-id';
const networks = [polygonAmoy];

createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata: {
    name: 'DaanSetu',
    description: 'Blockchain-based donation platform',
    url: 'https://daansetu.com',
    icons: ['https://example.com/icon.png']
  },
  projectId,
});

🔧 Fixing Common Issues

1. WalletConnect Unauthorized Error

❌ Error:

POST https://rpc.walletconnect.org/v1/?chainId=eip155%3A80002&projectId=xxx 401 (Unauthorized)

✅ Solution:

Ensure you are using a valid WalletConnect projectId in App.tsx.

If using Alchemy, update the RPC URL in your createAppKit configuration.

2. GitHub Push Blocked (Secrets Detected)

❌ Error:

Push cannot contain secrets (e.g., Twilio API keys, Alchemy URLs, etc.)

✅ Solution:

Remove secrets from the files:

nano backend/src/test.ts  # Edit & remove secrets
nano frontend/src/script/test.js  # Edit & remove secrets

Recommit changes:

git add .
git commit -m "Removed sensitive data"

Remove secrets from Git history:

git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch backend/src/test.ts frontend/src/script/test.js" \
--prune-empty --tag-name-filter cat -- --all

Force push the clean history:

git push origin main --force

Use a .env file to store sensitive credentials.

3. Remove Git from a Repository (Reverse git init)

To completely remove Git tracking:

rm -rf .git

📝 Additional Enhancements

Add image upload support for campaigns

Use IPFS for decentralized storage of campaign details

Improve UI/UX using Tailwind CSS & Framer Motion

🔗 Resources

Ethers.js Docs

WalletConnect Docs

Polygon Amoy Testnet Info

GitHub Secret Scanning

Happy coding! 🚀

