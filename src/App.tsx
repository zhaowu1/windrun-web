import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Heroes from './pages/Heroes'
import Skills from './pages/Skills'
import Ranking from './pages/Ranking'
import AbilityPairs from './pages/AbilityPairs'
import './App.css'

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
)

const HeroesIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
  </svg>
)

const SkillsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.996.996 0 00-1.41 0L1.29 18.96a.996.996 0 000 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a.996.996 0 000-1.41l-2.33-2.35z"/>
  </svg>
)

const RankingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/>
  </svg>
)

const PairsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/>
  </svg>
)

function TabBar() {
  return (
    <nav className="tab-bar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <HomeIcon />
        <span>首页</span>
      </NavLink>
      <NavLink to="/heroes" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <HeroesIcon />
        <span>英雄</span>
      </NavLink>
      <NavLink to="/skills" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <SkillsIcon />
        <span>技能</span>
      </NavLink>
      <NavLink to="/ranking" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <RankingIcon />
        <span>排行</span>
      </NavLink>
      <NavLink to="/ability-pairs" className={({ isActive }) => isActive ? 'tab-item active' : 'tab-item'}>
        <PairsIcon />
        <span>组合</span>
      </NavLink>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1 className="logo">⚡ Windrun</h1>
            <span className="tagline">游戏数据平台</span>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/ability-pairs" element={<AbilityPairs />} />
          </Routes>
        </main>
        
        <TabBar />
      </div>
    </Router>
  )
}

export default App
