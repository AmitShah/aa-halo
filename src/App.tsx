import React, { useEffect, useState,} from 'react';
import logo from './logo.svg';
import './App.css';
import readKeys, { HaloSigner } from './utils/halo-reader';
import { getPrivateKeyOwner, getZeroDevSigner, ZeroDevSigner } from '@zerodevapp/sdk'
import { ethers } from 'ethers';



function App() {
  const [haloSigner, setHaloSigner] = useState<ZeroDevSigner|null>(null);
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  
  const initializeHaloHandler = async ()=>{
    setLoading(true)
    const keys = await HaloSigner.readKeys();
    console.log(keys);
    const haloSigner = new HaloSigner(keys[0], new ethers.providers.JsonRpcProvider(process.env.REACT_APP_GOERLI_URL));
    const signer = await getZeroDevSigner({
      projectId: process.env.REACT_APP_ZERODEV_PROJECT_ID as string,
      owner:  haloSigner
    })

    setAddress(await signer.getAddress())
    setLoading(false)
  }

  const createWallet = async () => {    
    try{
      const signer = await getZeroDevSigner({
        projectId: process.env.REACT_APP_ZERODEV_PROJECT_ID as string,
        owner:  new ethers.Wallet(process.env.REACT_APP_PK as string, new ethers.providers.JsonRpcProvider(process.env.REACT_APP_GOERLI_URL))
      })    
      setAddress(await signer.getAddress())
    }catch(e){
      console.error(e);
    }    
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
        {address && 
                <div>
                  <label>Wallet: {address}</label>
                </div>
              }
      </header>
    </div>
  );
}

export default App;
