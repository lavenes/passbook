import React from 'react';
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useNavigationType, useParams } from 'react-router-dom';
import { AppBar, View, Title, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ListView } from '@components';
import Screens from '@screens';

import "./styles.scss";

export const ProductCategoryList = ({ title, id }) => {
    let { productId } = useParams();

    return (
        <>
            {/* PRODUCT INFORMATION */}
            <AnimatePresence>
                {productId && <Screens.Product.Information id={productId}/>}
            </AnimatePresence>

            <View headerPadding>
                <AppBar.AppBar 
                    leading={
                        <AppBar.ActionBack />
                    }
                    title={"NFT Moi Nhat"}
                    fixed
                />

                <Title
                    subtitle="Bạn tìm sản phẩm mới?"
                    title="NFT Mới Nhất"
                />

                <FeatureCard to="/products/categories/a/a" id={"a"}/>

                <ListView.List
                    items={[
                        <ListView.ListTile
                            leading={
                                <ListView.ListTileImage id="f" />
                            }
                            title="NFT 1 Title" 
                            subtitle="NFT 1"
                            to="/products/categories/a/f"
                            id="f"
                            key={"p-f"}
                        />,
                        <ListView.ListTile
                            leading={
                                <ListView.ListTileImage id="g" />
                            }
                            title="NFT 1"
                            subtitle="NFT 1"
                            to="/products/categories/a/g"
                            id="g"
                            key={"p-g"}
                        />,
                        <ListView.ListTile
                            leading={
                                <ListView.ListTileImage id="h" />
                            }
                            title="NFT 1"
                            subtitle="NFT 1"
                            to="/products/categories/a/h"
                            id="h"
                            key={"p-h"}
                        />,
                    ]}
                />
            </View>
        </>
    )
}