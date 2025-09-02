import React from 'react';

// PUBLIC_INTERFACE
export default function NoteList({ notes, activeId, onSelect }) {
  /** Renders a list of notes with selection. */
  if (!notes || notes.length === 0) {
    return <div className="card note-list" style={{ padding: 16 }}>No notes yet. Create your first note.</div>;
  }
  return (
    <div className="card note-list">
      {notes.map((n) => (
        <div
          key={n.id}
          role="button"
          className={`note-item ${activeId === n.id ? 'active' : ''}`}
          onClick={() => onSelect(n)}
        >
          <div className="note-title">{n.title || 'Untitled'}</div>
          <div className="note-meta">
            {!!n.folder && <span className="badge">📁 {n.folder}</span>}
            {(n.tags || []).map((t) => <span key={t} className="badge">#{t}</span>)}
            <span className="badge">id:{n.id}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
