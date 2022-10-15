import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function Redirect() {
    const router = useRouter()
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            const { email, user_metadata, id } = user
            fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, user_metadata, id })
            }).then(() => router.push('/'))
        }
    }, [user, router])

    return (
        <>
            <Header />
            <h1>Redirecting...</h1>
            <Footer />
        </>
    )
}
