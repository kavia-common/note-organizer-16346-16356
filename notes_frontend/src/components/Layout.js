import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Layout({ sidebar, topbar, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="dot" />
          <span>Notes Organizer</span>
        </div>
        {sidebar}
      </aside>
      <header className="topbar">
        {topbar}
      </header>
      <main className="main">
        {children}
      </main>
    </div>
  );
}

export function TopbarControls({ onCreate, onSearch, search, setSearch }) {
  const { user, logout } = useAuth();
  return (
    <>
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          aria-label="Search notes"
        />
      </div>
      <button className="btn secondary" onClick={onSearch} aria-label="Search">
        Search
      </button>
      <button className="btn" onClick={onCreate} aria-label="Create note">
        + New Note
      </button>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="badge">{user?.username}</span>
        <button className="btn ghost" onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export function SidebarNav({ tags, folders, activeTag, setActiveTag, activeFolder, setActiveFolder, clearFilters }) {
  return (
    <>
      <div>
        <div className="section-title">Filters</div>
        <div className="nav-list">
          <button className="nav-button" onClick={clearFilters}>All notes</button>
        </div>
      </div>
      <div>
        <div className="section-title">Folders</div>
        <div className="folder-list">
          {(folders || []).map((f) => (
            <button
              key={f}
              className={`nav-button ${activeFolder === f ? 'active' : ''}`}
              onClick={() => setActiveFolder(f)}
            >
              📁 {f}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="section-title">Tags</div>
        <div className="tag-list">
          {(tags || []).map((t) => (
            <button
              key={t}
              className={`nav-button ${activeTag === t ? 'active' : ''}`}
              onClick={() => setActiveTag(t)}
            >
              # {t}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
