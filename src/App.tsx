import './App.css';
import { ArweaveWalletKit } from "arweave-wallet-kit";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Waitlist from './Pages/Waitlist';
import Onchain from './Pages/Onchain';
import Offchain from './Pages/Offchain';
function App() {
  return (
    <ArweaveWalletKit>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wait" element={<Waitlist/>} />
          <Route path="/onchain" element={<Onchain/>} />
          <Route path="/offchain" element={<Offchain/>} />
        </Routes>
      </BrowserRouter>
    </ArweaveWalletKit>
  );
}

export default App;
