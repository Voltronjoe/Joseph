import { create } from 'zustand';

export interface User {
  name: string;
  email?: string;
  phone?: string;
  picture?: string;
  authProvider: 'google' | 'apple' | 'phone' | 'email';
}

interface AppState {
  // Auth state
  isAdminAuth: boolean;
  adminToken: string | null;
  setAdminAuth: (isAuth: boolean, token?: string) => void;
  logoutAdmin: () => void;
  
  // Normal User state
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  
  // Theme state
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Sidebar state (mobile)
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const getInitialTheme = () => {
  const saved = localStorage.getItem('isDarkMode');
  if (saved !== null) {
    return saved === 'true';
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialUser = () => {
  const saved = localStorage.getItem('googleUser');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const useAppStore = create<AppState>((set) => ({
  isAdminAuth: !!localStorage.getItem('adminToken'),
  adminToken: localStorage.getItem('adminToken'),
  setAdminAuth: (isAuth, token) => {
    if (isAuth && token) {
      localStorage.setItem('adminToken', token);
      set({ isAdminAuth: true, adminToken: token });
    } else {
      localStorage.removeItem('adminToken');
      set({ isAdminAuth: false, adminToken: null });
    }
  },
  logoutAdmin: () => {
    localStorage.removeItem('adminToken');
    set({ isAdminAuth: false, adminToken: null });
  },

  user: getInitialUser(),
  loginUser: (user) => {
    localStorage.setItem('googleUser', JSON.stringify(user));
    set({ user });
  },
  logoutUser: () => {
    localStorage.removeItem('googleUser');
    set({ user: null });
  },

  isDarkMode: getInitialTheme(),
  toggleTheme: () => set((state) => {
    const nextMode = !state.isDarkMode;
    localStorage.setItem('isDarkMode', String(nextMode));
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: nextMode };
  }),

  isSidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
