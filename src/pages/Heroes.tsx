import React, { useState, useEffect } from 'react'

interface Hero {
  id: number
  name: string
  role: string
  winRate: number
  pickRate: number
  avatar: string
}

const Heroes: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('全部')

  const roles = ['全部', '战士', '法师', '坦克', '刺客', '辅助', '射手']

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockHeroes: Hero[] = [
        { id: 1, name: '风行者', role: '战士', winRate: 58.2, pickRate: 32.5, avatar: '💨' },
        { id: 2, name: '剑圣', role: '战士', winRate: 52.8, pickRate: 28.1, avatar: '⚔️' },
        { id: 3, name: '影魔', role: '法师', winRate: 51.5, pickRate: 24.3, avatar: '👹' },
        { id: 4, name: '白虎', role: '刺客', winRate: 55.6, pickRate: 19.8, avatar: '🏹' },
        { id: 5, name: '火枪', role: '射手', winRate: 49.2, pickRate: 22.7, avatar: '🔫' },
        { id: 6, name: '小黑', role: '射手', winRate: 53.1, pickRate: 18.5, avatar: '🏹' },
        { id: 7, name: '潮汐', role: '坦克', winRate: 56.8, pickRate: 15.2, avatar: '🌊' },
        { id: 8, name: '术士', role: '法师', winRate: 54.3, pickRate: 14.8, avatar: '🧙' },
        { id: 9, name: '敌法', role: '刺客', winRate: 50.5, pickRate: 21.3, avatar: '🗡️' },
        { id: 10, name: '斧王', role: '坦克', winRate: 57.2, pickRate: 16.9, avatar: '🪓' },
        { id: 11, name: '骨法', role: '法师', winRate: 52.1, pickRate: 12.4, avatar: '💀' },
        { id: 12, name: '痛苦之源', role: '辅助', winRate: 48.9, pickRate: 11.2, avatar: '👻' },
      ]
      setHeroes(mockHeroes)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const filteredHeroes = heroes.filter(hero => {
    const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = activeFilter === '全部' || hero.role === activeFilter
    return matchesSearch && matchesRole
  })

  if (loading) {
    return <div className="loading"><div className="loading-spinner" /></div>
  }

  return (
    <div className="heroes-page">
      <h1 className="page-title">英雄列表</h1>
      <input type="text" className="search-input" placeholder="🔍 搜索英雄..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="filter-tabs">
        {roles.map(role => (
          <button key={role} className={`filter-tab ${activeFilter === role ? 'active' : ''}`} onClick={() => setActiveFilter(role)}>
            {role}
          </button>
        ))}
      </div>
      <div className="card-grid">
        {filteredHeroes.map(hero => (
          <div key={hero.id} className="hero-card">
            <div className="hero-avatar">{hero.avatar}</div>
            <div className="hero-info">
              <div className="hero-name">{hero.name}</div>
              <span className="hero-role">{hero.role}</span>
              <div className="hero-stats">
                <span className="hero-stat">胜率: {hero.winRate}%</span>
                <span className="hero-stat">登场: {hero.pickRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredHeroes.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">没有找到匹配的英雄</div>
        </div>
      )}
    </div>
  )
}

export default Heroes
