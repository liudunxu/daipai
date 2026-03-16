import { useState, useEffect, useCallback } from 'react'
import { INITIAL_CAPITAL } from '../constants'

/**
 * 股票持仓管理 Hook
 */
export function useStockPortfolio() {
  const [cash, setCash] = useState(INITIAL_CAPITAL)
  const [holdings, setHoldings] = useState([])
  const [weekStart, setWeekStart] = useState(null)
  const [weekProfit, setWeekProfit] = useState(0)
  const [records, setRecords] = useState([])
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentWeekOperations, setCurrentWeekOperations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 获取持仓数据
  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/stock/portfolio')
      const data = await res.json()
      setCash(data.cash)
      setHoldings(data.holdings || [])
      setWeekStart(data.weekStart)
      setWeekProfit(data.weekProfit || 0)
      setRecords(data.records || [])
      setCurrentWeek(data.currentWeek)
      setCurrentWeekOperations(data.currentWeekOperations || [])
    } catch (err) {
      console.error('获取持仓失败:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPortfolio()
  }, [fetchPortfolio])

  // 买入
  const buy = useCallback(async (code, shares, price) => {
    const res = await fetch('/api/stock/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'buy', code, shares, price })
    })
    const data = await res.json()
    if (data.success) {
      await fetchPortfolio()
    }
    return data
  }, [fetchPortfolio])

  // 卖出
  const sell = useCallback(async (code, shares, price) => {
    const res = await fetch('/api/stock/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sell', code, shares, price })
    })
    const data = await res.json()
    if (data.success) {
      await fetchPortfolio()
    }
    return data
  }, [fetchPortfolio])

  return {
    cash,
    holdings,
    weekStart,
    weekProfit,
    records,
    currentWeek,
    currentWeekOperations,
    isLoading,
    fetchPortfolio,
    buy,
    sell,
  }
}
