import { Home, Info, FileText, Heart, Phone } from "lucide-react";
import { useNavigate } from "react-router";

export default function Navbar() {
    const navigate=useNavigate()
    return (
        <div>
          {/* Alert Banner */}
          <div className="bg-red-500 text-white text-center py-2 text-sm font-medium">
            By donating to our <span className="font-bold">Disaster Relief Fund</span>, you can help families and communities devastated by wildfires and other natural disasters.
          </div>
    
          {/* Navbar */}
          <nav className="bg-gradient-to-r from-blue-900 to-purple-700 text-white px-6 py-4 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* <img src="/logo.png" alt="Lions Club" className="w-10 h-10" /> Replace with actual logo */}
              <h1 onClick={()=>{
                navigate('/')
              }} className="text-3xl font-black ">Daan Setu</h1>
            </div>
    
            
    
            {/* Right Section */}
            <div className="flex items-center gap-4">
              <ul className="hidden md:flex space-x-4 text-sm">
                <li onClick={()=>{
                navigate('/')
              }} className="hover:underline cursor-pointer">Home</li>
                <li  className="hover:underline cursor-pointer">About</li>
                {/* <li onClick={()=>{
                navigate('/')
              }} className="hover:underline cursor-pointer">Apply for Beneficiary</li> */}
                
              </ul>
              <button onClick={()=>{
                navigate('/admin')
              }} className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400">
                Admin
              </button>
              {/* <Search className="w-5 h-5 cursor-pointer" /> */}
            </div>
          </nav>
        </div>
      );
}
