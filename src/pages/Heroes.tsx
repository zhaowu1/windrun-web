import React, { useState, useEffect } from 'react'

interface Hero {
  id: number
  name: string
  nameEn: string
  attribute: 'str' | 'agi' | 'int'
  winRate: number
  winRatePrev: number
  pickRate: number
  pickRatePrev: number
  kda: number
  games: number
  proPick: number
}

const Heroes: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'winRate' | 'pickRate' | 'name'>('winRate')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [activeAttr, setActiveAttr] = useState<'all' | 'str' | 'agi' | 'int'>('all')

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockHeroes: Hero[] = [
        { id: 1, name: '风行者', nameEn: 'Windranger', attribute: 'agi', winRate: 52.3, winRatePrev: 51.8, pickRate: 18.5, pickRatePrev: 17.2, kda: 3.8, games: 245000, proPick: 456 },
        { id: 2, name: '剑圣', nameEn: 'Juggernaut', attribute: 'agi', winRate: 51.2, winRatePrev: 50.5, pickRate: 22.3, pickRatePrev: 21.8, kda: 4.1, games: 312000, proPick: 789 },
        { id: 3, name: '影魔', nameEn: 'Shadow Fiend', attribute: 'agi', winRate: 53.8, winRatePrev: 52.1, pickRate: 24.6, pickRatePrev: 23.1, kda: 4.5, games: 389000, proPick: 923 },
        { id: 4, name: '白虎', nameEn: 'Mirana', attribute: 'agi', winRate: 50.1, winRatePrev: 51.2, pickRate: 19.2, pickRatePrev: 20.5, kda: 3.6, games: 278000, proPick: 567 },
        { id: 5, name: '火枪', nameEn: 'Sniper', attribute: 'agi', winRate: 48.5, winRatePrev: 49.2, pickRate: 15.8, pickRatePrev: 16.3, kda: 2.9, games: 198000, proPick: 234 },
        { id: 6, name: '小黑', nameEn: 'Drow Ranger', attribute: 'agi', winRate: 49.8, winRatePrev: 48.5, pickRate: 14.2, pickRatePrev: 13.8, kda: 3.2, games: 176000, proPick: 189 },
        { id: 7, name: '潮汐', nameEn: 'Tidehunter', attribute: 'str', winRate: 54.2, winRatePrev: 53.5, pickRate: 12.8, pickRatePrev: 12.1, kda: 4.8, games: 156000, proPick: 345 },
        { id: 8, name: '术士', nameEn: 'Warlock', attribute: 'int', winRate: 52.8, winRatePrev: 51.9, pickRate: 11.5, pickRatePrev: 10.8, kda: 5.2, games: 142000, proPick: 278 },
        { id: 9, name: '敌法', nameEn: 'Anti-Mage', attribute: 'agi', winRate: 55.3, winRatePrev: 54.8, pickRate: 16.8, pickRatePrev: 15.2, kda: 4.9, games: 245000, proPick: 567 },
        { id: 10, name: '斧王', nameEn: 'Axe', attribute: 'str', winRate: 56.1, winRatePrev: 55.3, pickRate: 14.5, pickRatePrev: 13.9, kda: 3.8, games: 189000, proPick: 456 },
        { id: 11, name: '骨法', nameEn: 'Pugna', attribute: 'int', winRate: 51.5, winRatePrev: 50.8, pickRate: 10.2, pickRatePrev: 9.8, kda: 4.1, games: 128000, proPick: 234 },
        { id: 12, name: '痛苦', nameEn: 'Night Stalker', attribute: 'str', winRate: 53.2, winRatePrev: 52.6, pickRate: 11.8, pickRatePrev: 11.2, kda: 4.3, games: 145000, proPick: 289 },
        { id: 13, name: 'Lina', nameEn: 'Lina', attribute: 'int', winRate: 54.8, winRatePrev: 53.2, pickRate: 19.5, pickRatePrev: 18.1, kda: 4.7, games: 267000, proPick: 678 },
        { id: 14, name: 'Lion', nameEn: 'Lion', attribute: 'int', winRate: 52.1, winRatePrev: 51.5, pickRate: 22.8, pickRatePrev: 21.5, kda: 4.9, games: 312000, proPick: 890 },
        { id: 15, name: 'SK', nameEn: 'Sand King', attribute: 'str', winRate: 50.8, winRatePrev: 51.2, pickRate: 13.5, pickRatePrev: 14.1, kda: 4.2, games: 168000, proPick: 345 },
      ]
      setHeroes(mockHeroes)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const getAttrColor = (attr: string) => {
    switch (attr) {
      case 'str': return '#ff6b6b'
      case 'agi': return '#51cf66'
      case 'int': return '#339af0'
      default: return '#adb5bd'
    }
  }

  const getDeltaStyle = (current: number, prev: number) => {
    const delta = current - prev
    if (delta > 0) return { color: '#51cf66', symbol: '+' }
    if (delta < 0) return { color: '#ff6b6b', symbol: '' }
    return { color: '#adb5bd', symbol: '' }
  }

  const filteredHeroes = heroes.filter(hero => {
    const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hero.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAttr = activeAttr === 'all' || hero.attribute === activeAttr
    return matchesSearch && matchesAttr
  })

  const sortedHeroes = [...filteredHeroes].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]
    if (sortBy === 'name') {
      aVal = a.name.localeCompare(b.name) as any
      bVal = b.name.localeCompare(a.name) as any
    }
    return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
  })

  const handleSort = (column: 'winRate' | 'pickRate' | 'name') => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('desc')
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
    return num.toString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ff88]"></div>
      </div>
    )
  }

  return (
    <div className="heroes-page">
      {/* Header Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-[#868e96]">
        <span>{sortedHeroes.length} Heroes</span>
        <span>•</span>
        <span>{formatNumber(heroes.reduce((acc, h) => acc + h.games, 0))} Games</span>
      </div>

      {/* Search & Filters */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search heroes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg text-white placeholder-[#495057] focus:outline-none focus:border-[#00ff88]"
        />
      </div>

      {/* Attribute Tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'str', 'agi', 'int'] as const).map(attr => (
          <button
            key={attr}
            onClick={() => setActiveAttr(attr)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              activeAttr === attr
                ? attr === 'str' ? 'bg-[#ff6b6b] text-white' :
                  attr === 'agi' ? 'bg-[#51cf66] text-white' :
                  attr === 'int' ? 'bg-[#339af0] text-white' :
                  'bg-[#00ff88] text-black'
                : 'bg-[#1a1a2e] text-[#868e96] hover:bg-[#2d2d44]'
            }`}
          >
            {attr === 'all' ? 'All' : attr.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#868e96] border-b border-[#2d2d44]">
              <th className="text-left py-3 px-2 font-medium">Hero</th>
              <th className="text-center py-3 px-2 font-medium">Prev WR</th>
              <th
                className="text-center py-3 px-2 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('winRate')}
              >
                Win Rate {sortBy === 'winRate' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th className="text-center py-3 px-2 font-medium">ΔWR</th>
              <th
                className="text-center py-3 px-2 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('pickRate')}
              >
                Pick Rate {sortBy === 'pickRate' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th className="text-center py-3 px-2 font-medium">ΔPR</th>
              <th className="text-center py-3 px-2 font-medium">KDA</th>
              <th className="text-center py-3 px-2 font-medium">Games</th>
            </tr>
          </thead>
          <tbody>
            {sortedHeroes.map(hero => {
              const wrDelta = getDeltaStyle(hero.winRate, hero.winRatePrev)
              const prDelta = getDeltaStyle(hero.pickRate, hero.pickRatePrev)
              return (
                <tr key={hero.id} className="border-b border-[#2d2d44] hover:bg-[#1a1a2e] transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getAttrColor(hero.attribute) === '#51cf66' ? '🌿' : getAttrColor(hero.attribute) === '#339af0' ? '💧' : '🔥'}</span>
                      <div>
                        <div className="font-medium text-white">{hero.name}</div>
                        <div className="text-xs text-[#868e96]">{hero.nameEn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-3 px-2 text-[#868e96]">{hero.winRatePrev.toFixed(1)}%</td>
                  <td className={`text-center py-3 px-2 font-medium ${hero.winRate >= 50 ? 'text-[#51cf66]' : 'text-[#ff6b6b]'}`}>
                    {hero.winRate.toFixed(1)}%
                    <div className="w-full bg-[#2d2d44] rounded-full h-1 mt-1">
                      <div
                        className={`h-1 rounded-full ${hero.winRate >= 50 ? 'bg-[#51cf66]' : 'bg-[#ff6b6b]'}`}
                        style={{ width: `${hero.winRate}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className={`text-center py-3 px-2 ${wrDelta.color}`}>
                    {wrDelta.symbol}{(hero.winRate - hero.winRatePrev).toFixed(1)}
                  </td>
                  <td className="text-center py-3 px-2 text-white">{hero.pickRate.toFixed(1)}%</td>
                  <td className={`text-center py-3 px-2 ${prDelta.color}`}>
                    {prDelta.symbol}{(hero.pickRate - hero.pickRatePrev).toFixed(1)}
                  </td>
                  <td className="text-center py-3 px-2 text-white">{hero.kda.toFixed(1)}</td>
                  <td className="text-center py-3 px-2 text-[#868e96]">{formatNumber(hero.games)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {sortedHeroes.map(hero => {
          const wrDelta = getDeltaStyle(hero.winRate, hero.winRatePrev)
          return (
            <div key={hero.id} className="bg-[#1a1a2e] rounded-lg p-3 border border-[#2d2d44]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getAttrColor(hero.attribute) === '#51cf66' ? '🌿' : getAttrColor(hero.attribute) === '#339af0' ? '💧' : '🔥'}</span>
                  <div>
                    <div className="font-medium text-white">{hero.name}</div>
                    <div className="text-xs text-[#868e96]">{hero.nameEn}</div>
                  </div>
                </div>
                <span className={`text-lg font-bold ${hero.winRate >= 50 ? 'text-[#51cf66]' : 'text-[#ff6b6b]'}`}>
                  {hero.winRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#868e96]">
                <span>出场 {hero.pickRate.toFixed(1)}%</span>
                <span className={wrDelta.color}>ΔWR {wrDelta.symbol}{(hero.winRate - hero.winRatePrev).toFixed(1)}</span>
              </div>
            </div>
          )
        })}
      </div>

      {sortedHeroes.length === 0 && (
        <div className="text-center py-12 text-[#868e96]">
          <div className="text-4xl mb-4">🔍</div>
          <div>没有找到匹配的英雄</div>
        </div>
      )}
    </div>
  )
}

export default Heroes
