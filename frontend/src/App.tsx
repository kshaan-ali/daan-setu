
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import LocationTracker from './components/location'
import Home from './components/home'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { createAppKit } from '@reown/appkit/react'
import { polygonAmoy } from '@reown/appkit/networks'

import DonateCryptoPage from './components/handleDonate'
import Admin from './components/adminPage'
import BeneficiaryPage from './components/bene'
import DaanSetu from './components/mainpage'
import Campaign from './components/campaign'



const projectId = 'bd58c4e651f4553eefbea7aae341f7aa'


const networks:any = [polygonAmoy]


const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', 
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
    <Routes>
      <Route path="/location" element={<LocationTracker />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/addBeneficiary" element={<BeneficiaryPage />} />
      <Route path="/donateCrypto" element={<DonateCryptoPage />} />
      <Route path="/campaigns" element={<Campaign />} />
            
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
