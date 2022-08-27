import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { TextInput, View, Title, Button, FeatureCard, SectionTitle, Modal, SquareCard, GridView, ScrollView, ProductCard, CollectionCard } from '@components';
import API from "@api";
import { usePlug } from '@hooks';
import { Back } from "@components";

export const SwapNFT = () => {
    const { pricipalId } = useParams();

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

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <View style={{ position: "relative", margin: 0 }}>
            {showModal && 
            <Modal>
                <div style={{ width: "80%", minHeight: 300, backgroundColor: "#FFF", borderRadius: 6 }}>
                    {ticketOfUser.map((ticket, index) => {
                        return (
                            <div style={{ width: "90%", height: 70, borderRadius: 6, borderStyle: "solid" }}></div>
                        )
                    })}
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
                            toggleModal();
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
                            toggleModal();
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