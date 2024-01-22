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
            <iframe
                width="300"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1498.6690220301467!2d12.4922916!3d41.8900331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6a0551b926c7%3A0x57b48b6ea147594a!2sPiazza%20del%20Colosseo%2C%201%2C%2000184%20Roma%20RM!5e0!3m2!1sen!2sit!v=weekly">
           </iframe>
        </div>
    </footer>
  )
}export default Footer