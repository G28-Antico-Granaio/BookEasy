'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { Button, DatePicker, Form, InputNumber, Select, message } from 'antd';

import { useRouter } from 'next/navigation';

import style from '../reach.module.css'
import map from '@/public/img/duck.jpg'
import Review from '@/app/components/review';
import Loader from '@/app/components/loader';



const { Option } = Select;

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

  const onDelete = async () => {
    message.warning("Funzione non ancora Implementata");
  }

  const onRev = async () => {
    message.warning("Funzione non ancora Implementata");
  }

  const onDate =async () => {
    message.warning("Funzione non ancora Implementata");
  }
  
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userLog, setUserLog] = useState<string | null>(null);
  const [loadingUserLog, setLoadingUserLog] = useState(true)

  React.useEffect(() => {
    if (localStorage.getItem('role') && localStorage.getItem('log')) {
      const role = localStorage.getItem('role');
      setUserRole(role);

      const log = localStorage.getItem('log');
      setUserLog(log);

      setLoadingUserLog(false);
    }
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
            <div className={style.post_rev}>
              <div>Prenotazione Paranzo - 26/12/2023</div>
              <div>Orario: 12.00 - 13.30 | 2 Persone | Tavolo 13</div>
              <a className={style.link} onClick={onDelete}>Cancella la prenotazione</a>
            </div>

            <div className={style.post_rev}>
              <div>Prenotazione Cena - 15/01/2024</div>
              <div>Orario: 19.30 - 21.00 | 4 Persone | Tavolo 7</div>
              <a className={style.link} onClick={onDelete}>Cancella la prenotazione</a>
            </div>
          </section>

          <hr />

          <section>
            <h2>Prenotazioni Passate</h2>
            <div>Fino a 7 giorni fa</div>

            <div className={style.past_rev}>
              <div>Prenotazione Cena - 20/09/2023</div>
              <div>Orario: 19.30 - 21.00 | 6 Persone | Tavolo 18</div>
              <a className={style.link} onClick={onRev}>Recensisci Prenotazione</a>
            </div>
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
              name='book'
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
                  style={{
                    width: '10rem',
                }}/>
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

              <Form.Item
                label='Coperti'
                name={'cover'}
                rules={[
                  {
                    required: true,
                    message: 'Inserire i coperti'
                  }
                ]}>

                <InputNumber min={1} max={8}
                  style={{
                    width: '10rem',
                  }}/>

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
            <Image src={map} alt="map" width={1000} height={500} />
          </section>

          <section>
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