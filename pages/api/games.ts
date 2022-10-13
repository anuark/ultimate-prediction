import supabase from './supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data, error } = await supabase.from('players').select()
    if (error) {
        return res.status(500).json({ message: 'supabase is down' })
    }

    res.status(200).json({ data })
}
