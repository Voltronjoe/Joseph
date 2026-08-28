const API_BASE = '/api';

export const api = {
  getCreator: async () => {
    const res = await fetch(`${API_BASE}/creator`);
    if (!res.ok) throw new Error('Failed to fetch creator');
    return res.json();
  },
  
  chat: async (message: string) => {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },

  adminLogin: async (password: string) => {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Login failed');
    return data;
  },

  getAdminDashboard: async (token: string) => {
    const res = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard');
    return res.json();
  },

  updateCreator: async (token: string, data: any) => {
    const res = await fetch(`${API_BASE}/admin/creator`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update creator');
    return res.json();
  }
};
