'use client'

import React, { useState } from 'react'

import {  Button, Form, Input, InputNumber, Modal, message } from 'antd';

import { useRouter } from 'next/navigation';

import style from '../reach.module.css'
import axios from 'axios';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

interface Reservation {
  _id: string;
  table_id: number;
  date: Date;
  turn: number;
  cover_number: number;
}

interface Review {
  reservation_id: string,
  name: string;
  surname: string;
  date: Date;
  location: number
  menu: number;
  service: number;
  bill: number;
  comment: string
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
    router.push('/modify-credentials')
  }

  const onDeleteAcc = async () => {
    router.push('/delete-account')
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

  const [loading, setLoading] = useState(false);  

  const [pastModalVisible, setPastModalVisible] = useState(false);
  const [currentPastReservation, setCurrentPastReservation] = useState<Reservation | null>(null);

  const onRev = async (values: Review, reservation: Reservation) => {
    try {
      setLoading(true);

      const email: string | null = localStorage.getItem('email') || '';
      const response = await axios.get(`/api/users/user/${email}`);
      const user = response.data.data;

      const data: Review = {
        ...values,
        name: user.name,
        surname: user.surname,
        reservation_id: reservation._id,
        date: reservation.date
      }

      await axios.post(`/api/reviews/review/${reservation._id}`, data)
      message.success("Recensione Postata");

    } catch (error: any) {
      message.error(error.response.data.message)
    } finally {
      setPastModalVisible(false);
      setLoading(false);
    }    
  };

  const onCancel = () => {
    setPastModalVisible(false);
  };

  const showModal = (reservation: Reservation) => {
    setCurrentPastReservation(reservation);
    setPastModalVisible(true);
  };
  
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

      <hr className={style.hr_form} />

      <section>
        <h2>Prenotazioni Attive</h2>
        {newData.map((reservation: Reservation) => {
        return (
          <div key={reservation.table_id} className={style.post_rev}>
            <div>{`Prenotazione - ${new Date(reservation.date).toLocaleDateString('en-GB')}`}</div>
            <div>{`Orario: ${reservation.turn}.00 - ${reservation.turn + 2}.00 | ${reservation.cover_number} Persone | Tavolo ${reservation.table_id}`}</div>
            <a className={style.link} onClick={() => onDelete(reservation._id)}>Cancella la prenotazione</a>
          </div>
        );
      })}
      </section>

      <hr className={style.hr_form} />

      <section>
        <h2>Prenotazioni Passate</h2>
        <div>Fino a 7 giorni fa</div>

        {oldData.map((reservation: Reservation) => {
        return (
          <div key={reservation.table_id} className={style.past_rev}>
            <div>{`Prenotazione - ${new Date(reservation.date).toLocaleDateString('en-GB')}`}</div>
            <div>{`Orario: ${reservation.turn}.00 - ${reservation.turn + 2}.00 | ${reservation.cover_number} Persone | Tavolo ${reservation.table_id}`}</div>

            <a className={style.link} onClick={() => showModal(reservation)}>Recensisci Prenotazione</a>

            <Modal
              title="Recensione"
              open={pastModalVisible}
              onCancel={onCancel}
              footer={null}>

              <Form 
                name="Response"
                onFinish={(values) => {if(currentPastReservation){onRev(values, currentPastReservation)}} }>

                <Form.Item
                  label='Location'
                  name={'location'}
                  rules={[
                    {
                      required: true,
                      message: 'Inserire le stelle'
                    }
                ]}>

                  <InputNumber min={1} max={5}
                    controls={false}
                    formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                    parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}/>

                </Form.Item>

                <Form.Item
                  label='Menù'
                  name={'menu'}
                  rules={[
                    {
                      required: true,
                      message: 'Inserire le stelle'
                    }
                ]}>

                  <InputNumber min={1} max={5}
                    controls={false}
                    formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                    parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}/>
                    
                </Form.Item>

                <Form.Item
                  label='Servizio'
                  name={'service'}
                  rules={[
                    {
                      required: true,
                      message: 'Inserire le stelle'
                    }
                ]}>

                  <InputNumber min={1} max={5}
                    controls={false}
                    formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                    parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}/>
                    
                </Form.Item>

                <Form.Item
                  label='Conto'
                  name={'bill'}
                  rules={[
                    {
                      required: true,
                      message: 'Inserire le stelle'
                    }
                ]}>

                  <InputNumber min={1} max={5}
                    controls={false}
                    formatter={(value: string | number | undefined) => (value ? `${value}`.replace(/\D/g, '') : '')}
                    parser={(value: string | undefined) => (value ? value.replace(/\D/g, '') : '')}/>
                    
                </Form.Item>


                <Form.Item
                  name={'comment'}
                  label="comme"
                  rules={[
                    {
                      required: true,
                      message: 'Inserire una risposta',
                    },
                  ]}
                >
                  <Input.TextArea />

                </Form.Item>

                <Button htmlType='submit' block loading={loading}>
                  Invia
                </Button>
              </Form>
            </Modal>
          </div>);        
        })}
      </section>

      <hr className={style.hr_form} />

      <section className={style.link}>
        <a onClick={onDeleteAcc}>Elimina l&apos;Account</a>
      </section>
    </section>
  )
} export default Private_Area