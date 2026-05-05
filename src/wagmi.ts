import { http, createConfig } from 'wagmi'
import { mainnet, polygon, base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, polygon, base],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
  },
})
