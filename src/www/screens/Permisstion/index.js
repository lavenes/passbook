import React, { useState, useEffect } from 'react';
import { View, Title } from '@components';

export const Permisstion = ({ match, navigation }) => {

    return (
        <>
            <View>
                <Title
                    subtitle=""
                    title="PERMISSTION"
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
                                    title={nft?.name}
                                    owner={"OWNER"}
                                    price={nft?.price}
                                    image={nft?.image}
                                    to={`/items/${item.id}`}
                                />
                            }
                            )}
                    />
                </ScrollView>

            </View>
        </>
    )
}