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
import DIP20Token "./token";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";

shared(msg) actor class NFTSale(
    _owner: Principal,
    ) = this {
    private stable var blackhole: Principal = Principal.fromText("aaaaa-aa");

    //*=======================================*//
    //*            DIP20 TOKEN API            *//
    //*=======================================*//
    type Operation = Types.Operation;
    type TransactionStatus = Types.TransactionStatus;
    type TxRecord = Types.TxRecord;
    public type TxReceipt = {
        #Ok: Nat;
        #Err: {
            #InsufficientAllowance;
            #InsufficientBalance;
            #ErrorOperationStyle;
            #Unauthorized;
            #LedgerTrap;
            #ErrorTo;
            #Other: Text;
            #BlockUsed;
            #AmountTooSmall;
        };
    };
    let tokenConfig = {
        logo = "";
        name = "PassBook Coin";
        symbol = "PBC";
        decimals : Nat8 = 0;
        totalSupply = 2000000;
        owner = _owner;
        fee = 0;
    };

    //*MINT & BURN
    //*Mint
    public shared({ caller }) func mint(to: Principal, value: Nat) : async TxReceipt {
        let dipToken = await DIP20Token.Token(tokenConfig.logo, tokenConfig.name, tokenConfig.symbol, tokenConfig.decimals, tokenConfig.totalSupply, tokenConfig.owner, tokenConfig.fee);

        return await dipToken.mint(to, value);
    };

    //*Burn
    public shared({ caller }) func burn(value: Nat) : async TxReceipt {
        let dipToken = await DIP20Token.Token(tokenConfig.logo, tokenConfig.name, tokenConfig.symbol, tokenConfig.decimals, tokenConfig.totalSupply, tokenConfig.owner, tokenConfig.fee);

        return await dipToken.burn(value);
    };

    //*Transfer
    public shared({ caller }) func transfer(to: Principal, value: Nat) : async TxReceipt {
        let dipToken = await DIP20Token.Token(tokenConfig.logo, tokenConfig.name, tokenConfig.symbol, tokenConfig.decimals, tokenConfig.totalSupply, tokenConfig.owner, tokenConfig.fee);

        return await dipToken.transfer(to, value);
    };

    // public shared({ caller }) func transferFrom(from: Principal, to: Principal, value: Nat) : async TxReceipt {
    //     let dipToken = await DIP20Token.Token(tokenConfig.logo, tokenConfig.name, tokenConfig.symbol, tokenConfig.decimals, tokenConfig.totalSupply, tokenConfig.owner, tokenConfig.fee);

    //     return await dipToken.transferFrom(from, to, value);
    // };

    public shared(msg) func approve(spender: Principal, value: Nat) : async TxReceipt {
        let dipToken = await DIP20Token.Token(tokenConfig.logo, tokenConfig.name, tokenConfig.symbol, tokenConfig.decimals, tokenConfig.totalSupply, tokenConfig.owner, tokenConfig.fee);

        return await dipToken.approve(spender, value);
    };

    //*Queries
    public shared({ caller }) func balanceOf(who: Principal) : async Nat {
        let dipToken = await DIP20Token.Token(tokenConfig.logo, tokenConfig.name, tokenConfig.symbol, tokenConfig.decimals, tokenConfig.totalSupply, tokenConfig.owner, tokenConfig.fee);

        return await dipToken.balanceOf(who);
    };

    //*Query token info
    public query func logoToken() : async Text {
        return tokenConfig.logo;
    };

    public query func nameToken() : async Text {
        return tokenConfig.name;
    };

    public query func symbolToken() : async Text {
        return tokenConfig.symbol;
    };

    public query func decimals() : async Nat8 {
        return tokenConfig.decimals;
    };

    public query func totalSupply() : async Nat {
        return tokenConfig.totalSupply;
    };

    public query func getTokenFee() : async Nat {
        return tokenConfig.fee;
    };

    public shared({caller}) func allowance(owner: Principal, spender: Principal) : async Nat {
        let dipToken = await DIP20Token.Token(tokenConfig.logo, tokenConfig.name, tokenConfig.symbol, tokenConfig.decimals, tokenConfig.totalSupply, tokenConfig.owner, tokenConfig.fee);

        return await dipToken.allowance(owner, spender);
    };
    

    //*=======================================*//
    //*                NFT API                *//
    //*=======================================*//
    //#region

  stable var transactionId: Types.TransactionId = 0;
  stable var nfts = List.nil<Types.Nft>();
  stable var custodians = List.make<Principal>(_owner);
  stable var logo : Types.LogoResult = {
    logo_type = "image/png";
    data = ""
  };
  stable var name : Text = "MYDI";
  stable var symbol : Text = "ADP";
  stable var maxLimit : Nat16 = 100;

  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");

  public query func balanceOfDip721(user: Principal) : async Nat64 {
    return Nat64.fromNat(
      List.size(
        List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == user })
      )
    );
  };

  public query func ownerOfDip721(token_id: Types.TokenId) : async Types.OwnerResult {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case (null) {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        return #Ok(token.owner);
      };
    };
  };

  public shared({ caller }) func safeTransferFromDip721(from: Principal, to: Principal, token_id: Types.TokenId) : async Types.TxReceipt {  
    if (to == null_address) {
      return #Err(#ZeroAddress);
    } else {
      return transferFrom(from, to, token_id, caller);
    };
  };

  public shared({ caller }) func transferFromDip721(from: Principal, to: Principal, token_id: Types.TokenId) : async Types.TxReceipt {
    return transferFrom(from, to, token_id, caller);
  };

  func transferFrom(from: Principal, to: Principal, token_id: Types.TokenId, caller: Principal) : Types.TxReceipt {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          caller != token.owner and
          not List.some(custodians, func (custodian : Principal) : Bool { custodian == caller })
        ) {
          return #Err(#Unauthorized);
        } else if (Principal.notEqual(from, token.owner)) {
          return #Err(#Other);
        } else {
          nfts := List.map(nfts, func (item : Types.Nft) : Types.Nft {
            if (item.id == token.id) {
              let update : Types.Nft = {
                owner = to;
                id = item.id;
                metadata = token.metadata;
              };
              return update;
            } else {
              return item;
            };
          });
          transactionId += 1;
          return #Ok(transactionId);   
        };
      };
    };
  };

  public query func supportedInterfacesDip721() : async [Types.InterfaceId] {
    return [#TransferNotification, #Burn, #Mint];
  };

  public query func logoDip721() : async Types.LogoResult {
    return logo;
  };

  public query func nameDip721() : async Text {
    return name;
  };

  public query func symbolDip721() : async Text {
    return symbol;
  };

  public query func totalSupplyDip721() : async Nat64 {
    return Nat64.fromNat(
      List.size(nfts)
    );
  };

  public query func getMetadataDip721(token_id: Types.TokenId) : async Types.MetadataResult {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.id == token_id });
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        return #Ok(token.metadata);
      }
    };
  };

  public query func getMaxLimitDip721() : async Nat16 {
    return maxLimit;
  };

  public func getMetadataForUserDip721(user: Principal) : async Types.ExtendedMetadataResult {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.owner == user });
    switch (item) {
      case null {
        return #Err(#Other);
      };
      case (?token) {
        return #Ok({
          metadata_desc = token.metadata;
          token_id = token.id;
        });
      }
    };
  };

  public query func getTokenIdsForUserDip721(user: Principal) : async [Types.TokenId] {
    let items = List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == user });
    let tokenIds = List.map(items, func (item : Types.Nft) : Types.TokenId { item.id });
    return List.toArray(tokenIds);
  };

  public shared({ caller }) func mintDip721(to: Principal, metadata: Types.MetadataDesc) : async Types.MintReceipt {
    if (not List.some(custodians, func (custodian : Principal) : Bool { custodian == caller })) {
      return #Err(#Unauthorized);
    };

    let newId = Nat64.fromNat(List.size(nfts));
    let nft : Types.Nft = {
      owner = to;
      id = newId;
      metadata = metadata;
    };

    nfts := List.push(nft, nfts);

    transactionId += 1;

    return #Ok({
      token_id = newId;
      id = transactionId;
    });
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
        //tokensEntries := Iter.toArray(tokens.entries());
    };

    system func postupgrade() {
        users := HashMap.fromIter<Principal, UserInfo>(usersEntries.vals(), 1, Principal.equal, Principal.hash);
        usersEntries := [];

        //tokens := HashMap.fromIter<Text, TokenInfo>(tokensEntries.vals(), 1, Text.equal, Text.hash);
       //tokensEntries := [];
    };

    //#enregion
};