import React from "react";
import { TextInput, View, Title, Button, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ProductCard, CollectionCard } from '@components';
import "./Notify.scss";

//  <Button style={{marginTop: 32, backgroundColor : "red" }} to="">Create sale events</Button>
const image = "https://d2vi0z68k5oxnr.cloudfront.net/b6ed8c16-cfe5-4c28-a23b-8bef0715972e/original.png?d=sm-cover";

export const Notify = () => {
    return (
        <>
            <View>
                <Title
                    subtitle=""
                    title="Notify"
                />
                <div className="nft-create-screen__image-upload" style={{ backgroundImage: `url(${image})` }}>
                    <input type="file" id="image-upload" className="nft-create-screen__image-upload__image-upload-input" onChange={() => {}} />
                    <label id="image_lb" className="nft-create-screen__image-upload__image-upload-area" htmlFor="image-upload">{!image && 'Upload ảnh'}</label>
                </div>
                <Title
                    subtitle=""
                    title="Vo Minh Vuong"
                    className = "Notify__nameUser"
                />
                <Title
                    subtitle=""
                    title="Ve Xem Ca Nhac"
                    className = "Notify__nameTicket"
                />
                <Title
                    subtitle=""
                    title="Lorem ..."
                    className = "Notify__Describe"
                />
                <Button style={{marginTop: 32, backgroundColor : "red" }} to="">Từ chối</Button>  
                <Button style={{marginTop: 32, backgroundColor : "green" }} to="">Chấp nhận</Button>  
            </View>
        </>
    )
}