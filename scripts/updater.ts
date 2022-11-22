import supabase from './supabase'

type GameStatus = 'playing' | 'not-played' | 'played'

type Game = {
    id: string,
    home_team: string,
    away_team: string,
    home_score: number,
    away_score: number,
    status: GameStatus,
    date: string,
}

type PlayersVote = {
    id: string,
    voted_for: string,
    players_id: string,
    games_id: string,
}

type Player = {
    id: string,
    name: string,
    email: string,
    profile_url: string,
    score: number,
}

async function decider(game: Game): Promise<void> {
    const { data: playerVotes } = await supabase.from<PlayersVote>('players_vote').select().eq('games_id', game.id)
    if (!playerVotes?.length) {
        return
    }

    for (let i = 0; i < playerVotes.length; ++i) {
        const pv = playerVotes[i]
        if (game.home_score > game.away_score) {
            if (pv.voted_for == 'home') {
                const { data: player } = await supabase.from<Player>('players').select().eq('id', pv.players_id).single()
                if (player) {
                    await supabase.from('players').update({ score: player.score + 3 })
                    console.log('voted for home and won player ' + player.id)
                }
            }
        } else if (game.home_score < game.away_score) {
            if (pv.voted_for == 'away') {
                const { data: player } = await supabase.from<Player>('players').select().eq('id', pv.players_id).single()
                if (player) {
                    await supabase.from('players').update({ score: player.score + 3 })
                    console.log('voted for away and won player ' + player.id)
                }
            }
        } else {
            if (pv.voted_for == 'draw') {
                const { data: player } = await supabase.from<Player>('players').select().eq('id', pv.players_id).single()
                if (player) {
                    await supabase.from('players').update({ score: player.score + 3 })
                    console.log('voted for draw and won player ' + player.id)
                }
            }
        }
    }
}

export default async function updater(): Promise<void> {
    const { data: games } = await supabase.from<Game>('games').select()
    if (!games?.length) {
        return
    }

    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const d = new Date(game.date)
        if (game.status === 'not-played' && d.getTime() < Date.now()) {
            await supabase.from('games').update({ status: 'playing' }).eq('id', game.id)
            console.log(game.id + ' set to playing')
        }

        if (game.status === 'playing' && d.getTime() + (1000 * 10) < Date.now()) {
            await supabase.from('games').update({
                status: 'played',
                home_score: Math.floor(Math.random() * 5),
                away_score: Math.floor(Math.random() * 5),
            }).eq('id', game.id)
            console.log(game.id + ' finished game')
            await decider(game)
        }
    }
}

