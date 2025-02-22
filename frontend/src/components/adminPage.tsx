import { Heart, UserPlus, MessageCircle, HelpCircle } from "lucide-react";
import Navbar from "./navbar";
import { useNavigate } from "react-router";
import ConnectButton from "./connectButton";
import axios from "axios";
import { useState } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { deployContract } from "../contract/config";

export default function Admin() {
  const navigate = useNavigate();
  const [campaignId, setCampaignId] = useState(0);
  const [campaignName, setcampaignName] = useState("");
  const [campaignDetail, setcampaignDetail] = useState("");
  const [affectedCity, setAffectedCity] = useState("");
  const [image, setImage] = useState("");
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: any } =
    useAppKitProvider("eip155");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto p-6 text-center">
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">
            New Campaign
          </h2>

          {/* Wallet Connection Section */}
          <div className="flex flex-col items-center">
            <ConnectButton></ConnectButton>
          </div>

          {/* <div className="flex flex-col">
              <label htmlFor="amount" className="text-gray-300 mb-2">
                Enter Campaign Id :
              </label>
              <input
              onChange={(e)=>{
                setCampaignId(Number(e.target.value))
              }}
                type="number"
                className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div> */}
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-gray-300 mb-2">
              Enter Campaign Name:
            </label>
            <input
              onChange={(e) => {
                setcampaignName(e.target.value);
              }}
              className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-gray-300 mb-2">
              Enter Campaign details:
            </label>
            <input
              onChange={(e) => {
                setcampaignDetail(e.target.value);
              }}
              className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-gray-300 mb-2">
              Enter Affected Region (District):
            </label>
            <input
              onChange={(e) => {
                setAffectedCity(e.target.value);
              }}
              className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-gray-300 mb-2">
              Enter Image Url:
            </label>
            <input
              onChange={(e) => {
                setImage(e.target.value);
              }}
              className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            onClick={async () => {
              try {
                // const res = await axios.post("http://localhost:5000/checkCampaign", {
                //     // campaignID:campaignId
                //     name:campaignName,
                //     campaignDetail:campaignDetail,
                //     image:image,
                //     affectedCity:affectedCity

                // });
                // if(res.status==201){
                if (isConnected) {
                  const ethersProvider = new BrowserProvider(walletProvider);
                  const signer = await ethersProvider.getSigner();
                  const x = await deployContract(signer, campaignId);
                  if (x) {
                    const res = await axios.post(
                      "http://localhost:5000/createCampaign",
                      {
                        // campaignID: campaignId,
                        name: campaignName,
                        contractAddress: x,
                        campaignDetail:campaignDetail,
                        image:image,
                        affectedCity:affectedCity,
                      }
                    );
                    console.log(res);
                  }
                } else {
                  alert("wallet not connected!");
                }
                // }else if(res.status==400){
                //     alert("campign id already exists")
                // }
                // else{
                //     alert("campaign Id created")
                // }
              } catch (e: any) {
                console.log(e);
                alert("campaignId already Exist");
              }
            }}
            type="submit"
            className="w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Create Campaign
          </button>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
