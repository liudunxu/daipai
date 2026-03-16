// 股票相关常量配置

export const STOCKS = {
  '600519': { name: '贵州茅台', yahoo: '600519.SS' },
  '300750': { name: '宁德时代', yahoo: '300750.SZ' },
  '002594': { name: '比亚迪', yahoo: '002594.SZ' },
  '513310': { name: '中韩半导体ETF', yahoo: '513310.SS' },
  '603986': { name: '兆易创新', yahoo: '603986.SS' },
  '601138': { name: '工业富联', yahoo: '601138.SS' },
  '002475': { name: '立讯精密', yahoo: '002475.SZ' },
  '002156': { name: '通富微电', yahoo: '002156.SZ' },
  '601020': { name: '华钰矿业', yahoo: '601020.SS' },
  '600036': { name: '招商银行', yahoo: '600036.SS' },
  '000333': { name: '美的集团', yahoo: '000333.SZ' },
  '603191': { name: '望变电气', yahoo: '603191.SS' },
  '600089': { name: '特变电工', yahoo: '600089.SS' },
  '000617': { name: '中油资本', yahoo: '000617.SZ' },
  '601318': { name: '中国平安', yahoo: '601318.SS' },
  '601012': { name: '隆基绿能', yahoo: '601012.SS' },
  '600276': { name: '恒瑞医药', yahoo: '600276.SS' },
  '603259': { name: '药明康德', yahoo: '603259.SS' },
  '000858': { name: '五粮液', yahoo: '000858.SZ' },
  '600900': { name: '长江电力', yahoo: '600900.SS' },
  '600111': { name: '北方稀土', yahoo: '600111.SS' },
}

// 转换为前端使用的数组格式
export const STOCKS_LIST = Object.entries(STOCKS).map(([code, data]) => ({
  code,
  name: data.name,
  yahoo: data.yahoo,
}))

// 默认股票
export const DEFAULT_STOCK = STOCKS_LIST[5] // 工业富联

// 初始资金
export const INITIAL_CAPITAL = 1000000

// Redis keys
export const REDIS_KEYS = {
  PORTFOLIO: 'stock:portfolio',
  TRADES: 'stock:trades',
  HISTORY: 'stock:history',
}
