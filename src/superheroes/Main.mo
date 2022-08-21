/**
 * Module     : main.mo
 * Copyright  : 2022 Rocklabs Team
 * License    : Apache 2.0 with LLVM Exception
 * Stability  : Experimental
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

shared(msg) actor class NFTSale(
    _owner: Principal,
    ) = this {
    type Operation = Types.Operation;
    type Record = Types.Record;
    type TxRecord = Types.TxRecord;
    private stable var blackhole: Principal = Principal.fromText("aaaaa-aa");

    //*=======================================*//
    //*                NFT API                *//
    //*=======================================*//
    type TokenMetaData = Types.TokenMetaData;
    type TokenInfo = Types.TokenInfo;
    type TokenInfoExt = Types.TokenInfoExt;

    public type MintResult = {
        #Ok: (Nat, Nat);
        #Err: Errors;
    };

    private stable var txIndex: Nat = 0;
    private stable var txs: [TxRecord] = [];
    private stable var owner_: Principal = _owner;
    private stable var totalSupply_: Nat = 0;
    private stable var tokensEntries : [(Nat, TokenInfo)] = [];
    private var tokens = HashMap.HashMap<Nat, TokenInfo>(1, Nat.equal, Hash.hash);

    //*Add NFT Record
    private func addNFTRecord(
        caller: Principal, op: Operation, tokenIndex: ?Nat,
        from: Record, to: Record, timestamp: Time.Time
    ): Nat {
        let record: TxRecord = {
            caller = caller;
            op = op;
            index = txIndex;
            tokenIndex = tokenIndex;
            from = from;
            to = to;
            timestamp = timestamp;
        };
        txs := Array.append(txs, [record]);
        txIndex += 1;
        return txIndex - 1;
    };

    //*Add Token to UID
    private func _addTokenTo(to: Principal, tokenId: Nat) {
        switch(users.get(to)) {
            case (?user) {
                user.tokens := TrieSet.put(user.tokens, tokenId, Hash.hash(tokenId), Nat.equal);
                users.put(to, user);
            };
            case _ {
                let user = _newUser(to);
                user.tokens := TrieSet.put(user.tokens, tokenId, Hash.hash(tokenId), Nat.equal);
                users.put(to, user);
            };
        }
    }; 

    //*Priv Info to Ext
    private func _tokenInfotoExt(info: TokenInfo) : TokenInfoExt {
        return {
            index = info.index;
            owner = info.owner;
            metadata = info.metadata;
            timestamp = info.timestamp;
            operator = info.operator;
        };
    };

    //*Mintning
    public shared({ caller }) func mintNFT(metadata: ?TokenMetaData): async MintResult {
        // if(msg.caller != owner_) {
        //     return #Err(#Unauthorized);
        // };
        let token: TokenInfo = {
            index = totalSupply_;
            var owner = caller;
            var metadata = metadata;
            var operator = null;
            timestamp = Time.now();
        };

        tokens.put(totalSupply_, token);

        _addTokenTo(caller, totalSupply_);

        totalSupply_ += 1;

        let txid = addNFTRecord(msg.caller, #mint(metadata), ?token.index, #user(blackhole), #user(caller), Time.now());
        return #Ok((token.index, txid));
    };

    //*Clear all NFT
    public func clearAllTokens() {
        if(msg.caller != owner_) {
            return;
        };
        tokens := HashMap.HashMap<Nat, TokenInfo>(1, Nat.equal, Hash.hash);
        totalSupply_ := 0;
    };

    //*Get single tokens
    public query func getTokenInfo(tokenId: Nat) : async TokenInfoExt {
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
        Iter.toArray(Iter.map(tokens.entries(), func (i: (Nat, TokenInfo)): TokenInfoExt {_tokenInfotoExt(i.1)}))
    };
    
    //*=======================================*//
    //*               USER API                *//
    //*=======================================*//
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
            var operators = TrieSet.empty<Principal>();
            var allowedBy = TrieSet.empty<Principal>();
            var allowedTokens = TrieSet.empty<Nat>();
            var tokens = TrieSet.empty<Nat>();
            var firstName = "";
            var lastName = "";
            var sex = 0;
            var dateOfBirth = "";
            var liveIn = "";
            var phone = "";
            var principalId = Principal.toText(principalId);
        }
    };

    private func _userInfotoExt(info: UserInfo) : UserInfoExt {
        return {
            operators = TrieSet.toArray(info.operators);
            allowedBy = TrieSet.toArray(info.allowedBy);
            allowedTokens = TrieSet.toArray(info.allowedTokens);
            tokens = TrieSet.toArray(info.tokens);
            firstName = info.firstName;
            lastName = info.lastName;
            sex = info.sex;
            dateOfBirth = info.dateOfBirth;
            liveIn = info.liveIn;
            phone = info.phone;
            principalId = info.principalId;
        };
    };

    private func _userInfotoExts(info: ?UserInfo) : ?UserInfoExt {
        switch info {
            case(?info) {
                return ?{
                    operators = TrieSet.toArray(info.operators);
                    allowedBy = TrieSet.toArray(info.allowedBy);
                    allowedTokens = TrieSet.toArray(info.allowedTokens);
                    tokens = TrieSet.toArray(info.tokens);
                    firstName = info.firstName;
                    lastName = info.lastName;
                    sex = info.sex;
                    dateOfBirth = info.dateOfBirth;
                    liveIn = info.liveIn;
                    phone = info.phone;
                    principalId = info.principalId;
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

        tokens := HashMap.fromIter<Nat, TokenInfo>(tokensEntries.vals(), 1, Nat.equal, Hash.hash);
        tokensEntries := [];
    };
};