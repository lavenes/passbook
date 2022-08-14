/**
 * Module     : types.mo
 * Copyright  : 2021 Rocklabs Team
 * License    : Apache 2.0 with LLVM Exception
 * Stability  : Experimental
 */

import Time "mo:base/Time";
import TrieSet "mo:base/TrieSet";

module {
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
    };
};