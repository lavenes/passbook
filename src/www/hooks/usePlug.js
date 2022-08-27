import { useState } from 'react';
import { Principal } from '@dfinity/principal';
import { superheroes, canisterId, idlFactory } from '@declarations';

export default function usePlug() {
    const connect = async() => {
        const whitelist = [canisterId];
        const host = 'http://192.168.91.69:8080';
  
        try {
            console.log(window.ic.plug);
            const connected = await window.ic.plug.isConnected();
            if(!connected) await window.ic.plug.requestConnect({
                whitelist,
                host,
                timeout: 50000
            });
        } catch (e) {
            alert(e);
        }
    }

    const isConnected = async() => {
        return await window.ic.plug.isConnected();;
    }

    const principal = window.ic.plug.sessionManager.sessionData?.principalId;

    const accountId = async() => {
        return window.ic.plug.sessionManager.sessionData.accountId;
    }

    const getBalance = async () => {
        let balance = await window?.ic?.plug?.requestBalance();
        balance = balance?.filter(e => e.symbol === "ICP")[0].amount;
        
        return balance;
    }

    const actor = (async() => {
        return await window.ic.plug.createActor({
            canisterId: canisterId,
            interfaceFactory: idlFactory,
        })
    })();

    const agent = window.ic.plug.sessionManager.sessionData?.agent;

    const requestTransfer = async (to, amount) => {
        return await window.ic.plug.requestTransfer({
            to,
            amount,
            fee: 0,
            memo: '123451231231',
        })
    }

    return {
        connect,
        isConnected,
        principal,
        accountId,
        getBalance,
        actor,
        agent,
        requestTransfer
    }
}