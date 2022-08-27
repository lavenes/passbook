import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface NFTSale {
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'burnToken' : ActorMethod<[Principal, bigint], bigint>,
  'checkinTicket' : ActorMethod<[string, Principal], string>,
  'clearAllTokens' : ActorMethod<[], undefined>,
  'createAccount' : ActorMethod<
    [string, string, bigint, string, string, string],
    UserInfoExt,
  >,
  'deleteAccount' : ActorMethod<[Principal], boolean>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getTokenInfo' : ActorMethod<[string], TokenInfoExt>,
  'getUserInfo' : ActorMethod<[Principal], [] | [UserInfoExt]>,
  'mintCloneNFT' : ActorMethod<[string, string], TokenInfoExt>,
  'mintNFT' : ActorMethod<[TokenInfoExt], TokenInfoExt>,
  'mintToken' : ActorMethod<[Principal, bigint], PBCTokenExt>,
  'readAccount' : ActorMethod<[], Array<UserInfoExt>>,
  'transferTokenFrom' : ActorMethod<[Principal, Principal, bigint], string>,
  'updateAccount' : ActorMethod<
    [Principal, string, string, bigint, string, string, string, bigint],
    UserInfoExt,
  >,
}
export interface PBCTokenExt { 'balance' : bigint, 'user' : Principal }
export interface TokenGiftInfo {
  'id' : string,
  'name' : string,
  'createdBy' : Principal,
  'description' : string,
  'image' : string,
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
  'image' : string,
  'place' : string,
  'price' : bigint,
}
export interface UserInfoExt {
  'id' : Principal,
  'sex' : bigint,
  'permission' : bigint,
  'dateOfBirth' : string,
  'phone' : string,
  'lastName' : string,
  'liveIn' : string,
  'firstName' : string,
}
export interface _SERVICE extends NFTSale {}
