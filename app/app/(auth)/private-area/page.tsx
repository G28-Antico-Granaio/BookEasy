'use client'

import React from 'react'

import Image from 'next/image'
import { message } from 'antd';

import { useRouter } from 'next/navigation';
import axios from 'axios';

import style from '../auth.module.css'
import map from '@/img/duck.jpg'


function Private_Area() {

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const onLogout = async () => {
    
    try {
      setLoading(true);

      await axios.get("/api/auth/logout");
      message.success("Logout Effettuato");
      router.push("/login")

    } catch (error: any) {
      
      message.error(error.response.data.message);
    } finally {

      setLoading(false);
    }
  }

  const onDelete = async () => {
    message.warning("Funzione non ancora Implementata");
  }
  

  return (
    <main>

      <ul className={style.ul}>
        <li><a href={'/modify-credentials'} className={style.link}>Modifica le credenziali</a></li>
        <li><a href={''} onClick={onLogout} className={style.link}>Logout</a></li>
      </ul>

      <hr />

      <div>
        <h1>Prenotazioni Attive</h1>
        <ul>
          <li><a href="">giotno</a></li>
          <li><a href="">turno</a></li>
          <li><a href="">coperti</a></li>
        </ul>
      </div>

      <hr />


      <div>
        <h1>Prenotazioni Passate</h1>
        <p>Fino a 7 giorni fa</p>
        <ul>
          <li><a href="">giotno</a></li>
          <li><a href="">turno</a></li>
          <li><a href="">turno</a></li>
        </ul>
      </div>

      <div>
        <Image src={map} alt="map" width={500} height={250} />
      </div>

      <ul className={style.ul}>
        <li><a href={''} onClick={onDelete} className={style.link}>Elimina l&apos;Account</a></li>
      </ul>
    </main>
  )
}

export default Private_Area