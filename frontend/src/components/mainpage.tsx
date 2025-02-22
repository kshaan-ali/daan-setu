import React from "react";
import { motion } from "framer-motion";

const DaanSetu = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          {/* Header Section */}
          <header className="bg-blue-600 text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Lions Clubs International Foundation</h1>
                <p className="text-sm">Partners in Humanitarian Services</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300">
                  Donate Now
                </button>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300">
                  Apply for Aid
                </button>
              </div>
            </div>
          </header>
    
          {/* Hero Section */}
          <section className="relative py-12 bg-gradient-to-br from-blue-600 to-purple-600">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-white mb-4">Help Families and Communities</h2>
                <p className="text-lg text-white mb-8">
                  Your donation can provide urgent relief to those affected by wildfires and other natural disasters.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
                  Donate Now
                </button>
              </motion.div>
            </div>
          </section>
    
          {/* About Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">About DaanSetu</h2>
                <p className="text-gray-600 mb-8">
                  DaanSetu is a blockchain-powered financial emergency relief system built to provide secure, transparent, and real-time aid distribution for disaster-affected rural communities in India.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Learn More
                </button>
              </motion.div>
            </div>
          </section>
    
          {/* How It Works Section */}
          <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">How DaanSetu Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                  {[
                    "Donors contribute funds in crypto or INR, which are stored transparently on the blockchain.",
                    "Smart contracts automatically distribute aid to verified beneficiaries based on pre-defined rules.",
                    "Relief workers/NGOs assist in verifying and registering affected individuals.",
                    "Geo-location tracking, Aadhaar verification, and IP monitoring ensure aid reaches only those in need.",
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className="bg-white p-6 rounded-lg shadow-lg"
                    >
                      <p className="text-gray-600">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
    
          {/* FAQ Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                <div className="mt-8 space-y-4">
                  {[
                    "What is DaanSetu?",
                    "How can I donate?",
                    "Where does my donation go?",
                    "How can I track my donation?",
                    "Is DaanSetu secure?",
                  ].map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <p className="text-gray-800 font-medium">{question}</p>
                    </motion.div>
                  ))}
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mt-8">
                  Contact Us
                </button>
              </motion.div>
            </div>
          </section>
    
          {/* Footer Section */}
          <footer className="bg-blue-600 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <p>Together, we rebuild lives. Every donation is a step toward hope, healing, and a stronger tomorrow.</p>
            </div>
          </footer>
        </div>
      );
};

export default DaanSetu;