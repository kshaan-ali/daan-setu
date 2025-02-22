import { useEffect, useState } from "react";

import axios from "axios";
import { BrowserProvider, Contract, keccak256, toUtf8Bytes } from "ethers";
import ConnectButton from "./connectButton";
import Navbar from "./navbar";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { contractABI } from "../contract/config";
import { useSearchParams } from "react-router";

export default function BeneficiaryPage() {
  const [aadhaar, setAadhaar] = useState(0);
  const [otp, setOtp] = useState(0);
  const [genotp, setgenOtp] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [walletAddr, setWalletAddr] = useState("");
  const { address, isConnected } = useAppKitAccount();
  const [searchParams] = useSearchParams();
  const { walletProvider }: { walletProvider: any } =
    useAppKitProvider("eip155");

  const [campaignArray, setCamapignArray] = useState([]);
  const [contractAddress, setContractAddress] = useState("");
  const [balance, setbalance] = useState(0);

  const [amnt, setAmnt] = useState(0);

  useEffect(() => {
    async function code() {
      const res = axios.get("http://localhost:5000/campaignInfo");
      if ((await res).status == 200) {
        console.log((await res).data);
        setCamapignArray((await res).data);
      }
    }
    code();
  }, []);
  useEffect(() => {
    async function code() {
      try {
        const campaignId = searchParams.get("campaignId");
        console.log("queryparams:", typeof campaignId);
        if (isConnected) {
          const campaign: any = campaignArray.find((i: any) => {
            return i._id == campaignId;
          });
          console.log(campaign);
          if (campaign) {
            const ethersProvider = new BrowserProvider(walletProvider);
            // const provider = new WalletConnectProvider({
            //   rpc: {
            //     80002: "https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY", // Change this!
            //   },
            //   chainId: 80002, // Polygon Mumbai
            //   projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
            // });
            const signer = await ethersProvider.getSigner();
            const contract = new Contract(
              campaign.contractAddress,
              contractABI,
              signer
            );
            const bal: any = await ethersProvider.getBalance(
              campaign.contractAddress
            );
            console.log(bal);
            //   const :any=await
            setbalance(bal);
          }
        } else {
        }
      } catch (e: any) {
        console.log(e);
        alert("");
      }
    }
    code();
  }, [isConnected]);
  // Function to validate Aadhaar number
  const isValidAadhaar = (number: any) => {
    return /^\d{12}$/.test(number); // Check if it's exactly 12 digits
  };

  // Function to send OTP
  const handleSendOtp = async () => {
    if (!isValidAadhaar(aadhaar)) {
      alert("Invalid Aadhaar Number. It must be 12 digits.");
      return;
    }
    const hash = keccak256(toUtf8Bytes(aadhaar.toString()));
    console.log(hash);
    const res = axios.post("http://localhost:5555/adhaar/sendOtp", {
      adhaarID: aadhaar,
    });
    if ((await res).status == 200) {
      alert("otp sent");
    } else {
      alert("wrong aadhaar");
    }
    // alert("OTP has been sent to your registered mobile.");
    setOtpSent(true);
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    const res = axios.post("http://localhost:5555/adhaar/testOtp", {
      adhaarID: aadhaar,
      otp: otp,
    });
    if ((await res).status == 200) {
      alert("otp verified");

      try {
        const campaignId = searchParams.get("campaignId");
        console.log("queryparams:", typeof campaignId);
        if (isConnected) {
          const campaign: any = campaignArray.find((i: any) => {
            return i._id == campaignId;
          });
          console.log(campaign);

          if (campaign) {
            const res = await axios.get(
              `https://api.openweathermap.org/geo/1.0/direct?q=${campaign.affectedCity}&limit=1&appid=9b31133f77b8e4a903fec16887af30b7`
            );
            // console.log(res.data[0])
            const CampLat = res.data[0].lat;
            const CampLon = res.data[0].lon;

            //ip part
            const res2 = await axios.get(
              `https://ipinfo.io/json?token=9792c9947a0658`
            );
            // console.log(typeof res2.data.loc);
            const regex = /^([\d.-]+),([\d.-]+)$/;

            const match = res2.data.loc.match(regex);
            let latitude
            let longitude
            if (match) {
              latitude = Number(match[1]); // Extracted latitude
              longitude = Number(match[2]); // Extracted longitude

              console.log("Latitude:", latitude,typeof latitude);
              console.log("Longitude:", longitude,typeof longitude);
              console.log(CampLat-latitude)
              console.log(CampLon-longitude)
            }

            // https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN

            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const contract = new Contract(
              campaign.contractAddress,
              contractABI,
              signer
            );

            const hash = keccak256(toUtf8Bytes(aadhaar.toString()));
            console.log(hash);
            const tx = await contract.registerBeneficiary(hash, walletAddr);
            const addr = tx.wait();
            console.log(addr);
          }
        }
      } catch (e: any) {
        console.log(e);
        alert("");
      }
    } else {
      alert("wrong otp");
    }
  };

  return (
    <div className="min-h-screen   bg-gray-900 text-white">
      <Navbar />
      <center>
        <div className="p-6 m-1 bg-gray-800 rounded-lg shadow-lg w-80">
          <div className="flex flex-col items-center">
            <ConnectButton></ConnectButton>
          </div>
          <h2 className="text-xl font-bold text-blue-500 text-center mb-4">
            Beneficiary Verification
          </h2>

          {/* Aadhaar Input */}
          <label className="block text-gray-300 mb-2">
            Enter Aadhaar Number:
          </label>
          <input
            type="number"
            value={aadhaar}
            onChange={(e) => setAadhaar(Number(e.target.value))}
            className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            max="12"
            min={12}
            
          />
          <label className="block text-gray-300 mb-2">
            Enter Beneficiary Wallet :
          </label>
          <input
            type="text"
            onChange={(e) => setWalletAddr(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send OTP
          </button>

          {/* OTP Input Field (Shown After Clicking Send OTP) */}
          {otpSent && (
            <div className="mt-4">
              <label className="block text-gray-300 mb-2">Enter OTP:</label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(Number(e.target.value))}
                className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                max="6"
                
              />

              {/* Verify OTP Button */}
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Verify OTP & Ip Location & Create Crypto Beneficiary
              </button>
            </div>
          )}
        </div>
      </center>
    </div>
  );
}
