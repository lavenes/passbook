import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner'
import { AppBar, View, Title, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ListView, BalanceCard } from '@components';
import API from '@api';

import "./styles.scss";

export const QRScanScreen = () => {
    const [scanSuccess, setScanSuccess] = useState(false);
    const [scanMsg, setScanMsg] = useState(null);

    const handleScan = async (data) => {
        if(data?.text) {
            setScanSuccess(true);

            try {
                let ticketVerify = await API.NFT.verifyTicket(data.text);

                console.log(ticketVerify);

                setScanMsg("Vé hợp lệ");
            }catch(e) {
                setScanMsg(e);
            }
        };
    }

    const handleErr = (err) => {
        console.log(err);
    }

    return (
        <View>
            <h1>Ticket Scan</h1>
            
            {
                !scanSuccess && (
                    <QrReader
                        delay={ 100 }
                        style={{
                            width: '100%',
                        }}
                        onError={ handleErr }
                        onScan={ handleScan }
                    />
                )
            }

            {
                scanMsg && (
                    <div>
                        <span>{ scanMsg }</span>
                    </div>
                )
            }
        </View>
    )
}