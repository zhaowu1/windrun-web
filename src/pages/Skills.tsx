import React, { useState, useEffect } from 'react'

interface Ability {
  id: number
  name: string
  nameEn: string
  heroName: string
  type: 'Ultimate' | 'Normal' | 'Aghanim' | 'Shard'
  winRate: number
  winRatePrev: number
  pickRate: number
  synergy: number
  tier: number
  hasAghs: boolean
  hasShard: boolean
}

const Skills: React.FC = () => {
  const [abilities, setAbilities] = useState<Ability[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'winRate' | 'pickRate' | 'synergy'>('synergy')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [activeType, setActiveType] = useState<'all' | 'Ultimate' | 'Normal' | 'Aghanim' | 'Shard'>('all')

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockAbilities: Ability[] = [
        { id: 1, name: '集中火力', nameEn: 'Focus Fire', heroName: '风行者', type: 'Ultimate', winRate: 58.2, winRatePrev: 56.8, pickRate: 12.5, synergy: 89, tier: 1, hasAghs: true, hasShard: false },
        { id: 2, name: '剑刃风暴', nameEn: 'Blade Fury', heroName: '剑圣', type: 'Ultimate', winRate: 55.3, winRatePrev: 54.1, pickRate: 18.2, synergy: 82, tier: 1, hasAghs: true, hasShard: true },
        { id: 3, name: '影压', nameEn: 'Shadowrazes', heroName: '影魔', type: 'Normal', winRate: 54.8, winRatePrev: 53.5, pickRate: 22.1, synergy: 78, tier: 2, hasAghs: false, hasShard: false },
        { id: 4, name: '星落', nameEn: 'Starstorm', heroName: '白虎', type: 'Ultimate', winRate: 53.2, winRatePrev: 52.8, pickRate: 15.8, synergy: 75, tier: 2, hasAghs: true, hasShard: false },
        { id: 5, name: '弹幕', nameEn: 'Assassinate', heroName: '火枪', type: 'Ultimate', winRate: 48.5, winRatePrev: 49.2, pickRate: 8.5, synergy: 65, tier: 3, hasAghs: false, hasShard: true },
        { id: 6, name: '王者之点', nameEn: 'Marksmanship', heroName: '小黑', type: 'Ultimate', winRate: 51.2, winRatePrev: 50.8, pickRate: 11.2, synergy: 71, tier: 2, hasAghs: true, hasShard: true },
        { id: 7, name: '潮汐使者', nameEn: 'Anchor Smash', heroName: '潮汐', type: 'Normal', winRate: 56.8, winRatePrev: 55.2, pickRate: 14.5, synergy: 77, tier: 1, hasAghs: false, hasShard: false },
        { id: 8, name: '暗言术', nameEn: 'Shadow Word', heroName: '术士', type: 'Normal', winRate: 54.2, winRatePrev: 53.8, pickRate: 16.8, synergy: 80, tier: 1, hasAghs: false, hasShard: true },
        { id: 9, name: '法力虚空', nameEn: 'Mana Void', heroName: '敌法', type: 'Ultimate', winRate: 57.5, winRatePrev: 56.2, pickRate: 10.5, synergy: 73, tier: 1, hasAghs: true, hasShard: false },
        { id: 10, name: '战斗饥渴', nameEn: 'Battle Hunger', heroName: '斧王', type: 'Normal', winRate: 58.8, winRatePrev: 57.5, pickRate: 19.2, synergy: 85, tier: 1, hasAghs: false, hasShard: false },
        { id: 11, name: '超声冲击波', nameEn: 'Nether Blast', heroName: '骨法', type: 'Normal', winRate: 52.5, winRatePrev: 51.8, pickRate: 13.5, synergy: 69, tier: 2, hasAghs: true, hasShard: true },
        { id: 12, name: '死亡', nameEn: 'Crippling Fear', heroName: '痛苦', type: 'Ultimate', winRate: 53.8, winRatePrev: 52.5, pickRate: 9.8, synergy: 67, tier: 2, hasAghs: false, hasShard: false },
        { id: 13, name: '光击阵', nameEn: 'Laguna Blade', heroName: 'Lina', type: 'Ultimate', winRate: 56.2, winRatePrev: 54.8, pickRate: 14.2, synergy: 76, tier: 1, hasAghs: true, hasShard: false },
        { id: 14, name: '妖术', nameEn: 'Hex', heroName: 'Lion', type: 'Normal', winRate: 55.8, winRatePrev: 54.5, pickRate: 25.5, synergy: 84, tier: 1, hasAghs: false, hasShard: true },
        { id: 15, name: '闪烁', nameEn: 'Blink', heroName: 'SK', type: 'Normal', winRate: 54.5, winRatePrev: 55.2, pickRate: 28.5, synergy: 91, tier: 1, hasAghs: false, hasShard: false },
      ]
      setAbilities(mockAbilities)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const getDeltaStyle = (current: number, prev: number) => {
    const delta = current - prev
    if (delta > 0) return { color: '#51cf66', symbol: '+' }
    if (delta < 0) return { color: '#ff6b6b', symbol: '' }
    return { color: '#adb5bd', symbol: '' }
  }

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return '#ffd700'
      case 2: return '#c0c0c0'
      case 3: return '#cd7f32'
      default: return '#868e96'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Ultimate': return '#ff6b6b'
      case 'Aghanim': return '#9b59b6'
      case 'Shard': return '#3498db'
      default: return '#51cf66'
    }
  }

  const filteredAbilities = abilities.filter(ability => {
    const matchesSearch = ability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ability.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ability.heroName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = activeType === 'all' || ability.type === activeType
    return matchesSearch && matchesType
  })

  const sortedAbilities = [...filteredAbilities].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]
    return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
  })

  const handleSort = (column: 'winRate' | 'pickRate' | 'synergy') => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('desc')
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
    <div className="skills-page">
      {/* Header Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-[#868e96]">
        <span>{sortedAbilities.length} Abilities</span>
        <span>•</span>
        <span>636 Total</span>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search abilities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg text-white placeholder-[#495057] focus:outline-none focus:border-[#00ff88]"
        />
      </div>

      {/* Type Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {(['all', 'Ultimate', 'Normal', 'Aghanim', 'Shard'] as const).map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap transition-colors ${
              activeType === type
                ? 'bg-[#00ff88] text-black'
                : 'bg-[#1a1a2e] text-[#868e96] hover:bg-[#2d2d44]'
            }`}
          >
            {type === 'all' ? 'All' : type}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#868e96] border-b border-[#2d2d44]">
              <th className="text-left py-3 px-2 font-medium">Ability</th>
              <th className="text-left py-3 px-2 font-medium">Hero</th>
              <th className="text-center py-3 px-2 font-medium">Type</th>
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
              <th
                className="text-center py-3 px-2 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('synergy')}
              >
                Synergy {sortBy === 'synergy' && (sortDir === 'desc' ? '↓' : '↑')}
              </th>
              <th className="text-center py-3 px-2 font-medium">Tier</th>
              <th className="text-center py-3 px-2 font-medium">A/S</th>
            </tr>
          </thead>
          <tbody>
            {sortedAbilities.map(ability => {
              const wrDelta = getDeltaStyle(ability.winRate, ability.winRatePrev)
              return (
                <tr key={ability.id} className="border-b border-[#2d2d44] hover:bg-[#1a1a2e] transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚡</span>
                      <div>
                        <div className="font-medium text-white">{ability.name}</div>
                        <div className="text-xs text-[#868e96]">{ability.nameEn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-[#868e96]">{ability.heroName}</td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: getTypeColor(ability.type) + '33', color: getTypeColor(ability.type) }}
                    >
                      {ability.type}
                    </span>
                  </td>
                  <td className={`text-center py-3 px-2 font-medium ${ability.winRate >= 50 ? 'text-[#51cf66]' : 'text-[#ff6b6b]'}`}>
                    {ability.winRate.toFixed(1)}%
                  </td>
                  <td className={`text-center py-3 px-2 ${wrDelta.color}`}>
                    {wrDelta.symbol}{(ability.winRate - ability.winRatePrev).toFixed(1)}
                  </td>
                  <td className="text-center py-3 px-2 text-white">{ability.pickRate.toFixed(1)}%</td>
                  <td className="text-center py-3 px-2">
                    <span className={`font-medium ${ability.synergy >= 80 ? 'text-[#ffd700]' : ability.synergy >= 60 ? 'text-[#51cf66]' : 'text-[#868e96]'}`}>
                      {ability.synergy}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{ backgroundColor: getTierColor(ability.tier) + '33', color: getTierColor(ability.tier) }}
                    >
                      T{ability.tier}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2 text-[#868e96] text-xs">
                    {ability.hasAghs ? 'A' : '-'} / {ability.hasShard ? 'S' : '-'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {sortedAbilities.map(ability => {
          const wrDelta = getDeltaStyle(ability.winRate, ability.winRatePrev)
          return (
            <div key={ability.id} className="bg-[#1a1a2e] rounded-lg p-3 border border-[#2d2d44]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <div>
                    <div className="font-medium text-white">{ability.name}</div>
                    <div className="text-xs text-[#868e96]">{ability.heroName}</div>
                  </div>
                </div>
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold"
                  style={{ backgroundColor: getTierColor(ability.tier) + '33', color: getTierColor(ability.tier) }}
                >
                  T{ability.tier}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className={ability.winRate >= 50 ? 'text-[#51cf66]' : 'text-[#ff6b6b]'}>
                  WR: {ability.winRate.toFixed(1)}% {wrDelta.symbol}{(ability.winRate - ability.winRatePrev).toFixed(1)}
                </span>
                <span className="text-[#868e96]">PR: {ability.pickRate.toFixed(1)}%</span>
                <span className={ability.synergy >= 80 ? 'text-[#ffd700]' : 'text-[#868e96]'}>
                  Syn: {ability.synergy}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {sortedAbilities.length === 0 && (
        <div className="text-center py-12 text-[#868e96]">
          <div className="text-4xl mb-4">🔍</div>
          <div>No abilities found</div>
        </div>
      )}
    </div>
  )
}

export default Skills
