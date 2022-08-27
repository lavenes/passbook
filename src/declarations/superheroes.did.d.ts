import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AccountIdentifier = string;
export interface MintRequest { 'to' : User, 'metadata' : [] | [Array<number>] }
export interface NFTSale {
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'burnToken' : ActorMethod<[bigint], TxReceipt>,
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
  'logoToken' : ActorMethod<[], string>,
  'mintCloneNFT' : ActorMethod<[string, string], TokenInfoExt>,
  'mintNFT' : ActorMethod<[MintRequest], TokenIndex>,
  'mintToken' : ActorMethod<[Principal, bigint], TxReceipt>,
  'nameToken' : ActorMethod<[], string>,
  'readAccount' : ActorMethod<[], Array<UserInfoExt>>,
  'symbolToken' : ActorMethod<[], string>,
  'transferToken' : ActorMethod<[Principal, bigint], TxReceipt>,
  'transferTokenFrom' : ActorMethod<[Principal, Principal, bigint], TxReceipt>,
  'updateAccount' : ActorMethod<
    [Principal, string, string, bigint, string, string, string, bigint],
    UserInfoExt,
  >,
  'wallet_balance' : ActorMethod<[], bigint>,
  'wallet_receive' : ActorMethod<[], { 'accepted' : bigint }>,
}
export interface TokenGiftInfo {
  'id' : string,
  'name' : string,
  'createdBy' : Principal,
  'description' : string,
  'image' : string,
  'price' : bigint,
}
export type TokenIndex = number;
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
export type TxReceipt = { 'Ok' : bigint } |
  {
    'Err' : { 'InsufficientAllowance' : null } |
      { 'InsufficientBalance' : null } |
      { 'ErrorOperationStyle' : null } |
      { 'Unauthorized' : null } |
      { 'LedgerTrap' : null } |
      { 'ErrorTo' : null } |
      { 'Other' : string } |
      { 'BlockUsed' : null } |
      { 'AmountTooSmall' : null }
  };
export type User = { 'principal' : Principal } |
  { 'address' : AccountIdentifier };
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
