import React, { useState, useEffect } from 'react';
import { TextInput, View, Title, Button, TextArea } from '@components';
import { Config } from '@config';
import { usePlug } from '@hooks';
import { Principal } from '@dfinity/principal';
import API from '@api';

import "./styles.scss";

export const NFTCreateScreen = () => {
    const { principal } = usePlug();

    const [imagePreview, setImagePreview] = useState(null);
    const [imageBuffer, setImageBuffer] = useState([]);

    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [gifts, setGifts] = useState([]);
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [details, setDetails] = useState("");

    const handleUploadImage = async (e) => {
        //*Image Upload
        let file = e.target.files[0];
        let fileBlob = URL.createObjectURL(file);
        let imageBuffer = [...new Uint8Array(await file.arrayBuffer())];

        setImagePreview(fileBlob);
        setImageBuffer(imageBuffer);
    }

    const handleSubmit = async () => {
        await API.NFT.mint(
            name,
            Principal.anonymous(),
            imageBuffer,
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

            <TextInput onChange={e => setDate(e.target.value)} placeholder="Date" type="date"/>

            <TextInput onChange={e => setTime(e.target.value)} placeholder="Time" type="time"/>

            <TextInput onChange={e => setPrice(e.target.value)} placeholder="Price" type="number"/>

            <TextInput placeholder="Gifts"/>

            <TextInput onChange={e => setType(e.target.value)} placeholder="Type"/>

            <TextInput onChange={e => setCategory(e.target.value)} placeholder="Category"/>

            <TextArea  onChange={e => setDescription(e.target.value)} placeholder="Description"/>

            <TextArea  onChange={e => setDetails(e.target.value)} placeholder="Details"/>

            <Button style={{ marginTop: 32 }} onClick={ handleSubmit }>Save</Button>
        </View>
    )
}