import { useNavigate, useSearchParams } from "react-router";
import ConnectButton from "./connectButton";
import Navbar from "./navbar";
import axios from "axios";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { BrowserProvider, Contract, ethers } from "ethers";
import { contractABI  } from "../contract/config";

export default function DonateCryptoPage() {
  const [searchParams] = useSearchParams();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: any } =
    useAppKitProvider("eip155");

    const [campaignArray, setCamapignArray] = useState([]);
    const [contractAddress,setContractAddress]=useState('')
    const [balance,setbalance]=useState(0)

    const [amnt,setAmnt]=useState(0)

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
  useEffect(() => {
    async function code() {
        try {
            const campaignId = searchParams.get("campaignId");
            console.log("queryparams:", typeof( campaignId));
            if(isConnected ){
              const campaign:any= campaignArray.find((i:any)=>{
                  
                  return  Number(i.campaignID)==Number(campaignId)
              })
              console.log(campaign)
              if(campaign){
                  const ethersProvider = new BrowserProvider(walletProvider)
                  const signer = await ethersProvider.getSigner()
                  const contract = new Contract(campaign.contractAddress, contractABI, signer)
                  const bal:any = await ethersProvider.getBalance(campaign.contractAddress)
                  console.log(bal)
                //   const :any=await 
                  setbalance(bal )
              }

            }else{
                
            }


          } catch (e: any) {
            console.log(e);
            alert("");
          }

    }
    code();
  },[isConnected]);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar></Navbar>
      {/* Donation Form Section */}
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10">

        <h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">
          Total Funds Allocated:{ethers.formatUnits(balance,18)} Pol
        </h2>
        <h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">
          Donate Now
        </h2>

        {/* Wallet Connection Section */}
        <div className="flex flex-col items-center">
          <ConnectButton></ConnectButton>
        </div>

        {/* Donation Amount Input */}
        <div className="flex flex-col m-1">
          <label htmlFor="amount" className="text-gray-300 mb-2">
            Enter Donation Amount (USDC):
          </label>
          <input
          onChange={(e:any)=>{
            setAmnt(e.target.value)
          }}
            type="number"
            id="amount"
            name="amount"
            placeholder="0.1"
            step="0.01"
            min="0"
            className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Donate Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={async () => {
            try {
              const campaignId = searchParams.get("campaignId");
              console.log("queryparams:", typeof( campaignId));
              if(isConnected ){
                const campaign:any= campaignArray.find((i:any)=>{
                    
                    return  Number(i.campaignID)==Number(campaignId)
                })
                console.log(campaign)
                if(campaign){
                    const ethersProvider = new BrowserProvider(walletProvider)
                    const signer = await ethersProvider.getSigner()
                    const contract = new Contract(campaign.contractAddress, contractABI, signer)
                    // const tokencontract = new Contract(usdcTokenAddress, tokenAbi, signer)
                    // const tx1=await tokencontract.approve(campaign.contractAddress,(amnt*10**6).toString())
                    // const rc=tx1.wait()
                    // if(rc){

                        const tx = await contract.donate({ value: (amnt*10**18).toString() });
                        const addr=tx.wait()
                        console.log(addr)
                    // }
                }

              }


            } catch (e: any) {
              console.log(e);
              alert("");
            }
          }}
        >
          Donate
        </button>
      </div>
    </div>
  );
}
