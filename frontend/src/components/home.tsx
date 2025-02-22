import { Heart, UserPlus, MessageCircle, HelpCircle } from "lucide-react";
import Navbar from "./navbar";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CMRF() {
  const navigate = useNavigate();
  const [campaignArray, setCamapignArray] = useState([]);

  useEffect(() => {
    async function code() {
      const res = axios.get("http://localhost:5000/campaignInfo");
      if ((await res).status == 200) {
        console.log((await res).data);
        setCamapignArray((await res).data);
      }
    }
    code();
  },[]);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      <section className="flex flex-col md:flex-row items-center bg-gray-200 p-8 md:p-16">
        <motion.div 
          className="md:w-1/2 text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-bold text-blue-800 text-4xl mb-4">
            Partners in Humanitarian
          </h2>
          <p className="text-gray-900 mb-6">
            LCIF partners with UNHRD, an international network of six
            humanitarian support hubs located strategically around the world,
            that provide supply chain solutions to the international
            humanitarian community.
          </p>
          <button onClick={()=>{
                navigate('/campaigns')
              }} className="bg-blue-700 mr-1 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition">
            Donate Now
          </button>
          <button onClick={()=>{
                navigate('/campaigns')
              }} className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition">
            Apply For Aid
          </button>
        </motion.div>

        <motion.div 
          className="md:w-1/2 mt-6 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://imgs.search.brave.com/uTSj7zV0_AzWq4nrAWXpwQjKyB1mTq_gZs3gj76woXs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzIyLzQ5LzQx/LzM2MF9GXzkyMjQ5/NDExOV9HcmtTYXBq/eExFSVdUQkMwc3p5/dVpBN2hRb1dsc0ZQ/dC5qcGc"
            alt="Humanitarian Services"
            className="w-10/12 rounded-lg shadow-md"
          />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="bg-gray-800 text-white py-16 px-8 md:px-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold uppercase border-b-4 border-blue-500 inline-block pb-2">
            About
          </h2>
        </div>

        <motion.div 
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-bold">Empowering Lives, Ensuring Transparency</h3>
          <p className="text-gray-300 mt-4 leading-relaxed">
            <span className="font-bold text-white">DaanSetu</span> is a
            <span className="font-bold text-blue-400"> blockchain-powered financial emergency relief system</span>
            built to provide <span className="font-bold">secure</span>,
            <span className="font-bold"> transparent</span>, and
            <span className="font-bold"> real-time aid distribution</span>.
          </p>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-8 md:px-24 bg-gray-200 text-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">
            Frequently Asked Questions
          </h2>

          <motion.div 
            className="border-2 border-dashed border-blue-600 p-6 rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">1. What is DaanSetu?</h3>
                <p className="text-gray-700">
                  DaanSetu is a government-backed platform that facilitates
                  donations to disaster-affected individuals across India.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">2. How can I donate?</h3>
                <p className="text-gray-700">
                  You can donate securely through our website using UPI, cards, or net banking.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Important Links Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Important Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaignArray.map((i:any) => {
            return (
              
                <a
                  
                  className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {i.name}
                  </h3>
                  <p>Contract Address:{i.contractAddress}</p>
                  <p>Campaign Id:{i.campaignID}</p>
                  <button onClick={() => {
              navigate(`/donateCrypto?campaignId=${i.campaignID}`);
            }} className="p-2 m-1 flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full flex items-center gap-2">Donate</button>
                  <button onClick={() => {
              navigate(`/addBeneficiary?campaignId=${i.campaignID}`);
            }} className="p-2 m-1 flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full flex items-center gap-2">Add Beneficiary</button>
                </a>
              
            );
          })}
        </div>
      </div>

     
    </div>
  );
}
