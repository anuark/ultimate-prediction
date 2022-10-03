import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header.jsx'
import Card from '../components/Card.jsx'
import Footer from '../components/Footer.jsx'
import { useUser } from '@supabase/auth-helpers-react'

export default function Home() {
  const matches = [
    {
      home: 'Iran',
      away: 'Qatar',
      homeScore: 0,
      awayScore: 1,
      minute: 80,
      predicted: false
    },
    {
      home: 'Iran',
      away: 'Qatar',
      homeScore: 0,
      awayScore: 1,
      minute: 80
    },
    {
      home: 'Iran',
      away: 'Qatar',
      homeScore: 0,
      awayScore: 1,
      minute: 80
    },
    {
      home: 'Iran',
      away: 'Qatar',
      homeScore: 0,
      awayScore: 1,
      minute: 80
    },
  ];
  const user = useUser()
  console.log({ key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY })
    console.log({ user })
  return (
    <>
      <Header />
      {/*
      <h1 className="text-3xl font-bold underline pt-3 px-2 mb-4">
        Hello world!
      </h1>
*/}
      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-8 p-6">
        { matches.map((m, i) => (<Card key={i} item={m} />)) }
      </div>

      <Footer />
    </>
  )
}
