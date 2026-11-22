// js/supabase-config.js
const SUPABASE_URL = 'https://pduppbfnfaicdoiakbai.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkdXBwYmZuZmFpY2RvaWFrYmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzNDk0NDcsImV4cCI6MjExMDkyNTQ0N30._H-9VcuSuUvjc8CAxh_2WSThwv7hyu7ghRLUF4zj7WA';

// Inisialisasi client hanya jika SDK tersedia dan key sudah diisi
const isSupabaseConfigured =
  typeof supabase !== 'undefined' &&
  SUPABASE_URL.startsWith('https://') &&
  !SUPABASE_URL.includes('GANTI_DENGAN');

const sbClient = isSupabaseConfigured
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;