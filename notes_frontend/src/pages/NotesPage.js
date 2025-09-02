import React, { useEffect, useState } from 'react';
import Layout, { SidebarNav, TopbarControls } from '../components/Layout';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import {
  createNote,
  deleteNote,
  listFolders,
  listNotes,
  listTags,
  searchNotes,
  updateNote,
} from '../services/api';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [active, setActive] = useState(null);
  const [tags, setTags] = useState([]);
  const [folders, setFolders] = useState([]);

  const [activeTag, setActiveTag] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [search, setSearch] = useState('');

  const refreshNotes = async (filters = {}) => {
    const data = await listNotes(filters);
    setNotes(data);
    if (data.length > 0) {
      setActive(data[0]);
    } else {
      setActive(null);
    }
  };

  const refreshTaxonomy = async () => {
    const [t, f] = await Promise.all([listTags(), listFolders()]);
    setTags(t);
    setFolders(f);
  };

  useEffect(() => {
    refreshNotes({ tag: activeTag, folder: activeFolder });
    refreshTaxonomy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag, activeFolder]);

  const onCreate = async () => {
    const created = await createNote({
      title: 'Untitled',
      content: '',
      tags: [],
      folder: null,
    });
    await refreshNotes({ tag: activeTag, folder: activeFolder });
    setActive(created);
  };

  const onSave = async (payload) => {
    if (active?.id) {
      const updated = await updateNote(active.id, payload);
      setActive(updated);
      await refreshNotes({ tag: activeTag, folder: activeFolder });
    } else {
      const created = await createNote(payload);
      setActive(created);
      await refreshNotes({ tag: activeTag, folder: activeFolder });
    }
    await refreshTaxonomy();
  };

  const onDelete = async () => {
    if (!active?.id) return;
    await deleteNote(active.id);
    await refreshNotes({ tag: activeTag, folder: activeFolder });
    await refreshTaxonomy();
  };

  const onSearch = async () => {
    if (!search.trim()) {
      await refreshNotes({ tag: activeTag, folder: activeFolder });
      return;
    }
    const results = await searchNotes({ q: search, tag: activeTag, folder: activeFolder });
    setNotes(results);
    setActive(results[0] || null);
  };

  const clearFilters = () => {
    setActiveTag(null);
    setActiveFolder(null);
  };

  return (
    <Layout
      sidebar={
        <SidebarNav
          tags={tags}
          folders={folders}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          activeFolder={activeFolder}
          setActiveFolder={setActiveFolder}
          clearFilters={clearFilters}
        />
      }
      topbar={
        <TopbarControls
          onCreate={onCreate}
          onSearch={onSearch}
          search={search}
          setSearch={setSearch}
        />
      }
    >
      <div className="card">
        <NoteList
          notes={notes}
          activeId={active?.id}
          onSelect={setActive}
        />
      </div>
      <div className="card">
        <NoteEditor
          note={active}
          onSave={onSave}
          onDelete={onDelete}
        />
      </div>
    </Layout>
  );
}
