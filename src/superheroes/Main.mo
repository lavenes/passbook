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
import Nat64 "mo:base/Nat64";

shared(msg) actor class NFTSale(
    _owner: Principal,
    ) = this {
    private stable var blackhole: Principal = Principal.fromText("aaaaa-aa");

    //*=======================================*//
    //*            PBC TOKEN API              *//
    //*=======================================*//
    type PBCToken = Types.PBCToken;
    type PBCTokenExt = Types.PBCTokenExt;

    private stable var pbcTokenEntries : [(Principal, PBCToken)] = [];
    private var pbcTokens = HashMap.HashMap<Principal, PBCToken>(1, Principal.equal, Principal.hash);

    private func _newPBCToken(user: Principal) : PBCToken {
      return {
        var user = user;
        var balance = 0;
      }
    };
    
    private func _pbcTokenToExt(info: PBCToken) : PBCTokenExt {
        return {
          user = info.user;
          balance = info.balance;
        };
    };

    //*MINT & BURN
    //*Mint
    public shared({ caller }) func mintToken(to: Principal, value: Nat) : async PBCTokenExt {
      var userToken = pbcTokens.get(to);

      switch(userToken) {
        case(?userToken) {
          var newBalance : Nat = userToken.balance + value;

          userToken.balance := newBalance;

          let res = pbcTokens.replace(to, userToken);

          return _pbcTokenToExt(userToken);
        };
        case _ {
          var newUserToken : PBCToken = _newPBCToken(to);
          newUserToken.balance := value;

          let res = pbcTokens.put(to, newUserToken);

          return _pbcTokenToExt(newUserToken);
        }
      };
    };

    //*Burn
    public shared({ caller }) func burnToken(to: Principal, value: Nat) : async Nat {
      let userToken = pbcTokens.get(to);

      switch(userToken) {
        case(?userToken) {
          var newBalance : Nat = userToken.balance - value;

          userToken.balance := newBalance;

          let res = pbcTokens.replace(to, userToken);

          return newBalance;
        };
        case _ {
          return 0;
        }
      };
    };

    public shared({ caller }) func transferTokenFrom(from: Principal, to: Principal, value: Nat) : async Text {
      let userToken = pbcTokens.get(from);
      let userTakeToken = pbcTokens.get(to);

      switch(userToken) {
        case(?userToken) {
          switch(userTakeToken) {
            case(?userTakeToken) {
              userToken.balance := userToken.balance - value;
              userTakeToken.balance := userTakeToken.balance + value;

              let res = pbcTokens.replace(to, userToken);

              return "OK";
            };
            case _ {
              return "FAIL";
            };
          };
        };
        case _ {
          return "FAIL";
        }
      };
    };

    //*Queries
    public shared({ caller }) func balanceOf(who: Principal) : async Nat {
      let userToken = pbcTokens.get(who);

      switch(userToken) {
        case(?userToken) {
          return userToken.balance;
        };
        case _ {
          return 0;
        }
      };
    };

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

    //*Transfer Token
    public shared({ caller }) func transferNFT(from: Principal, to: Principal, tokenId: Text, fee: Nat) : async Text {
      var nft = tokens.get(tokenId);

      switch(nft) {
        case(?nft) {
          nft.owner := to;

          let res = tokens.replace(tokenId, nft);

          return "OK";
        };
        case _ {
          throw Error.reject("nft not exist")
        }
      }
    };

    //*Burn Token
    public shared({ caller }) func burnNFT(tokenId: Text) : async Text {
      switch(tokens.get(tokenId)) {
        case(?nft) {
          let res = tokens.remove(tokenId);

          return "OK";
        };
        case _ {
          throw Error.reject("nft not exist");
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

    //*Update Ticket
    public shared({ caller }) func updateNFT(metadata: TokenInfoExt): async TokenInfoExt {
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

        let res = tokens.replace(token.id, token);

        return _tokenInfotoExt(token);
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
            var permission = 0;
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
            permission = info.permission;
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
                    permission = info.permission;
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
    public func updateAccount(principalId : Principal, firstName : Text, lastName: Text, sex : Nat, dateOfBirth : Text, phone: Text, liveIn: Text, permission: Nat) : async UserInfoExt {
        let user = _newUser(principalId);

        user.firstName := firstName;
        user.lastName := lastName;
        user.sex := sex;
        user.dateOfBirth := dateOfBirth;
        user.phone := phone;
        user.liveIn :=  liveIn;
        user.permission := permission;

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
        pbcTokenEntries := Iter.toArray(pbcTokens.entries());
    };

    system func postupgrade() {
        users := HashMap.fromIter<Principal, UserInfo>(usersEntries.vals(), 1, Principal.equal, Principal.hash);
        usersEntries := [];

        tokens := HashMap.fromIter<Text, TokenInfo>(tokensEntries.vals(), 1, Text.equal, Text.hash);
        tokensEntries := [];

        pbcTokens := HashMap.fromIter<Principal, PBCToken>(pbcTokenEntries.vals(), 1, Principal.equal, Principal.hash);
        pbcTokenEntries := [];
    };

    //#enregion
};