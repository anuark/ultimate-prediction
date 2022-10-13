import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'

export default function Redirect() {
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            const { email, user_metadata } = user
            console.log({ user_metadata })
            fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, user_metadata })
            }).then(() => window.location.href = '/')
        }
    }, [user])

    return (
        <>
            <Header />
            <h1>Redirecting...</h1>
            <Footer />
        </>
    )
}
