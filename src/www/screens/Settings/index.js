import React, { useEffect } from 'react';
import { View } from '@components';
import { superheroes, canisterId, idlFactory, createActor } from '@declarations';

export const SettingsScreen = () => {

    useEffect(() => {
      fetch();
    }, []);

    const fetch = async() => {
      let a = await superheroes.readAccount();

      console.log(a);
    }

    const handleConnect = async () => {
      const whitelist = [canisterId];
      const host = 'http://localhost:8080';

      try {
        const publicKey = await window.ic.plug.requestConnect({
          whitelist,
          host,
          timeout: 50000
        });

        console.log(`The connected user's public key is:`, publicKey);
      } catch (e) {
        alert(e);
      }
    }

    const addUser = async() => {
      const NNSUiActor = await window.ic.plug.createActor({
        canisterId: canisterId,
        interfaceFactory: idlFactory,
      });

      const a = await NNSUiActor.createAccount("David", "Tran", 0, "20-01-2003", "123451231", "Ben Nghe");

      console.log(a);
    }

    return(
        <View>
            <button onClick={handleConnect}>Connect Handle</button>
            <button onClick={addUser}>Add User</button>
        </View>
    )
}