import axios from 'axios';

/**
 * API base URL is taken from REACT_APP_API_BASE; falls back to same-origin.
 * Example: http://localhost:8000
 * Note: Ensure the .env contains REACT_APP_API_BASE in deployment.
 */
const API_BASE = process.env.REACT_APP_API_BASE || '';

export const api = axios.create({
  baseURL: API_BASE,
});

// PUBLIC_INTERFACE
export function setAuthToken(token) {
  /** Set or clear Authorization header for axios client. */
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// PUBLIC_INTERFACE
export async function login(username, password) {
  /** Login with OAuth2 password flow. */
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);
  const { data } = await api.post('/auth/login', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return data; // { access_token, token_type }
}

// PUBLIC_INTERFACE
export async function registerUser(payload) {
  /** Register a new user. payload: { username, email, password } */
  const { data } = await api.post('/auth/register', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function me() {
  /** Get current user profile */
  const { data } = await api.get('/auth/me');
  return data;
}

// PUBLIC_INTERFACE
export async function listNotes({ tag, folder } = {}) {
  /** List notes with optional filters. */
  const { data } = await api.get('/notes', { params: { tag, folder } });
  return data;
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  /** Get a note by id. */
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Create a new note. payload: { title, content, tags, folder } */
  const { data } = await api.post('/notes', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Update a note. */
  const { data } = await api.put(`/notes/${id}`, payload);
  return data;
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete a note by id. */
  await api.delete(`/notes/${id}`);
}

// PUBLIC_INTERFACE
export async function searchNotes({ q, tag, folder }) {
  /** Search notes. */
  const { data } = await api.get('/search', { params: { q, tag, folder } });
  return data;
}

// PUBLIC_INTERFACE
export async function listTags() {
  /** List available tags. */
  const { data } = await api.get('/organization/tags');
  return data;
}

// PUBLIC_INTERFACE
export async function listFolders() {
  /** List available folders. */
  const { data } = await api.get('/organization/folders');
  return data;
}
