import React, { useState, useEffect } from 'react';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { TextInput, View, Title, Button, FeatureCard, LoadingOverlay, SectionTitle, SquareCard, GridView, ScrollView, ListView, ProductCard, CollectionCard } from '@components';
import Screens from '@screens';
import { IoSearch } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import API from '@api';

export const ProductMarket = () => {
    let { itemId } = useParams();

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //*Fetch NFTs
        let nfts = await API.NFT.getAll();

        setTickets(nfts);
    }
    
    return (
        <>
            {/* PRODUCT INFORMATION */}
            <AnimatePresence>
                {itemId && <Screens.Product.Information.Item id={itemId}/>}
            </AnimatePresence>

            <View>
                <Title
                    subtitle="Shop now !!!"
                    title="Marketplace"
                />

                <TextInput placeholder="Search" icon={<IoSearch/>}/>

                <Button style={{marginTop: 32}} to="/product/create">Create</Button>

                <Button style={{marginTop: 32}} onClick={API.NFT.clearAll}>Clear All NFT</Button>

                <SectionTitle
                    title="Categories nổi bật"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={[
                            <SquareCard overlay title="Art" to="/items/b" id={"bs"} style={{ marginTop: 0, width: 110 }} key={"sp-b"}/>,
                            <SquareCard overlay title="Art" to="/items/c" id={"cs"} style={{ marginTop: 0, width: 110 }} key={"sp-c"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"sp-ds"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"sp-d"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"sp-dd"}/>
                        ]}
                    />
                </ScrollView>

                <SectionTitle
                    title="Chương trình nổi bật"
                />

                <FeatureCard to="/items/as" image={tickets[0]?.data?.image}/>

                <SectionTitle
                    title="Hot Events"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={tickets.map((item, index) => {
                            let nft = item.data;

                            return <ProductCard 
                                title={ nft?.name } 
                                owner={ nft?.owner } 
                                price={ nft?.price } 
                                image={ nft?.image } 
                                to={`/items/${item.index}`}
                            />
                        })}
                    />
                </ScrollView>

                <SectionTitle
                    title="Hot Event Highlights"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={tickets.map((item, index) => {
                            let nft = item.data;

                            return <ProductCard 
                                title={ nft?.name } 
                                owner={ nft?.owner } 
                                price={ nft?.price } 
                                image={ nft?.image } 
                                to={`/items/${item.index}`}
                            />
                        })}
                    />
                </ScrollView>

                <SectionTitle
                    title="Collections"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={[
                            <CollectionCard title="CryptoPunks" owner="Moodie #1753"/>,
                            <CollectionCard title="CryptoPunks" owner="Moodie #1753"/>,
                            <CollectionCard title="CryptoPunks" owner="Moodie #1753"/>,
                            <CollectionCard title="CryptoPunks" owner="Moodie #1753"/>,
                            <CollectionCard title="CryptoPunks" owner="Moodie #1753"/>
                        ]}
                    />
                </ScrollView>
            </View>
        </>
    );
}