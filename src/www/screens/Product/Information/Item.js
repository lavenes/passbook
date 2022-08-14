import React from 'react';
import { View, Ticket, ActionsGroup, CreatorCard, PriceTitle, SectionDivider, Button, SectionTitle, InformationGroup } from '@components';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import * as Icon from 'react-icons/io5';

import "./styles.scss";

export const ItemInformation = ({ title, id }) => {
    return (
        <View className="item-information-screen" overlay layoutId={`card-container-${id}`} style={{backgroundColor: '#f5f5f5'}}>
            <motion.div className="card-content" style={{width: '100%'}} animate>
                <motion.div
                    className="card-image-container"
                    layoutId={`card-image-container-${id}`}
                    style={{
                        background: 'gray'
                    }}
                >
                </motion.div>
                <motion.div
                    className="title-container"
                    layoutId={`title-container-${id}`}
                >
                    <span className="category"></span>
                    <h2>{title}</h2>
                </motion.div>
                <motion.div className="content-container" animate>
                    <motion.span className="title">Meebit #15326</motion.span>
                    <PriceTitle price="10.00" currency="ICP" />
                    <CreatorCard name="Nhats Devil"/>
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
                        <InformationGroup.Item title="Panda NFT" image="A" subtitle="NFT Gift"/>
                        <InformationGroup.Item title="Description" value="This is a description"/>
                        <InformationGroup.Item title="Description" value="This is a description"/>
                    </InformationGroup.Group>

                    <Ticket/>
                </motion.div>
            </motion.div>
        </View>
    )
}