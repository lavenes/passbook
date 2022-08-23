export const idlFactory = ({ IDL }) => {
  const UserInfoExt = IDL.Record({
    'id' : IDL.Principal,
    'sex' : IDL.Nat,
    'dateOfBirth' : IDL.Text,
    'phone' : IDL.Text,
    'lastName' : IDL.Text,
    'liveIn' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const TokenGiftInfo = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'createdBy' : IDL.Principal,
    'description' : IDL.Text,
    'image' : IDL.Vec(IDL.Nat8),
    'price' : IDL.Nat,
  });
  const TokenInfoExt = IDL.Record({
    'id' : IDL.Text,
    'dateCreated' : IDL.Text,
    'owner' : IDL.Principal,
    'date' : IDL.Text,
    'name' : IDL.Text,
    'createdBy' : IDL.Principal,
    'time' : IDL.Text,
    'description' : IDL.Text,
    'gifts' : IDL.Vec(TokenGiftInfo),
    'nftType' : IDL.Text,
    'details' : IDL.Text,
    'category' : IDL.Text,
    'image' : IDL.Vec(IDL.Nat8),
    'place' : IDL.Text,
    'price' : IDL.Nat,
  });
  const NFTSale = IDL.Service({
    'clearAllTokens' : IDL.Func([], [], ['oneway']),
    'createAccount' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [UserInfoExt],
        [],
      ),
    'deleteAccount' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'getAllTokens' : IDL.Func([], [IDL.Vec(TokenInfoExt)], ['query']),
    'getTokenInfo' : IDL.Func([IDL.Text], [TokenInfoExt], ['query']),
    'getUserInfo' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserInfoExt)],
        ['query'],
      ),
    'mintCloneNFT' : IDL.Func([IDL.Text, IDL.Text], [TokenInfoExt], []),
    'mintNFT' : IDL.Func([TokenInfoExt], [TokenInfoExt], []),
    'readAccount' : IDL.Func([], [IDL.Vec(UserInfoExt)], ['query']),
    'updateAccount' : IDL.Func(
        [
          IDL.Principal,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Text,
        ],
        [UserInfoExt],
        [],
      ),
    'verifyTicket' : IDL.Func([IDL.Text, IDL.Principal], [IDL.Text], []),
  });
  return NFTSale;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
