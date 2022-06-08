// Style Imports
import './App.css';
import "@rainbow-me/rainbowkit/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';


// Web3 Imports
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';

// React imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Local file imports
import NavigationSidebar from './components/nav';
import Setup from './components/setup';
import Dashboard from './components/dashboard';
import Liquidity from './components/liquidity_setup';
import LiquidityInitialization from './components/liquiduity_initialize';
import Wallets from './components/wallets';
import TokenManagement from './components/token_manage';
import Incentives from './components/incentives';

const { chains, provider } = configureChains(
  [chain.hardhat],
  [apiProvider.fallback()]
)

const { connectors } = getDefaultWallets({
  appName: "Kasama - Web3 Incentives",
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

class App extends React.Component {  



  render() {
    return (
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains} >
          <div className="App">
            <NavigationSidebar/>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setup" element={<Setup />}/>
              <Route path="/liquidity_setup" element={<Liquidity />} />
              <Route path='/liquidity_init' element={<LiquidityInitialization/>}/>
              <Route path='/wallets' element={<Wallets/>}/>
              <Route path='/manage_token' element={<TokenManagement />}/>
              <Route path='/incentives' element={<Incentives />}/>
              {/* <Route path="/govern" element={<Governance />} /> */}
            </Routes>
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
    );  
  }
}

export default App;
