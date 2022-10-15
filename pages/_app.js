import '../styles/globals.css'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider supabaseClient={supabaseClient}>
                <Component {...pageProps} />
            </UserProvider>
        </QueryClientProvider>
    )
}

export default MyApp
