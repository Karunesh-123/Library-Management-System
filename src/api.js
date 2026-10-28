const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
  return data;
}

export const api = {
  getAll: (resource) => request(`/${resource}`),
  save: (resource, item) => request(`/${resource}/${encodeURIComponent(item.id)}`, { method: 'PUT', body: JSON.stringify(item) }),
  remove: (resource, id) => request(`/${resource}/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  health: () => request('/health'),
};
