/*
 * COPYRIGHT (c) 2022 Lavenes.
 * COPYRIGHT (c) 2022 Nhats Devil.
 *
 * This document is the property of Lavenes.
 * It is considered confidential and proprietary.
 *
 * This document may not be reproduced or transmitted in any form,
 * in whole or in part, without the express written permission of
 * Lavenes.
 */


import Time "mo:base/Time";
import TrieSet "mo:base/TrieSet";

module {
    //*=======================================*//
    //*                NFT TYPE               *//
    //*=======================================*//
    public type TokenCategory = {
        id: Text;
        name: Text;
        owner: Principal;
    };

    public type TokenGiftInfo = {
        id: Text;
        name: Text;
        description: Text;
        price: Nat;
        createdBy: Principal;
        image: [Nat8];
    };

    public type TokenInfo = {
        var id: Text;
        var createdBy: Principal;
        var date: Text;
        var description: Text;
        var details: Text;
        var gifts: [TokenGiftInfo];
        var image: [Nat8];
        var name: Text;
        var owner: Principal;
        var place: Text;
        var price: Nat;
        var time: Text;
        var nftType: Text; //item | ticket
        var category: Text; //TokenCategory.id
        var dateCreated: Text;
        var checkin: Bool;
    };

    public type TokenInfoExt = {
        id: Text;
        createdBy: Principal;
        date: Text;
        description: Text;
        details: Text;
        gifts: [TokenGiftInfo];
        image: [Nat8];
        name: Text;
        owner: Principal;
        place: Text;
        price: Nat;
        time: Text;
        nftType: Text; //item | ticket
        category: Text; //TokenCategory.id
        dateCreated: Text;
    };
    
    //*=======================================*//
    //*               USER TYPE               *//
    //*=======================================*//

    public type UserInfo = {
        var firstName: Text;
        var lastName: Text;
        var sex: Nat;
        var dateOfBirth: Text;
        var phone: Text;
        var liveIn: Text;
        var id: Principal;
    };

    public type UserInfoExt = {
        firstName: Text;
        lastName: Text;
        sex: Nat;
        dateOfBirth: Text;
        phone: Text;
        liveIn: Text;
        id: Principal;
    };
};