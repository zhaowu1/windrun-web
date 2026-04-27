import React, { useState, useEffect } from 'react'

interface Player {
  rank: number
  rankPrev: number
  name: string
  avatar: string
  rating: number
  ratingPrev: number
  winRate: number
  wins: number
  losses: number
  region: 'EU' | 'SEA' | 'China' | 'Americas' | 'Global'
}

const Ranking: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRegion, setActiveRegion] = useState<'Global' | 'EU' | 'SEA' | 'China' | 'Americas'>('Global')
  const [sortBy, setSortBy] = useState<'rating' | 'winRate'>('rating')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockPlayers: Player[] = [
        { rank: 1, rankPrev: 2, name: 'Dendi', avatar: '🎮', rating: 2850, ratingPrev: 2820, winRate: 72.5, wins: 892, losses: 339, region: 'EU' },
        { rank: 2, rankPrev: 1, name: 'Miracle', avatar: '🌟', rating: 2835, ratingPrev: 2845, winRate: 71.2, wins: 756, losses: 306, region: 'EU' },
        { rank: 3, rankPrev: 4, name: 'Topson', avatar: '🎯', rating: 2820, ratingPrev: 2795, winRate: 69.8, wins: 698, losses: 301, region: 'EU' },
        { rank: 4, rankPrev: 3, name: 'N0tail', avatar: '👑', rating: 2815, ratingPrev: 2805, winRate: 68.5, wins: 645, losses: 297, region: 'EU' },
        { rank: 5, rankPrev: 7, name: 'Ceb', avatar: '🎮', rating: 2798, ratingPrev: 2765, winRate: 67.2, wins: 598, losses: 292, region: 'EU' },
        { rank: 6, rankPrev: 5, name: 'SumaiL', avatar: '🌟', rating: 2785, ratingPrev: 2780, winRate: 66.8, wins: 534, losses: 265, region: 'Americas' },
        { rank: 7, rankPrev: 6, name: 'Abed', avatar: '🎮', rating: 2772, ratingPrev: 2775, winRate: 65.5, wins: 489, losses: 257, region: 'Americas' },
        { rank: 8, rankPrev: 12, name: 'Eurus', avatar: '🌊', rating: 2765, ratingPrev: 2720, winRate: 64.9, wins: 456, losses: 246, region: 'China' },
        { rank: 9, rankPrev: 8, name: 'Ori', avatar: '🎯', rating: 2758, ratingPrev: 2745, winRate: 64.2, wins: 423, losses: 235, region: 'China' },
        { rank: 10, rankPrev: 9, name: 'emo', avatar: '🌟', rating: 2745, ratingPrev: 2735, winRate: 63.5, wins: 398, losses: 229, region: 'China' },
        { rank: 11, rankPrev: 15, name: 'MidOne', avatar: '🎮', rating: 2738, ratingPrev: 2695, winRate: 62.8, wins: 367, losses: 218, region: 'SEA' },
        { rank: 12, rankPrev: 10, name: 'Kaka', avatar: '🌟', rating: 2725, ratingPrev: 2720, winRate: 62.1, wins: 345, losses: 211, region: 'SEA' },
        { rank: 13, rankPrev: 11, name: 'GABEV', avatar: '🎮', rating: 2715, ratingPrev: 2715, winRate: 61.5, wins: 312, losses: 195, region: 'Americas' },
        { rank: 14, rankPrev: 13, name: 'RAMZES', avatar: '🌟', rating: 2708, ratingPrev: 2705, winRate: 60.9, wins: 289, losses: 185, region: 'EU' },
        { rank: 15, rankPrev: 18, name: 'Saksa', avatar: '🎮', rating: 2698, ratingPrev: 2675, winRate: 60.2, wins: 267, losses: 176, region: 'EU' },
      ]
      setPlayers(mockPlayers)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const regions: Array<'Global' | 'EU' | 'SEA' | 'China' | 'Americas'> = ['Global', 'EU', 'SEA', 'China', 'Americas']

  const filteredPlayers = players.filter(player => {
    if (activeRegion === 'Global') return true
    return player.region === activeRegion
  })

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]
    return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
  })

  const handleSort = (column: 'rating' | 'winRate') => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('desc')
    }
  }

  const getRankChange = (current: number, prev: number) => {
    const diff = prev - current
    if (diff > 0) return { color: '#51cf66', text: `↑${diff}`, symbol: 'up' }
    if (diff < 0) return { color: '#ff6b6b', text: `↓${Math.abs(diff)}`, symbol: 'down' }
    return { color: '#868e96', text: '-', symbol: 'same' }
  }

  const getRegionFlag = (region: string) => {
    switch (region) {
      case 'EU': return '🇪🇺'
      case 'SEA': return '🌏'
      case 'China': return '🇨🇳'
      case 'Americas': return '🌎'
      default: return '🌐'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ff88]"></div>
      </div>
    )
  }

  return (
    <div className="ranking-page">
      {/* Region Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeRegion === region
                ? 'bg-[#00ff88] text-black'
                : 'bg-[#1a1a2e] text-[#868e96] hover:bg-[#2d2d44]'
            }`}
          >
            {getRegionFlag(region)} {region}
          </button>
        ))}
      </div>

      {/* Header Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-[#868e96]">
        <span>{sortedPlayers.length} Players</span>
        <span>•</span>
        <span>Top 100 Global Leaderboard</span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#868e96] border-b border-[#2d2d44]">
              <th className="text-left py-3 px-2 font-medium">Rank</th>
              <th className="text-left py-3 px-2 font-medium">Player</th>
              <th className="text-center py-3 px-2 font-medium">Region</th>
              <th
                className="text-center py-3 px-2 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('rating')}
              >
                Rating {sortBy === 'rating' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th className="text-center py-3 px-2 font-medium">Change</th>
              <th
                className="text-center py-3 px-2 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('winRate')}
              >
                Win Rate {sortBy === 'winRate' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th className="text-center py-3 px-2 font-medium">W/L</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => {
              const rankChange = getRankChange(player.rank, player.rankPrev)
              return (
                <tr key={player.rank} className="border-b border-[#2d2d44] hover:bg-[#1a1a2e] transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${index < 3 ? 'text-[#ffd700]' : index < 10 ? 'text-[#adb5bd]' : 'text-[#868e96]'}`}>
                        #{player.rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{player.avatar}</span>
                      <div>
                        <div className="font-medium text-white">{player.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-lg">{getRegionFlag(player.region)}</span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <span className="font-bold text-[#00ff88]">{player.rating}</span>
                  </td>
                  <td className={`text-center py-3 px-2 font-medium ${rankChange.color}`}>
                    {rankChange.text}
                  </td>
                  <td className={`text-center py-3 px-2 font-medium ${player.winRate >= 60 ? 'text-[#51cf66]' : player.winRate >= 50 ? 'text-white' : 'text-[#ff6b6b]'}`}>
                    {player.winRate.toFixed(1)}%
                  </td>
                  <td className="text-center py-3 px-2 text-[#868e96]">
                    <span className="text-[#51cf66]">{player.wins}</span>
                    <span> / </span>
                    <span className="text-[#ff6b6b]">{player.losses}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {sortedPlayers.map((player, index) => {
          const rankChange = getRankChange(player.rank, player.rankPrev)
          return (
            <div key={player.rank} className="bg-[#1a1a2e] rounded-lg p-3 border border-[#2d2d44]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-lg ${index < 3 ? 'text-[#ffd700]' : 'text-[#868e96]'}`}>
                    #{player.rank}
                  </span>
                  <span className="text-lg">{player.avatar}</span>
                  <div>
                    <div className="font-medium text-white">{player.name}</div>
                    <div className="text-xs text-[#868e96]">{getRegionFlag(player.region)} {player.region}</div>
                  </div>
                </div>
                <span className={`font-bold text-[#00ff88] text-lg`}>{player.rating}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={player.winRate >= 60 ? 'text-[#51cf66]' : player.winRate >= 50 ? 'text-white' : 'text-[#ff6b6b]'}>
                  WR: {player.winRate.toFixed(1)}%
                </span>
                <span className={rankChange.color}>{rankChange.text}</span>
                <span className="text-[#868e96]">
                  <span className="text-[#51cf66]">{player.wins}</span> / <span className="text-[#ff6b6b]">{player.losses}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {sortedPlayers.length === 0 && (
        <div className="text-center py-12 text-[#868e96]">
          <div className="text-4xl mb-4">👥</div>
          <div>No players in this region</div>
        </div>
      )}
    </div>
  )
}

export default Ranking
