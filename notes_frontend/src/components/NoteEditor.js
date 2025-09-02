import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onSave, onDelete }) {
  /**
   * Editor for a single note.
   * - note: nullable; if null, treat as new note
   */
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState((note?.tags || []).join(', '));
  const [folder, setFolder] = useState(note?.folder || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setTags((note?.tags || []).join(', '));
    setFolder(note?.folder || '');
  }, [note?.id, note?.title, note?.content, note?.tags, note?.folder]);

  const handleSave = () => {
    const payload = {
      title: title.trim(),
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      folder: folder.trim() || null,
    };
    onSave(payload);
  };

  return (
    <div className="card editor">
      <div className="editor-header">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor-toolbar">
          <button className="icon-btn" onClick={handleSave} aria-label="Save">💾 Save</button>
          {note?.id && (
            <button className="icon-btn" onClick={onDelete} aria-label="Delete">🗑️ Delete</button>
          )}
        </div>
      </div>
      <div className="editor-body">
        <textarea
          className="editor-textarea"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="editor-footer">
          <div className="input-chip">
            <span>#</span>
            <input
              placeholder="tags, comma separated"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="input-chip">
            <span>📁</span>
            <input
              placeholder="folder"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
