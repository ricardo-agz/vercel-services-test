import { useState, useEffect } from 'react'
import './App.css'

const stats = [
  { label: 'Total Users', value: '24,521', change: '+12.5%', trend: 'up' },
  { label: 'Active Sessions', value: '1,842', change: '+5.2%', trend: 'up' },
  { label: 'Revenue', value: '$89,420', change: '+18.7%', trend: 'up' },
  { label: 'Bounce Rate', value: '23.4%', change: '-3.1%', trend: 'down' },
]

const recentActivity = [
  { id: 1, user: 'alex.chen', action: 'Created new project', time: '2m ago', type: 'create' },
  { id: 2, user: 'maria.silva', action: 'Updated billing info', time: '15m ago', type: 'update' },
  { id: 3, user: 'james.wilson', action: 'Deleted old workspace', time: '1h ago', type: 'delete' },
  { id: 4, user: 'nina.patel', action: 'Invited 3 team members', time: '2h ago', type: 'invite' },
  { id: 5, user: 'tom.hayes', action: 'Exported analytics report', time: '4h ago', type: 'export' },
]

const navItems = [
  { icon: '◈', label: 'Dashboard', active: true },
  { icon: '◇', label: 'Analytics' },
  { icon: '○', label: 'Users' },
  { icon: '□', label: 'Projects' },
  { icon: '△', label: 'Settings' },
]

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div className="app">
      <div className="route-indicator">
        <span className="route-label">ADMIN PANEL</span>
        <span className="route-path">{currentPath}</span>
      </div>
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">⬡</span>
            {!sidebarCollapsed && <span className="logo-text">ADMIN</span>}
          </div>
          <button 
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item, idx) => (
            <a 
              key={idx} 
              href="#" 
              className={`nav-item ${item.active ? 'active' : ''}`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-badge">
            <div className="user-avatar">JD</div>
            {!sidebarCollapsed && (
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-role">Administrator</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Search anything..." />
            <kbd className="search-shortcut">⌘K</kbd>
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <span>🔔</span>
              <span className="notification-dot"></span>
            </button>
            <button className="primary-btn">
              <span>+</span> New Project
            </button>
          </div>
        </header>

        <div className="content">
          <div className="page-header">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="stat-card"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="stat-header">
                  <span className="stat-label">{stat.label}</span>
                  <span className={`stat-change ${stat.trend}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-bar">
                  <div 
                    className="stat-bar-fill" 
                    style={{ width: `${60 + idx * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="content-grid">
            <section className="activity-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <button className="text-btn">View all →</button>
              </div>
              <div className="activity-list">
                {recentActivity.map((item, idx) => (
                  <div 
                    key={item.id} 
                    className="activity-item"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className={`activity-dot ${item.type}`} />
                    <div className="activity-content">
                      <span className="activity-user">@{item.user}</span>
                      <span className="activity-action">{item.action}</span>
                    </div>
                    <span className="activity-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="quick-actions">
              <div className="section-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="actions-grid">
                <button className="action-card">
                  <span className="action-icon">📊</span>
                  <span>Generate Report</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">👤</span>
                  <span>Add User</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">⚙️</span>
                  <span>Configure</span>
                </button>
                <button className="action-card">
                  <span className="action-icon">📤</span>
                  <span>Export Data</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
