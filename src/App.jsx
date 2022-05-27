// @aztec/sdk v2.1.0-testnet.30
import {
    createAztecSdk,
    createSharedWorkerSdk, 
    EthersAdapter, 
    WalletProvider
} from "@aztec/sdk";

import logo from "./logo.svg";
import           "./App.css";

const ethers = require("ethers");

// Figuring out how to use the SDK in the frontend
// https://developers.aztec.network/#/A%20Private%20Layer%202/zkAssets/createDepositProof
const network = "goerli";
const config  = {
    goerli: {
        serverUrl: "https://api.aztec.network/aztec-connect-testnet/falafel"
    }
};

let initStarted = false;

function App() {
    if(!initStarted) init();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Open console to see debug.
                </p>
            </header>
        </div>
    );
}

async function init() {
    console.log(`init() called`);
    initStarted = true;

    const provider         = new ethers.providers.Web3Provider(window.ethereum, network);
    const ethereumProvider = new EthersAdapter(provider);
    const walletProvider   = new WalletProvider(ethereumProvider);

    const aztecSdkHosted = await createAztecSdk(
        walletProvider,
        {
            serverUrl      : config[network].serverUrl,
            pollInterval   : 1000,
            memoryDb       : true,
            minConfirmation: 1, // ETH block confirmations
        }
    );
    // If you open console, you'll see createAztecSdk fails at create_iframe.ts:41
    // It's expecting http://localhost:3333 !== https://api.aztec.network

    // Comment out the above to to run createSharedWorkerSdk()
    // I pull in worker.js and barretenberg.wasm in config-overrides.js
    const aztecSdkShared = await createSharedWorkerSdk(
        walletProvider,
        {
            serverUrl      : config[network].serverUrl,
            pollInterval   : 1000,
            memoryDb       : true,
            minConfirmation: 1, // ETH block confirmations
        }
    );

}

export default App;