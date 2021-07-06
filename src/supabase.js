import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzE4Mjc3OSwiZXhwIjoxOTM4NzU4Nzc5fQ.pCQD8_U0cgWJtgLbOh90kUGpxpOmpwzDmsfwKzj7PwE'

const supabaseUrl = 'https://ctvjpxocqeajngziaxji.supabase.co'
const supabaseKey = SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase