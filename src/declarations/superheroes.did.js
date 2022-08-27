export const idlFactory = ({ IDL }) => {
  const UserInfoExt = IDL.Record({
    'id' : IDL.Principal,
    'sex' : IDL.Nat,
    'permission' : IDL.Nat,
    'dateOfBirth' : IDL.Text,
    'phone' : IDL.Text,
    'lastName' : IDL.Text,
    'liveIn' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const SaleEventExt = IDL.Record({
    'id' : IDL.Text,
    'end' : IDL.Text,
    'owner' : IDL.Principal,
    'supplies' : IDL.Nat,
    'start' : IDL.Text,
    'nftId' : IDL.Text,
    'priceSale' : IDL.Nat,
  });
  const TokenPreorderListExt = IDL.Record({
    'id' : IDL.Text,
    'owner' : IDL.Principal,
    'supplies' : IDL.Nat,
    'nftId' : IDL.Text,
  });
  const TokenGiftInfo = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'createdBy' : IDL.Principal,
    'description' : IDL.Text,
    'image' : IDL.Text,
    'price' : IDL.Nat,
  });
  const TokenPreorder = IDL.Record({
    'end' : IDL.Text,
    'preorder' : IDL.Bool,
    'endTime' : IDL.Text,
    'gifts' : IDL.Vec(TokenGiftInfo),
    'cashback' : IDL.Float64,
  });
  const TokenInfoExt = IDL.Record({
    'id' : IDL.Text,
    'preorder' : TokenPreorder,
    'dateCreated' : IDL.Text,
    'owner' : IDL.Principal,
    'supplies' : IDL.Nat,
    'date' : IDL.Text,
    'name' : IDL.Text,
    'createdBy' : IDL.Principal,
    'time' : IDL.Text,
    'description' : IDL.Text,
    'privacy' : IDL.Text,
    'gifts' : IDL.Vec(TokenGiftInfo),
    'nftType' : IDL.Text,
    'details' : IDL.Text,
    'category' : IDL.Text,
    'image' : IDL.Text,
    'place' : IDL.Text,
    'price' : IDL.Float64,
  });
  const PBCTokenExt = IDL.Record({
    'balance' : IDL.Float64,
    'user' : IDL.Principal,
  });
  const NFTSale = IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Float64], []),
    'burnNFT' : IDL.Func([IDL.Text], [IDL.Text], []),
    'burnToken' : IDL.Func([IDL.Principal, IDL.Float64], [IDL.Float64], []),
    'checkinTicket' : IDL.Func([IDL.Text, IDL.Principal], [IDL.Text], []),
    'clearAllTokens' : IDL.Func([], [], ['oneway']),
    'createAccount' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [UserInfoExt],
        [],
      ),
    'createSaleEvent' : IDL.Func([SaleEventExt], [SaleEventExt], []),
    'deleteAccount' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'getAllSaleEvents' : IDL.Func([], [IDL.Vec(SaleEventExt)], []),
    'getAllTokenPreorders' : IDL.Func(
        [],
        [IDL.Vec(TokenPreorderListExt)],
        ['query'],
      ),
    'getAllTokens' : IDL.Func([], [IDL.Vec(TokenInfoExt)], ['query']),
    'getSaleEvent' : IDL.Func([IDL.Text], [SaleEventExt], []),
    'getTokenInfo' : IDL.Func([IDL.Text], [TokenInfoExt], ['query']),
    'getUserInfo' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserInfoExt)],
        ['query'],
      ),
    'mintCloneNFT' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Principal],
        [TokenInfoExt],
        [],
      ),
    'mintNFT' : IDL.Func([TokenInfoExt], [TokenInfoExt], []),
    'mintToken' : IDL.Func([IDL.Principal, IDL.Float64], [PBCTokenExt], []),
    'purchaseNFT' : IDL.Func([IDL.Text, IDL.Nat, IDL.Text], [IDL.Text], []),
    'readAccount' : IDL.Func([], [IDL.Vec(UserInfoExt)], ['query']),
    'removeTokenPreorder' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'swapNFT' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'transferNFT' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Text, IDL.Nat],
        [IDL.Text],
        [],
      ),
    'transferTokenFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Float64],
        [IDL.Text],
        [],
      ),
    'updateAccount' : IDL.Func(
        [
          IDL.Principal,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
        ],
        [UserInfoExt],
        [],
      ),
    'updateNFT' : IDL.Func([TokenInfoExt], [TokenInfoExt], []),
  });
  return NFTSale;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
