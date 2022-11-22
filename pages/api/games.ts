import supabase from './supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Cache-Control', 'no-store')

    const { user_id } = req.query
    const { data: games, error } = await supabase.from('games').select().order('date', { ascending: true })

    if (error) {
        console.error(error)
        return res.status(500).json({ message: 'supabase is down' })
    }

    // appending voted_for prop on games for user's voted games
    if (user_id) {
        const { data: playerVotes } = await supabase.from('players_vote').select().eq('players_id', user_id)
        console.log({ playerVotes })
        if (playerVotes) {
            for (let i = 0; i < playerVotes.length; i++) {
                const playerVote = playerVotes[i]
                for (let j = 0; j < games.length; j++) {
                    if (playerVote.games_id == games[j].id) {
                        games[j].voted_for = playerVote.voted_for;
                    }
                }
            }
        }
    }

    res.status(200).json(games)
}
