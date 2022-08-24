## Run for FE

1. Build your front-end.

   ```text
   npm install
   ```
   
 ```text
   npm run start:dev
   ```

## Run for FE, Motoko

1. Start a local internet computer.

   ```text
   dfx start
   ```

1. Open a new terminal window.

1. Reserve an identifier for your canister.

   ```text
   dfx canister create --all
   ```


1. Build your front-end.

   ```text
   npm install
   ```

1. Build your canister.

   ```text
   dfx build superheroes
   ```

1. Deploy your canister.

   ```text
  
dfx canister install superheroes --argument="(principal \"$(dfx identity get-principal)\")"
   ```
 ```text
   npm start:dev
   ```

1. Take note of the URL at which the canister is accessible.

   ```text
   echo "http://localhost:8000/?canisterId=$(dfx canister id www)"
   ```

1. Open the aforementioned URL in your web browser.

1. UPGRADE
dfx build superheroes && dfx canister install superheroes --argument="(principal \"$(dfx identity get-principal)\")" --all --mode=upgrade
