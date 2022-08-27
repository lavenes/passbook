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
import P "mo:base/Prelude";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";


module {
    //*=======================================*//
    //*           DIP721 NFT TYPE             *//
    //*=======================================*//

    public type Dip721NonFungibleToken = {
        logo: LogoResult;
        name: Text;
        symbol: Text;
        maxLimit : Nat16;
    };

    public type ApiError = {
        #Unauthorized;
        #InvalidTokenId;
        #ZeroAddress;
        #Other;
    };

    public type Result<S, E> = {
        #Ok : S;
        #Err : E;
    };

    public type OwnerResult = Result<Principal, ApiError>;
    public type TxReceipt = Result<Nat, ApiError>;
    
    public type TransactionId = Nat;
    public type TokenId = Nat64;

    public type InterfaceId = {
        #Approval;
        #TransactionHistory;
        #Mint;
        #Burn;
        #TransferNotification;
    };

    public type LogoResult = {
        logo_type: Text;
        data: Text;
    };

    public type Nft = {
        owner: Principal;
        id: TokenId;
        metadata: MetadataDesc;
    };

    public type ExtendedMetadataResult = Result<{
        metadata_desc: MetadataDesc;
        token_id: TokenId;
    }, ApiError>;

    public type MetadataResult = Result<MetadataDesc, ApiError>;

    public type MetadataDesc = [MetadataPart];

    public type MetadataPart = {
        purpose: MetadataPurpose;
        key_val_data: [MetadataKeyVal];
        data: Blob;
    };

    public type MetadataPurpose = {
        #Preview;
        #Rendered;
    };
    
    public type MetadataKeyVal = {
        key: Text;
        val: MetadataVal;
    };

    public type MetadataVal = {
        #TextContent : Text;
        #BlobContent : Blob;
        #NatContent : Nat;
        #Nat8Content: Nat8;
        #Nat16Content: Nat16;
        #Nat32Content: Nat32;
        #Nat64Content: Nat64;
    };

    public type MintReceipt = Result<MintReceiptPart, ApiError>;

    public type MintReceiptPart = {
        token_id: TokenId;
        id: Nat;
    };

    //*=======================================*//
    //*           DIP20 TOKEN TYPE            *//
    //*=======================================*//

    /// Update call operations
    public type Operation = {
        #mint;
        #burn;
        #transfer;
        #transferFrom;
        #approve;
    };
    public type TransactionStatus = {
        #succeeded;
        #inprogress;
        #failed;
    };
    /// Update call operation record fields
    public type TxRecord = {
        caller: ?Principal;
        op: Operation;
        index: Nat;
        from: Principal;
        to: Principal;
        amount: Nat;
        fee: Nat;
        timestamp: Time.Time;
        status: TransactionStatus;
    };

    public func unwrap<T>(x : ?T) : T =
        switch x {
            case null { P.unreachable() };
            case (?x_) { x_ };
        };

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
        image: Text;
    };

    public type TokenInfo = {
        var id: Text;
        var createdBy: Principal;
        var date: Text;
        var description: Text;
        var details: Text;
        var gifts: [TokenGiftInfo];
        var image: Text;
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
        image: Text;
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