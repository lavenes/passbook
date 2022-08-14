import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface NFTSale {
  'createAccount' : ActorMethod<
    [string, string, bigint, string, string, string],
    UserInfoExt,
  >,
  'deleteAccount' : ActorMethod<[Principal], boolean>,
  'getUserInfo' : ActorMethod<[Principal], [] | [UserInfoExt]>,
  'readAccount' : ActorMethod<[], Array<UserInfoExt>>,
  'updateAccount' : ActorMethod<
    [Principal, string, string, bigint, string, string, string],
    UserInfoExt,
  >,
}
export interface UserInfoExt {
  'sex' : bigint,
  'dateOfBirth' : string,
  'allowedTokens' : Array<bigint>,
  'tokens' : Array<bigint>,
  'operators' : Array<Principal>,
  'phone' : string,
  'allowedBy' : Array<Principal>,
  'lastName' : string,
  'liveIn' : string,
  'firstName' : string,
}
export interface _SERVICE extends NFTSale {}
