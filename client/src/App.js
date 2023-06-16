import "./App.css";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";      // importing hooks
import { ethers } from "ethers";                 // importing ether.js for interaction
import FileUpload from './components/FileUpload';   // now importing components
import Modal from "./components/Modal";
import Display from "./components/Display";
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // using this function to create instance of our contract
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {


        window.ethereum.on("chainChanged", () => {           // when chain changed window reload
          window.location.reload();
        });                                                     // these scripts are provided by metamask taaki hm jb bhi account change krein to automatically site pr refresh ho jaaye

        window.ethereum.on("accountsChanged", () => {        // when account change window relaod
          window.location.reload();
        });




        await provider.send("eth_requestAccounts", []);  // jaise hi koi hamra dapp open usko wallet connection ki request jaye (we can also use button functionality but abhi wo hme nhi aati wo coffee wale dapp se dekh skte ho)
        const signer = provider.getSigner();           // getting signer to write data on blockchain
        const address = await signer.getAddress();     // to show which account is connected
        setAccount(address);

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress, Upload.abi, signer
        );
        console.log(contract)
        setContract(contract)
        setProvider(provider)

      }
      else {
        console.error("Metamask in not in your system")
      }
    };
    provider && loadProvider()
  }, []); // we used this ,[] otherwise yeh .js hr render k sath run kr rha hai

  return (
    <>
      {!modalOpen && (<button className="share" onClick={() => setModalOpen(true)}> Share </button>)}{" "}
      {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
      <div className="App">
        <h1 style={{ color: "OrangeRed" }}>New generation file system</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        <p style={{ color: "Teal" }} class="accountfont"> Account : {account ? account : "not connected"}</p>
        <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
        <Display account={account} contract={contract}></Display>
      </div>
    </>
  );
}

export default App;
