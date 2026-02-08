import type { FinanceItem } from '@/types';

/** 盎司转克 */
const TROY_OUNCE_TO_GRAM = 31.1035;

interface GoldApiResponse {
  items: Array<{
    xauPrice: number;
    chgXau: number;
    pcXau: number;
  }>;
}

interface CoinGeckoResponse {
  bitcoin?: { usd: number; usd_24h_change: number };
  dogecoin?: { usd: number; usd_24h_change: number };
  v2ex?: { usd: number; usd_24h_change: number };
}

/**
 * 获取国内金价（元/克）
 */
async function fetchGoldPrice(signal?: AbortSignal): Promise<FinanceItem> {
  const res = await fetch('https://data-asg.goldprice.org/dbXRates/CNY', { signal });
  const data: GoldApiResponse = await res.json();
  const gold = data.items[0];
  const pricePerGram = gold.xauPrice / TROY_OUNCE_TO_GRAM;
  const changePerGram = gold.chgXau / TROY_OUNCE_TO_GRAM;

  return {
    id: 'gold',
    name: '金条',
    price: Math.round(pricePerGram * 100) / 100,
    change: Math.round(changePerGram * 100) / 100,
    unit: '¥/g',
  };
}

/**
 * 获取加密货币价格（BTC / DOGE / VXV）
 */
async function fetchCryptoPrices(signal?: AbortSignal): Promise<FinanceItem[]> {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin,v2ex&vs_currencies=usd&include_24hr_change=true';
  const res = await fetch(url, { signal });
  const data: CoinGeckoResponse = await res.json();

  const items: FinanceItem[] = [];

  if (data.bitcoin) {
    items.push({
      id: 'btc',
      name: 'BTC',
      price: Math.round(data.bitcoin.usd * 100) / 100,
      change: Math.round(data.bitcoin.usd_24h_change * 100) / 100,
      unit: '$',
    });
  }

  if (data.dogecoin) {
    items.push({
      id: 'doge',
      name: 'DOGE',
      price: Math.round(data.dogecoin.usd * 10000) / 10000,
      change: Math.round(data.dogecoin.usd_24h_change * 100) / 100,
      unit: '$',
    });
  }

  if (data.v2ex) {
    items.push({
      id: 'v2ex',
      name: 'V2EX',
      price: Math.round(data.v2ex.usd * 10000) / 10000,
      change: Math.round(data.v2ex.usd_24h_change * 100) / 100,
      unit: '$',
    });
  }

  return items;
}

/** 接口失败时的占位数据 */
const FALLBACK_GOLD: FinanceItem = { id: 'gold', name: '金条', price: null, change: null, unit: '¥/g' };
const FALLBACK_CRYPTO: FinanceItem[] = [
  { id: 'btc', name: 'BTC', price: null, change: null, unit: '$' },
  { id: 'doge', name: 'DOGE', price: null, change: null, unit: '$' },
  { id: 'v2ex', name: 'v2ex', price: null, change: null, unit: '$' },
];

/**
 * 并行获取所有金融数据，单个失败不影响其他，失败项显示占位
 */
export async function fetchAllFinanceData(signal?: AbortSignal): Promise<FinanceItem[]> {
  const [goldResult, cryptoResult] = await Promise.allSettled([
    fetchGoldPrice(signal),
    fetchCryptoPrices(signal),
  ]);

  const gold = goldResult.status === 'fulfilled' ? goldResult.value : FALLBACK_GOLD;
  const crypto = cryptoResult.status === 'fulfilled' ? cryptoResult.value : FALLBACK_CRYPTO;

  return [gold, ...crypto];
}
