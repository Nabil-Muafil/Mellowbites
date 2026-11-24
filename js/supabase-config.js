// js/supabase-config.js
const SUPABASE_URL = 'https://pduppbfnfaicdoiakbai.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkdXBwYmZuZmFpY2RvaWFrYmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzNDk0NDcsImV4cCI6MjExMDkyNTQ0N30._H-9VcuSuUvjc8CAxh_2WSThwv7hyu7ghRLUF4zj7WA';

// Penyimpanan sesi dinamis mengikuti pilihan "Ingat Saya" di halaman login admin
const dynamicAuthStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key) ?? sessionStorage.getItem(key);
    } catch (_) {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      const remember = localStorage.getItem('mellowbites_remember_me') !== 'false';
      if (remember) {
        localStorage.setItem(key, value);
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, value);
        localStorage.removeItem(key);
      }
    } catch (_) {}
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch (_) {}
  }
};

// Inisialisasi client hanya jika SDK tersedia dan key sudah diisi
const isSupabaseConfigured =
  typeof supabase !== 'undefined' &&
  SUPABASE_URL.startsWith('https://') &&
  !SUPABASE_URL.includes('GANTI_DENGAN');

const sbClient = isSupabaseConfigured
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: dynamicAuthStorage,
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;