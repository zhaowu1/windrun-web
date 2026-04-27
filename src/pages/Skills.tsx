import React, { useState, useEffect } from 'react'

interface Skill {
  id: number
  name: string
  type: string
  description: string
  icon: string
  cooldown?: string
  manaCost?: string
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('全部')

  const types = ['全部', '物理', '魔法', '终极', '被动']

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockSkills: Skill[] = [
        { id: 1, name: '风击', type: '物理', description: '向目标方向释放一道风刃，造成基于攻击力的伤害。', icon: '💨', cooldown: '8秒', manaCost: '50' },
        { id: 2, name: '旋风', type: '物理', description: '释放旋风攻击周围敌人，造成范围伤害并短暂击飞。', icon: '🌀', cooldown: '12秒', manaCost: '80' },
        { id: 3, name: '疾风步', type: '终极', description: '进入隐身状态，大幅提升移动速度，持续数秒。', icon: '💫', cooldown: '20秒' },
        { id: 4, name: '风暴之眼', type: '终极', description: '召唤风暴之眼，对区域内敌人造成持续伤害并减速。', icon: '⛈️', cooldown: '90秒', manaCost: '200' },
        { id: 5, name: '剑舞', type: '物理', description: '快速挥舞武器，对目标造成多次打击。', icon: '⚔️', cooldown: '10秒', manaCost: '60' },
        { id: 6, name: '镜像', type: '魔法', description: '创造一个自身的幻象，幻象可以攻击敌人。', icon: '👥', cooldown: '25秒', manaCost: '150' },
        { id: 7, name: '无敌斩', type: '终极', description: '跃向目标并造成致命伤害，伤害基于目标损失的生命值。', icon: '✨', cooldown: '100秒' },
        { id: 8, name: '影压', type: '魔法', description: '向三个方向释放暗影波纹，造成范围魔法伤害。', icon: '🌑', cooldown: '6秒', manaCost: '70' },
        { id: 9, name: '恶魔升华', type: '终极', description: '化为恶魔形态，获得额外属性并提升技能效果。', icon: '👹', cooldown: '80秒', manaCost: '180' },
        { id: 10, name: '幽冥爆轰', type: '魔法', description: '释放幽冥之力，对目标造成大量魔法伤害。', icon: '💥', cooldown: '15秒', manaCost: '120' },
        { id: 11, name: '闪烁', type: '物理', description: '瞬间移动到指定位置，可用于追击或逃跑。', icon: '⚡', cooldown: '5秒' },
        { id: 12, name: '月之暗面', type: '终极', description: '召唤月亮之力，使区域内所有敌人失去视野并减速。', icon: '🌙', cooldown: '70秒', manaCost: '175' },
      ]
      setSkills(mockSkills)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = activeFilter === '全部' || skill.type === activeFilter
    return matchesSearch && matchesType
  })

  if (loading) {
    return <div className="loading"><div className="loading-spinner" /></div>
  }

  return (
    <div className="skills-page">
      <h1 className="page-title">技能列表</h1>
      <input type="text" className="search-input" placeholder="🔍 搜索技能..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="filter-tabs">
        {types.map(type => (
          <button key={type} className={`filter-tab ${activeFilter === type ? 'active' : ''}`} onClick={() => setActiveFilter(type)}>
            {type}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSkills.map(skill => (
          <div key={skill.id} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-content">
              <div className="skill-name">{skill.name}</div>
              <div className="skill-desc">{skill.description}</div>
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="skill-type">{skill.type}</span>
                {skill.cooldown && <span className="skill-type" style={{ color: '#f59e0b' }}>⏱️ {skill.cooldown}</span>}
                {skill.manaCost && <span className="skill-type" style={{ color: '#3b82f6' }}>💧 {skill.manaCost}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredSkills.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">没有找到匹配的技能</div>
        </div>
      )}
    </div>
  )
}

export default Skills
