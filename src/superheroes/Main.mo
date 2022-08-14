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

    private func _newUser() : UserInfo {
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
        let user = _newUser();

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
        let user = _newUser();

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
    };

    system func postupgrade() {
        type UserInfo = Types.UserInfo;
        users := HashMap.fromIter<Principal, UserInfo>(usersEntries.vals(), 1, Principal.equal, Principal.hash);
        usersEntries := [];
    };
};