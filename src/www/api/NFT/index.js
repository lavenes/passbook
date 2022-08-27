import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';
import { Principal } from '@dfinity/principal';

const { actor } = usePlug();

export const NFT = {
    mint: async (name, imageUrl, place, date, time, price, description, gifts, details, type, category, privacy, preorder, supplies) => {
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
            privacy,
            preorder,
            supplies,
            owner: Principal.anonymous(),
            createdBy: Principal.fromText(window.ic?.plug?.sessionManager?.sessionData?.principalId),
            dateCreated: new Date().toISOString()
        }

        console.log(metadata);

        //*Upload
        let hero = await actor;
        
		const res = await hero.mintNFT(metadata);

        console.log(res);

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
        const { principal } = usePlug();
        const id = principalId || principal;
		let res = await hero.getAllTokens();

        res = res.filter(item => {
            if(item.createdBy.toString() == id && item.owner.toString() == id) {
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
    purchase: async(tokenId, supplies) => {
        const { requestTransfer } = usePlug();
        let hero = await actor;

        //let tokenData = await hero.getTokenInfo(tokenId);

        // console.log(tokenData.createdBy.toString());
        // console.log(window.ic.plug.sessionManager.sessionData.principalId);

        //await requestTransfer(tokenData.createdBy.toString(), Number(tokenData.price) * 10000);
        //await requestTransfer(tokenData.createdBy.toString(), Number(tokenData.price) * Config.MOTOKO.PRICE_E8S);
        
        // const res = await hero.mintCloneNFT(tokenId, randomStr(5));

        const res = await hero.purchaseNFT(tokenId, supplies, randomStr(5));

        return res;
    },
    checkinTicket: async(ticketCode) => {
        console.log("VERIFYING...");
        let hero = await actor;

        let ticketId = ticketCode.split("#")[0];
        let principalId = Principal.fromText(ticketCode.split("#")[1]);

        return await hero.checkinTicket(ticketId, principalId);
    },
    checkPreorders: async () => {
        let hero = await actor;
        const { principal } = usePlug();

        //Filter user
        let orders = await hero.getAllTokenPreorders();

        orders = orders.filter(item => {
            return item.owner.toString() === principal;
        });

        let dateNow = `${new Date().toISOString().split("T")[0]}`;
        let hourNow = new Date().getHours();
        let minuteNow = new Date().getMinutes();

        //Fetch token info
        console.log("===== CHECK PRE ORDERS =====");
        console.log(orders);

        for(var item of orders) {
            try {
                let token = await hero.getTokenInfo(item.nftId);
                console.log(token);
                let preorder = token.preorder;
                let endHour = Number(preorder.time.split(":")[0]);
                let endMinute = Number(preorder.time.split(":")[1]);

                console.log(preorder);
                console.log(dateNow);
                console.log(minuteNow);
                console.log(endHour);
                console.log(endMinute);

                if(preorder.end == dateNow && endHour <= hourNow && endMinute <= minuteNow) {
                    for(var i = 1; i <= item.supplies; i++) {
                        await hero.mintCloneNFT(item.nftId, randomStr(5), Principal.fromText(principal));
                    }

                    await hero.removeTokenPreorder(item.id);
                }
            }catch(e) {
                console.log(e);
            };
        }
    }
}