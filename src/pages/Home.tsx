import React, { useState, useEffect } from 'react'

interface ChartData {
  label: string
  value: number
  color?: string
}

const BarChart: React.FC<{ data: ChartData[]; height?: number }> = ({ data, height = 200 }) => {
  const maxValue = Math.max(...data.map(d => d.value))
  const barWidth = 100 / data.length

  return (
    <div className="bar-chart" style={{ height }}>
      <div className="bar-chart-bars">
        {data.map((item, index) => (
          <div key={index} className="bar-chart-item" style={{ width: `${barWidth}%` }}>
            <div 
              className="bar-chart-bar" 
              style={{ 
                height: `${(item.value / maxValue) * 100}%`,
                background: item.color || 'var(--accent-primary)'
              }}
            />
            <span className="bar-chart-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const LineChart: React.FC<{ data: ChartData[]; height?: number }> = ({ data, height = 150 }) => {
  const maxValue = Math.max(...data.map(d => d.value))
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - (d.value / maxValue) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height, width: '100%' }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill="url(#lineGradient)" />
      <polyline points={points} fill="none" stroke="var(--accent-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [heroChartData, setHeroChartData] = useState<ChartData[]>([])
  const [winRateData, setWinRateData] = useState<ChartData[]>([])
  const [recentMatches, setRecentMatches] = useState<any[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroChartData([
        { label: '风行者', value: 98, color: '#00d4ff' },
        { label: '剑圣', value: 85, color: '#7c3aed' },
        { label: '影魔', value: 72, color: '#f59e0b' },
        { label: '白虎', value: 68, color: '#10b981' },
        { label: '火枪', value: 55, color: '#ef4444' },
        { label: '小黑', value: 48, color: '#8b5cf6' },
      ])
      setWinRateData([
        { label: '周一', value: 52 },
        { label: '周二', value: 48 },
        { label: '周三', value: 55 },
        { label: '周四', value: 51 },
        { label: '周五', value: 58 },
        { label: '周六', value: 62 },
        { label: '周日', value: 56 },
      ])
      setRecentMatches([
        { id: 1, hero: '风行者', result: '胜利', kda: '12/2/8', duration: '22分钟' },
        { id: 2, hero: '剑圣', result: '失败', kda: '5/8/3', duration: '31分钟' },
        { id: 3, hero: '白虎', result: '胜利', kda: '8/4/12', duration: '18分钟' },
      ])
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
      </div>
    )
  }

  return (
    <div className="home-page">
      <h2 className="section-title">数据概览</h2>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-value">128</div><div className="stat-label">英雄总数</div></div>
        <div className="stat-card"><div className="stat-value">2,847</div><div className="stat-label">今日对局</div></div>
        <div className="stat-card"><div className="stat-value">18.5分</div><div className="stat-label">平均时长</div></div>
        <div className="stat-card"><div className="stat-value">58.2%</div><div className="stat-label">最高胜率</div></div>
      </div>

      <div className="chart-container">
        <div className="chart-title">🔥 本周热门英雄</div>
        <BarChart data={heroChartData} height={180} />
      </div>

      <div className="chart-container">
        <div className="chart-title">📈 周胜率趋势</div>
        <LineChart data={winRateData} height={120} />
      </div>

      <h2 className="section-title">最近对局</h2>
      <div className="card">
        {recentMatches.map((match) => (
          <div key={match.id} className="ranking-item" style={{ marginBottom: match.id < recentMatches.length ? '12px' : 0 }}>
            <div className="ranking-avatar">⚔️</div>
            <div className="ranking-info">
              <div className="ranking-name">{match.hero}</div>
              <div className="ranking-detail">KDA: {match.kda} · {match.duration}</div>
            </div>
            <div className="ranking-score">
              <div className="ranking-score-value" style={{ color: match.result === '胜利' ? '#10b981' : '#ef4444' }}>
                {match.result}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
