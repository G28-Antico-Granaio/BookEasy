import React from 'react'

import Image from 'next/image'

import style from './components.module.css'
import map from '@/img/duck.jpg'
import Link from 'next/link'

function Footer() {
  return (
    <footer className={style.footer}>
        <ul className={style.footer_item}>

            <li>Dove siamo:</li>
            <ul>
                <li>Via Colosseo 1, Roma</li>
            </ul>

            <br />

            <li>Contatti:</li>
            <ul>
                <li>
                    Numero di Telefono: 
                    <a href="tel:+391234567890">1234567890</a>
                </li>
                <li>
                    E-Mail: 
                    <a href="mailto:info@anticogranaio.it">info@anticogranaio.it</a>
                </li>
            </ul>
        </ul>

        <div className={style.footer_item}>
            <Link href={'https://www.google.it/maps/place/Piazza+del+Colosseo,+1,+00184+Roma+RM/@41.8900331,12.4922916,17z'}>
                <Image src={map} alt="map" width={200} height={200} />
            </Link>
        </div>
    </footer>
  )
}export default Footer