import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'

const Header = () => {
    const { user } = useUser()

    return (
        <div className="mb-4 pt-3 px-2">
            <div className="flex items-center justify-between m-6">
                <div className="float-left flex items-center">
                    <Link href='/' passHref>
                        <a>
                            <Image
                                src="/ultimate-bet-nobg.png"
                                className="w-10 mr-4 inline cursor-pointer"
                                alt="Emergence"
                                width="100px"
                                height="100px"
                            />
                        </a>
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
                            >
                                <span className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline cursor-pointer">Sign Out</span>
                            </Link>
                        </div>) :
                        (<div className="float-right">
                            <Link
                                href='/auth'
                            >
                                <span className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline cursor-pointer">Login</span>
                            </Link>
                        </div>)
                    }

                </div>
            </div>
        </div>
    )
};

export default Header;
