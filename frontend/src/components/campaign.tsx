import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "./navbar";

const Campaign = () => {
  const navigate = useNavigate();
  const [campaignArray, setCampaignArray] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await axios.get("http://localhost:5000/campaignInfo");
        if (res.status === 200) {
          setCampaignArray(res.data);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    }
    fetchCampaigns();
  }, []);

  return (
    <div>
        <Navbar></Navbar>
    
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-bold text-center text-indigo-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Live Campaigns
      </motion.h1>

      {/* Campaigns Grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignArray.map((campaign:any, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-indigo-400 mb-2">
              Campaign Name: {campaign.name}
            </h3>
            <p className="text-gray-300 text-sm mb-4">
            <img src={campaign.image} width={400} alt="Example" className="rounded-lg shadow-lg" /> 
            </p>
            <p className="text-gray-300 text-sm mb-2">
              <strong>Contract Address:</strong> {campaign.contractAddress}
            </p>
            <p className="text-gray-300 text-sm mb-4">
              <strong>Campaign ID:</strong> {campaign._id}
            </p>
            <p className="text-gray-300 text-sm mb-2">
              <strong> campaign Detail:</strong> {campaign.campaignDetail}
            </p>
            <p className="text-gray-300 text-sm mb-4">
              <strong>affected City:</strong> {campaign.affectedCity}
            </p>
            

            <div className="flex  gap-2">
              <button
                onClick={() => navigate(`/donateCrypto?campaignId=${campaign._id}`)}
                className="p-3 w-1/2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex justify-center items-center"
              >
                Donate
              </button>
              <button
                onClick={() => navigate(`/addBeneficiary?campaignId=${campaign._id}`)}
                className="p-3 w-1/2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 flex justify-center items-center"
              >
                Add Beneficiary
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Campaign;
