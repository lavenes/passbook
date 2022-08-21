import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';

const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();

export const NFT = {
    mint: async (name, imageHash, place, date, time, price, description, createdBy, owner) => {
        //*Upload metadata
        let metadata = {
            name,
            image: `${Config.PINATA.FILE_URL}${imageHash}`,
            place,
            date,
            time,
            price,
            description,
            createdBy: createdBy,
            owner: owner
        }

		const metadataRes = await API.IPFS.uploadJSON(metadata);

        //*Upload Back
        let hero = await actor;
        
		const res = await hero.mintNFT(
            [
			    { tokenUri: `${Config.PINATA.FILE_URL}${metadataRes.IpfsHash}` },
		    ],
        );

        return res;
    },
    getAll: async() => {
        let hero = await actor;

		const res = await hero.getAllTokens();

		const promise4all = Promise.all(
			res.map(async (el) => {
				return await Axios.get(el.metadata[0]?.tokenUri).catch(e => {
                    return null;
                });
			})
		);

		const resu = await promise4all;
        
		const newlist = res.map((el, index) => {
			return { ...el, ...resu[index] };
		});

        return newlist.reverse();
    },
    get: async(id) => {
        let hero = await actor;

        const res = await hero.getTokenInfo(Number(id));

        const resu = await Axios.get(res.metadata[0]?.tokenUri).catch(e => {
            return null;
        });

        return { ...res, ...resu };
    },
    clearAll: async() => {
        let hero = await actor;

        const res = await hero.clearAllTokens();

        return res;
    }
}