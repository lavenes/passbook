import React from 'react';
import RootStack from "@navigation/RootStack";
import * as superheroes from '../declarations/superheroes.did.js';
import { canisterId } from '../declarations';
import { idlFactory } from '../declarations/superheroes.did.js';

function App() {
  return (
    <RootStack />
  );
}

export default App;