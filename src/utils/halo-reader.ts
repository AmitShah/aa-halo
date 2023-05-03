import { listKeys, ethSignMessage } from 'halo-chip'
import { ethers, Provider, Signer, TransactionRequest, TypedDataDomain, TypedDataField, VoidSigner } from 'ethers'
import { Deferrable, defineReadOnly, resolveProperties, shallowCopy } from "@ethersproject/properties";
import { Bytes, BytesLike } from "@ethersproject/bytes";
import { hashMessage } from '@ethersproject/hash'

export default async function readKeys(){
    const keys = await listKeys()
    alert('keys:')
    keys.map((k:any) => console.log)
    alert(JSON.stringify(keys));
    const address = keys[0].address

    alert("sign with address:"+address);
    const signature = await ethSignMessage('test123', 1, address)
    console.log('signature:', signature)

    const signerAddress = ethers.recoverAddress(hashMessage("test123"),signature);
    alert("recovered:"+signerAddress);
    alert("done");
}

export class HaloSigner extends VoidSigner implements Signer {

    constructor(address: string, provider?: Provider) {
        super(address,provider);
    }

    getAddress(): Promise<string> {
        return Promise.resolve(this.address);
    }

    _fail(message: string, operation: string): Promise<any> {
        return Promise.resolve().then(() => {
            
        });
    }

    signMessage(message: Bytes | string): Promise<string> {
        return this._fail("VoidSigner cannot sign messages", "signMessage");
    }

    signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
        return this._fail("VoidSigner cannot sign transactions", "signTransaction");
    }

    _signTypedData(domain: TypedDataDomain, types: Record<string, Array<TypedDataField>>, value: Record<string, any>): Promise<string> {
        return this._fail("VoidSigner cannot sign typed data", "signTypedData");
    }

    connect(provider: Provider): VoidSigner {
        return new VoidSigner(this.address, provider);
    }
}