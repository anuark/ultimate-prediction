// components/ExampleDialog.js
import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

function BetDialog(props) {
    const router = useRouter()
    const { user } = useUser()
    const { home, away, id } = props

    const [showDialog, setShowDialog] = useState(false)
    const open = () => setShowDialog(true)
    const close = () => setShowDialog(false)

    // TODO: save vote for user
    // TODO: handle buttons coloring
    // TODO: close modal after voting

    const vote = (type, matchId) => {
        if (!user) {
            // setAlert({ variant: 'info', text: 'You need to login first' });
            // navigate('/auth');
            // router.push('/auth')
            return;
        }

        if (type === 'home') {
            console.log('voted home' + matchId)
            // document.getElementById('home' + matchId)
            //     .className = 'btn btn-primary';
            // document.getElementById('draw-' + matchId)
            //     .className = 'btn btn-secondary';
            // document.getElementById('away-' + matchId)
            //     .className = 'btn btn-secondary';

            // castVote(user, matchId, 'home');
        } else if (type === 'draw') {
            console.log('voted draw' + matchId)
            // document.getElementById(matchId + '-home')
            //     .className = 'btn btn-secondary';
            // document.getElementById(matchId + '-draw')
            //     .className = 'btn btn-primary';
            // document.getElementById(matchId + '-away')
            //     .className = 'btn btn-secondary';

            // castVote(user, matchId, 'draw');
        } else if (type === 'away') {
            console.log('voted draw' + matchId)
            // document.getElementById(matchId + '-home')
            //     .className = 'btn btn-secondary';
            // document.getElementById(matchId + '-draw')
            //     .className = 'btn btn-secondary';
            // document.getElementById(matchId + '-away')
            //     .className = 'btn btn-primary';

            // castVote(user, matchId, 'away');
        }
    }

    return (
        <div>
            <div className="text-center pt-3">
                <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700" onClick={open}>Predict</button>
            </div>
            <Dialog isOpen={showDialog} onDismiss={close} className="" style={{ width: '30vh' }} aria-labelledby='asdqwe'>
                <button className="close-button float-right" onClick={close}>
                    <VisuallyHidden>Close</VisuallyHidden>
                    <span className="text-fuchsia-500" aria-hidden>×</span>
                </button>

                <p className="text-black text-xl p-6">Choose your prediction</p>
                <div className={`flex space-x-6 items-center `}>
                    <button
                        className={"inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700"}
                        id={`home-${id}`}
                        onClick={vote('home', id)}
                    >{home}</button>

                    <button
                        className={"inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700"}
                        id={`draw-${id}`}
                        onClick={vote('draw', id)}
                    >Draw</button>

                    <button
                        className={"inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700"}
                        id={`away-${id}`}
                        onClick={vote('away', id)}
                    >{away}</button>
                </div>
            </Dialog >
        </div >
    )
}

export default BetDialog
