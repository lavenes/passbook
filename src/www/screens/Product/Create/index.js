import React, { useState, useEffect } from 'react';
import { TextInput, View, Title, Button, TextArea } from '@components';
import { Config } from '@config';
import { usePlug } from '@hooks';
import API from '@api';

import "./styles.scss";

export const NFTCreateScreen = () => {
    const { principal } = usePlug();

    const [imagePreview, setImagePreview] = useState(null);
    const [imageHash, setImageHash] = useState(null);

    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    const handleUploadImage = async (e) => {
        //*Image Upload
        let file = e.target.files[0];
        let imageUrlData = URL.createObjectURL(file);

        setImagePreview(imageUrlData);

        let { IpfsHash } = await API.IPFS.uploadFile(file);

        setImageHash(IpfsHash);
    }

    const handleSubmit = async () => {
        await API.NFT.mint(
            name,
            imageHash,
            place,
            date,
            time,
            price,
            description,
            principal,
            principal
        );

        alert("DONE !!!");
    }

    return(
        <View>
            <Title
                title="Create NFT"
            />

            <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${ imagePreview })` }}>
                <input type="file" id="image-upload" className="nft-create-screen__image-upload__image-upload-input" onChange={ handleUploadImage }/>
                <label className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">Upload image</label>
            </div>

            <TextInput onChange={e => setName(e.target.value)} placeholder="Name"/>

            <TextInput onChange={e => setPlace(e.target.value)} placeholder="Place"/>

            <TextInput onChange={e => setDate(e.target.value)} placeholder="Date"/>

            <TextInput onChange={e => setTime(e.target.value)} placeholder="Time"/>

            <TextInput onChange={e => setPrice(e.target.value)} placeholder="Price"/>

            <TextArea  onChange={e => setDescription(e.target.value)} placeholder="Description"/>

            <Button style={{ marginTop: 32 }} onClick={ handleSubmit }>Save</Button>
        </View>
    )
}