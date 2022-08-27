import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard, Button, Back } from '@components';

export const Notifications = ({ match, navigation }) => {

    const notifications = [
        {
            id: 1,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 2,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 3,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 4,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 5,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 6,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 7,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 8,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 9,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 10,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 11,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        },
        {
            id: 12,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            decriptions: "Vương đã đấm vào mặt bạn"
        }
    ];

    return (
       <>   
            <View>
                <Title
                    title = "Notifications"
                />

                <ScrollView 
                    horizontal
                >
                    <GridView
                        itemCount = {1}
                        items={
                            notifications.map((item) => {
                                return (
                                    <div key={item.id} style={{position: "relative"}}>
                                        <img src={item.image} style={{width: "20%", borderRadius: "10px" }}/>
                                        <label style={{position: "absolute", top: "10px", left: "23%"}}>{item.decriptions}</label>
                                    </div>
                                )
                            }
                        )}
                    />
                </ScrollView>
            </View>
        </>
    )
}  