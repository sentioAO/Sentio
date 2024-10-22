import './App.css';
import { ArweaveWalletKit } from "arweave-wallet-kit";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Waitlist from './Pages/Waitlist';
// import Onchain from './Pages/Onchain';
import Offchain from './Pages/Offchain';
import  Dashboard  from './Pages/Dashboard';
// import WatcherProcess from './Pages/OnchainDemo';
import SentinelProcess from './Pages/OnchainDemo';
import ReportDetailsPage from './Pages/Details';
import SentinelPage from './Pages/Sentinel';
function App() {
  return (
    <ArweaveWalletKit>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wait" element={<Waitlist/>} />
          <Route path="/offchain" element={<Offchain/>} />
          <Route path="/onchain" element={<SentinelProcess/>} />
          <Route path="/report-details" element={<ReportDetailsPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/sentinel/:processId" element={<SentinelPage/>}/>
        </Routes>
      </BrowserRouter>
    </ArweaveWalletKit>
  );
}

export default App;
