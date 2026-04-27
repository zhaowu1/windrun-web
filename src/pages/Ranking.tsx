import React, { useState, useEffect } from 'react'

interface Player {
  id: number
  rank: number
  name: string
  avatar: string
  score: number
  winRate: number
  winCount: number
  hero: string
}

const Ranking: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('天梯')

  const filters = ['天梯', '胜率', 'MVP', '金币']

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockPlayers: Player[] = [
        { id: 1, rank: 1, name: '风暴之灵', avatar: '🌀', score: 2847, winRate: 72.5, winCount: 328, hero: '风行者' },
        { id: 2, rank: 2, name: '剑道', avatar: '⚔️', score: 2756, winRate: 68.2, winCount: 295, hero: '剑圣' },
        { id: 3, rank: 3, name: '暗夜传说', avatar: '🌙', score: 2698, winRate: 65.8, winCount: 271, hero: '白虎' },
        { id: 4, rank: 4, name: '虚空行者', avatar: '🕳️', score: 2634, winRate: 63.4, winCount: 258, hero: '敌法' },
        { id: 5, rank: 5, name: '深渊领主', avatar: '🌊', score: 2598, winRate: 61.9, winCount: 245, hero: '潮汐' },
        { id: 6, rank: 6, name: '影之传承', avatar: '👹', score: 2543, winRate: 60.2, winCount: 231, hero: '影魔' },
        { id: 7, rank: 7, name: '冰霜之魂', avatar: '❄️', score: 2489, winRate: 58.7, winCount: 218, hero: '骨法' },
        { id: 8, rank: 8, name: '烈焰战神', avatar: '🔥', score: 2434, winRate: 57.1, winCount: 204, hero: '斧王' },
        { id: 9, rank: 9, name: '暗影猎手', avatar: '🏹', score: 2387, winRate: 55.6, winCount: 192, hero: '小黑' },
        { id: 10, rank: 10, name: '死亡先知', avatar: '💀', score: 2321, winRate: 53.8, winCount: 178, hero: '术士' },
      ]
      setPlayers(mockPlayers)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const getPositionClass = (rank: number) => {
    if (rank === 1) return 'gold'
    if (rank === 2) return 'silver'
    if (rank === 3) return 'bronze'
    return 'normal'
  }

  if (loading) {
    return <div className="loading"><div className="loading-spinner" /></div>
  }

  return (
    <div className="ranking-page">
      <h1 className="page-title">排行榜</h1>
      <div className="filter-tabs">
        {filters.map(filter => (
          <button key={filter} className={`filter-tab ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)}>
            {filter}
          </button>
        ))}
      </div>
      <div className="ranking-list">
        {players.map(player => (
          <div key={player.id} className="ranking-item">
            <div className={`ranking-position ${getPositionClass(player.rank)}`}>
              {player.rank <= 3 ? (player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉') : player.rank}
            </div>
            <div className="ranking-avatar">{player.avatar}</div>
            <div className="ranking-info">
              <div className="ranking-name">{player.name}</div>
              <div className="ranking-detail">
                使用 {player.hero} · 胜率 {player.winRate}% · {player.winCount}胜
              </div>
            </div>
            <div className="ranking-score">
              <div className="ranking-score-value">{player.score.toLocaleString()}</div>
              <div className="ranking-score-label">积分</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ranking
