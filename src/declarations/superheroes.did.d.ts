import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ApiError = { 'ZeroAddress' : null } |
  { 'InvalidTokenId' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null };
export type MintReceipt = { 'Ok' : MintReceiptPart } |
  { 'Err' : ApiError };
export interface MintReceiptPart { 'id' : bigint, 'token_id' : TokenId }
export interface NFTSale {
  'allowance' : ActorMethod<[Principal, Principal], bigint>,
  'approveToken' : ActorMethod<[Principal, bigint], TxReceipt>,
  'balanceTokenOf' : ActorMethod<[Principal], bigint>,
  'burnToken' : ActorMethod<[bigint], TxReceipt>,
  'checkinTicket' : ActorMethod<[string, Principal], string>,
  'clearAllTokens' : ActorMethod<[], undefined>,
  'createAccount' : ActorMethod<
    [string, string, bigint, string, string, string],
    UserInfoExt,
  >,
  'decimalsToken' : ActorMethod<[], number>,
  'deleteAccount' : ActorMethod<[Principal], boolean>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getTokenFee' : ActorMethod<[], bigint>,
  'getTokenInfo' : ActorMethod<[string], TokenInfoExt>,
  'getUserInfo' : ActorMethod<[Principal], [] | [UserInfoExt]>,
  'logoToken' : ActorMethod<[], string>,
  'mintCloneNFT' : ActorMethod<[string, string], TokenInfoExt>,
  'mintNFT' : ActorMethod<[TokenInfoExt], MintReceipt>,
  'mintToken' : ActorMethod<[Principal, bigint], TxReceipt>,
  'nameToken' : ActorMethod<[], string>,
  'readAccount' : ActorMethod<[], Array<UserInfoExt>>,
  'symbolToken' : ActorMethod<[], string>,
  'totalSupply' : ActorMethod<[], bigint>,
  'transferToken' : ActorMethod<[Principal, bigint], TxReceipt>,
  'transferTokenFrom' : ActorMethod<[Principal, Principal, bigint], TxReceipt>,
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
  'image' : string,
  'price' : bigint,
}
export type TokenId = bigint;
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
