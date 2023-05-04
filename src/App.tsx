import React, { useEffect, useState,} from 'react';
import logo from './logo.svg';
import './App.css';
import readKeys, { HaloSigner } from './utils/halo-reader';
import { getPrivateKeyOwner, getZeroDevSigner, ZeroDevSigner } from '@zerodevapp/sdk'
import { Contract, ethers } from 'ethers';



function App() {
  const [haloSigner, setHaloSigner] = useState<ZeroDevSigner|null>(null);
  const [address, setAddress] = useState('')
  const [ownerAddress, setOwnerAddress] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const contractAddress = '0x34bE7f35132E97915633BC1fc020364EA5134863'
  const contractABI = [
    'function mint(address _to) public',
    'function balanceOf(address owner) external view returns (uint256 balance)'
  ]
  const initializeHaloHandler = async ()=>{
    setLoading(true)
    const keys = await HaloSigner.readKeys();
    console.log(keys);
    const haloSigner = new HaloSigner(keys[0].address, new ethers.providers.JsonRpcProvider(process.env.REACT_APP_GOERLI_URL));
    const signer = await getZeroDevSigner({
      projectId: process.env.REACT_APP_ZERODEV_PROJECT_ID as string,
      owner:  haloSigner
    })

    setAddress(await signer.getAddress())
    setOwnerAddress(await signer.originalSigner.getAddress())
    setLoading(false)
  }

  const createWallet = async () => {    
    try{
      const signer = await getZeroDevSigner({
        projectId: process.env.REACT_APP_ZERODEV_PROJECT_ID as string,
        owner:  new ethers.Wallet(process.env.REACT_APP_PK as string, new ethers.providers.JsonRpcProvider(process.env.REACT_APP_GOERLI_URL))
      })    
      setAddress(await signer.getAddress())
      setHaloSigner(signer);
    }catch(e){
      console.error(e);
    }    
  }

  const mint = async()=>{
    debugger
    const nftContract = new Contract(contractAddress, contractABI, haloSigner as ZeroDevSigner);
    const tx = await nftContract.mint(address)
    const receipt  = await tx.wait()    
    console.log(receipt);    
    setOutput(`NFT balance: ${await nftContract.balanceOf(address)}`)
  }

  return (
    <div className="App">
      <header className="App-header">
      {(() => {
              if (address === ''){
                  return (
                    <button type="button" onClick={initializeHaloHandler}>Initialize Wallet</button>

                  )
              }              
              
            })()}
       
                    <button type="button" onClick={mint}>Mint On Polygon</button>
          
        {address && 
                <div>
                  <label>Wallet: {address}</label>
                </div>
                
              }
         {ownerAddress && 
                <div>
                  <label>Owner: {ownerAddress}</label>
                </div>
                
              }
          {output && 
                <div>
                  <label>{output}</label>
                </div>
                
              }
      </header>
    </div>
  );
}

export default App;
