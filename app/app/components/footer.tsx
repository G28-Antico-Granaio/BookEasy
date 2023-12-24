import React from 'react'

import Image from 'next/image'

import style from './components.module.css'
import map from '@/img/duck.jpg'

function Footer() {
  return (
    <footer className={style.footer}>
        <ul className={style.footer_item}>

            <li>Dove siamo:</li>

            <li>Via Colosseo 1, Roma</li>

            <br />

            <li>Contatti: </li>

            <li>
                Numero di Telefono
                <a href="tel:+391234567890">1234567890</a>
            </li>

            <li>
                E-Mail
                <a href="mailto:info@anticogranaio.it">info@anticogranaio.it</a>
            </li>

        </ul>

        <div className={style.footer_item}>
            <Image src={map} alt="map" width={200} height={200} />
        </div>
    </footer>
  )
}export default Footer