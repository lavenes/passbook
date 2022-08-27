import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';
import { Principal } from '@dfinity/principal';

const { actor } = usePlug();

export const NFT = {
    mint: async (name, imageUrl, place, date, time, price, description, gifts, details, type, category) => {
        //*Upload metadata
        let metadata = {
            id: stringToSlug(name + '-' + randomStr(5)),
            name,
            image: imageUrl,
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
            createdBy: Principal.fromText(window.ic?.plug?.sessionManager?.sessionData?.principalId),
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
            item.price = Number(item.price);

            return item;
        });

        return res.reverse();
    },
    getAllOfUser: async( principalId ) => {
        let hero = await actor;

		let res = await hero.getAllTokens();

        res = res.filter(item => {
            if(item.createdBy.toString() == principalId && item.owner.toString() == principalId) {
                item.price = Number(item.price);

                return item;
            }

            return false;
        })

        return res.reverse();
    },
    getAllTickets: async() => {
        let hero = await actor;

		let res = await hero.getAllTokens();

        res = res.filter(item => {
            if(item.type === "ticket") {
                item.price = Number(item.price);

                return item;
            }

            return false;
        })

        return res.reverse();
    },
    getAllNFTs: async() => {
        let hero = await actor;

		let res = await hero.getAllTokens();

        res = res.filter(item => {
            if(item.type === "nft") {
                item.price = Number(item.price);

                return item;
            }

            return false;
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
                item.price = Number(item.price);

                return item;
            }else{
                return false;
            }
        })
        
        return res.reverse();
    },
    getCreatedNFTs: async() => {
        let hero = await actor;

		let res = await hero.getAllTokens();

        res = res.filter(item => {
            let itemCreated = item.createdBy.toString();
            let principal = window.ic?.plug?.sessionManager?.sessionData?.principalId;

            if(item.nftType === "nft" && itemCreated == principal) {
                item.price = Number(item.price);

                return item;
            }

            return false;
        })

        return res.reverse();
    },
    get: async(id) => {
        let hero = await actor;
        let { principal } = usePlug();

        let res = await hero.getTokenInfo(id);
        
        res.price = Number(res.price);

        res.gifts = res.gifts.map(item => {
            item.image = new Uint8Array(item.image);
            item.image = URL.createObjectURL(new Blob([item.image]));

            return item;
        });

        res.owned = (res.owner.toString() === principal);

        return res;
    },
    clearAll: async() => {
        console.log("CLEARING...")
        let hero = await actor;

        const res = await hero.clearAllTokens();

        console.log(res);

        return res;
    },
    purchase: async(tokenId) => {
        const { requestTransfer } = usePlug();
        let hero = await actor;

        let tokenData = await hero.getTokenInfo(tokenId);

        // console.log(tokenData.createdBy.toString());
        // console.log(window.ic.plug.sessionManager.sessionData.principalId);

        //await requestTransfer(tokenData.createdBy.toString(), Number(tokenData.price) * 10000);
        //await requestTransfer(tokenData.createdBy.toString(), Number(tokenData.price) * Config.MOTOKO.PRICE_E8S);
        
        const res = await hero.mintCloneNFT(tokenId, randomStr(5));

        return res;
    },
    checkinTicket: async(ticketCode) => {
        console.log("VERIFYING...");
        let hero = await actor;

        let ticketId = ticketCode.split("#")[0];
        let principalId = Principal.fromText(ticketCode.split("#")[1]);

        return await hero.checkinTicket(ticketId, principalId);
    }
}