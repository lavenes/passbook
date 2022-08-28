import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard, Button, Back } from '@components'
import { Link }  from "react-router-dom";

export const Notifications = ({ match, navigation }) => {

    const notifications = [
        {
            id: 1,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/b6ed8c16-cfe5-4c28-a23b-8bef0715972e/original.png?d=sm-cover",
            decriptions: "Bạn đã được nhận 1 vé xem phim từ Min Kiên"
        },
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
                                    <Link to={`/notifications/${item.id}`}>
                                        <div key={item.id} style={{position: "relative"}}>
                                            <img src={item.image} style={{width: "20%", borderRadius: "10px" }}/>
                                            <label style={{position: "absolute", top: "10px", left: "23%"}}>{item.decriptions}</label>
                                        </div>
                                    </Link>
                                )
                            }
                        )}
                    />
                </ScrollView>
            </View>
        </>
    )
}  