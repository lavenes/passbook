import React, { useState, useEffect } from 'react';
import { View, Title, ScrollView, GridView, UserCard } from '@components';

export const Permission = ({ match, navigation }) => {

    const users = [
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "yasuo",
            permission: "pro"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/50e23920-bfbb-4404-b5c1-0e3279b0010b/original.png?d=sm-cover",
            name: "yi",
            permission: "nood"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "vi",
            permission: "pro"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "garen",
            permission: "nood"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "darius",
            permission: "pro"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "kayle",
            permission: "pro"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "pyke",
            permission: "pro"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "vi",
            permission: "pro"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "garen",
            permission: "nood"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "darius",
            permission: "pro"
        },
        {
            image: "https://d2vi0z68k5oxnr.cloudfront.net/0fbce336-da96-4e61-a7ae-3872dd01bf93/original.png?d=sm-cover",
            name: "kayle",
            permission: "pro"
        },
        {
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


    const redirectDetailUser = () => {
        console.log("Redirect");
    }

    // style, onClick, id, to="#", title, overlay, image
    const array = users.reduce((result, user) => {
        const Item = <UserCard overlay title={user.name} onClick={redirectDetailUser} permission={user.permission} image={user.image} style={{ marginTop: 0, marginRight: 0, width: 160 }} key={"sp-b"}/>
        return result.push(Item) && result;
    }, [])

    return (
       <>
            <Title
                style = {{marginLeft : "10px"}}
                    subtitle=""
                    title="PERMISSTION"
                />

            <ScrollView style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} horizontal>
                

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
            
        </>
    )
}  