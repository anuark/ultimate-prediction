import { createClient } from '@supabase/supabase-js'

export default createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)
