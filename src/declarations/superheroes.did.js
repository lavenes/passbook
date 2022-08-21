export const idlFactory = ({ IDL }) => {
  const UserInfoExt = IDL.Record({
    'sex' : IDL.Nat,
    'dateOfBirth' : IDL.Text,
    'allowedTokens' : IDL.Vec(IDL.Nat),
    'tokens' : IDL.Vec(IDL.Nat),
    'operators' : IDL.Vec(IDL.Principal),
    'phone' : IDL.Text,
    'allowedBy' : IDL.Vec(IDL.Principal),
    'lastName' : IDL.Text,
    'principalId' : IDL.Text,
    'liveIn' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const TokenMetaData__1 = IDL.Record({ 'tokenUri' : IDL.Text });
  const Time = IDL.Int;
  const TokenInfoExt = IDL.Record({
    'owner' : IDL.Principal,
    'metadata' : IDL.Opt(TokenMetaData__1),
    'operator' : IDL.Opt(IDL.Principal),
    'timestamp' : Time,
    'index' : IDL.Nat,
  });
  const TokenMetaData = IDL.Record({ 'tokenUri' : IDL.Text });
  const Errors = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'TokenNotExist' : IDL.Null,
    'InvalidOperator' : IDL.Null,
  });
  const MintResult = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'Err' : Errors,
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
    'getTokenInfo' : IDL.Func([IDL.Nat], [TokenInfoExt], ['query']),
    'getUserInfo' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserInfoExt)],
        ['query'],
      ),
    'mintNFT' : IDL.Func([IDL.Opt(TokenMetaData)], [MintResult], []),
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
  });
  return NFTSale;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
