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
    'liveIn' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const NFTSale = IDL.Service({
    'createAccount' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [UserInfoExt],
        [],
      ),
    'deleteAccount' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'getUserInfo' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserInfoExt)],
        ['query'],
      ),
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
