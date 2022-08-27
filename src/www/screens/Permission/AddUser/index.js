import React from "react";
import { View, Title, ScrollView, GridView, UserCard, Button,TextInput } from '@components';

export const AddUser = () => {
    //     var firstName: Text;
    //     var lastName: Text;
    //     var sex: Nat;
    //     var dateOfBirth: Text;
    //     var phone: Text;
    //     var liveIn: Text;
    return (
        <>
        <Title
            subtitle=""
            title="add user"
        >
        </Title>
        <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${ imagePreview })` }}>
                <input type="file" id="image-upload" className="nft-create-screen__image-upload__image-upload-input" onChange={handleUploadImage}/>
                <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{ !imagePreview && 'Upload image' }</label>
        </div>
        <div>
            <label>First name:</label>
            <TextInput type="text" className="nft-create__name"></TextInput>
        </div>
        <div>
            <label>Last name:</label>
            <TextInput type="text" className="nft-create__name"></TextInput>
        </div>
        <div>
            <div>
                <label>Male:</label>
                <input type="radio" className="nft-create__name"></input>
            </div>
            <div>
                <label>Female:</label>
                <input type="radio" className="nft-create__name"></input>
            </div>
        </div>
        <TextInput onChange={e => setDate(e.target.value)} placeholder="Date" type="date"/>

        </>
    );
};