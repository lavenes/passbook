import React, { useEffect, useState } from 'react';
import { View, Ticket, ActionsGroup, CreatorCard, PriceTitle, SectionDivider, Button, SectionTitle, InformationGroup, TextInput } from '@components';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import * as Icon from 'react-icons/io5';
import API from '@api';
import Swal from 'sweetalert2';

import "./styles.scss";

export const ItemInformation = ({ title, id }) => {
    const [itemData, setItemData] = useState({});
    const [isOwned, setIsOwned] = useState(false);
    const [isTicket, setIsTicket] = useState(false);
    const [qrValue, setQRValue] = useState(null);
    const [amount, setAmount] = useState(1);

    const actions = [
        {
            name: "Send",
            icon:  <Icon.IoSendOutline/>
        },
        {
            name: "Save",
            icon:  <Icon.IoBookmarkOutline/>
        },
        {
            name: "Star",
            icon:  <Icon.IoStarOutline/>
        },
        {
            name: "Share",
            icon:  <Icon.IoShareOutline/>
        },
    ]

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        //*Fetch NFTs
        let nft = await API.NFT.get(id);

        setItemData(nft);
        setIsOwned(nft.owned);
        setIsTicket(nft.nftType === "ticket");

        //*Generate QR Ticket
        if(nft.nftType === "ticket" && nft.owned && ( nft.owner.toString() != nft.createdBy.toString() )) setQRValue(`${nft.id}#${nft.owner}`)
    }

    const handlePurchase = async () => {
        console.log("PURCHASING...");
        await API.NFT.purchase(id, amount).then(e => {
            Swal.fire(
                'Đã mua thành công!',
                'Vé đã nằm trong ví của bạn',
                'success'
            );
        });

        console.log("DONE");
    }


    const ticketMeta = itemData;

    const handleClick = (action) => {
        switch (action.name) {
            case "Send":
                console.log(itemData);
                window.location.href = `#/exchange/${itemData.id}`;
                break;
            default:
                break;
        }
    }


    return (
        <View className="item-information-screen" overlay layoutId={`card-container-${id}`} backdropImage={ ticketMeta?.image } style={{backgroundColor: '#f5f5f5'}}>
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
                    <CreatorCard to={`/users/${ticketMeta?.createdBy}`} name={ "OWNER" }/>
                    <ActionsGroup.Group>
                        {actions.map((action, index) => {
                            return <ActionsGroup.Button key={index} onClick={() => handleClick(action)} name={action.name} icon={action.icon}/>
                        })}

                        {/* <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Send" icon={<Icon.IoSendOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Save" icon={<Icon.IoBookmarkOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Star" icon={<Icon.IoStarOutline/>}/>
                        <ActionsGroup.Button onClick={() => {console.log("Click")}} name="Share" icon={<Icon.IoShareOutline/>}/> */}
                    </ActionsGroup.Group>
                    <SectionDivider/>
                    <h4>Amount</h4>
                    <input defaultValue={1} onChange={e => setAmount(Number(e.target.value))} type="number" style={{width:"9%", height: "30px", borderRadius: "6px", border: "none", paddingLeft: "20px", marginBottom: "20px"}}/>

                    { !isOwned && 
                        <Button onClick={handlePurchase}>Buy</Button> }

                    <SectionTitle title="Description" style={{ marginTop: 40 }}/>

                    <p style={{ margin: 0, marginTop: 16, fontSize: 14}}>{ ticketMeta?.description }</p>

                    <SectionTitle title="Details" style={{ marginTop: 40 }}/>

                    <InformationGroup.Group>
                        {
                            ticketMeta?.details?.split("\n").map((item, index) => {
                                let title = item.split(":")[0];
                                let value = item.split(":")[1];

                                return <InformationGroup.Item 
                                    title={ title } 
                                    value={ value } 
                                    key={`information-group-item-${index}`}
                                />
                            })
                        }
                        {
                            ticketMeta?.gifts?.map((item, index) => {
                                return <InformationGroup.Item 
                                    title= { item.name } 
                                    subtitle={ item.description } 
                                    image={ item.image }
                                    key={`information-group-gift-item-${index}`}
                                />
                            })
                        }
                    </InformationGroup.Group>

                    {
                        !isTicket && (
                            <>
                                <SectionTitle title="Information" style={{ marginTop: 40 }}/>

                                <InformationGroup.Group>
                                    <InformationGroup.Item 
                                        title = "Created At"
                                        value = { ticketMeta?.dateCreated }
                                    />
                                    <InformationGroup.Item 
                                        title = "Token ID"
                                        value = { ticketMeta?.id }
                                    />
                                </InformationGroup.Group>
                            </>
                        )
                    }

                    { isTicket && <Ticket
                        title={ ticketMeta?.name }
                        description={ ticketMeta?.description }
                        place={ ticketMeta?.place }
                        date={ ticketMeta?.date }
                        time={ ticketMeta?.time }
                        price={ ticketMeta?.price }
                        section={ ticketMeta?.section }
                        seat={ ticketMeta?.seat }
                        order={ ticketMeta?.order }
                        qrValue={ qrValue }
                    /> } 
                    <Button style={{ marginTop: 32 }} to={'/checkin'}>Check in</Button>
                    <div
						style={{
							backgroundColor: '#000',
							color: '#FFF',
							borderRadius: 12,
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: 48,
							marginTop: 24,
						}}>
						<Link style={{ color: '#FFF' }} to='/'>
							Cancel
						</Link>
					</div>
                </motion.div>
            </motion.div>
        </View>
    )
}