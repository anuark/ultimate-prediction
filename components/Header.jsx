import Image from 'next/image';

const Header = () => {
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
          <a
            href={'/'}
            className="text-brand-light text-3xl lowercase font-semibold tracking-tighter inline"
          >
            Ultimate Bet
          </a>
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
          {/*
          <div className="float-right">
              <button
                className="btn-secondary flex-row-reverse"
              >
                connect
              </button>
          </div>
*/}
        </div>
      </div>
    </div>
  )

};

export default Header;
