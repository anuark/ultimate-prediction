import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { FcGoogle } from 'react-icons/fc'
import { FaDiscord } from 'react-icons/fa'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

export default function Auth() {
    async function signInWithGoogle() {
        await supabaseClient.auth.signIn({
            provider: 'google',
        }, {
            redirectTo: 'http://localhost:3000/redirect'
        })
    }

    async function signInWithDiscord() {
        await supabaseClient.auth.signIn({
            provider: 'discord',
        }, {
            redirectTo: 'http://localhost:3000/redirect'
        })
    }

    return (
        <>
            <Header />
            <section className="flex flex-col md:flex-row h-screen items-center" style={{ marginTop: '-142px' }}>
                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">
                    <div className="w-full h-100">
                        <p className="text-xl font-bold leading-tight mt-12 text-black text-center mb-8">Ultimate Prediction Tournament</p>
                        <button type="button" onClick={signInWithGoogle} className="w-full mb-4 block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                            <div className="flex items-center justify-center">
                                <FcGoogle size='2em' />
                                <span className="ml-4">
                                    Sign in
                                    with
                                    Google</span>
                            </div>
                        </button>

                        <button type="button" onClick={signInWithDiscord} className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-white font-semibold rounded-lg px-4 py-3 border border-gray-300" style={{ backgroundColor: '#5562ea' }}>
                            <div className="flex items-center justify-center">
                                <FaDiscord size='2em' />
                                <span className="ml-4">
                                    Sign in
                                    with
                                    Discord</span>
                            </div>
                        </button>

                    </div>
                </div>

            </section>

            <Footer />
        </>
    )
}
