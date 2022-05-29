// @aztec/sdk v2.1.0-testnet.30
import {
    createAztecSdk, 
    EthersAdapter, 
    Web3Signer,
    AccountId,
    SdkFlavour
} from "@aztec/sdk";

import logo  from "./logo.svg";
import            "./App.css";

const ethers = require("ethers");

const network = "goerli";
const config  = {
    goerli: {
        serverUrl: "https://api.aztec.network/aztec-connect-testnet/falafel"
    }
};
const privateKeyMessage = Buffer.from(
    `Sign this message to generate your Aztec Privacy Key. This key lets the application decrypt your balance on Aztec.\n\nIMPORTANT: Only sign this message if you trust the application.`
);

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

    async function init() {
        initStarted = true;

        if(!window.ethereum) {
            console.error(`You must have MetaMask installed!`);
            return;
        }
    
        const ethersProvider   = new ethers.providers.Web3Provider(window.ethereum, network);
        const ethereumProvider = new EthersAdapter(ethersProvider);
    
        console.log(`Creating SDK`);

        const aztecSdk = await createAztecSdk(
            ethereumProvider,
            {
                serverUrl      : config[network].serverUrl,
                pollInterval   : 1000,
                memoryDb       : true,
                debug          : "bb:*",
                flavour        : SdkFlavour.PLAIN,
                minConfirmation: 1, // ETH block confirmations
            }
        );

        console.log(`SDK created, "running"`);

        await aztecSdk.run();

        console.log(`Run complete`);

        console.log(`Getting address from MetaMask`);

        let accounts = await ethersProvider.send("eth_requestAccounts", []);
        if(!accounts) return;

        const address       = accounts[0];
        const signer        = new Web3Signer(ethereumProvider);
        const signedMessage = await signer.signMessage(privateKeyMessage, address);
        const privateKey    = signedMessage.slice(0, 32);
        const publicKey     = await aztecSdk.derivePublicKey(privateKey);
        console.log("Created keys", { privateKey, publicKey });
    
        const accountId  = new AccountId(publicKey);
        const userExists = await aztecSdk.userExists(accountId);
    
        let user;
        if(userExists) {
            user = await aztecSdk.getUser(accountId);
            console.log(`User already exists`);
        }
        else {
            user = await aztecSdk.addUser(privateKey);
            console.log(`Added user`);
        }
    
        console.log(user);
    
        console.log(`Synchronising user`);
        await aztecSdk.awaitUserSynchronised(user.id);
        console.log(`User synchronised`);
    
        const ethBalance = aztecSdk.fromBaseUnits(
            await aztecSdk.getBalanceAv(
                aztecSdk.getAssetIdBySymbol("ETH"),
                user.id
            )
        );
    
        console.log(`User ETH balance: ${ethBalance}`);
    }
}

export default App;