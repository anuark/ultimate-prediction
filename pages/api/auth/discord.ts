// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import supabase from '../supabase'

export default async function handler(req, res) {
    const { accessToken } = req.query

    if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET || !process.env.DISCORD_REDIRECT_URI) {
        return res.status(500).send('missing envs')
    }

    if (!accessToken) {
        return res.status(400).send('missing accessToken')
    }

    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    formData.append('client_id', process.env.DISCORD_CLIENT_ID);
    formData.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);
    formData.append('code', accessToken);

    try {
        const { data } = await axios('https://discord.com/api/v10/oauth2/token', {
            method: 'POST',
            headers: { accept: 'application/json' },
            data: formData
        });

        res.writeHead(302, { Location: '/' })
    } catch (err) {
        console.error(err)
        res.status(400).send('error on discord api')
    }
}
