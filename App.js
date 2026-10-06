import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Game from './src/Game.jsx';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Game />
    </>
  );
}
