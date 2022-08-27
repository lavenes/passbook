import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import { TextInput, View, Title, Button, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ProductCard, CollectionCard } from '@components';
import API from "@api";
import { usePlug } from '@hooks';
import { Back } from "@components"

export const SwapNFT = () => {
    const { pricipalId } = useParams();
    
    // const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const principalIdOther = window.ic?.plug?.sessionManager?.sessionData?.principalId;

        const other = await API.User.get(pricipalId);
       
        const user = await API.User.get(principalIdOther);

        console.log({
            other,
            
        });
    }

    return (
        <View>
            <Back to={`/users/${pricipalId}`}/>
            <ScrollView style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} horizontal>

            </ScrollView>
            <div style={{ marginBottom: "70px", display: "flex", justifyContent: "center" }}>
                <Button style={{ width: "100%"}} to="/user/add-user">Add</Button>
            </div>
        </View>
    )
} 