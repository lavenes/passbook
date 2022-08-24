## Superheroes

![Compatibility](https://img.shields.io/badge/compatibility-0.6.25-blue)
[![Build Status](https://github.com/dfinity/examples/workflows/motoko-superheroes-example/badge.svg)](https://github.com/dfinity/examples/actions?query=workflow%3Amotoko-superheroes-example)

This example demonstrates how to build a
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
application on the [Internet Computer](https://dfinity.org) using
[Motoko](https://sdk.dfinity.org/docs/language-guide/motoko.html) and
[React](https://reactjs.org). 

## Prerequisites

Verify the following before running this demo:

*  You have downloaded and installed [Node.js](https://nodejs.org).

*  You have downloaded and installed the [DFINITY Canister
   SDK](https://sdk.dfinity.org).

*  You have stopped any Internet Computer or other network process that would
   create a port conflict on 8000.

## Run for FE

1. Build your front-end.

   ```text
   npm install
   ```
   
 ```text
   npm start
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

OLD: fij5p-siaaa-aaaai-acata-cai
etbto-7qaaa-aaaal-qbb7a-cai
a5byq-6yaaa-aaaag-aasfa-cai

nlkge-xljmr-ka24r-mqpos-26zmt-npzuv-al5l5-sdstv-bddyd-ohaut-nae

ADD CYCLES TO WALLET
dfx ledger --network ic top-up gastn-uqaaa-aaaae-aaafq-cai --amount 1.005

dfx deploy --network ic --argument="(principal \"$(dfx identity get-principal)\")" 

dfx canister --network ic install superheroes --argument="(principal \"$(dfx identity get-principal)\")" --mode=reinstall

