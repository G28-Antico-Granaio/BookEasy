import React from 'react';

import { Button } from 'antd';
import Image from 'next/image';

import img1 from '@/img/duck.jpg'
import img2 from '@/img/duck.jpg'
import img3 from '@/img/duck.jpg'
import star from '@/img/duck.jpg'

export default function Home() {
  return (
    <main>

      <div className='description'>
        Benvenuti all&apos;Antico Granaio, dove l&apos;arte culinaria si fonde 
        per creare un&apos;esperienza gastronomica incredibile. Situato in un 
        ambiente accogliente e raffinato, il nostro ristorante vi invita a gustare 
        una cucina straordinaria che celebra sapori autentici e ingredienti freschi 
        di stagione. La nostra passione per il cibo si riflette in ogni piatto 
        preparato con cura dai nostri chef talentuosi, mentre il nostro servizio 
        attento e cordiale vi farà sentire a casa.
      </div>

      <div className='images'>
          <Image src={img1} alt='img1' width={250} height={150} />
          <Image src={img2} alt='img2' width={250} height={150} />
          <Image src={img3} alt='img3' width={250} height={150} />
      </div>

      <div className='column'>
        
        <div>
          <h2>Scarica il Menù</h2>
          <a href='../download_files/menù.pdf' download>
            <Button>Scarica</Button>
          </a>
        </div>
        
        <div className='vr'></div>

        <div>
          <h2>Prenota il Tavolo</h2>
          <a href='/reservation'>
            <Button>Prenota</Button>
          </a>
        </div>

      </div>

      <hr />

      <div className='review'>
        <div className='star'>
          <div>Location</div>
          <div>
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
          </div>

          <div>Menù</div>
          <div>
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
          </div>

          <div>Servizio</div>
          <div>
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
          </div>

          <div>Conto</div>
          <div>
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
            <Image src={star} alt='img1' width={25} height={25} />
          </div>
        </div>
        <div className='vr'></div>
          recensioni
      </div>

      <div className='space'></div>

    </main>
  )
}
