import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { TextInput, View, Title, Button, FeatureCard, SectionTitle, Modal, SquareCard, GridView, ScrollView, ProductCard, CollectionCard } from '@components';
import API from "@api";
import { usePlug } from '@hooks';
import { Back } from "@components";

export const SwapNFT = () => {
    const { pricipalId } = useParams();

    const [data, setData] = useState([])

    const [user, setUser] = useState({});
    const [other, setOther] = useState({});
    const [ticketOfUser, setTicketOfUser] = useState([]);
    const [ticketOfOther, setTicketOfOther] = useState([]);

    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState([]);

    const [showModal, setShowModal] = useState(false);
    
    // const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const other = await API.User.get(pricipalId);
        const user = await API.User.get(); 
        const array1 = await API.NFT.getAllOfUser();
        const array2 = await API.NFT.getAllOfUser(pricipalId);

        setOther(other);
        setUser(user);
        setTicketOfUser(array1);
        setTicketOfOther(array2);
    }

    const handleUploadImage = async (e) => {
        //*Image Upload
        let file = e.target.files[0];
        let fileBlob = URL.createObjectURL(file);
        let imageBuffer = [...new Uint8Array(await file.arrayBuffer())];

        setImagePreview(fileBlob);

        let uploadRes = await API.IPFS.uploadImage(file);

        setImageUrl(uploadRes);
    }


    const toggleModal = (value) => {
        setShowModal(!showModal);

        if (value === 0) {
            setData(ticketOfUser);
        } else {
            setData(ticketOfOther);
        }
    }

    const handleClick = (ticket) => {
        console.log(ticket);
    }

    return (
        <View style={{ position: "relative", margin: 0 }}>
            {showModal && 
            <Modal>
                <div style={{ width: "80%", height: 300, backgroundColor: "#FFF", borderRadius: 6, padding: 20, overflow: "hidden" }}>
                    <Title title="Danh sách vé" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}/>
                    <ScrollView>
                        {data.map((ticket, index) => {
                            return (
                                // <div style={{ marginLeft: "auto", marginTop: 4, marginRight: "auto", width: "90%", height: 40, borderRadius: 6, borderStyle: "solid", borderWidth: 0.3, borderColor: "#CCC" }}>
                                // </div>
                                <SquareCard 
                                    onClick={() => handleClick(ticket)}
                                    style={{ marginLeft: "auto", marginRight: "auto", marginTop: 12 }}
                                    title={ ticket?.name } 
                                    owner={ "OWNER" } 
                                    price={ ticket?.price } 
                                    image={ ticket?.image } 
                                    to="#"
                                />
                            )
                        })}
                    </ScrollView>
                </div>
            </Modal>}
            <Back to={`/users/${pricipalId}`}/>
            <div style={{ display: "flex", alignItems: "center", marginTop: 12, marginBottom: 12 }}>
                <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${imagePreview})`, flex: 1, margin: 4 }}>
                    <input 
                        type="file" 
                        id="image-upload" 
                        className="nft-create-screen__image-upload__image-upload-input" 
                        onClick={(e) => {
                            e.preventDefault(); 
                            toggleModal(0);
                        }} />
                    <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{!imagePreview && 'Upload ảnh'}</label>
                </div>

                <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${imagePreview})`, flex: 1, margin: 4 }}>
                    <input 
                        type="file" 
                        id="image-upload" 
                        className="nft-create-screen__image-upload__image-upload-input" 
                        onClick={(e) => {
                            e.preventDefault(); 
                            console.log("Chose");
                            toggleModal(1);
                        }} />
                    <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{!imagePreview && 'Upload ảnh'}</label>
                </div>
            </div>
            <div style={{ marginBottom: "70px", display: "flex", justifyContent: "center" }}>
                <Button style={{ width: "100%"}} to="/user/add-user">SWAP NFT</Button>
            </div>
        </View>
    )
} 