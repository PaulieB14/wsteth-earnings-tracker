# wstETH Earnings Tracker (Arbitrum)

Track your wstETH staking earnings on Arbitrum.

## Live Demo

**[https://wsteth-earnings-tracker.vercel.app](https://wsteth-earnings-tracker.vercel.app)**

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
# Install dependencies
npm install

# Check your earnings
node wsteth-earnings.js <YOUR_WALLET_ADDRESS>

# With entry rate (to calculate actual earnings)
node wsteth-earnings.js <YOUR_WALLET_ADDRESS> 1.20
```

## How It Works

wstETH earns yield differently than stETH:
- **ETH**: Native Ethereum - no yield unless staked
- **stETH**: Lido's liquid staking token - balance increases daily (rebasing)
- **wstETH**: Wrapped stETH - balance stays same, but rate increases over time

**Why wstETH on Arbitrum?** Bridged tokens can't rebase, so L2s use wstETH. Your earnings show up as a higher wstETH→stETH exchange rate.

**Earnings Formula:**
```
Earnings = wstETH_balance × (current_rate - entry_rate)
```

## Finding Your Entry Rate

Look at your original swap transaction:
1. Go to [Arbiscan](https://arbiscan.io)
2. Find your WETH → wstETH swap
3. Divide: `WETH sent ÷ wstETH received = entry_rate`

**Example:** 33 WETH → 26.94 wstETH = **1.2247** entry rate

## Contracts Used

| Contract | Address |
|----------|---------|
| wstETH (Arbitrum) | [`0x5979D7b546E38E414F7E9822514be443A4800529`](https://arbiscan.io/token/0x5979D7b546E38E414F7E9822514be443A4800529) |
| Chainlink Rate Feed | [`0xB1552C5e96B312d0Bf8b554186F846C40614a540`](https://arbiscan.io/address/0xB1552C5e96B312d0Bf8b554186F846C40614a540) |

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PaulieB14/wsteth-earnings-tracker)

## Links

- [Lido Docs](https://docs.lido.fi)
- [@LidoFinance](https://x.com/lidofinance)
- [Chainlink Oracle](https://data.chain.link/arbitrum/mainnet/crypto-eth/wsteth-steth-exchange-rate)
