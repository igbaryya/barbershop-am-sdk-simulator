import React from 'react';
import Simulator from './components/Simulator';
import './App.css';
import {getInstance} from './sdk';

function App() {
  const sdkInstances = getInstance();
  return (
    <Simulator sdkInstanceNames={Object.keys(sdkInstances)} sdkInstances={sdkInstances} />
  );
}

export default App;
