import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ethers } from "ethers";
import axios from "axios";
import { CampaignSchema, ICampaign } from "./context/model";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mock Blockchain Provider (Replace with actual RPC URL)
// const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

// Mock Smart Contract Addresses (Replace with actual deployed contracts)
const DID_CONTRACT_ADDRESS = "0xYourDIDContractAddress";
const FUND_CONTRACT_ADDRESS = "0xYourFundContractAddress";

// Sample ABI (Replace with actual contract ABI)
const DID_ABI = [
  "function createDID(string _did, bytes32 _aadhaarHash, string _upi, address _wallet) public",
  "function verifyDID(bytes32 _aadhaarHash) public",
  "function getDID(bytes32 _aadhaarHash) public view returns (string, string, address, bool)",
];

const db = mongoose.connect(
  "mongodb+srv://zenith8404:CbawluPIrcAJVLKp@cluster0.4iyuoxv.mongodb.net/hackathon"
);
const Campaign = mongoose.model("campaign", CampaignSchema);
// const UserAccount=mongoose.model('UserAccount',userAccountSchema)

app.post("/createCampaign", async (req: any, res: any) => {
  try {
    const { name, campaignDetail, image, affectedCity, contractAddress } =req.body;

    // Check if the campaign already exists
    // const existingCampaign = await Campaign.findOne({ campaignID });

    // if (existingCampaign) {
    //   return res.status(400).json({ message: "Campaign ID already exists" });
    // }

    // Create new campaign
    const newCampaign: ICampaign = new Campaign({
      name,
      campaignDetail,
      image,
      affectedCity,
      contractAddress,
    });

    await newCampaign.save();
    res.status(201).json({
        message: "Campaign created successfully",
        campaign: newCampaign,
      });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
});
// app.post("/checkCampaign", async (req:any, res:any) => {
//   try {
//     const { campaignID, name,  } = req.body;

//     // Check if the campaign already exists
//     const existingCampaign = await Campaign.findOne({ campaignID });

//     if (existingCampaign) {
//       return res.status(400).json({ message: "Campaign ID already exists" });
//     }

//     res.status(201).json({ message: "Campaign available successfully"});

//   } catch (error) {
//     console.error("Error creating campaign:", error);
//     res.status(500).json({ message: "Server error", error: (error as Error).message });
//   }
// });
app.get("/campaignInfo", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // ✅ **1️⃣ Create a New DID (Decentralized Identity)**
// app.post("/api/did/register", async (req, res) => {
//   try {
//     const { did, aadhaarHash, upi, walletAddress } = req.body;

//     // Call smart contract function
//     const tx = await didContract.createDID(did, aadhaarHash, upi, walletAddress);
//     await tx.wait();

//     res.status(200).json({ message: "DID registered successfully", transactionHash: tx.hash });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to register DID" });
//   }
// });

// // ✅ **2️⃣ Verify a DID (Admin Only)**
// app.post("/api/did/verify", async (req, res) => {
//   try {
//     const { aadhaarHash } = req.body;
//     const tx = await didContract.verifyDID(aadhaarHash);
//     await tx.wait();

//     res.status(200).json({ message: "DID verified successfully", transactionHash: tx.hash });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to verify DID" });
//   }
// });

// // ✅ **3️⃣ Get DID Details**
// app.get("/api/did/:aadhaarHash", async (req, res) => {
//   try {
//     const aadhaarHash = req.params.aadhaarHash;
//     const [did, upi, wallet, isVerified] = await didContract.getDID(aadhaarHash);

//     res.status(200).json({ did, upi, wallet, isVerified });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve DID" });
//   }
// });

// // ✅ **4️⃣ Check if a User is in a Disaster Zone (Geo Verification)**
// app.get("/api/geo/verify/:latitude/:longitude", async (req, res) => {
//   try {
//     const { latitude, longitude } = req.params;

//     // Example using OpenWeatherMap Reverse Geocoding API (Replace with actual API)
//     const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${process.env.GEO_API_KEY}`);

//     if (response.data.length > 0) {
//       res.status(200).json({ message: "User is in a verified location", location: response.data[0] });
//     } else {
//       res.status(400).json({ error: "User not in a disaster zone" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Geo-verification failed" });
//   }
// });

// // ✅ **5️⃣ Convert Crypto to INR & Transfer to UPI**
// app.post("/api/funds/convert", async (req, res) => {
//   try {
//     const { walletAddress, upi, amountInCrypto } = req.body;

//     // Mock API to Convert Crypto to INR (Integrate with WazirX, Binance P2P, Transak, etc.)
//     const exchangeRate = 80; // Example: 1 USDC = 80 INR
//     const amountInINR = amountInCrypto * exchangeRate;

//     // Simulate API call to UPI transfer service (Real-world: use Razorpay, Paytm, etc.)
//     const transferResponse = await axios.post("https://mock-upi-api.com/transfer", {
//       upi,
//       amount: amountInINR
//     });

//     if (transferResponse.data.success) {
//       res.status(200).json({ message: "Funds converted & transferred successfully", amountInINR });
//     } else {
//       res.status(400).json({ error: "Failed to transfer funds" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Crypto to INR conversion failed" });
//   }
// });

// // ✅ **6️⃣ Listen on Port**
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
