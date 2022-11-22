import Header from '../components/Header.jsx'
import Card from '../components/Card.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { useUser } from '@supabase/auth-helpers-react'
import { useQuery } from "@tanstack/react-query";

function useGames(d) {
    return useQuery(['games'], async () => {
        const { data } = await axios.get('/api/games', { params: d })
        return data
    })
}

export default function Home() {
    const { user } = useUser()
    console.log('userid' + user?.id)
    const { data, isError, isLoading } = useGames({ user_id: user?.id });

    // TODO: scheduler script for updating matches data
    // TODO: win/lose simulation

    return (
        <>
            <div className="container mx-auto mb-12">
                <Header />
                {isLoading ? (
                    'loading'
                ) : isError ? (
                    <span> Error loading the server </span>
                ) : (
                    <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-8 p-6">
                        {data.map((m, i) => (<Card key={i} item={m} />))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    res.setHeader(
        'Cache-Control',
        // 'public, s-maxage=10, stale-while-revalidate=59'
        'no-store'
    )

    return {
        props: {},
    }
}

