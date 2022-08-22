import React, { useState, useEffect } from 'react';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useNavigationType, useParams } from 'react-router-dom';
import { IoScan } from 'react-icons/io5';
import { AppBar, View, Title, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ListView, BalanceCard } from '@components';
import Screens from '@screens';
import { usePlug } from '@hooks';
import API from '@api';

export const HomeScreen = ({ match, navigation }) => {
    let { ticketId } = useParams();
    const [ balance, setBalance ] = useState(0);
    const [ ownedTickets, setOwnedTickets ] = useState([]);
    const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //*Fetch balance
        let balance = await getBalance();
        setBalance(balance);

        let ownedNFT = await API.NFT.getOwned();

        setOwnedTickets(ownedNFT);
    }

    return (
        <>
            {/* PRODUCT INFORMATION */}
            <AnimatePresence>
                {ticketId && <Screens.Product.Information.Ticket id={ticketId}/>}
            </AnimatePresence>

            {/* HOME SCREEN */}
            <View>
                <AppBar.AppBar 
                    leading={
                        <AppBar.ActionButton icon={<IoScan/>} />
                    }
                    actions={
                        <AppBar.AvatarImage />
                    }
                />
                <BalanceCard balance={balance}/>

                <Title
                    subtitle="Xin chào Quang Nhat"
                    title="Sự kiện nổi bật"
                />

                <FeatureCard to={`/items/${ownedTickets[0]?.id}`} id={`${ownedTickets[0]?.id}`} image={ ownedTickets[0]?.image }/>

                <SectionTitle
                    title="Sự kiện sắp diễn ra"
                    readMoreUrl="/products/categories/A"
                    readMoreTitle="Xem thêm"
                />

                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={
                            ownedTickets.map((item, index) => {
                                let nft = item;

                                return <SquareCard 
                                    title={ nft?.name } 
                                    owner={ "OWNER" } 
                                    price={ nft?.price } 
                                    image={ nft?.image } 
                                    to={`/items/${item.id}`}
                                />
                            }
                        )}
                    />
                </ScrollView>

                <SectionTitle
                    title="NFTs"
                    readMoreUrl="/products/categories/A"
                    readMoreTitle="Xem thêm" 
                />

                <ListView.List
                    items={
                        ownedTickets.map((item, index) => {
                            let nft = item;

                            return <ListView.ListTile
                                leading={
                                    <ListView.ListTileImage id={`${nft?.id}`} src={ nft?.image }/>
                                }
                                title={ nft?.name }
                                subtitle={ nft?.description }
                                to={`/items/${nft?.id}`}
                                id={`${nft?.id}`}
                            />
                        })
                    }
                />
            </View>
        </>
    )
}