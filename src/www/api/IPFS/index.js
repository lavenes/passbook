import Axios from 'axios';
import { Config } from '@config';
import { Web3Storage } from "web3.storage";
import { Buffer } from "buffer";

const client = new Web3Storage({
    token: Config.WEB3_STORAGE_TOKEN,
});

export const IPFS = {
    uploadFile: async (file) => {
        let formData = new FormData();
        
        formData.append("file", file);
        
        formData.append("pinataMetadata", JSON.stringify({
            name: file.name,
        }));
        
        formData.append("pinataOptions", JSON.stringify({
            cidVersion: 1,
        }));

        let res = await Axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: Config.PINATA.KEY,
                pinata_secret_api_key: Config.PINATA.SECRET,
            },
        });

        return res.data;
    },
    uploadJSON: async (json) => {
        let data = JSON.stringify(json);

        let res = await Axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
            headers: {
                "Content-Type": "application/json",
                pinata_api_key: Config.PINATA.KEY,
                pinata_secret_api_key: Config.PINATA.SECRET,
            },
        });

        return res.data;
    }
}