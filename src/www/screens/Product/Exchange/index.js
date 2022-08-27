import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextInput, View, Title, Button, TextArea, SelectBox } from '@components';
import API from '@api';

export const Exchange = () => {
    const { ticketId } = useParams();

    console.log(ticketId);
    const [ticketId, setIdTicket] = useState("");
    // const [principalIdUserSend, setPrincipalIdUserSend] = useState("");
    const [principalIdUserRecieve, setPrincipalIdUserRecieve] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const id = await API.NFT.get(ticketId);
        setIdTicket(id);
    }


    const handleExchange = () => {
        // handle
    }

    const image = "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover";

    return (
        <View>
            <Title
                title="Exchange NFT"
            />

            <TextInput onChange={(e) => setPrincipalIdUserRecieve(e.target.value)} placeholder="Enter id to user" type="text"/>

            <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${ image })`, width: '100%', height: 300, marginTop: 12 }}>
                <label id="" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">HELLO</label>
            </div>

            <TextInput onChange={() => {}} placeholder="Price" type="number"/>
            
            <Button style={{ marginTop: 32 }} onClick={handleExchange}>Send</Button>
        </View>
    )
}