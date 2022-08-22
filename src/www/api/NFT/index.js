import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';
import { Principal } from '@dfinity/principal';

const { actor } = usePlug();

export const NFT = {
    mint: async (name, createdBy, imageBuffer, place, date, time, price, description, gifts, details, type, category) => {
        //*Upload metadata
        let metadata = {
            id: stringToSlug(name + '-' + randomStr(5)),
            name,
            image: imageBuffer,
            place,
            date: date.toString(),
            time: time.toString(),
            price: Number(price),
            description,
            gifts,
            details,
            nftType: type,
            category,
            owner: Principal.anonymous(),
            createdBy: createdBy,
            dateCreated: new Date().toISOString()
        }

        //*Upload
        let hero = await actor;
        
		const res = await hero.mintNFT(metadata);

        return res;
    },
    getAll: async() => {
        let hero = await actor;

		let res = await hero.getAllTokens();

        res = res.map(item => {
            item.image = new Uint8Array(item.image);
            item.image = URL.createObjectURL(new Blob([item.image],{type:"image/png"}));
            item.price = Number(item.price);

            return item;
        })

        return res.reverse();
    },
    getOwned: async() => {
        let hero = await actor;

		let res = await hero.getAllTokens();

        res = res.filter(item => {
            let itemOwner = item.owner.toString();
            let principal = window.ic?.plug?.sessionManager?.sessionData?.principalId;

            if(itemOwner == principal) {
                item.image = new Uint8Array(item.image);
                item.image = URL.createObjectURL(new Blob([item.image],{type:"image/png"}));
                item.price = Number(item.price);

                return item;
            }else{
                return false;
            }
        })

        return res.reverse();
    },
    get: async(id) => {
        let hero = await actor;

        let res = await hero.getTokenInfo(id);

        res.image = new Uint8Array(res.image);
        res.image = URL.createObjectURL(new Blob([res.image],{type:"image/png"}));
        res.price = Number(res.price);

        return res;
    },
    clearAll: async() => {
        let hero = await actor;

        const res = await hero.clearAllTokens();

        return res;
    },
    purchase: async(tokenId) => {
        console.log("PURCHASING...");
        let hero = await actor;

        const res = await hero.mintCloneNFT(tokenId);

        alert("PURCHASED !!!");

        return res;
    }
}