import React, { useEffect } from 'react';
import { View } from '@components';
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react"
import { useCanister } from '@connect2ic/react';

export const SettingsScreen = () => {
	  const [superheroes, { loading, error }] = useCanister('superheroes');

    const { isConnected, principal, activeProvider } = useConnect({
        onConnect: () => {
          // Signed in
        },
        onDisconnect: () => {
          // Signed out
        }
    })

    useEffect(() => {
      fetch();
    }, []);

    const fetch = async() => {
      let a = await superheroes.readAccount();

      console.log(a);
    }

    const handleConnect = () => {
      try {
        window.ic.plug.requestConnect();
      }catch(e) {
        alert(e);
      }
    }

    return(
        <View>
            <button onClick={handleConnect}>Connect Handle</button>
            <br/>
            <ConnectButton />
            <ConnectDialog/>
        </View>
    )
}