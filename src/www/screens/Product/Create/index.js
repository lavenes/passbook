import React, { useState, useEffect } from 'react';
import { TextInput, View, Title, Button, TextArea, SelectBox } from '@components';
import { Config } from '@config';
import { usePlug } from '@hooks';
import API from '@api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import "./styles.scss";

export const NFTCreateScreen = () => {
    const { principal } = usePlug();
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState([]);

    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [gifts, setGifts] = useState([]);
    const [type, setType] = useState(Config.VARIABLES.TICKET_TYPES[0].value);
    const [category, setCategory] = useState(Config.VARIABLES.TICKET_CATEGORIES[0].value);
    const [details, setDetails] = useState("");
    const [NFTs, setNFTs] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        //*Fetch NFTs
        const NFTs = await API.NFT.getCreatedNFTs();
        
        setNFTs(NFTs);
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

    const handleSubmit = async () => {
        await API.NFT.mint(
            name,
            imageUrl,
            place,
            date,
            time,
            price,
            description,
            gifts,
            details,
            type,
            category,
        );
        
        Swal.fire(
            'Tạo thành công!',
            '',
            'success'
        ).then(e => {
            navigate(-1);
        });
    }

    const handleSelectGift = async(id) => {
        let giftData = NFTs.find(item => item.id == id);

        giftData = {
            id: giftData.id,
            name: giftData.name,
            description: giftData.description,
            price: giftData.price,
            createdBy: giftData.createdBy,
            image: giftData.imageBuffer
        }

        setGifts([giftData]);
    }

    return(
        <View>
            <Title
                title="Create NFT"
            />

            <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${ imagePreview })` }}>
                <input type="file" id="image-upload" className="nft-create-screen__image-upload__image-upload-input" onChange={handleUploadImage}/>
                <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{ !imagePreview && 'Upload image' }</label>
            </div>
            
            
            <SelectBox onChange={e => setType(e.target.value)} options={Config.VARIABLES.TICKET_TYPES}/>

            <SelectBox onChange={e => setCategory(e.target.value)} options={Config.VARIABLES.TICKET_CATEGORIES}/>

            <TextInput onChange={e => setName(e.target.value)} placeholder="Name"/>

            { type == "ticket" && <TextInput onChange={e => setPlace(e.target.value)} placeholder="Place"/> }

            { type == "ticket" && <TextInput onChange={e => setDate(e.target.value)} placeholder="Date" type="date"/> }

            { type == "ticket" && <TextInput onChange={e => setTime(e.target.value)} placeholder="Time" type="time"/> }

            <TextInput onChange={e => setPrice(e.target.value)} placeholder="Price" type="number"/>

            <SelectBox onChange={e => handleSelectGift(e.target.value)} placeholder="Gift" options={NFTs.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            })}/>

            <TextArea  onChange={e => setDescription(e.target.value)} placeholder="Description"/>

            <TextArea  onChange={e => setDetails(e.target.value)} placeholder="Details"/>

            {isLoading ? <Button style={{ marginTop: 32 }} onClick={ handleSubmit }>Loading ...</Button> : <Button style={{ marginTop: 32 }} onClick={ handleSubmit }>Save</Button>}
        </View>
    )
}