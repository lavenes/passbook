import React, { useEffect } from 'react';
import { View } from '@components';
import { usePlug } from '@hooks';

export const SettingsScreen = () => {
    const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();

    useEffect(() => {
      fetch();
    }, []);

    const fetch = async() => {
      let b = await actor;
      let a = await b.readAccount();
      let balance = await getBalance();

      console.log(a);
      console.log(balance);
    }

    const addUser = async() => {
      let b = await actor;
      const a = await b.createAccount("David", "Tran", 0, "20-01-2003", "123451231", "Ben Nghe");

      console.log(a);
    }

    return(
        <View>
            <button onClick={connect}>Connect Handle</button>
            <br/>
            <button onClick={addUser}>Add User</button>
        </View>
    )
}