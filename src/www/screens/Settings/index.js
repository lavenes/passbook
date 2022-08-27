import React, { useEffect, useState } from 'react';
import { View, SelectBox, TextInput, Button, TextArea } from '@components';
import { usePlug } from '@hooks';
import { Link } from 'react-router-dom';

import "./styles.scss";

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
        <View className="setting-view">
          <div className="setting-view__user-info-container">
              <div className="setting-view__user-info-container__background">

              </div>
              <div className="setting-view__user-info-container__user-info">
                  <div className="setting-view__user-info-container__user-info__avatar"></div>
              </div>
          </div>

          <TextInput placeholder="Họ tên"/>

          <TextInput placeholder="Email"/>

          <TextArea  placeholder="Bio"/>
          <Button style={{ marginTop: 32 }} onClick={connect}>Connect Plug</Button>
          <Button style={{ marginTop: 32 }}>Lưu</Button>
          <Button style={{ marginTop: 32 }} to={"/permisstion"}>Quản lý phân quyền</Button>
        </View>
    )
}