# wstETH Earnings Tracker

Track your wstETH staking earnings across Ethereum, Arbitrum, Optimism, Base & Polygon.

## Live Demo

**[https://wsteth-earnings-tracker.vercel.app](https://wsteth-earnings-tracker.vercel.app)**

## Features

- **Connect Wallet** — One-click MetaMask/Rabby/Coinbase Wallet connection
- **Multi-Chain** — Aggregates wstETH balances across Ethereum, Arbitrum, Optimism, Base & Polygon
- **ENS Support** — Enter `vitalik.eth` instead of a raw address
- **Auto-Detect Entry Rate** — Scans on-chain Transfer events to estimate your cost basis
- **Earnings Chart** — Interactive Chart.js visualization of wstETH/stETH rate over 7D/30D/90D
- **Live APY** — Estimated staking APY from Chainlink historical rate data
- **Shareable Links** — URL params for wallet, entry rate, and selected chains
- **Live Prices** — ETH & stETH prices from CoinGecko with stETH/ETH ratio

## Quick Start

### Option 1: Use the Live Dashboard
Visit the deployed app above - no install needed!

### Option 2: Run Locally
Just open `index.html` in your browser:
```bash
open index.html
```

### Option 3: Command Line
```bash
npm install
node wsteth-earnings.js <YOUR_WALLET_ADDRESS> [ENTRY_RATE]
```

## How It Works

- **ETH**: Native Ethereum - no yield unless staked
- **stETH**: Lido's liquid staking token - balance increases daily (rebasing, ~3-4% APR)
- **wstETH**: Wrapped stETH - balance stays constant, but rate increases over time

**Earnings Formula:**
```
Earnings = wstETH_balance × (current_rate - entry_rate)
```

## Finding Your Entry Rate

Click **Auto-Detect** in the dashboard to scan your transfer history automatically. Or find it manually:

1. Go to [Arbiscan](https://arbiscan.io) (or the relevant chain explorer)
2. Find your WETH → wstETH swap
3. Divide: `WETH sent ÷ wstETH received = entry_rate`

**Example:** 33 WETH → 26.94 wstETH = **1.2247** entry rate

## Contracts Used

| Chain | wstETH Address |
|-------|---------------|
| Ethereum | `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` |
| Arbitrum | `0x5979D7b546E38E414F7E9822514be443A4800529` |
| Optimism | `0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb` |
| Base | `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452` |
| Polygon | `0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD` |

Rate data from [Chainlink](https://data.chain.link/arbitrum/mainnet/crypto-eth/wsteth-steth-exchange-rate) (`0xB1552C5e96B312d0Bf8b554186F846C40614a540` on Arbitrum).

## Shareable URLs

```
https://wsteth-earnings-tracker.vercel.app/?wallet=0x...&entry=1.2247&chains=ethereum,arbitrum
```

Parameters:
- `wallet` — Wallet address or ENS name
- `entry` — Entry rate (stETH per wstETH)
- `chains` — Comma-separated chain list (ethereum, arbitrum, optimism, base, polygon)

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PaulieB14/wsteth-earnings-tracker)

## Links

- [Lido Docs](https://docs.lido.fi)
- [@LidoFinance](https://x.com/lidofinance)
- [Chainlink Oracle](https://data.chain.link/arbitrum/mainnet/crypto-eth/wsteth-steth-exchange-rate)
