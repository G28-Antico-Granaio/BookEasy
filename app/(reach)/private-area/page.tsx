'use client'

import React, { useState } from 'react'

import {  message } from 'antd';

import { useRouter } from 'next/navigation';

import style from '../reach.module.css'
import axios from 'axios';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

interface reserve {
  _id: string;
  table_id: number;
  date: Date;
  turn: number;
  cover_number: number;
}

dayjs.extend(customParseFormat);

function Private_Area() {

  const router = useRouter();

  const onLogout = async () => {
    try {
      if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('log')) {

        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.setItem('log', 'false');

        message.success("Logout Effettuato");
        router.push("/login");
      } else {
        message.warning("Impossibile eseguire il logout");
      }
    } catch (error: any) {
      message.error(error.response.data.message);
    }  
  };

  const onModify = async () => {
    await router.push('/modify-credentials')
  }

  const onDeleteAcc = async () => {
    await router.push('/delete-account')
  }

  const onDelete = async (_id: string) => {
    try {
      await axios.delete(`/api/reservations/delete-reservation/${_id}`)
      message.success("Prenotazione Eliminata")
      window.location.reload();
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  }

  const onRev = async (_id: string) => {
    message.warning("Funzione non ancora Implementata");
  }

  const onDate =async () => {
    message.warning("Funzione non ancora Implementata");
  }
  
  const [newData, setNewData] = useState([]);
  const [oldData, setOldData] = useState([]);

  React.useEffect(() => {
    const log = localStorage.getItem('log');
    const role = localStorage.getItem('role');
    if (!log || !role) {
      router.push('/login');
    } else {
      if (role === 'true') {
        router.push('/private-area/ristoratore')
      }
    }

    const onReserveNew =async () => {
      try {
        const email: string | null = localStorage.getItem('email');
        const response = await axios.get(`/api/reservations/new-reservation/${email}`);
        setNewData(response.data.data);
      } catch (error: any) {
        //
      }
    };

    const onReserveOld =async () => {
      try {
        const email: string | null = localStorage.getItem('email');
        const response = await axios.get(`/api/reservations/old-reservation/${email}`);
        setOldData(response.data.data);
      } catch (error: any) {
        //
      }
    };

    onReserveNew();
    onReserveOld();
  }, [router]);
  
  return(
    <section className='container'>
      <section className={style.link}>
          <a onClick={onModify}>Modifica le Credenziali</a>
      </section>
      <section className={style.link}>
        <a onClick={onLogout}>Logout</a>
      </section>

      <hr />

      <section>
        <h2>Prenotazioni Attive</h2>
        {newData.map((reservation: reserve) => {
        return (
          <div key={reservation.table_id} className={style.post_rev}>
            <div>{`Prenotazione - ${new Date(reservation.date).toLocaleDateString('en-GB')}`}</div>
            <div>{`Orario: ${reservation.turn}.00 - ${reservation.turn + 2}.00 | ${reservation.cover_number} Persone | Tavolo ${reservation.table_id}`}</div>
            <a className={style.link} onClick={() => onDelete(reservation._id)}>Cancella la prenotazione</a>
          </div>
        );
      })}
      </section>

      <hr />

      <section>
        <h2>Prenotazioni Passate</h2>
        <div>Fino a 7 giorni fa</div>

        {oldData.map((reservation: reserve) => {
        return (
          <div key={reservation.table_id} className={style.past_rev}>
            <div>{`Prenotazione - ${new Date(reservation.date).toLocaleDateString('en-GB')}`}</div>
            <div>{`Orario: ${reservation.turn}.00 - ${reservation.turn + 2}.00 | ${reservation.cover_number} Persone | Tavolo ${reservation.table_id}`}</div>
            <a className={style.link} onClick={() => onRev(reservation._id)}>Recensisci Prenotazione</a>
          </div>);        
        })}
      </section>

      <hr />

      <section className={style.link}>
        <a onClick={onDeleteAcc}>Elimina l&apos;Account</a>
      </section>
    </section>
  )
} export default Private_Area