import React from 'react'

import style from './components.module.css'

import Image from 'next/image';
import star_full from '@/public/img/stars/star_full.png'
import star_empty from '@/public/img/stars/star_empty.png'

function Review() {
  return (
    <div className={style.review}>
        <div className={style.star}>
          <h3>Location</h3>
          <div>
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_empty} alt='img1' width={25} height={25} />
          </div>

          <h3>Menù</h3>
          <div>
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_empty} alt='img1' width={25} height={25} />
          </div>

          <h3>Servizio</h3>
          <div>
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
          </div>

          <h3>Conto</h3>
          <div>
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_full} alt='img1' width={25} height={25} />
            <Image src={star_empty} alt='img1' width={25} height={25} />
          </div>
        </div>
        <div className={style.text}>
            <p><b>Mario Rossi</b> - 26/11/2023</p>
            <p>
                Il ristorante offre una cucina ecezionale in un ambiente accogliente. 
                I piatti erano deliziosi, il servizio cordiale. L&apos;unico inconveniente 
                sono i prezi leggermente elevati, ma nel complesso un esperienza molto 
                soddisfacente
            </p>
        </div>
    </div>
  )
}

export default Review