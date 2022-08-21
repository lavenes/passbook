/**
 * Module     : types.mo
 * Copyright  : 2021 Rocklabs Team
 * License    : Apache 2.0 with LLVM Exception
 * Stability  : Experimental
 */

import Time "mo:base/Time";
import TrieSet "mo:base/TrieSet";

module {
    
    //*=======================================*//
    //*           OPERATIONS TYPE             *//
    //*=======================================*//

    /// Update call operations
    public type Operation = {
        #mint: ?TokenMetaData;  
        #burn;
        #transfer;
        #transferFrom;
        #approve;
        #approveAll;
        #revokeAll; // revoke approvals
        #setMetadata;
        #createOrder
    };
    /// Update call operation record fields
    public type Record = {
        #user: Principal;
        #metadata: ?TokenMetaData; // op == #setMetadata
    };
    public type TxRecord = {
        caller: Principal;
        op: Operation;
        index: Nat;
        tokenIndex: ?Nat;
        from: Record;
        to: Record;
        timestamp: Time.Time;
    };

    //*=======================================*//
    //*                NFT TYPE               *//
    //*=======================================*//
    
    public type TokenMetaData = {
        tokenUri: Text;
    };

    public type TokenInfo = {
        index: Nat;
        var owner: Principal;
        var metadata: ?TokenMetaData;
        var operator: ?Principal;
        timestamp: Time.Time;
    };

    public type TokenInfoExt = {
        index: Nat;
        owner: Principal;
        metadata: ?TokenMetaData;
        operator: ?Principal;
        timestamp: Time.Time;
    };
    
    //*=======================================*//
    //*               USER TYPE               *//
    //*=======================================*//

    public type UserInfo = {
        var operators: TrieSet.Set<Principal>;     // principals allowed to operate on the user's behalf
        var allowedBy: TrieSet.Set<Principal>;     // principals approved user to operate their's tokens
        var allowedTokens: TrieSet.Set<Nat>;       // tokens the user can operate
        var tokens: TrieSet.Set<Nat>;              // user's tokens
        var firstName: Text;
        var lastName: Text;
        var sex: Nat;
        var dateOfBirth: Text;
        var phone: Text;
        var liveIn: Text;
        var principalId: Text;
    };

    public type UserInfoExt = {
        operators: [Principal];
        allowedBy: [Principal];
        allowedTokens: [Nat];
        tokens: [Nat];             // user's tokens
        firstName: Text;
        lastName: Text;
        sex: Nat;
        dateOfBirth: Text;
        phone: Text;
        liveIn: Text;
        principalId: Text;
    };
};