import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface NFTSale {
  'balanceOf' : ActorMethod<[Principal], number>,
  'burnNFT' : ActorMethod<[string], string>,
  'burnToken' : ActorMethod<[Principal, number], number>,
  'checkinTicket' : ActorMethod<[string, Principal], string>,
  'clearAllTokens' : ActorMethod<[], undefined>,
  'createAccount' : ActorMethod<
    [string, string, bigint, string, string, string],
    UserInfoExt,
  >,
  'createSaleEvent' : ActorMethod<[SaleEventExt], SaleEventExt>,
  'deleteAccount' : ActorMethod<[Principal], boolean>,
  'getAllSaleEvents' : ActorMethod<[], Array<SaleEventExt>>,
  'getAllTokenPreorders' : ActorMethod<[], Array<TokenPreorderListExt>>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getSaleEvent' : ActorMethod<[string], SaleEventExt>,
  'getTokenInfo' : ActorMethod<[string], TokenInfoExt>,
  'getUserInfo' : ActorMethod<[Principal], [] | [UserInfoExt]>,
  'mintCloneNFT' : ActorMethod<[string, string, Principal], TokenInfoExt>,
  'mintNFT' : ActorMethod<[TokenInfoExt], TokenInfoExt>,
  'mintToken' : ActorMethod<[Principal, number], PBCTokenExt>,
  'purchaseNFT' : ActorMethod<[string, bigint, string], string>,
  'readAccount' : ActorMethod<[], Array<UserInfoExt>>,
  'removeTokenPreorder' : ActorMethod<[string], string>,
  'swapNFT' : ActorMethod<[string, string], string>,
  'transferNFT' : ActorMethod<[Principal, Principal, string, bigint], string>,
  'transferTokenFrom' : ActorMethod<[Principal, Principal, number], string>,
  'updateAccount' : ActorMethod<
    [Principal, string, string, bigint, string, string, string, bigint],
    UserInfoExt,
  >,
  'updateNFT' : ActorMethod<[TokenInfoExt], TokenInfoExt>,
}
export interface PBCTokenExt { 'balance' : number, 'user' : Principal }
export interface SaleEventExt {
  'id' : string,
  'end' : string,
  'owner' : Principal,
  'supplies' : bigint,
  'start' : string,
  'nftId' : string,
  'priceSale' : bigint,
}
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
  'preorder' : TokenPreorder,
  'dateCreated' : string,
  'owner' : Principal,
  'supplies' : bigint,
  'date' : string,
  'name' : string,
  'createdBy' : Principal,
  'time' : string,
  'description' : string,
  'privacy' : string,
  'gifts' : Array<TokenGiftInfo>,
  'nftType' : string,
  'details' : string,
  'category' : string,
  'image' : string,
  'place' : string,
  'price' : number,
}
export interface TokenPreorder {
  'end' : string,
  'preorder' : boolean,
  'endTime' : string,
  'gifts' : Array<TokenGiftInfo>,
  'cashback' : number,
}
export interface TokenPreorderListExt {
  'id' : string,
  'owner' : Principal,
  'supplies' : bigint,
  'available' : boolean,
  'nftId' : string,
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
