import { createClient } from '@supabase/supabase-js';

// Helper to safely access environment variables in various build environments (CRA, Vite, Next.js)
const getEnvVar = (key: string, viteKey?: string): string | undefined => {
  // Check process.env (Create React App, Next.js, Node)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  // Check import.meta.env (Vite)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && viteKey && import.meta.env[viteKey]) {
    // @ts-ignore
    return import.meta.env[viteKey];
  }
  
  return undefined;
};

// Try to get credentials from environment, fallback to placeholders
const SUPABASE_URL = getEnvVar('REACT_APP_SUPABASE_URL', 'VITE_SUPABASE_URL') || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = getEnvVar('REACT_APP_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY') || 'placeholder-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);