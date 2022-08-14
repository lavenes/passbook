import React from 'react';
import RootStack from "@navigation/RootStack";
import { defaultProviders } from "@connect2ic/core/providers"
import { createClient } from "@connect2ic/core"
import { Connect2ICProvider } from "@connect2ic/react"
import { AstroX } from "@connect2ic/core/providers/astrox"
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet"
import * as superheroes from '../declarations/superheroes.did.js';
import { canisterId } from '../declarations';
import { idlFactory } from '../declarations/superheroes.did.js';
import "@connect2ic/core/style.css"

const client = createClient({
  canisters: {
    superheroes: {
      canisterId,
      idlFactory
    }
  },
  providers: [
    new PlugWallet()
  ],
  host: window.location.origin,
})

function App() {
  return (
    <Connect2ICProvider client={client}>
      <RootStack />
    </Connect2ICProvider>
  );
}

export default App;