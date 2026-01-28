// wstETH Earnings Calculator for Arbitrum
// Calculates your yield earnings from holding wstETH

const { ethers } = require('ethers');

// Arbitrum RPC (public)
const RPC_URL = 'https://arb1.arbitrum.io/rpc';

// Contract addresses on Arbitrum
const WSTETH_ADDRESS = '0x5979D7b546E38E414F7E9822514be443A4800529';
const CHAINLINK_RATE_FEED = '0xB1552C5e96B312d0Bf8b554186F846C40614a540';

// ABIs (minimal)
const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)'
];

const CHAINLINK_ABI = [
  'function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
  'function decimals() view returns (uint8)'
];

async function getWstETHEarnings(walletAddress, entryRate = null) {
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // Connect to contracts
  const wstETH = new ethers.Contract(WSTETH_ADDRESS, ERC20_ABI, provider);
  const rateFeed = new ethers.Contract(CHAINLINK_RATE_FEED, CHAINLINK_ABI, provider);

  // Get current data
  const [balance, rateData, rateDecimals] = await Promise.all([
    wstETH.balanceOf(walletAddress),
    rateFeed.latestRoundData(),
    rateFeed.decimals()
  ]);

  // Current rate (stETH per wstETH)
  const currentRate = rateData.answer;
  const rateDecimalsFactor = 10n ** BigInt(rateDecimals);

  // Convert to human readable
  const balanceETH = Number(balance) / 1e18;
  const currentRateNum = Number(currentRate) / Number(rateDecimalsFactor);

  // Current value in stETH
  const valueInStETH = balanceETH * currentRateNum;

  console.log('\n=== wstETH Earnings Calculator (Arbitrum) ===\n');
  console.log(`Wallet: ${walletAddress}`);
  console.log(`wstETH Balance: ${balanceETH.toFixed(6)} wstETH`);
  console.log(`Current Rate: 1 wstETH = ${currentRateNum.toFixed(6)} stETH`);
  console.log(`Current Value: ${valueInStETH.toFixed(6)} stETH (~${valueInStETH.toFixed(6)} ETH)`);

  // If entry rate provided, calculate earnings
  if (entryRate) {
    const entryValue = balanceETH * entryRate;
    const earnings = valueInStETH - entryValue;
    const earningsPercent = ((currentRateNum / entryRate) - 1) * 100;

    console.log('\n--- Earnings Calculation ---');
    console.log(`Entry Rate: 1 wstETH = ${entryRate.toFixed(6)} stETH`);
    console.log(`Entry Value: ${entryValue.toFixed(6)} stETH`);
    console.log(`Earnings: ${earnings.toFixed(6)} stETH (${earningsPercent.toFixed(4)}%)`);

    // Estimate USD value (rough ETH price)
    const ethPrice = 3000; // Update this or fetch dynamically
    console.log(`Earnings (USD est.): ~$${(earnings * ethPrice).toFixed(2)}`);
  } else {
    console.log('\n💡 To calculate earnings, provide your entry rate:');
    console.log('   node wsteth-earnings.js <wallet> <entry_rate>');
    console.log('   Example: node wsteth-earnings.js 0x... 1.20');
  }

  console.log('\n--- Rate History Reference ---');
  console.log('Rate changes ~3-4% per year as staking rewards accrue.');
  console.log('Check your original swap tx to find your entry rate.');

  return {
    balance: balanceETH,
    currentRate: currentRateNum,
    valueInStETH,
    entryRate,
    earnings: entryRate ? valueInStETH - (balanceETH * entryRate) : null
  };
}

// CLI usage
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node wsteth-earnings.js <wallet_address> [entry_rate]');
  console.log('Example: node wsteth-earnings.js 0xD31E0CE8154Da6b8086d961eB3068Ef74C4322b6 1.20');
  process.exit(1);
}

const wallet = args[0];
const entryRate = args[1] ? parseFloat(args[1]) : null;

getWstETHEarnings(wallet, entryRate).catch(console.error);
