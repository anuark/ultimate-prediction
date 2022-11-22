// components/ExampleDialog.js
import { useState, useEffect } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import axios from 'axios'

async function castVote(postData) {
    return axios.post('/api/vote', {
        data: postData
    })
}

function BetDialog(props) {
    const router = useRouter()
    const { user } = useUser()
    const { home_team, away_team, id, voted_for, status } = props

    const [showDialog, setShowDialog] = useState(false)
    const [votedFor, setVotedFor] = useState(false)

    useEffect(() => {
        setVotedFor(voted_for)
    }, [voted_for])

    const open = () => {
        if (!user) {
            router.push('/auth')
            return
        }

        if (status != 'not-played') {
            console.log('not-played')
            return
        }

        setShowDialog(true)
    }
    const close = () => setShowDialog(false)

    const afterVote = (vote) => {
        setVotedFor(vote)
        close();
    }

    const vote = (type, matchId) => {
        if (!user || status != 'not-played') {
            // setAlert({ variant: 'info', text: 'You need to login first' });
            // navigate('/auth');
            // router.push('/auth')
            console.log('cancelled vote')
            return;
        }

        if (type === 'home') {
            console.log('voted home' + matchId)
            // adding green to home and removing green to the other buttons
            document.getElementById('home-' + matchId).classList.replace('bg-cyan-700', 'bg-green-700')
            console.log('replaced')
            document.getElementById('draw-' + matchId).classList.replace('bg-green-700', 'bg-cyan-700')
            document.getElementById('away-' + matchId).classList.replace('bg-green-700', 'bg-cyan-700')

            castVote({ players_id: user.id, games_id: matchId, voted_for: 'home' }).then(() => afterVote('home'))
        } else if (type === 'draw') {
            console.log('voted draw' + matchId)
            document.getElementById('home-' + matchId).classList.replace('bg-green-700', 'bg-cyan-700')
            document.getElementById('draw-' + matchId).classList.replace('bg-cyan-700', 'bg-green-700')
            document.getElementById('away-' + matchId).classList.replace('bg-green-700', 'bg-cyan-700')

            castVote({ players_id: user.id, games_id: matchId, voted_for: 'draw' }).then(() => afterVote('draw'))
        } else if (type === 'away') {
            console.log('voted away' + matchId)
            document.getElementById('home-' + matchId).classList.replace('bg-green-700', 'bg-cyan-700')
            document.getElementById('draw-' + matchId).classList.replace('bg-green-700', 'bg-cyan-700')
            document.getElementById('away-' + matchId).classList.replace('bg-cyan-700', 'bg-green-700')
            castVote({ players_id: user.id, games_id: matchId, voted_for: 'away' }).then(() => afterVote('away'))
        }
    }

    return (
        <div>
            <div className="text-center pt-3">
                <button className={`inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white rounded-lg ${votedFor ? 'bg-green-700 hover:bg-green-800' : 'bg-cyan-700 hover:bg-cyan-800'} focus:outline-none`} onClick={open}>{ votedFor ? `voted: ${votedFor}` : 'Predict'}</button>
            </div>
            <Dialog isOpen={showDialog} onDismiss={close} className="" style={{ width: '50vh' }} aria-labelledby='asdqwe'>
                <button className="close-button float-right" onClick={close}>
                    <VisuallyHidden>Close</VisuallyHidden>
                    <span className="text-fuchsia-500" aria-hidden>×</span>
                </button>

                <p className="text-black text-xl p-6">Choose your prediction</p>
                <div className={`flex space-x-6 items-center`}>
                    <button
                        className={"inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none"}
                        id={`home-${id}`}
                        onClick={() => vote('home', id)}
                    >{home_team}</button>

                    <button
                        className={"inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none"}
                        id={`draw-${id}`}
                        onClick={() => vote('draw', id)}
                    >Draw</button>

                    <button
                        className={"inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none"}
                        id={`away-${id}`}
                        onClick={() => vote('away', id)}
                    >{away_team}</button>
                </div>
            </Dialog >
        </div >
    )
}

export default BetDialog
