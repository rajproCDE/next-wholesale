import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://narcljcbolvgnihnkkwc.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hcmNsamNib2x2Z25paG5ra3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MTY2MjcsImV4cCI6MjA1MjA5MjYyN30.byuomwT9Cbh9dt0oyDDhkQjjTsQQgvnwPmTz5L4GFCw'; // Replace with your anon public key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
