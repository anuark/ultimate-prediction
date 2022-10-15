import supabase from '../supabase'

export default async function handler(req, res) {
  const { user_metadata, email, id } = req.body

  const { data } = await supabase.from('players').select().eq('email', email)
  if (data.length) {
    return res.status(200).send('player already exists')
  }

  const { error } = await supabase.from('players').insert({ id, email, name: user_metadata.full_name, profile_url: user_metadata.avatar_url })
  if (error) {
    console.error(error)
    return res.status(500).send('error signing player')
  }

  res.status(200).send('success')
}
