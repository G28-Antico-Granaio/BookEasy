'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { Button, DatePicker, Form, Select, message } from 'antd';

import { useRouter } from 'next/navigation';

import style from '../reach.module.css'
import map from '@/public/img/plan.png'
import Review from '@/app/components/review';
import Loader from '@/app/components/loader';
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

const { Option } = Select;
dayjs.extend(customParseFormat);

function Private_Area() {

  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const onLogout = async () => {
    try {
      if (localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('log')) {
        setLoading(true);

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
    } finally {
      setLoading(false);
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
      setLoading(true);

      await axios.delete(`/api/reservations/delete-reservation/${_id}`)
      message.success("Prenotazione Eliminata")
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const onRev = async (_id: string) => {
    message.warning("Funzione non ancora Implementata");
  }

  const onDate =async () => {
    message.warning("Funzione non ancora Implementata");
  }
  
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userLog, setUserLog] = useState<string | null>(null);
  const [loadingUserLog, setLoadingUserLog] = useState(true);
  const [newData, setNewData] = useState([]);
  const [oldData, setOldData] = useState([]);

  React.useEffect(() => {
    if (localStorage.getItem('role') && localStorage.getItem('log')) {
      const role = localStorage.getItem('role');
      setUserRole(role);

      const log = localStorage.getItem('log');
      setUserLog(log);

      setLoadingUserLog(false);
    }

    const onReserveNew =async () => {
      try {
        const email: string | null = localStorage.getItem('email');
        const response = await axios.get(`/api/reservations/new-reservation/${email}`);
        setNewData(response.data.data);
      } catch (error: any) {
        message.error(error.response.data.message);
      }
    };

    const onReserveOld =async () => {
      try {
        const email: string | null = localStorage.getItem('email');
        const response = await axios.get(`/api/reservations/old-reservation/${email}`);
        setOldData(response.data.data);
      } catch (error: any) {
        message.error(error.response.data.message);
      }
    };

    onReserveNew();
    onReserveOld();
  }, []);

  if(loadingUserLog){
    return(
        <Loader />
    )
  }
  
  if (userLog === 'true') {
    if (userRole === 'false') {
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
              </div>
            );
          })}
          </section>

          <hr />

          <section className={style.link}>
            <a onClick={onDeleteAcc}>Elimina l&apos;Account</a>
          </section>
        </section>
      )
    } else {
      return (
        <section className='container'>
          <section className={style.link}>
            <a onClick={onModify}>Modifica le Credenziali</a>
          </section>
          <section className={style.link}>
            <a onClick={onLogout}>Logout</a>
          </section>

          <hr />

          <section className={style.date}>
            <Form
              name='check'
              form={form}
              onFinish={onDate}
              scrollToFirstError>

              <Form.Item
                label='Data'
                name={'date'}
                rules={[
                  {
                    required: true,
                    message: 'Selezionare una data'
                  }
                ]}>
                <DatePicker
                  disabledDate={(current) => current && current < dayjs().startOf('day')}
                />
              </Form.Item>

              <Form.Item
                label='Turno'
                name={'turn'}
                rules={[
                  {
                    required: true,
                    message: 'seleziona un turno',
                  }
                ]}>
                <Select style={{
                  width: '10rem',
                }}>
                  <Option value="12.00" >12.00</Option>
                  <Option value="14.00" >14.00</Option>
                  <Option value="19.00" >19.00</Option>
                  <Option value="21.00" >21.00</Option>
                </Select>
              </Form.Item>
              
              <Button htmlType='submit' block loading={loading} style={{
                width: '10rem !important', 
                height: '2rem !important', 
                marginBottom: '24px !important',
                marginLeft: '24px !important'}}>
                Controlla
              </Button>

            </Form>
          </section>

          <section className={style.plan}>
            <Image src={map} alt="map" width={950} height={700} />
          </section>

          <section className={style.review}>
                <Review />
                <Review />
                <Review />
                <Review />
          </section>
        </section>
      )
    }
  } else {
    router.push('/login');
  }
} export default Private_Area