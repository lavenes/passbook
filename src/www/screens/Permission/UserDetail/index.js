import React from "react";
import { useParams } from "react-router-dom"
import {  UserCardDetail } from '@components';

export const UserDetail = () => {
    const { userId } = useParams();

    const user = {
        id: 1,
        image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
        name: "yasuo",
        permission: "pro"
    };


    // style, onClick, id, to="#", title, overlay, image, permission
    return (
        <>
            <UserCardDetail 
                overlay 
                title={user.name} 
                key={user.id} 
                to={`/user-detail/${user.id}`} 
                permission={user.permission} 
                image={user.image} 
                style={{ 
                    width: "100%",
                }}/>
        </>
    )
}