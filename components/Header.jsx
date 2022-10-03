import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

const Header = () => {
  async function signInWithDiscord() {
    await supabaseClient.auth.signIn({
      provider: 'discord',
    })
  }

  const { user } = useUser()

  return (
    <div className="mb-4 pt-3 px-2">
      <div className="flex items-center justify-between m-6">
        <div className="float-left flex items-center">
          <Image
            src="/emergence-logo.png"
            className="w-10 mr-4 inline"
            alt="Emergence"
            width="50px"
            height="50px"
          />
          <Link
            href={'/'}
            className="text-brand-light text-3xl lowercase font-semibold tracking-tighter inline"
          >
            Ultimate Bet
          </Link>
        </div>
        <div className="flex items-center gap-10">
          <a
            href={'/leaderboards'}
            className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline"
          >
            Leaderboards
          </a>
          {/* <a
            href={'/'}
            className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline"
          >
            transcripts
          </a> */}
          {user ?
            (<div className="float-right">
              <Link 
                href='/api/auth/logout'
                className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline"
              >
                Sign Out
              </Link>
            </div>) :
            (<div className="float-right">
              <button
                className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline"
                onClick={signInWithDiscord}
              >
                Login
              </button>
            </div>)
          }

        </div>
      </div>
    </div>
  )
};

export default Header;
