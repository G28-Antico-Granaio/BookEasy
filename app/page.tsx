'use client'

import React from 'react';

import { Button } from 'antd';
import Image from 'next/image';

import style from './page.module.css'
import img1 from '@/public/img/carosello/1.jpg'
import img2 from '@/public/img/carosello/2.jpg'
import img3 from '@/public/img/carosello/3.jpg'

import { useRouter } from 'next/navigation';
import Review from './components/review';

export default function Home() {

  const router = useRouter();
  const onBook = async () => {
    await router.push('/reservation')
  }

  return (
    <section className='container'>
      <section className={style.description}>
        Benvenuti all&apos;Antico Granaio, dove l&apos;arte culinaria si fonde 
        per creare un&apos;esperienza gastronomica incredibile. Situato in un 
        ambiente accogliente e raffinato, il nostro ristorante vi invita a gustare 
        una cucina straordinaria che celebra sapori autentici e ingredienti freschi 
        di stagione. La nostra passione per il cibo si riflette in ogni piatto 
        preparato con cura dai nostri chef talentuosi, mentre il nostro servizio 
        attento e cordiale vi farà sentire a casa.
      </section>

      <section className={style.images}>
          <Image src={img1} alt='img1' width={375} height={225} />
          <Image src={img2} alt='img2' width={500} height={300} />
          <Image src={img3} alt='img3' width={375} height={225} />
      </section>

      <section className={style.column}>
        <div>
          <h2>Scarica il Menù</h2>
          <a href='../public/download_files/menù.pdf' download>
            <Button>Scarica</Button>
          </a>
        </div>
        
        <div>
          <h2>Prenota il Tavolo</h2>
          <a onClick={onBook}>
            <Button>Prenota</Button>
          </a>
        </div>
      </section>

      <section>
        <Review />
      </section>

    </section>
  )
}
