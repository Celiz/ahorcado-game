
const SUPABASE_URL = 'https://fqedgokxwtkibihajqlf.supabase.co';

const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxZWRnb2t4d3RraWJpaGFqcWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3NzQxOTUsImV4cCI6MjAzODM1MDE5NX0.3O7QwSf282aecJRSn0A2kOY6OxwrrXy2TCr-yAFyuYc'

export function initSupabase() {
    
    return window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
}