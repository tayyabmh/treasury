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
import Contribute from './components/contribute';
import Incentive from './components/incentive';
import Admin from './components/admin';
// import Governance from './components/govern';
import User from './components/user';
import Setup from './components/setup';
import Dashboard from './components/dashboard';
import Liquidity from './components/liquidity_pool';

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
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/incentive" element={<Incentive />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element ={<User/>} />
              <Route path="/setup" element={<Setup />}/>
              <Route path="/liquidity" element={<Liquidity />} />
              {/* <Route path="/govern" element={<Governance />} /> */}
            </Routes>
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
    );  
  }
}

export default App;
