import puppeteer from 'puppeteer'
import dayjs from 'dayjs'
import supabase from './supabase'
import chromium from 'chrome-aws-lambda'

type ScrapedGame = {
    date: Date,
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number,
    status: string
}

type Game = {
    id: string,
    home_score: number,
    away_score: number,
    home_team: string,
    away_team: string,
    status: string,
    date: Date,
}

const delay = (t: number): Promise<void> => (
    new Promise((res) => setTimeout(() => res(), t))
)

const parseDate = (date: string): dayjs.Dayjs => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let [, d, m] = date.split(' ');
    // console.log({ date, d, m });

    const day = d.replace(/[a-z]/g, '');
    const year = '2022';
    const month = months.indexOf(m) + 1

    return dayjs(`${year}-${month}-${day}`);
};

export default async function harvest(): Promise<void> {
    const browser = await puppeteer.launch({
        // devtools: true,
        // defaultViewport: { 'width': 2200, 'height': 1200 },
        // headless: false,
        // args: [
        //     '--no-sandbox',
        //     '--disable-setuid-sandbox',
        //     '--disable-dev-shm-usage',
        //     // '--start-fullscreen'
        // ],
        // ignoreDefaultArgs: ['--disable-extensions'],
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.CHROMIUM_PATH ?? '/usr/bin/google-chrome',
        headless: true,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto('https://www.skysports.com/world-cup-fixtures');
    // await delay(999999)
    const data = await page.$eval('.fixres__body', (el) => {
        const data: string[] = [];
        Array.from(el.children).forEach((v: any) => {
            data.push(v.innerText);
        });

        return data;
    });

    const tzOffset = await page.evaluate(() => {
        return (new Date()).getTimezoneOffset();
    });


    browser.close();

    // {
    //     date: '2022-11-21 10:00:00',
    //     homeTeam: 'Senegal',
    //     awayTeam: 'Netherlands',
    //     homeScore: 0,
    //     awayScore: 1,
    //     status: playing|played|not-played
    // }
    const games: ScrapedGame[] = [];
    data.forEach((v, i) => {
        // is match
        if (v.substring(0, 1) == '\t') {
            let date: dayjs.Dayjs;
            // find date
            let j = 1;
            while (true) {
                let d = data[i - (j++)];
                if (d.substring(0, 1) != '\t') {
                    date = parseDate(d);
                    break;
                }
            }

            let [homeTeam, timeOrHomeScore, awayTeam] = v.split('\n');
            homeTeam = homeTeam.replaceAll('\t', '')
            awayTeam = awayTeam.replaceAll('\t', '')
            let isFinished = awayTeam.includes('FT')
            awayTeam = awayTeam.replace('FT', '')
            let time = ''
            let status = ''
            let homeScore = 0
            let awayScore = 0
            if (timeOrHomeScore.includes(':')) {
                time = timeOrHomeScore
                status = 'not-played'
            } else {
                if (isFinished) {
                    status = 'played'
                } else {
                    status = 'playing'
                }
                let strSplit = timeOrHomeScore.split('\t')
                homeScore = strSplit[0] as any
                awayScore = strSplit[1] as any
            }


            let hour = time.substring(0, 2);
            let mins = time.substring(3, 5);
            // console.log({ hour, mins, time })
            date = date.set('hour', hour as any).set('minute', mins as any);
            date = date.subtract(tzOffset, 'minute');
            games.push({ date: date.toDate(), homeTeam, awayTeam, homeScore, awayScore, status });
        }
    });

    for (let i = 0; i < games.length; i++) {
        const g = games[i]

        const { data: game, error } = await supabase.from<Game>('games').select().match({ home_team: g.homeTeam, away_team: g.awayTeam }).single()
        if (error) {
            console.error(error)
        }

        if (game?.id) {
            await supabase.from('games').update({ home_score: g.homeScore, away_score: g.awayScore, date: g.date, status: g.status }).eq('id', game.id)
        } else {
            // const _d = dayjs(Date.now() + 1000 * 60 * (i + 1))
            await supabase.from('games').insert({
                home_team: g.homeTeam,
                away_team: g.awayTeam,
                home_score: g.homeScore,
                away_score: g.awayScore,
                date: g.date,
                // date: _d.toDate(),
                status: g.status
            })
        }
    }
}

