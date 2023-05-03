import { listKeys, ethSignMessage } from 'halo-chip'

export default async function readKeys(){
    const keys = await listKeys()
    alert('keys:')
    keys.map((k:any) => console.log)
    alert(keys);
    // const address = keys[0].address

    // const signature = await ethSignMessage('test123', 1, address)
    // console.log('signature:', signature)
}