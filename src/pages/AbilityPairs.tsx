import React, { useState, useEffect } from 'react'

interface AbilityPair {
  id: number
  ability1Name: string
  ability1Icon: string
  ability2Name: string
  ability2Icon: string
  synergy: number
  winRate: number
  pickRate: number
  count: number
  heroes: string[]
}

const AbilityPairs: React.FC = () => {
  const [pairs, setPairs] = useState<AbilityPair[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'synergy' | 'winRate' | 'pickRate' | 'count'>('synergy')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [excludeSameHero, setExcludeSameHero] = useState(true)
  const [showHiddenTriples, setShowHiddenTriples] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockPairs: AbilityPair[] = [
        { id: 1, ability1Name: '集中火力', ability1Icon: '⚡', ability2Name: '闪烁', ability2Icon: '💨', synergy: 95, winRate: 62.5, pickRate: 8.2, count: 15420, heroes: ['风行者', '剑圣'] },
        { id: 2, ability1Name: '剑刃风暴', ability1Icon: '🌀', ability2Name: '暗言术', ability2Icon: '💜', synergy: 92, winRate: 61.8, pickRate: 12.5, count: 23850, heroes: ['剑圣', '术士'] },
        { id: 3, ability1Name: '影压', ability1Icon: '👻', ability2Name: '超声冲击波', ability2Icon: '📢', synergy: 89, winRate: 60.2, pickRate: 9.8, count: 18560, heroes: ['影魔', '骨法'] },
        { id: 4, ability1Name: '星落', ability1Icon: '⭐', ability2Name: '跳跃', ability2Icon: '🦘', synergy: 87, winRate: 59.5, pickRate: 7.2, count: 12890, heroes: ['白虎', '白虎'] },
        { id: 5, ability1Name: '法力虚空', ability1Icon: '💙', ability2Name: '闪烁', ability2Icon: '💨', synergy: 91, winRate: 61.2, pickRate: 11.5, count: 21340, heroes: ['敌法', '敌法'] },
        { id: 6, ability1Name: '战斗饥渴', ability1Icon: '🩸', ability2Name: '嘲讽', ability2Icon: '😤', synergy: 94, winRate: 63.8, pickRate: 6.8, count: 9870, heroes: ['斧王', '斧王'] },
        { id: 7, ability1Name: '妖术', ability1Icon: '🐸', ability2Name: '羊', ability2Icon: '🐑', synergy: 96, winRate: 64.2, pickRate: 15.6, count: 28950, heroes: ['Lion', '小精灵'] },
        { id: 8, ability1Name: '暗言术', ability1Icon: '💜', ability2Name: '死亡', ability2Icon: '💀', synergy: 88, winRate: 59.8, pickRate: 8.9, count: 16780, heroes: ['术士', '痛苦'] },
        { id: 9, ability1Name: '潮汐使者', ability1Icon: '🌊', ability2Name: '锚击', ability2Icon: '⚓', synergy: 85, winRate: 58.5, pickRate: 5.4, count: 8230, heroes: ['潮汐', '潮汐'] },
        { id: 10, ability1Name: '光击阵', ability1Icon: '⚡', ability2Name: '闪烁', ability2Icon: '💨', synergy: 93, winRate: 62.8, pickRate: 10.2, count: 19230, heroes: ['Lina', 'Lina'] },
        { id: 11, ability1Name: '弹幕', ability1Icon: '🎯', ability2Name: '沉默', ability2Icon: '🤫', synergy: 82, winRate: 57.2, pickRate: 4.8, count: 7650, heroes: ['火枪', '火枪'] },
        { id: 12, ability1Name: '王者之点', ability1Icon: '🏹', ability2Name: '强攻', ability2Icon: '💪', synergy: 86, winRate: 59.0, pickRate: 6.5, count: 11240, heroes: ['小黑', '斯温'] },
      ]
      setPairs(mockPairs)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const getDeltaStyle = (value: number) => {
    if (value > 85) return { color: '#51cf66', bg: 'rgba(81, 207, 102, 0.1)' }
    if (value > 70) return { color: '#ffd700', bg: 'rgba(255, 215, 0, 0.1)' }
    return { color: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.1)' }
  }

  const filteredPairs = pairs.filter(pair => {
    const matchesSearch = pair.ability1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pair.ability2Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pair.heroes.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesExclude = !excludeSameHero || pair.heroes[0] !== pair.heroes[1]
    return matchesSearch && matchesExclude
  })

  const sortedPairs = [...filteredPairs].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal
  })

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(column)
      setSortDir('desc')
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">加载中...</div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚔️ 技能组合</h1>
        <p className="page-subtitle">技能协同分析 · 数据来自近期比赛</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索技能或英雄..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-toggles">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={excludeSameHero}
              onChange={(e) => setExcludeSameHero(e.target.checked)}
            />
            排除同英雄技能
          </label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showHiddenTriples}
              onChange={(e) => setShowHiddenTriples(e.target.checked)}
            />
            显示隐藏三元组
          </label>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort('synergy')}>
                技能组合 {sortBy === 'synergy' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th>所属英雄</th>
              <th className="sortable" onClick={() => handleSort('synergy')}>
                协同值 {sortBy === 'synergy' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th className="sortable" onClick={() => handleSort('winRate')}>
                胜率 {sortBy === 'winRate' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th className="sortable" onClick={() => handleSort('pickRate')}>
                选取率 {sortBy === 'pickRate' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th className="sortable" onClick={() => handleSort('count')}>
                出现次数 {sortBy === 'count' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPairs.map(pair => {
              const synergyStyle = getDeltaStyle(pair.synergy)
              return (
                <tr key={pair.id}>
                  <td>
                    <div className="ability-pair-cell">
                      <span className="ability-icon">{pair.ability1Icon}</span>
                      <span className="ability-name">{pair.ability1Name}</span>
                      <span className="ability-plus">+</span>
                      <span className="ability-icon">{pair.ability2Icon}</span>
                      <span className="ability-name">{pair.ability2Name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="heroes-cell">
                      {pair.heroes.map((hero, i) => (
                        <span key={i} className="hero-tag">{hero}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="synergy-badge" style={synergyStyle}>
                      {pair.synergy}
                    </span>
                  </td>
                  <td className="winrate-cell">{pair.winRate.toFixed(1)}%</td>
                  <td className="pickrate-cell">{pair.pickRate.toFixed(1)}%</td>
                  <td className="count-cell">{pair.count.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AbilityPairs
