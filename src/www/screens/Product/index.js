import React from 'react';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { TextInput, View, Title, BalanceCard, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ListView, ProductCard, CollectionCard } from '@components';
import Screens from '@screens';
import { IoSearch } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

export const ProductMarket = () => {
    let { itemId } = useParams();
    
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

                <SectionTitle
                    title="Categories nổi bật"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={[
                            <SquareCard overlay title="Art" to="/items/b" id={"bs"} style={{ marginTop: 0, width: 110 }} key={"p-b"}/>,
                            <SquareCard overlay title="Art" to="/items/c" id={"cs"} style={{ marginTop: 0, width: 110 }} key={"p-c"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"p-d"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"p-d"}/>,
                            <SquareCard overlay title="Art" to="/items/d" id={"ds"} style={{ marginTop: 0, width: 110 }} key={"p-d"}/>
                        ]}
                    />
                </ScrollView>

                <SectionTitle
                    title="Chương trình nổi bật"
                />
                <FeatureCard to="/items/as" id={"as"}/>

                <SectionTitle
                    title="Hot Events"
                />
                <ScrollView
                    horizontal
                >
                    <GridView
                        horizontal
                        items={[
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>,
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>,
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>,
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>,
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>
                        ]}
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
                        items={[
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>,
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>,
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>,
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>,
                            <ProductCard title="CryptoPunks" owner="Moodie #1753" price="$1,000"/>
                        ]}
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