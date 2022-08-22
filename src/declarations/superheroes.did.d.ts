import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface NFTSale {
  'clearAllTokens' : ActorMethod<[], undefined>,
  'createAccount' : ActorMethod<
    [string, string, bigint, string, string, string],
    UserInfoExt,
  >,
  'deleteAccount' : ActorMethod<[Principal], boolean>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getTokenInfo' : ActorMethod<[string], TokenInfoExt>,
  'getUserInfo' : ActorMethod<[Principal], [] | [UserInfoExt]>,
  'mintCloneNFT' : ActorMethod<[string], TokenInfoExt>,
  'mintNFT' : ActorMethod<[TokenInfoExt], TokenInfoExt>,
  'readAccount' : ActorMethod<[], Array<UserInfoExt>>,
  'updateAccount' : ActorMethod<
    [Principal, string, string, bigint, string, string, string],
    UserInfoExt,
  >,
}
export interface TokenGiftInfo {
  'id' : string,
  'name' : string,
  'createdBy' : Principal,
  'description' : string,
  'image' : Array<number>,
  'price' : bigint,
}
export interface TokenInfoExt {
  'id' : string,
  'dateCreated' : string,
  'owner' : Principal,
  'date' : string,
  'name' : string,
  'createdBy' : Principal,
  'time' : string,
  'description' : string,
  'gifts' : Array<TokenGiftInfo>,
  'nftType' : string,
  'details' : string,
  'category' : string,
  'image' : Array<number>,
  'place' : string,
  'price' : bigint,
}
export interface UserInfoExt {
  'id' : Principal,
  'sex' : bigint,
  'dateOfBirth' : string,
  'phone' : string,
  'lastName' : string,
  'liveIn' : string,
  'firstName' : string,
}
export interface _SERVICE extends NFTSale {}
