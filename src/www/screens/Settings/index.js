import React, { useEffect, useState } from 'react';
import { View, SelectBox, TextInput, Button, TextArea } from '@components';
import { usePlug } from '@hooks';
import API from "@api";
import { Link } from 'react-router-dom';

import "./styles.scss";

export const SettingsScreen = () => {
    const { connect, isConnected, principal, accountId, getBalance, actor } = usePlug();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [liveIn, setLiveIn] = useState("");
    const [sex, setSex] = useState(1);

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

    const handleSubmit = () => {
      console.log({
        firstName,
        lastName,
        date,
        liveIn,
        sex,
      })
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

          <TextInput onChange={(e) => setFirstName(e.target.value)} placeholder="Họ"/>
          <TextInput onChange={(e) => setLastName(e.target.value)} placeholder="Tên"/>
          <TextInput onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" type="number"/>

          <SelectBox onChange={e => setSex(e.target.value)} options={[ { value: "1", label: "Nam" }, { value: "0", label: "Nữ"} ]}/>

          <TextInput onChange={e => setDate(e.target.value)} placeholder="Date" type="date"/>


          <TextArea onChange={(e) => setLiveIn(e.target.value)}  placeholder="Nơi sống"/>

          <Button style={{ marginTop: 32 }} onClick={connect}>Connect Plug</Button>
          <Button onClick={handleSubmit} style={{ marginTop: 32 }}>Lưu</Button>
          <Button style={{ marginTop: 32 }} to={"/permission"}>Permission</Button>
          <Button style={{ marginTop: 32 }} to={"/connect"}>Login nhớ check connect ví</Button>
        </View>
    )
}