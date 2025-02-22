import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ethers } from "ethers";
import axios from "axios";
import { testApi } from "./test";

dotenv.config();

type adhaarType={
    adhaarID:String
    phoneNo:Number
    otp:Number
}
const tempData:adhaarType[]=[
    {
        adhaarID:'679403332992',
        phoneNo:8928710220,
        otp:0
        
    },
    {
        adhaarID:'924330039897',
        phoneNo:9869799520,
        otp:0
    },
    {
        adhaarID:'793764499082',
        phoneNo:7208780451,
        otp:0
    }
]

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5555;

// ✅ **1️⃣ Create a New DID (Decentralized Identity)**
app.post("/adhaar/sendOtp/", async (req, res) => {
  try {
    const body = req.body;
    const adhaar=body.adhaarID
    const found=tempData.find((i)=>i.adhaarID==adhaar)
    if(found){
        const otp=await testApi(found.phoneNo)
        found.otp=otp
        res.status(200).json({ message: "otp sent successfully" });
    }else{
      res.status(201).json({ message: "wrong aadhaar" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register DID" });
  }
});
app.post("/adhaar/testOtp/", async (req, res) => {
  try {
    const body = req.body;
    const adhaar=body.adhaarID
    const otp=body.otp
    const found=tempData.find((i)=>i.adhaarID==adhaar)
    if(found){
        if (otp==found.otp){

          res.status(200).json({ message: "DID registered successfully" });
        }else{
          res.status(201).json({ message: "wrong otp" });
        }
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register DID" });
  }
});



// ✅ **6️⃣ Listen on Port**
app.listen(PORT, () => {
  console.log(`adhaar Server running on http://localhost:${PORT}`);
});
