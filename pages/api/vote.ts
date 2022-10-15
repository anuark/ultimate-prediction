import supabase from './supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { players_id, games_id, voted_for } = req.body.data
        console.log(req.body.data)
        const { data, error }: any = await supabase.from('players_vote')
            .select()
            .match({ players_id: players_id, games_id: games_id })
            .limit(1)
            .single()

        if (data) {
            await supabase.from('players_vote').update({ voted_for: voted_for }).eq('id', data.id)
        } else {
            console.log({ players_id, games_id, voted_for })
            const { error } = await supabase.from('players_vote')
                .insert({ players_id, games_id, voted_for })

            if (error) {
                console.error(error)
            }
        }

        return res.status(200).json({ message: 'success' })
    }

    return res.status(403).send('method not allowed') //method not allowed
}
