import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'postgresql://postgres:PLRySZx98p6MCnh7@db.yvrelweiqqqmsbafanda.supabase.co:5432/postgres';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cmVsd2VpcXFxbXNiYWZhbmRhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Njk5MTU2MCwiZXhwIjoyMDcyNTY3NTYwfQ.ryBjFyBnxbBuD7fhCRKhjU-AxwtgzBhBNj24kr3Fj1o';
export const supabase = createClient(supabaseUrl, supabaseKey);
