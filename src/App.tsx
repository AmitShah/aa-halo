import React, { useEffect, useState,} from 'react';
import logo from './logo.svg';
import './App.css';
import readKeys, { HaloSigner } from './utils/halo-reader';
import { getPrivateKeyOwner, getZeroDevSigner, ZeroDevSigner } from '@zerodevapp/sdk'
import { Signer } from 'ethers';


function App() {
  const [haloSigner, setHaloSigner] = useState<ZeroDevSigner|null>(null);
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  
  const initializeHaloHandler = async ()=>{
    setLoading(true)
    const keys = await HaloSigner.readKeys();
    const haloSigner = new HaloSigner(keys[0]);
    const signer = await getZeroDevSigner({
      projectId: process.env.ZERODEV_PROJECT_ID as string,
      owner:  haloSigner
    })
    setAddress(await signer.getAddress())
    setLoading(false)
  }

  const createWallet = async () => {
   

  }

  return (
    <div className="App">
      <header className="App-header">
      {(() => {
              if (haloSigner == null){
                  return (
                    <button type="button" onClick={initializeHaloHandler}>Initialize Halo</button>

                  )
              }              
              return
              {address && 
                <div>
                  <label>Wallet: {address}</label>
                </div>
              }
            })()}
      </header>
    </div>
  );
}

export default App;
