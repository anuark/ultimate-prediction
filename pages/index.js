import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header.jsx'
import Card from '../components/Card.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
    const matches = [
        {
            id: 1,
            home: 'Iran',
            away: 'Qatar',
            homeScore: 0,
            awayScore: 1,
            minute: 80,
            predicted: false
        },
        {
            id: 2,
            home: 'Iran',
            away: 'Qatar',
            homeScore: 0,
            awayScore: 1,
            minute: 80
        },
        {
            id: 3,
            home: 'Iran',
            away: 'Qatar',
            homeScore: 0,
            awayScore: 1,
            minute: 80
        },
        {
            id: 4,
            home: 'Iran',
            away: 'Qatar',
            homeScore: 0,
            awayScore: 1,
            minute: 80
        },
    ];


    // TODO: Get actual matches data
    // TODO: scheduler script for updating matches data
    // TODO: win/lose simulation

    return (
        <>
            <div className="container">
                <Header />
                {/*
      <h1 className="text-3xl font-bold underline pt-3 px-2 mb-4">
        Hello world!
      </h1>
*/}
                <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-8 p-6">
                    {matches.map((m, i) => (<Card key={i} item={m} />))}
                </div>
            </div>

            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: { isPrerendered: true }, // will be passed to the page component as props
    }
}

