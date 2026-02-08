import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAllFinanceData } from '@/services/finance';
import type { FinanceItem } from '@/types';

/** 刷新间隔 45 秒 */
const REFRESH_INTERVAL = 45_000;

interface UseFinanceDataReturn {
  items: FinanceItem[];
  loading: boolean;
  updatedAt: number | null;
  refresh: () => void;
}

/**
 * 金融数据 Hook：自动每 30s 刷新，支持手动刷新
 */
export function useFinanceData(): UseFinanceDataReturn {
  const [items, setItems] = useState<FinanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const data = await fetchAllFinanceData(controller.signal);
      if (!controller.signal.aborted) {
        setItems(data);
        setUpdatedAt(Date.now());
      }
    } catch {
      /* 被 abort 或网络错误时静默 */
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, REFRESH_INTERVAL);
    return () => {
      clearInterval(timer);
      abortRef.current?.abort();
    };
  }, [load]);

  return { items, loading, updatedAt, refresh: load };
}
