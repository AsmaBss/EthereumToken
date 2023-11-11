'use client';
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { Profile } from './profile';


// Configuration des chaînes et des fournisseurs à utiliser 
// Dans ce cas, notre chaine est Ethereum Mainnet
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

// Création de la configuration wagmi
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
})

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  );
}
