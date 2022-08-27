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


import HashMap "mo:base/HashMap";
import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import TrieSet "mo:base/TrieSet";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Prelude "mo:base/Prelude";
import Buffer "mo:base/Buffer";
import Types "./types";
import Option "mo:base/Option";
import List "mo:base/List";

shared(msg) actor class NFTSale(
    _owner: Principal,
    ) = this {
    private stable var blackhole: Principal = Principal.fromText("aaaaa-aa");

    //*=======================================*//
    //*                NFT API                *//
    //*=======================================*//
    //#region
    type TokenInfo = Types.TokenInfo;
    type TokenInfoExt = Types.TokenInfoExt;
    type TokenCategory = Types.TokenCategory;
    type TokenGiftInfo = Types.TokenGiftInfo;

    private stable var owner_: Principal = _owner;
    private stable var tokensEntries : [(Text, TokenInfo)] = [];
    private var tokens = HashMap.HashMap<Text, TokenInfo>(1, Text.equal, Text.hash);

    //*Priv Info to Ext
    private func _tokenInfotoExt(info: TokenInfo) : TokenInfoExt {
        return {
            id = info.id;
            createdBy = info.createdBy;
            date = info.date;
            description = info.description;
            details = info.details;
            gifts = info.gifts;
            image = info.image;
            name = info.name;
            owner = info.owner;
            place = info.place;
            price = info.price;
            time = info.time;
            nftType = info.nftType; //item | ticket
            category = info.category; //TokenCategory.id
            dateCreated = info.dateCreated;
        };
    };

    //*Create default token
    private func _newToken(caller: Principal) : TokenInfo {
        {
            var id = "";
            var date = "";
            var description = "";
            var details = "";
            var gifts = [];
            var image = "";
            var name = "";
            var price = 0;
            var place = "";
            var time = "";
            var category = "";
            var nftType = "";
            var createdBy = caller;
            var owner = caller;
            var dateCreated = "";
            var checkin = false;
        }
    };

    //*Mintning
    public shared({ caller }) func mintNFT(metadata: TokenInfoExt): async TokenInfoExt {
        // if(msg.caller != owner_) {
        //     return #Err(#Unauthorized);
        // };

        let token = _newToken(caller);
        
        token.id := metadata.id;
        token.date := metadata.date;
        token.description := metadata.description;
        token.details := metadata.details;
        token.gifts := metadata.gifts;
        token.image := metadata.image;
        token.name := metadata.name;
        token.price := metadata.price;
        token.place := metadata.place;
        token.time := metadata.time;
        token.category := metadata.category;
        token.nftType := metadata.nftType;
        token.createdBy := metadata.createdBy;
        token.dateCreated := metadata.dateCreated;

        tokens.put(token.id, token);

        return _tokenInfotoExt(token);
    };

    //*Mint Clone
    public shared({ caller }) func mintCloneNFT(id: Text, randomId: Text) : async TokenInfoExt {
        switch(tokens.get(id)) {
            case(?token) {
                var newNFT = _newToken(caller);
        
                newNFT.id := token.id # "-" # randomId;
                newNFT.date := token.date;
                newNFT.description := token.description;
                newNFT.details := token.details;
                newNFT.gifts := token.gifts;
                newNFT.image := token.image;
                newNFT.name := token.name;
                newNFT.price := token.price;
                newNFT.place := token.place;
                newNFT.time := token.time;
                newNFT.category := token.category;
                newNFT.nftType := token.nftType;
                newNFT.createdBy := token.createdBy;
                newNFT.dateCreated := token.dateCreated;

                tokens.put(newNFT.id, newNFT);

                return _tokenInfotoExt(token);
            };
            case(_) {
                throw Error.reject("token not exist");
            }
        }
    };

    //*Clear all NFT
    public func clearAllTokens() {
        if(msg.caller != owner_) {
            return;
        };
        tokens := HashMap.HashMap<Text, TokenInfo>(1, Text.equal, Text.hash);
    };

    //*Get single tokens
    public query func getTokenInfo(tokenId: Text) : async TokenInfoExt {
        switch(tokens.get(tokenId)){
            case(?tokeninfo) {
                return _tokenInfotoExt(tokeninfo);
            };
            case(_) {
                throw Error.reject("token not exist");
            };
        };
    };

    //* Get all tokens
    public query func getAllTokens() : async [TokenInfoExt] {
        Iter.toArray(Iter.map(tokens.entries(), func (i: (Text, TokenInfo)): TokenInfoExt {_tokenInfotoExt(i.1)}))
    };

    //*Verify Ticket
    public func checkinTicket(ticketId: Text, principalId: Principal) : async Text {
        switch(tokens.get(ticketId)) {
            case(?ticketInfo) {
                if(ticketInfo.owner == principalId) {
                    if(ticketInfo.checkin) {
                        ticketInfo.checkin := true;

                        return "TICKET_VALID"
                    }
                };

                throw Error.reject("TICKET_INVALID");
            };
            case(_) {
                throw Error.reject("TICKET_INVALID");
            }
        }
    };
    
    //#endregion

    //*=======================================*//
    //*               USER API                *//
    //*=======================================*//
    //#region
    type UserInfo = Types.UserInfo;
    type UserInfoExt = Types.UserInfoExt;

    public type Errors = {
        #Unauthorized;
        #TokenNotExist;
        #InvalidOperator;
    };

    private stable var usersEntries : [(Principal, UserInfo)] = [];
    private var users = HashMap.HashMap<Principal, UserInfo>(1, Principal.equal, Principal.hash);

    private func _unwrap<T>(x : ?T) : T =
    switch x {
      case null { Prelude.unreachable() };
      case (?x_) { x_ };
    };

    private func _newUser(principalId: Principal) : UserInfo {
        {
            var firstName = "";
            var lastName = "";
            var sex = 0;
            var dateOfBirth = "";
            var liveIn = "";
            var phone = "";
            var id = principalId;
        }
    };

    private func _userInfotoExt(info: UserInfo) : UserInfoExt {
        return {
            firstName = info.firstName;
            lastName = info.lastName;
            sex = info.sex;
            dateOfBirth = info.dateOfBirth;
            liveIn = info.liveIn;
            phone = info.phone;
            id = info.id;
        };
    };

    private func _userInfotoExts(info: ?UserInfo) : ?UserInfoExt {
        switch info {
            case(?info) {
                return ?{
                    firstName = info.firstName;
                    lastName = info.lastName;
                    sex = info.sex;
                    dateOfBirth = info.dateOfBirth;
                    liveIn = info.liveIn;
                    phone = info.phone;
                    id = info.id;
                };
            };
            case _ {
                return null;
            };
        };
    };

    public query func getUserInfo(who: Principal) : async ?UserInfoExt {
        return _userInfotoExts(users.get(who));
    };


    //*CREATE ACCOUNT
    public shared({caller}) func createAccount(firstName : Text, lastName: Text, sex : Nat, dateOfBirth : Text, phone: Text, liveIn: Text) : async UserInfoExt {
        let user = _newUser(caller);

        user.firstName := firstName;
        user.lastName := lastName;
        user.sex := sex;
        user.dateOfBirth := dateOfBirth;
        user.phone := phone;
        user.liveIn :=  liveIn;

        users.put(caller, user);
        
        return _userInfotoExt(user);
    };

    //*UPDATE ACCOUNT
    public func updateAccount(principalId : Principal, firstName : Text, lastName: Text, sex : Nat, dateOfBirth : Text, phone: Text, liveIn: Text) : async UserInfoExt {
        let user = _newUser(principalId);

        user.firstName := firstName;
        user.lastName := lastName;
        user.sex := sex;
        user.dateOfBirth := dateOfBirth;
        user.phone := phone;
        user.liveIn :=  liveIn;

        switch (users.get(principalId)) {
            case _ {
                let a = users.replace(principalId, user);
                return _userInfotoExt(user);
            };
            case null {
                throw Error.reject("unauthorized");
            };
        };  
    };

    //*DELETE ACCOUNT
    public shared({caller}) func deleteAccount(principalId : Principal) : async Bool {
        switch (users.get(caller)) {
            case _{
                let a = users.remove(caller);
                return true;
            };
            case null {
                throw Error.reject("unauthorized");
            };
        };  
    };

    //* GET ALL USERS
    public query func readAccount() : async [UserInfoExt] {
        Iter.toArray(Iter.map(users.entries(), func (i: (Principal, UserInfo)): UserInfoExt {_userInfotoExt(i.1)}));
    };

    // upgrade functions
    system func preupgrade() {
        usersEntries := Iter.toArray(users.entries());
        tokensEntries := Iter.toArray(tokens.entries());
    };

    system func postupgrade() {
        users := HashMap.fromIter<Principal, UserInfo>(usersEntries.vals(), 1, Principal.equal, Principal.hash);
        usersEntries := [];

        tokens := HashMap.fromIter<Text, TokenInfo>(tokensEntries.vals(), 1, Text.equal, Text.hash);
        tokensEntries := [];
    };

    //#enregion
};