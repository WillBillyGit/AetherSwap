import { http, createConfig } from 'wagmi'
import { mainnet, polygon, base } from 'wagmi/chains'
import { coinbaseWallet, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, polygon, base],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Mystic Swap' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http('https://base-mainnet.infura.io/v3/1a56ff48dc324c0890bb5eb64be6df21'),
  },
})
