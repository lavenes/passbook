import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard, Button } from '@components';

export const Permission = ({ match, navigation }) => {

    const users = [
        {
            id: 1,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "yasuo",
            permission: "pro"
        },
        {
            id: 2,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/50e23920-bfbb-4404-b5c1-0e3279b0010b/original.png?d=sm-cover",
            name: "yi",
            permission: "nood"
        },
        {
            id: 3,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "vi",
            permission: "pro"
        },
        {
            id: 4,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "garen",
            permission: "nood"
        },
        {
            id: 5,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "darius",
            permission: "pro"
        },
        {
            id: 6,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "kayle",
            permission: "pro"
        },
        {
            id: 7,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "pyke",
            permission: "pro"
        },
        {
            id: 8,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "vi",
            permission: "pro"
        },
        {
            id: 9,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "garen",
            permission: "nood"
        },
        {
            id: 10,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "darius",
            permission: "pro"
        },
        {
            id: 11,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "kayle",
            permission: "pro"
        },
        {
            id: 12,
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "pyke",
            permission: "pro"
        }
    ];

    // const Item = ({item, onClick}) => {
    //     return (
    //         <div style={{ dispaly: "flex", flexDirection: "column" }} onClick={onClick}>  
    //             <div style={{ width: 170, height: 170, backgroundColor: "#CCC", margin: 4 , borderRadius: "10px"}}>
    //                 <img src={item.image} style={{ width: "100%", height: "100%" , borderRadius: "10px"}}/>
    //             </div>
    //             <div>
    //                 <h4 style={{ margin: "5px" }}>{item.name}</h4>
    //                 <h4 style={{ margin: "5px" }}>{item.permission}</h4>
    //             </div>
    //         </div>
    //     )
    // }

    // style, onClick, id, to="#", title, overlay, image
    const array = users.reduce((result, user) => {
        const Item = <UserCard overlay title={user.name} key={user.id} to={`/user-detail/${user.id}`} permission={user.permission} image={user.image} style={{ marginTop: 0, marginRight: 0, width: 160 }}/>
        return result.push(Item) && result;
    }, []);

    return (
       <>   
            <div style={{marginLeft: "10px"}}>
                <Title
                    subtitle=""
                    title="PERMISSION"
                />
            </div>

            <ScrollView style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}} horizontal>
                

                {/* <GridView
                    
                    items={
                        users.map((item, index) => {
                            return <SquareCard 
                                title={item.name} 
                                price={item.permission} 
                                image={item.image} 
                                to={"/"}
                        />
                        })}
                /> */}
                <GridView
                    items={array}
                />

            </ScrollView>
            <div style={{marginBottom: "70px", display: "flex", justifyContent: "center"}}>
            <Button style = {{width: "95%"}}  to="/user/add-user">Add</Button>
            </div>
        </>
    )
}  