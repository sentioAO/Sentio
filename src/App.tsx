import './App.css';
import { ArweaveWalletKit } from "arweave-wallet-kit";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Waitlist from './Pages/Waitlist';
// import Onchain from './Pages/Onchain';
import Offchain from './Pages/Offchain';
import Dashboard from './Pages/Dashboard';
// import WatcherProcess from './Pages/OnchainDemo';
import SentinelProcess from './Pages/OnchainDemo';
import ReportDetailsPage from './Pages/Details';
import SentinelPage from './Pages/Sentinel';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    const trackingId = "G-BY4ZM3EL9F"
    ReactGA.initialize(trackingId);
    ReactGA.send({ hitType: "pageview", page: "/", title: "Landing Page" });
    ReactGA.send({ hitType: "pageview", page: "/wait", title: "Waitlist Page" });
    ReactGA.send({ hitType: "pageview", page: "/offchain", title: "Offchain Page" });
    ReactGA.send({ hitType: "pageview", page: "/onchain", title: "Onchain Page" });
    ReactGA.send({ hitType: "pageview", page: "/report-details", title: "Report Details Page" });
    ReactGA.send({ hitType: "pageview", page: "/dashboard", title: "Dashboard Page" });
    ReactGA.send({ hitType: "pageview", page: "/sentinel/:processId", title: "Sentinel Page" });

  })
  return (

    <ArweaveWalletKit>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wait" element={<Waitlist />} />
          <Route path="/offchain" element={<Offchain />} />
          <Route path="/onchain" element={<SentinelProcess />} />
          <Route path="/report-details" element={<ReportDetailsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sentinel/:processId" element={<SentinelPage />} />
        </Routes>
      </BrowserRouter>
    </ArweaveWalletKit>
  );
}

export default App;
