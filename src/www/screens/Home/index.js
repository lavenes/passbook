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
    const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //*Fetch balance
        let balance = await getBalance();
        setBalance(balance);
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

                <FeatureCard to="/tickets/a" id={"a"}/>

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
                        items={[
                            <SquareCard to="/tickets/b" id={"b"} style={{ marginTop: 0, width: 160 }} key={"p-b"}/>,
                            <SquareCard to="/tickets/c" id={"c"} style={{ marginTop: 0, width: 160 }} key={"p-c"}/>,
                            <SquareCard to="/tickets/d" id={"d"} style={{ marginTop: 0, width: 160 }} key={"p-d"}/>
                        ]}
                    />
                </ScrollView>

                <SectionTitle
                    title="NFTs"
                    readMoreUrl="/products/categories/A"
                    readMoreTitle="Xem thêm" 
                />

                <ListView.List
                    items={[
                        <ListView.ListTile
                            leading={
                                <ListView.ListTileImage id="f" />
                            }
                            title="NFT 1 Title" 
                            subtitle="NFT 1"
                            to="/tickets/f"
                            id="f"
                            key={"p-f"}
                        />,
                        <ListView.ListTile
                            leading={
                                <ListView.ListTileImage id="g" />
                            }
                            title="NFT 1"
                            subtitle="NFT 1"
                            to="/tickets/g"
                            id="g"
                            key={"p-g"}
                        />,
                        <ListView.ListTile
                            leading={
                                <ListView.ListTileImage id="h" />
                            }
                            title="NFT 1"
                            subtitle="NFT 1"
                            to="/tickets/h"
                            id="h"
                            key={"p-h"}
                        />,
                    ]}
                />
            </View>
        </>
    )
}