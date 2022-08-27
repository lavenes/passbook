import React, { useState, useEffect } from 'react';
import { TextInput, View, Title, Button, TextArea, SelectBox } from '@components';

import "./styles.scss";

export const CreateSaLeEvents = () => {

    return(
        <View>
            <Title
                title="Create sale events"
            />
            <div style={{marginTop: "30px", marginLeft: "10px", fontWeight: 600}}>Ngày bắt đầu</div>
            <TextInput onChange={e => setDate(e.target.value)} placeholder="Date" type="date" />
            <div style={{marginTop: "20px", marginLeft: "10px", fontWeight: 600}}>Ngày kết thúc</div>
            <TextInput onChange={e => setDate(e.target.value)} placeholder="Date" type="date" />
            <SelectBox options={[{ id:1, value: "nft", label: "nft" }, { id:2, value: "nhat", label: "nhat" }]}/>
            <TextInput onChange={e => setPrice(e.target.value)} placeholder="Price sale" type="number"/>
            <TextInput onChange={e => setPrice(e.target.value)} placeholder="Number" type="number"/>
            <Button style={{ marginTop: 32 }}>Save</Button>
        </View>
    )
}