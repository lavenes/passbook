import React, { useEffect, useState } from 'react';
import { View, Ticket, ActionsGroup, CreatorCard, PriceTitle, SectionDivider, Button, SectionTitle, InformationGroup } from '@components';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import * as Icon from 'react-icons/io5';
import API from '@api';

import "./styles.scss";

export const ItemInformation = ({ title, id }) => {
    const [itemData, setItemData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //*Fetch NFTs
        let nft = await API.NFT.get(id);

        console.log(nft)

        setItemData(nft);
    }

    const ticketMeta = itemData?.data;

    return (
        <View className="item-information-screen" overlay layoutId={`card-container-${id}`} style={{backgroundColor: '#f5f5f5'}}>
            <motion.div className="card-content" style={{width: '100%'}} animate>
                <motion.div
                    className="card-image-container"
                    layoutId={`card-image-container-${id}`}
                    style={{
                        backgroundImage: `url(${ticketMeta?.image})`
                    }}
                >
                </motion.div>
                <motion.div
                    className="title-container"
                    layoutId={`title-container-${id}`}
                >
                    <span className="category"></span>
                    <h2>Meebit #15326</h2>
                </motion.div>
                <motion.div className="content-container" animate>
                    <motion.span className="title">{ ticketMeta?.name }</motion.span>
                    <PriceTitle price={ ticketMeta?.price } currency="ICP" />
                    <CreatorCard name={ ticketMeta?.owner }/>
                    <ActionsGroup.Group>
                        <ActionsGroup.Button name="Send" icon={<Icon.IoSendOutline/>}/>
                        <ActionsGroup.Button name="Save" icon={<Icon.IoBookmarkOutline/>}/>
                        <ActionsGroup.Button name="Star" icon={<Icon.IoStarOutline/>}/>
                        <ActionsGroup.Button name="Share" icon={<Icon.IoShareOutline/>}/>
                    </ActionsGroup.Group>
                    <SectionDivider/>

                    <Button>Place a order</Button>

                    <SectionTitle title="Description" style={{ marginTop: 40 }}/>

                    <InformationGroup.Group>
                        {
                            ticketMeta?.description?.split("\n").map((item, index) => {
                                let title = item.split(":")[0];
                                let value = item.split(":")[1];

                                return <InformationGroup.Item title={ title } value={ value } key={`information-group-item-${index}`}/>
                            })
                        }
                    </InformationGroup.Group>

                    <Ticket
                        title={ ticketMeta?.name }
                        description={ ticketMeta?.description }
                        place={ ticketMeta?.place }
                        date={ ticketMeta?.date }
                        time={ ticketMeta?.time }
                        price={ ticketMeta?.price }
                        section={ ticketMeta?.section }
                        seat={ ticketMeta?.seat }
                        order={ ticketMeta?.order }
                    />
                </motion.div>
            </motion.div>
        </View>
    )
}