import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // Polyfill for React Native

const supabaseUrl = 'https://lngdoqimxolarajflobo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZ2RvcWlteG9sYXJhamZsb2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MjQ5MDQsImV4cCI6MjA2MDAwMDkwNH0.hDroH3E7cq-RHh8iGsbg5s1tdYVSHMI94ZSZXzoABic';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,    // ✅ Recommended for mobile apps
  },
});
