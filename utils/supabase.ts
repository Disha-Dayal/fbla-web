import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://erersfhuszntbjmugqto.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZXJzZmh1c3pudGJqbXVncXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDIzOTksImV4cCI6MjA0OTYxODM5OX0.L_nSht5UhQfE-LhVXwOw3-kEyBrpEwXKPVjXZPyN3xo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 