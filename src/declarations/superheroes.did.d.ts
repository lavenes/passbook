import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Errors = { 'Unauthorized' : null } |
  { 'TokenNotExist' : null } |
  { 'InvalidOperator' : null };
export type MintResult = { 'Ok' : [bigint, bigint] } |
  { 'Err' : Errors };
export interface NFTSale {
  'clearAllTokens' : ActorMethod<[], undefined>,
  'createAccount' : ActorMethod<
    [string, string, bigint, string, string, string],
    UserInfoExt,
  >,
  'deleteAccount' : ActorMethod<[Principal], boolean>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getTokenInfo' : ActorMethod<[bigint], TokenInfoExt>,
  'getUserInfo' : ActorMethod<[Principal], [] | [UserInfoExt]>,
  'mintNFT' : ActorMethod<[[] | [TokenMetaData]], MintResult>,
  'readAccount' : ActorMethod<[], Array<UserInfoExt>>,
  'updateAccount' : ActorMethod<
    [Principal, string, string, bigint, string, string, string],
    UserInfoExt,
  >,
}
export type Time = bigint;
export interface TokenInfoExt {
  'owner' : Principal,
  'metadata' : [] | [TokenMetaData__1],
  'operator' : [] | [Principal],
  'timestamp' : Time,
  'index' : bigint,
}
export interface TokenMetaData { 'tokenUri' : string }
export interface TokenMetaData__1 { 'tokenUri' : string }
export interface UserInfoExt {
  'sex' : bigint,
  'dateOfBirth' : string,
  'allowedTokens' : Array<bigint>,
  'tokens' : Array<bigint>,
  'operators' : Array<Principal>,
  'phone' : string,
  'allowedBy' : Array<Principal>,
  'lastName' : string,
  'principalId' : string,
  'liveIn' : string,
  'firstName' : string,
}
export interface _SERVICE extends NFTSale {}
